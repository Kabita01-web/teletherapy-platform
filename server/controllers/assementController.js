const Assessment = require("../models/Assessment");
const Appointment = require("../models/Appointment");

// @desc    Create a new assessment
// @route   POST /api/assessments
// @access  Private (Client only)
const createAssessment = async (req, res) => {
  try {
    const { template, responses } = req.body;

    // Validate required fields
    if (!template || !responses) {
      return res.status(400).json({
        message: "Please provide template and responses",
      });
    }

    // Skip the appointment lookup entirely! Just create the assessment.
    const assessment = new Assessment({
      client: req.user._id,
      template,
      responses,
      // We are NOT linking an appointment here temporarily
    });

    await assessment.save();

    await assessment.populate("client", "name email");

    res.status(201).json(assessment);
  } catch (error) {
    console.error("Error creating assessment:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all assessments for current user
// @route   GET /api/assessments
// @access  Private
const getAssessments = async (req, res) => {
  try {
    let query = {};

    if (req.user.role === "client") {
      query.client = req.user._id;
    } else if (req.user.role === "therapist") {
      // Therapists see assessments of their clients
      const Appointment = require("../models/Appointment");
      const appointments = await Appointment.find({
        therapist: req.user._id,
      }).select("client");
      const clientIds = appointments.map((apt) => apt.client);
      query.client = { $in: clientIds };
    }

    const assessments = await Assessment.find(query)
      .populate("client", "name email")
      .populate("appointment", "scheduledAt status")
      .sort({ completedAt: -1 });

    res.json(assessments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single assessment
// @route   GET /api/assessments/:id
// @access  Private
const getAssessmentById = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id)
      .populate("client", "name email")
      .populate("appointment", "scheduledAt status therapist");

    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }

    // Check authorization
    const isClient =
      assessment.client._id.toString() === req.user._id.toString();
    const isTherapist = req.user.role === "therapist";
    const isAdmin = req.user.role === "admin";

    if (!isClient && !isTherapist && !isAdmin) {
      return res.status(403).json({
        message: "You are not authorized to view this assessment",
      });
    }

    // If therapist, check if they are the client's therapist
    if (isTherapist) {
      const appointment = await Appointment.findById(assessment.appointment);
      if (
        appointment &&
        appointment.therapist.toString() !== req.user._id.toString()
      ) {
        return res.status(403).json({
          message: "You are not authorized to view this assessment",
        });
      }
    }

    res.json(assessment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get assessments for a specific client (Therapist only)
// @route   GET /api/assessments/client/:clientId
// @access  Private (Therapist only)
const getClientAssessments = async (req, res) => {
  try {
    const { clientId } = req.params;

    // Check if therapist has this client
    const Appointment = require("../models/Appointment");
    const appointment = await Appointment.findOne({
      client: clientId,
      therapist: req.user._id,
    });

    if (!appointment && req.user.role !== "admin") {
      return res.status(403).json({
        message: "You are not authorized to view this client's assessments",
      });
    }

    const assessments = await Assessment.find({ client: clientId })
      .populate("appointment", "scheduledAt status")
      .sort({ completedAt: -1 });

    res.json(assessments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add therapist notes to assessment
// @route   PATCH /api/assessments/:id/notes
// @access  Private (Therapist only)
const addTherapistNotes = async (req, res) => {
  try {
    const { notes } = req.body;

    if (!notes) {
      return res.status(400).json({ message: "Please provide notes" });
    }

    const assessment = await Assessment.findById(req.params.id);

    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }

    // Check if therapist is authorized
    const appointment = await Appointment.findById(assessment.appointment);
    if (
      appointment &&
      appointment.therapist.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "You are not authorized to add notes to this assessment",
      });
    }

    assessment.therapistNotes = notes;
    await assessment.save();

    await assessment.populate("client", "name email");
    await assessment.populate("appointment", "scheduledAt status");

    res.json(assessment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get PHQ-9 template questions
// @route   GET /api/assessments/templates/phq9
// @access  Private
const getPHQ9Template = async (req, res) => {
  const questions = [
    { id: 1, question: "Little interest or pleasure in doing things?" },
    { id: 2, question: "Feeling down, depressed, or hopeless?" },
    {
      id: 3,
      question: "Trouble falling or staying asleep, or sleeping too much?",
    },
    { id: 4, question: "Feeling tired or having little energy?" },
    { id: 5, question: "Poor appetite or overeating?" },
    {
      id: 6,
      question:
        "Feeling bad about yourself - or that you are a failure or have let yourself or your family down?",
    },
    {
      id: 7,
      question:
        "Trouble concentrating on things, such as reading the newspaper or watching television?",
    },
    {
      id: 8,
      question:
        "Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual?",
    },
    {
      id: 9,
      question:
        "Thoughts that you would be better off dead, or of hurting yourself?",
    },
  ];

  const options = [
    { value: 0, label: "Not at all" },
    { value: 1, label: "Several days" },
    { value: 2, label: "More than half the days" },
    { value: 3, label: "Nearly every day" },
  ];

  res.json({ template: "PHQ-9", questions, options });
};

// @desc    Get GAD-7 template questions
// @route   GET /api/assessments/templates/gad7
// @access  Private
const getGAD7Template = async (req, res) => {
  const questions = [
    { id: 1, question: "Feeling nervous, anxious, or on edge?" },
    { id: 2, question: "Not being able to stop or control worrying?" },
    { id: 3, question: "Worrying too much about different things?" },
    { id: 4, question: "Trouble relaxing?" },
    { id: 5, question: "Being so restless that it is hard to sit still?" },
    { id: 6, question: "Becoming easily annoyed or irritable?" },
    { id: 7, question: "Feeling afraid, as if something awful might happen?" },
  ];

  const options = [
    { value: 0, label: "Not at all" },
    { value: 1, label: "Several days" },
    { value: 2, label: "More than half the days" },
    { value: 3, label: "Nearly every day" },
  ];

  res.json({ template: "GAD-7", questions, options });
};

module.exports = {
  createAssessment,
  getAssessments,
  getAssessmentById,
  getClientAssessments,
  addTherapistNotes,
  getPHQ9Template,
  getGAD7Template,
};
