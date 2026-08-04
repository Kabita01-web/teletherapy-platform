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
      enum: ["PHQ-9", "GAD-7"],
      required: true,
    },
    responses: {
      type: Map,
      of: Number,
      required: true,
    },
    totalScore: {
      type: Number,
    },
    severity: {
      type: String,
      enum: ["Minimal", "Mild", "Moderate", "Moderately Severe", "Severe"],
    },
    therapistNotes: {
      type: String,
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

// Pre-save hook to calculate totalScore and severity
assessmentSchema.pre("save", async function () {
  // Calculate total score
  let total = 0;
  if (this.responses) {
    for (let value of this.responses.values()) {
      total += value;
    }
  }
  this.totalScore = total;

  // Determine severity based on template
  if (this.template === "PHQ-9") {
    if (total >= 0 && total <= 4) this.severity = "Minimal";
    else if (total >= 5 && total <= 9) this.severity = "Mild";
    else if (total >= 10 && total <= 14) this.severity = "Moderate";
    else if (total >= 15 && total <= 19) this.severity = "Moderately Severe";
    else if (total >= 20 && total <= 27) this.severity = "Severe";
  } else if (this.template === "GAD-7") {
    if (total >= 0 && total <= 4) this.severity = "Minimal";
    else if (total >= 5 && total <= 9) this.severity = "Mild";
    else if (total >= 10 && total <= 14) this.severity = "Moderate";
    else if (total >= 15 && total <= 21) this.severity = "Severe";
  }
  // no next() call needed — Mongoose resolves when the promise resolves
});

module.exports = mongoose.model("Assessment", assessmentSchema);
