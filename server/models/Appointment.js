const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    therapist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    scheduledAt: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      default: 60,
    },
    modality: {
      type: String,
      enum: ["video", "chat"],
      required: true,
    },
    status: {
      type: String,
      enum: ["booked", "confirmed", "completed", "cancelled", "no_show"],
      default: "booked",
    },
    videoRoomSid: String,
    reminderSentAt: Date,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Appointment", appointmentSchema);
