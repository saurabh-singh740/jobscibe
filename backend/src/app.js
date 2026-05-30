const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resume.routes");
const jobRoutes = require("./routes/job.routes");
const aiRoutes = require("./routes/ai.routes");
const cors = require("cors");
const path=require('path')
const app = express();


app.use(cors({
  origin: [
  "http://localhost:5173",
  "https://jobscibe-fui.vercel.app"
  ],

  credentials: true,
}));


// Middlewares

app.use(express.json({ limit: "10mb" }));  // REQUIRED
app.use(express.urlencoded({ extended: true })); // form data ke liye
app.use(cookieParser());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/ai", aiRoutes);


module.exports = app;
