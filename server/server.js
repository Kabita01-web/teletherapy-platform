const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoute");
const appointmentRoutes = require("./routes/appointmentRoute");
const assessmentRoute = require("./routes/assementRoute");
const noteRoutes = require("./routes/noteRoutes");
const resourceRoutes = require("./routes/resourceRoute");
const chatRoutes = require("./routes/chatRoute");
const videoRoutes = require("./routes/videoRoute");
const adminRoutes = require("./routes/adminRoute");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/assessments", assessmentRoute);
app.use("/api/notes", noteRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Teletherapy API is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
