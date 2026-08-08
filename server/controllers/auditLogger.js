const AuditLog = require("../models/AuditLog");

const auditLogger = (action) => {
  return async (req, res, next) => {
    // Store original send function
    const originalSend = res.send;

    // Override send to capture response
    res.send = function (data) {
      // Don't audit non-PHI endpoints
      const nonAuditPaths = ["/api/auth/login", "/api/auth/register"];
      if (nonAuditPaths.includes(req.path)) {
        return originalSend.call(this, data);
      }

      // Skip if no user (shouldn't happen with auth middleware)
      if (!req.user) {
        return originalSend.call(this, data);
      }

      // Determine if request succeeded
      const isSuccess = res.statusCode >= 200 && res.statusCode < 300;

      // Get target ID from params or body
      const targetId =
        req.params.id ||
        req.body.id ||
        req.body.appointmentId ||
        req.body.clientId ||
        null;

      // Create audit log
      const auditEntry = new AuditLog({
        actor: req.user._id,
        actorRole: req.user.role,
        action: action,
        targetType: req.baseUrl.replace("/api/", "") || "Unknown",
        targetId: targetId,
        ipAddress: req.ip || req.connection.remoteAddress,
        userAgent: req.headers["user-agent"],
        details: {
          method: req.method,
          path: req.path,
          body: sanitizeBody(req.body),
          query: req.query,
          params: req.params,
        },
        status: isSuccess ? "success" : "failure",
      });

      // Save audit log (don't await to avoid blocking)
      auditEntry.save().catch((err) => {
        console.error("Failed to save audit log:", err);
      });

      return originalSend.call(this, data);
    };

    next();
  };
};

// Remove sensitive data from audit logs
const sanitizeBody = (body) => {
  if (!body) return body;

  const sanitized = { ...body };
  const sensitiveFields = [
    "password",
    "token",
    "refreshToken",
    "apiKey",
    "secret",
  ];

  sensitiveFields.forEach((field) => {
    if (sanitized[field]) {
      sanitized[field] = "[REDACTED]";
    }
  });

  return sanitized;
};

module.exports = auditLogger;
