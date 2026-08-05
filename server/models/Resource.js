const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Anxiety",
        "Depression",
        "Stress",
        "Sleep",
        "Relationships",
        "Mindfulness",
        "Self-Care",
        "PTSD",
        "General",
      ],
      required: true,
    },
    type: {
      type: String,
      enum: ["Article", "Video", "Exercise", "Worksheet", "Audio"],
      default: "Article",
    },
    tags: [
      {
        type: String,
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isPublished: {
      type: Boolean,
      default: false,
    },
    readBy: [
      {
        client: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        readAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    downloads: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

// Index for efficient searching
resourceSchema.index({
  title: "text",
  description: "text",
  content: "text",
  tags: "text",
});

module.exports = mongoose.model("Resource", resourceSchema);
