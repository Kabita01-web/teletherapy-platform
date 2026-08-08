const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    actorRole: {
      type: String,
      enum: ["client", "therapist", "admin"],
      required: true,
    },
    action: {
      type: String,
      required: true,
      enum: [
        "VIEW_USER",
        "CREATE_USER",
        "UPDATE_USER",
        "DELETE_USER",
        "VIEW_APPOINTMENT",
        "CREATE_APPOINTMENT",
        "UPDATE_APPOINTMENT",
        "DELETE_APPOINTMENT",
        "VIEW_NOTE",
        "CREATE_NOTE",
        "UPDATE_NOTE",
        "DELETE_NOTE",
        "VIEW_ASSESSMENT",
        "CREATE_ASSESSMENT",
        "UPDATE_ASSESSMENT",
        "DELETE_ASSESSMENT",
        "VIEW_RESOURCE",
        "CREATE_RESOURCE",
        "UPDATE_RESOURCE",
        "DELETE_RESOURCE",
        "VIEW_CHAT",
        "SEND_MESSAGE",
        "VIEW_AUDIT_LOG",
        "LOGIN",
        "LOGOUT",
      ],
    },
    targetType: {
      type: String,
      required: true,
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    targetName: {
      type: String,
    },
    ipAddress: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
    },
    status: {
      type: String,
      enum: ["success", "failure"],
      default: "success",
    },
    errorMessage: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes for efficient queries
auditLogSchema.index({ actor: 1, createdAt: -1 });
auditLogSchema.index({ targetType: 1, targetId: 1 });
auditLogSchema.index({ action: 1 });
auditLogSchema.index({ createdAt: -1 });

module.exports = mongoose.model("AuditLog", auditLogSchema);
