const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");
const {
  getStats,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAuditLogs,
  getPendingTherapists,
  verifyTherapist,
} = require("../controllers/adminController");

// All routes require admin role
router.use(auth, roleCheck("admin"));

// Dashboard stats
router.get("/stats", getStats);

// User management
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

// Audit logs
router.get("/audit-logs", getAuditLogs);

// Therapist verification
router.get("/therapists/pending", getPendingTherapists);
router.patch("/therapists/:id/verify", verifyTherapist);

module.exports = router;
