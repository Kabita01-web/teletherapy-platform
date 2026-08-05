const mongoose = require("mongoose");

const sessionNoteSchema = new mongoose.Schema(
  {
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
    therapist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    // Clinical fields
    mood: {
      type: String,
      enum: [
        "Anxious",
        "Depressed",
        "Irritable",
        "Calm",
        "Hopeful",
        "Mixed",
        "Other",
      ],
    },
    sleepQuality: {
      type: String,
      enum: ["Poor", "Fair", "Good", "Excellent"],
    },
    appetite: {
      type: String,
      enum: ["Poor", "Fair", "Good", "Excellent"],
    },
    interventions: [
      {
        type: String,
        enum: ["CBT", "DBT", "Mindfulness", "Talk Therapy", "EMDR", "Other"],
      },
    ],
    homework: {
      type: String,
    },
    nextSessionFocus: {
      type: String,
    },
    isDraft: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Index for efficient queries
sessionNoteSchema.index({ appointment: 1, therapist: 1 });

module.exports = mongoose.model("SessionNote", sessionNoteSchema);
