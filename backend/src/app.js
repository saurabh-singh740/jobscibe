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
  origin: "http://localhost:5173",
  credentials: true,
}));


// Middlewares
app.use(express.json()); // JSON parse ke liye
app.use(express.urlencoded({ extended: true })); // form data ke liye
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'../public')))


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/ai", aiRoutes);

app.get("*name",(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/index.html'))
})

module.exports = app;
