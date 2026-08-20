const User = require("../models/User");

exports.getTherapists = async (req, res) => {
  try {
    const { specialty, language, modality } = req.query;

    const query = { role: "therapist" };
    if (specialty) query.specialties = specialty;
    if (language) query.languages = language;
    if (modality) query.modality = modality;

    const therapists = await User.find(query)
      .select(
        "name specialties languages modality bio photo credentials experience rating reviews availability",
      )
      .lean();

    res.json(therapists);
  } catch (err) {
    console.error("getTherapists error:", err);
    res.status(500).json({ message: "Failed to load therapists" });
  }
};

// ✅ ADD THIS FUNCTION - GET /api/therapists/:id
exports.getTherapistById = async (req, res) => {
  try {
    const therapist = await User.findOne({
      _id: req.params.id,
      role: "therapist",
    }).select(
      "name specialties languages modality bio photo credentials experience rating reviews availability",
    );

    if (!therapist) {
      return res.status(404).json({ message: "Therapist not found" });
    }

    res.json(therapist);
  } catch (err) {
    console.error("getTherapistById error:", err);
    res.status(500).json({ message: "Failed to load therapist" });
  }
};

// GET /api/therapists/:id/availability
exports.getTherapistAvailability = async (req, res) => {
  try {
    const therapist = await User.findOne({
      _id: req.params.id,
      role: "therapist",
    }).select("availability name");
    if (!therapist) {
      return res.status(404).json({ message: "Therapist not found" });
    }
    res.json({
      name: therapist.name,
      availability: therapist.availability ?? [],
    });
  } catch (err) {
    console.error("getTherapistAvailability error:", err);
    res.status(500).json({ message: "Failed to load availability" });
  }
};
