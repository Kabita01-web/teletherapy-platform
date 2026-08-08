const User = require("../models/User");
const AuditLog = require("../models/AuditLog");
const Appointment = require("../models/Appointment");
const Assessment = require("../models/Assessment");
const SessionNote = require("../models/SessionNote");

// @desc    Get system statistics
// @route   GET /api/admin/stats
// @access  Private (Admin only)
const getStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalTherapists,
      totalClients,
      totalAppointments,
      totalAssessments,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: "therapist" }),
      User.countDocuments({ role: "client" }),
      Appointment.countDocuments(),
      Assessment.countDocuments(),
    ]);

    res.json({
      users: {
        total: totalUsers,
        therapists: totalTherapists,
        clients: totalClients,
      },
      appointments: totalAppointments,
      assessments: totalAssessments,
      timestamp: new Date(),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all users (with filters)
// @route   GET /api/admin/users
// @access  Private (Admin only)
const getUsers = async (req, res) => {
  try {
    const { role, search, limit = 50, page = 1 } = req.query;

    const query = {};
    if (role) query.role = role;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;
    const users = await User.find(query)
      .select("-password")
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    res.json({
      users,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user by ID
// @route   GET /api/admin/users/:id
// @access  Private (Admin only)
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user (Admin)
// @route   PATCH /api/admin/users/:id
// @access  Private (Admin only)
const updateUser = async (req, res) => {
  try {
    const { name, email, role, licenseNumber, specialties, assignedTherapist } =
      req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    if (licenseNumber) user.licenseNumber = licenseNumber;
    if (specialties) user.specialties = specialties;
    if (assignedTherapist) user.assignedTherapist = assignedTherapist;

    await user.save();
    res.json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete user (Admin)
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin only)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get audit logs
// @route   GET /api/admin/audit-logs
// @access  Private (Admin only)
const getAuditLogs = async (req, res) => {
  try {
    const {
      userId,
      action,
      targetType,
      from,
      to,
      limit = 50,
      page = 1,
    } = req.query;

    const query = {};
    if (userId) query.actor = userId;
    if (action) query.action = action;
    if (targetType) query.targetType = targetType;
    if (from || to) {
      query.createdAt = {};
      if (from) query.createdAt.$gte = new Date(from);
      if (to) query.createdAt.$lte = new Date(to);
    }

    const skip = (page - 1) * limit;
    const logs = await AuditLog.find(query)
      .populate("actor", "name email role")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await AuditLog.countDocuments(query);

    res.json({
      logs,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get pending therapist verifications
// @route   GET /api/admin/therapists/pending
// @access  Private (Admin only)
const getPendingTherapists = async (req, res) => {
  try {
    const therapists = await User.find({
      role: "therapist",
      isVerified: { $ne: true },
    }).select("-password");

    res.json(therapists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify therapist
// @route   PATCH /api/admin/therapists/:id/verify
// @access  Private (Admin only)
const verifyTherapist = async (req, res) => {
  try {
    const therapist = await User.findById(req.params.id);

    if (!therapist) {
      return res.status(404).json({ message: "Therapist not found" });
    }

    if (therapist.role !== "therapist") {
      return res.status(400).json({ message: "User is not a therapist" });
    }

    therapist.isVerified = true;
    await therapist.save();

    res.json({ message: "Therapist verified successfully", therapist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStats,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAuditLogs,
  getPendingTherapists,
  verifyTherapist,
};
