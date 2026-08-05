const Resource = require("../models/Resource");
const User = require("../models/User");

// @desc    Create a new resource
// @route   POST /api/resources
// @access  Private (Therapist/Admin only)
const createResource = async (req, res) => {
  try {
    const {
      title,
      description,
      content,
      category,
      type,
      tags,
      assignedTo,
      isPublished,
    } = req.body;

    // Validate required fields
    if (!title || !description || !content || !category) {
      return res.status(400).json({
        message: "Please provide title, description, content, and category",
      });
    }

    const resource = new Resource({
      title,
      description,
      content,
      category,
      type: type || "Article",
      tags: tags || [],
      author: req.user._id,
      assignedTo: assignedTo || [],
      isPublished: isPublished || false,
    });

    await resource.save();

    await resource.populate("author", "name email");
    await resource.populate("assignedTo", "name email");

    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all resources (with filters)
// @route   GET /api/resources
// @access  Private
const getResources = async (req, res) => {
  try {
    const { category, type, search, assignedTo } = req.query;

    let query = { isPublished: true };

    // Add filters
    if (category) {
      query.category = category;
    }
    if (type) {
      query.type = type;
    }
    if (assignedTo === "me" && req.user.role === "client") {
      query.assignedTo = req.user._id;
    }

    // Search
    if (search) {
      query.$text = { $search: search };
    }

    // If therapist, show all published resources
    const resources = await Resource.find(query)
      .populate("author", "name email")
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single resource
// @route   GET /api/resources/:id
// @access  Private
const getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id)
      .populate("author", "name email")
      .populate("assignedTo", "name email");

    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    // Check if resource is assigned to this client
    const isAssigned = resource.assignedTo.some(
      (client) => client._id.toString() === req.user._id.toString(),
    );

    // If client, only show if assigned to them
    if (req.user.role === "client" && !isAssigned) {
      return res.status(403).json({
        message: "You are not authorized to view this resource",
      });
    }

    // Mark as read (if client)
    if (req.user.role === "client") {
      const alreadyRead = resource.readBy.some(
        (r) => r.client.toString() === req.user._id.toString(),
      );

      if (!alreadyRead) {
        resource.readBy.push({
          client: req.user._id,
          readAt: new Date(),
        });
        await resource.save();
      }
    }

    // Increment downloads count
    resource.downloads += 1;
    await resource.save();

    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update resource
// @route   PATCH /api/resources/:id
// @access  Private (Therapist/Admin only)
const updateResource = async (req, res) => {
  try {
    const {
      title,
      description,
      content,
      category,
      type,
      tags,
      assignedTo,
      isPublished,
    } = req.body;

    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    // Check authorization
    if (
      resource.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "You are not authorized to update this resource",
      });
    }

    // Update fields
    if (title) resource.title = title;
    if (description) resource.description = description;
    if (content) resource.content = content;
    if (category) resource.category = category;
    if (type) resource.type = type;
    if (tags) resource.tags = tags;
    if (assignedTo) resource.assignedTo = assignedTo;
    if (isPublished !== undefined) resource.isPublished = isPublished;

    await resource.save();

    await resource.populate("author", "name email");
    await resource.populate("assignedTo", "name email");

    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete resource
// @route   DELETE /api/resources/:id
// @access  Private (Therapist/Admin only)
const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    // Check authorization
    if (
      resource.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "You are not authorized to delete this resource",
      });
    }

    await resource.deleteOne();
    res.json({ message: "Resource deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Assign resource to clients
// @route   POST /api/resources/:id/assign
// @access  Private (Therapist/Admin only)
const assignResource = async (req, res) => {
  try {
    const { clientIds } = req.body;

    if (!clientIds || !Array.isArray(clientIds) || clientIds.length === 0) {
      return res.status(400).json({
        message: "Please provide an array of client IDs",
      });
    }

    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    // Check authorization
    if (
      resource.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "You are not authorized to assign this resource",
      });
    }

    // Verify all clients exist
    const clients = await User.find({
      _id: { $in: clientIds },
      role: "client",
    });

    if (clients.length !== clientIds.length) {
      return res.status(400).json({
        message: "One or more client IDs are invalid",
      });
    }

    // Add unique client IDs
    const uniqueClientIds = [
      ...new Set([
        ...resource.assignedTo.map((id) => id.toString()),
        ...clientIds,
      ]),
    ];
    resource.assignedTo = uniqueClientIds;

    await resource.save();

    await resource.populate("assignedTo", "name email");

    res.json({
      message: "Resource assigned successfully",
      resource,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get resource categories
// @route   GET /api/resources/categories
// @access  Private
const getCategories = async (req, res) => {
  const categories = [
    "Anxiety",
    "Depression",
    "Stress",
    "Sleep",
    "Relationships",
    "Mindfulness",
    "Self-Care",
    "PTSD",
    "General",
  ];
  res.json(categories);
};

// @desc    Get resources assigned to current client
// @route   GET /api/resources/my-resources
// @access  Private (Client only)
const getMyResources = async (req, res) => {
  try {
    const resources = await Resource.find({
      assignedTo: req.user._id,
      isPublished: true,
    })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createResource,
  getResources,
  getResourceById,
  updateResource,
  deleteResource,
  assignResource,
  getCategories,
  getMyResources,
};
