const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resume.routes");
const jobRoutes = require("./routes/job.routes");
const aiRoutes = require("./routes/ai.routes");
const app = express();

// Middlewares
app.use(express.json()); // JSON parse ke liye
app.use(express.urlencoded({ extended: true })); // form data ke liye
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/ai", aiRoutes);

module.exports = app;
