const Appointment = require("../models/Appointment");
const {
  createVideoToken,
  createRoom,
  getRoom,
  endRoom,
  getParticipants,
} = require("../config/videoConfig");

// @desc    Generate video token for a session
// @route   POST /api/video/token
// @access  Private
// In videoController.js - update the generateToken function

const generateToken = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res.status(400).json({ message: "Appointment ID is required" });
    }

    // Find appointment
    const appointment = await Appointment.findById(appointmentId)
      .populate("client", "name email")
      .populate("therapist", "name email");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Check if user is part of this appointment
    const isClient =
      appointment.client._id.toString() === req.user._id.toString();
    const isTherapist =
      appointment.therapist._id.toString() === req.user._id.toString();

    if (!isClient && !isTherapist) {
      return res
        .status(403)
        .json({ message: "You are not part of this appointment" });
    }

    // Check appointment status
    if (
      appointment.status === "cancelled" ||
      appointment.status === "completed"
    ) {
      return res.status(400).json({
        message: `Cannot join a ${appointment.status} appointment`,
      });
    }

    // Create room name
    const roomName = `appointment-${appointmentId}`;

    // Try to get existing room, create if not exists
    let room = null;
    try {
      room = await getRoom(roomName);
    } catch (err) {
      // If getRoom fails (trial account limitation), just create a new room
      console.log("Could not check existing room, creating new one...");
    }

    if (!room) {
      try {
        room = await createRoom(roomName, "go"); // Force P2P for trial
        if (room && room.sid) {
          appointment.videoRoomSid = room.sid;
          await appointment.save();
        }
      } catch (createErr) {
        console.error("Error creating room:", createErr);
        // If room creation fails, still generate token - the room might exist
      }
    }

    // Generate token for user
    const identity = req.user._id.toString();
    const token = createVideoToken(identity, roomName);

    res.json({
      token,
      roomName,
      appointmentId: appointment._id,
      user: {
        id: req.user._id,
        name: req.user.name,
        role: req.user.role,
      },
      otherParticipant: isClient ? appointment.therapist : appointment.client,
    });
  } catch (error) {
    console.error("Token generation error:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    End a video session
// @route   POST /api/video/end
// @access  Private (Therapist only)
const endVideoSession = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res.status(400).json({ message: "Appointment ID is required" });
    }

    // Find appointment
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Only therapist can end session
    if (appointment.therapist.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Only the therapist can end the session",
      });
    }

    // End the room if it exists
    if (appointment.videoRoomSid) {
      await endRoom(appointment.videoRoomSid);
    }

    // Update appointment status
    appointment.status = "completed";
    await appointment.save();

    res.json({
      message: "Video session ended successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get room participants
// @route   GET /api/video/participants/:appointmentId
// @access  Private
const getRoomParticipants = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Check if user is part of this appointment
    const isClient = appointment.client.toString() === req.user._id.toString();
    const isTherapist =
      appointment.therapist.toString() === req.user._id.toString();

    if (!isClient && !isTherapist) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (!appointment.videoRoomSid) {
      return res.json({ participants: [] });
    }

    const participants = await getParticipants(appointment.videoRoomSid);

    res.json({
      participants: participants.map((p) => ({
        identity: p.identity,
        status: p.status,
        joinedAt: p.dateCreated,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Check if room is active
// @route   GET /api/video/room-status/:appointmentId
// @access  Private
const getRoomStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Check if user is part of this appointment
    const isClient = appointment.client.toString() === req.user._id.toString();
    const isTherapist =
      appointment.therapist.toString() === req.user._id.toString();

    if (!isClient && !isTherapist) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (!appointment.videoRoomSid) {
      return res.json({
        isActive: false,
        message: "Room not created yet",
      });
    }

    const room = await getRoom(`appointment-${appointmentId}`);

    res.json({
      isActive: room && room.status === "in-progress",
      roomStatus: room ? room.status : "not-created",
      participantCount: room ? room.participantCount : 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  generateToken,
  endVideoSession,
  getRoomParticipants,
  getRoomStatus,
};
