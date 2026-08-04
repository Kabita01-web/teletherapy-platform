const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");
const {
  getAppointments,
  getAppointmentById,
  bookAppointment,
  updateAppointmentStatus,
  cancelAppointment,
  getAppointmentsByDateRange,
} = require("../controllers/appointmentController.js");

router.get("/", auth, getAppointments);

router.get(
  "/calendar",
  auth,
  roleCheck("therapist"),
  getAppointmentsByDateRange,
);

router.get("/:id", auth, getAppointmentById);
router.post("/", auth, roleCheck("client"), bookAppointment);
router.patch("/:id", auth, updateAppointmentStatus);
router.delete("/:id", auth, roleCheck("client"), cancelAppointment);

module.exports = router;
