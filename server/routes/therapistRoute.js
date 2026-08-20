const express = require("express");
const router = express.Router();
const {
  getTherapists,
  getTherapistAvailability,
  getTherapistById,
} = require("../controllers/therapistController");

// Remove 'auth' middleware - make public
router.get("/", getTherapists);
router.get("/:id", getTherapistById);

router.get("/:id/availability", getTherapistAvailability);

module.exports = router;
