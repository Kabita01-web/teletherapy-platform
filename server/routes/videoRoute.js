const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");
const {
  generateToken,
  endVideoSession,
  getRoomParticipants,
  getRoomStatus,
} = require("../controllers/videoController");

// @route   POST /api/video/token
// @desc    Generate video token
// @access  Private
router.post("/token", auth, generateToken);

// @route   POST /api/video/end
// @desc    End video session (Therapist only)
// @access  Private (Therapist)
router.post("/end", auth, roleCheck("therapist"), endVideoSession);

// @route   GET /api/video/participants/:appointmentId
// @desc    Get room participants
// @access  Private
router.get("/participants/:appointmentId", auth, getRoomParticipants);

// @route   GET /api/video/room-status/:appointmentId
// @desc    Check room status
// @access  Private
router.get("/room-status/:appointmentId", auth, getRoomStatus);

module.exports = router;
