const SessionNote = require("../models/SessionNote");
const Appointment = require("../models/Appointment");

// @desc    Create a session note
// @route   POST /api/notes
// @access  Private (Therapist only)
const createNote = async (req, res) => {
  try {
    const {
      appointmentId,
      content,
      mood,
      sleepQuality,
      appetite,
      interventions,
      homework,
      nextSessionFocus,
      isDraft,
    } = req.body;

    // Validate required fields
    if (!appointmentId || !content) {
      return res.status(400).json({
        message: "Please provide appointmentId and content",
      });
    }

    // Verify appointment exists and belongs to therapist
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.therapist.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to create notes for this appointment",
      });
    }

    // Check if note already exists
    const existingNote = await SessionNote.findOne({
      appointment: appointmentId,
    });
    if (existingNote) {
      return res.status(400).json({
        message:
          "A note already exists for this appointment. Use PATCH to update.",
      });
    }

    // Create note
    const note = new SessionNote({
      appointment: appointmentId,
      therapist: req.user._id,
      client: appointment.client,
      content,
      mood,
      sleepQuality,
      appetite,
      interventions,
      homework,
      nextSessionFocus,
      isDraft: isDraft || false,
    });

    await note.save();

    await note.populate("therapist", "name email");
    await note.populate("client", "name email");
    await note.populate("appointment", "scheduledAt status");

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all notes for therapist
// @route   GET /api/notes
// @access  Private (Therapist only)
const getNotes = async (req, res) => {
  try {
    const query = { therapist: req.user._id };

    // If therapist wants notes for a specific client
    if (req.query.clientId) {
      query.client = req.query.clientId;
    }

    const notes = await SessionNote.find(query)
      .populate("client", "name email")
      .populate("appointment", "scheduledAt status")
      .sort({ createdAt: -1 });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get notes for a specific client
// @route   GET /api/notes/client/:clientId
// @access  Private (Therapist only)
const getClientNotes = async (req, res) => {
  try {
    const { clientId } = req.params;

    // Verify therapist has this client
    const appointment = await Appointment.findOne({
      client: clientId,
      therapist: req.user._id,
    });

    if (!appointment && req.user.role !== "admin") {
      return res.status(403).json({
        message: "You are not authorized to view this client's notes",
      });
    }

    const notes = await SessionNote.find({
      client: clientId,
      therapist: req.user._id,
    })
      .populate("appointment", "scheduledAt status")
      .sort({ createdAt: -1 });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single note
// @route   GET /api/notes/:id
// @access  Private (Therapist only)
const getNoteById = async (req, res) => {
  try {
    const note = await SessionNote.findById(req.params.id)
      .populate("therapist", "name email")
      .populate("client", "name email")
      .populate("appointment", "scheduledAt status");

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Check authorization
    if (
      note.therapist._id.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "You are not authorized to view this note",
      });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a session note
// @route   PATCH /api/notes/:id
// @access  Private (Therapist only)
const updateNote = async (req, res) => {
  try {
    const {
      content,
      mood,
      sleepQuality,
      appetite,
      interventions,
      homework,
      nextSessionFocus,
      isDraft,
    } = req.body;

    const note = await SessionNote.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Check authorization
    if (note.therapist.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to update this note",
      });
    }

    // Update fields
    if (content) note.content = content;
    if (mood) note.mood = mood;
    if (sleepQuality) note.sleepQuality = sleepQuality;
    if (appetite) note.appetite = appetite;
    if (interventions) note.interventions = interventions;
    if (homework) note.homework = homework;
    if (nextSessionFocus) note.nextSessionFocus = nextSessionFocus;
    if (isDraft !== undefined) note.isDraft = isDraft;

    await note.save();

    await note.populate("therapist", "name email");
    await note.populate("client", "name email");
    await note.populate("appointment", "scheduledAt status");

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a session note
// @route   DELETE /api/notes/:id
// @access  Private (Therapist only)
const deleteNote = async (req, res) => {
  try {
    const note = await SessionNote.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Check authorization
    if (note.therapist.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to delete this note",
      });
    }

    await note.deleteOne();
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNote,
  getNotes,
  getClientNotes,
  getNoteById,
  updateNote,
  deleteNote,
};
