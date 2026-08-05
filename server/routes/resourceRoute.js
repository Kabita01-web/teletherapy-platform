const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");
const {
  createResource,
  getResources,
  getResourceById,
  updateResource,
  deleteResource,
  assignResource,
  getCategories,
  getMyResources,
} = require("../controllers/resourceController");

// @route   GET /api/resources/categories
// @desc    Get resource categories
// @access  Private
router.get("/categories", auth, getCategories);

// @route   GET /api/resources/my-resources
// @desc    Get resources assigned to current client
// @access  Private (Client only)
router.get("/my-resources", auth, roleCheck("client"), getMyResources);

// @route   GET /api/resources
// @desc    Get all resources
// @access  Private
router.get("/", auth, getResources);

// @route   POST /api/resources
// @desc    Create a resource
// @access  Private (Therapist/Admin)
router.post("/", auth, roleCheck("therapist", "admin"), createResource);

// @route   GET /api/resources/:id
// @desc    Get single resource
// @access  Private
router.get("/:id", auth, getResourceById);

// @route   PATCH /api/resources/:id
// @desc    Update resource
// @access  Private (Therapist/Admin)
router.patch("/:id", auth, roleCheck("therapist", "admin"), updateResource);

// @route   DELETE /api/resources/:id
// @desc    Delete resource
// @access  Private (Therapist/Admin)
router.delete("/:id", auth, roleCheck("therapist", "admin"), deleteResource);

// @route   POST /api/resources/:id/assign
// @desc    Assign resource to clients
// @access  Private (Therapist/Admin)
router.post(
  "/:id/assign",
  auth,
  roleCheck("therapist", "admin"),
  assignResource,
);

module.exports = router;
