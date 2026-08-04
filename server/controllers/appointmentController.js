const Appointment = require("../models/Appointment");
const User = require("../models/User");

const getAppointments = async (req, res) => {
  try {
    let query = {};

    if (req.user.role === "client") {
      query.client = req.user._id;
    } else if (req.user.role === "therapist") {
      query.therapist = req.user._id;
    }

    const appointments = await Appointment.find(query)
      .populate("client", "name email")
      .populate("therapist", "name email specialties")
      .sort({ scheduledAt: 1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("client", "name email")
      .populate("therapist", "name email specialties");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Check authorization
    const isClient =
      appointment.client._id.toString() === req.user._id.toString();
    const isTherapist =
      appointment.therapist._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isClient && !isTherapist && !isAdmin) {
      return res.status(403).json({
        message: "You are not authorized to view this appointment",
      });
    }

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Book a new appointment
// @route   POST /api/appointments
// @access  Private (Client only)
const bookAppointment = async (req, res) => {
  try {
    const { therapistId, scheduledAt, duration, modality } = req.body;

    // Validate required fields
    if (!therapistId || !scheduledAt || !modality) {
      return res.status(400).json({
        message: "Please provide therapistId, scheduledAt, and modality",
      });
    }

    // Check if therapist exists and is actually a therapist
    const therapist = await User.findById(therapistId);
    if (!therapist || therapist.role !== "therapist") {
      return res.status(400).json({
        message: "Invalid therapist selected",
      });
    }

    // Check for overlapping appointments
    const existingAppointment = await Appointment.findOne({
      therapist: therapistId,
      scheduledAt: new Date(scheduledAt),
      status: { $in: ["booked", "confirmed"] },
    });

    if (existingAppointment) {
      return res.status(400).json({
        message: "Therapist is not available at this time",
      });
    }

    // Create appointment
    const appointment = new Appointment({
      client: req.user._id,
      therapist: therapistId,
      scheduledAt: new Date(scheduledAt),
      duration: duration || 60,
      modality,
      status: "booked",
    });

    await appointment.save();

    // Populate the response
    await appointment.populate("client", "name email");
    await appointment.populate("therapist", "name email specialties");

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update appointment status
// @route   PATCH /api/appointments/:id
// @access  Private
const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Check authorization
    const isClient = appointment.client.toString() === req.user._id.toString();
    const isTherapist =
      appointment.therapist.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isClient && !isTherapist && !isAdmin) {
      return res.status(403).json({
        message: "You are not authorized to update this appointment",
      });
    }

    // Clients can only cancel
    if (isClient && status !== "cancelled") {
      return res.status(403).json({
        message: "Clients can only cancel appointments",
      });
    }

    // Therapists can confirm, complete, cancel, or mark no-show
    if (
      isTherapist &&
      !["confirmed", "completed", "cancelled", "no_show"].includes(status)
    ) {
      return res.status(403).json({
        message:
          "Therapists can only confirm, complete, cancel, or mark no-show",
      });
    }

    // Update status
    appointment.status = status;
    await appointment.save();

    await appointment.populate("client", "name email");
    await appointment.populate("therapist", "name email specialties");

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel appointment (client)
// @route   DELETE /api/appointments/:id
// @access  Private (Client only)
const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Check if client owns this appointment
    if (appointment.client.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can only cancel your own appointments",
      });
    }

    // Check if appointment can be cancelled (not completed or already cancelled)
    if (
      appointment.status === "completed" ||
      appointment.status === "cancelled"
    ) {
      return res.status(400).json({
        message: `Cannot cancel an appointment that is already ${appointment.status}`,
      });
    }

    appointment.status = "cancelled";
    await appointment.save();

    await appointment.populate("client", "name email");
    await appointment.populate("therapist", "name email specialties");

    res.json({
      message: "Appointment cancelled successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get appointments by date range (for therapist calendar)
// @route   GET /api/appointments/calendar
// @access  Private (Therapist only)
const getAppointmentsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        message: "Please provide startDate and endDate",
      });
    }

    const appointments = await Appointment.find({
      therapist: req.user._id,
      scheduledAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    })
      .populate("client", "name email")
      .sort({ scheduledAt: 1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAppointments,
  getAppointmentById,
  bookAppointment,
  updateAppointmentStatus,
  cancelAppointment,
  getAppointmentsByDateRange,
};
