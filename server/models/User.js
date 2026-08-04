const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["client", "therapist", "admin"],
      default: "client",
    },
    // Therapist-specific fields
    licenseNumber: {
      type: String,
      sparse: true, // Allows null/undefined for non-therapists
    },
    specialties: [
      {
        type: String,
      },
    ],
    availability: [
      {
        day: String,
        startTime: String,
        endTime: String,
      },
    ],
    // Client-specific fields
    assignedTherapist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    intakeCompleted: {
      type: Boolean,
      default: false,
    },
    mfaEnabled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
  },
);

module.exports = mongoose.model("User", userSchema);
