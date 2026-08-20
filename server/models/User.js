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
    // Public-facing profile fields, shown on the therapist directory
    // (Therapists.jsx) and profile page. Added to support a real
    // therapist directory instead of falling back to placeholder text
    // for every therapist.
    bio: {
      type: String,
      trim: true,
    },
    photo: {
      type: String, // URL
      trim: true,
    },
    credentials: {
      type: String, // e.g. "Ph.D., LCP"
      trim: true,
    },
    languages: [
      {
        type: String,
      },
    ],
    modality: [
      {
        type: String,
        enum: ["video", "chat"], // matches Appointment.modality per README
      },
    ],
    experience: {
      type: Number, // years
      min: 0,
    },
    // NOTE: rating/reviews are plain stored numbers for now, not computed
    // from an actual review system (none exists yet). Treat these as
    // placeholder/manually-set values until a real reviews feature is
    // built — at that point these should probably become aggregates
    // computed from review documents, not fields a therapist sets directly.
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
      min: 0,
    },
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
