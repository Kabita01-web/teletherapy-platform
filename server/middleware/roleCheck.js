const roleCheck = (...allowedRoles) => {
  return (req, res, next) => {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized. Please log in.",
      });
    }

    // Check if user role is allowed
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. ${req.user.role}s cannot access this resource.`,
      });
    }

    next();
  };
};

module.exports = roleCheck;
