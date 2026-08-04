const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
    template: {
      type: String,
      enum: ["PHQ-9", "GAD-7", "CUSTOM"],
      required: true,
    },
    responses: {
      type: Object,
      required: true,
    },
    score: {
      type: Number,
    },
    severity: {
      type: String,
      enum: ["Minimal", "Mild", "Moderate", "Severe"],
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },
    therapistNotes: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// Pre-save middleware to calculate score
assessmentSchema.pre("save", function (next) {
  if (this.template === "PHQ-9" || this.template === "GAD-7") {
    // Calculate total score from responses
    const responses = Object.values(this.responses);
    this.score = responses.reduce((sum, val) => sum + (parseInt(val) || 0), 0);

    // Determine severity
    if (this.template === "PHQ-9") {
      if (this.score <= 4) this.severity = "Minimal";
      else if (this.score <= 9) this.severity = "Mild";
      else if (this.score <= 14) this.severity = "Moderate";
      else if (this.score <= 19) this.severity = "Moderately Severe";
      else this.severity = "Severe";
    } else if (this.template === "GAD-7") {
      if (this.score <= 4) this.severity = "Minimal";
      else if (this.score <= 9) this.severity = "Mild";
      else if (this.score <= 14) this.severity = "Moderate";
      else this.severity = "Severe";
    }
  }
  next();
});

module.exports = mongoose.model("Assessment", assessmentSchema);
