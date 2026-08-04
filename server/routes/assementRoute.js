const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");
const {
  createAssessment,
  getAssessments,
  getAssessmentById,
  getClientAssessments,
  addTherapistNotes,
  getPHQ9Template,
  getGAD7Template,
} = require("../controllers/assementController");

router.get("/templates/phq9", auth, getPHQ9Template);

router.get("/templates/gad7", auth, getGAD7Template);

router.get("/", auth, getAssessments);

router.post("/", auth, roleCheck("client"), createAssessment);

router.get("/:id", auth, getAssessmentById);

router.get(
  "/client/:clientId",
  auth,
  roleCheck("therapist"),
  getClientAssessments,
);

router.patch("/:id/notes", auth, roleCheck("therapist"), addTherapistNotes);

module.exports = router;
