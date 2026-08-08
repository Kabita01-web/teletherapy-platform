const sessionTimeout = (timeoutMinutes = 15) => {
  return (req, res, next) => {
    if (!req.user) {
      return next();
    }

    const lastActivity = req.session?.lastActivity || Date.now();
    const now = Date.now();
    const timeoutMs = timeoutMinutes * 60 * 1000;

    if (now - lastActivity > timeoutMs) {
      return res.status(401).json({
        message: "Session expired. Please log in again.",
      });
    }

    // Update last activity
    if (req.session) {
      req.session.lastActivity = now;
    }

    next();
  };
};

module.exports = sessionTimeout;
