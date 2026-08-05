const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");
const {
  createNote,
  getNotes,
  getClientNotes,
  getNoteById,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

// @route   GET /api/notes
// @desc    Get all notes for therapist
// @access  Private (Therapist only)
router.get("/", auth, roleCheck("therapist"), getNotes);

// @route   GET /api/notes/client/:clientId
// @desc    Get notes for a specific client
// @access  Private (Therapist only)
router.get("/client/:clientId", auth, roleCheck("therapist"), getClientNotes);

// @route   POST /api/notes
// @desc    Create a session note
// @access  Private (Therapist only)
router.post("/", auth, roleCheck("therapist"), createNote);

// @route   GET /api/notes/:id
// @desc    Get single note
// @access  Private (Therapist only)
router.get("/:id", auth, roleCheck("therapist"), getNoteById);

// @route   PATCH /api/notes/:id
// @desc    Update a session note
// @access  Private (Therapist only)
router.patch("/:id", auth, roleCheck("therapist"), updateNote);

// @route   DELETE /api/notes/:id
// @desc    Delete a session note
// @access  Private (Therapist only)
router.delete("/:id", auth, roleCheck("therapist"), deleteNote);

module.exports = router;
