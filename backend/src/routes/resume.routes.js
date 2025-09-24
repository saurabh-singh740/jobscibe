const express = require("express");
const router = express.Router();
const { uploadResume, getUserResumes, deleteResume } = require("../controllers/resume.controller");
const authMiddleware = require("../middleware/authMiddleware");

const multer = require("multer");
const storage = multer.memoryStorage(); // buffer ke liye
const upload = multer({ storage });

// Upload Resume
router.post("/upload", authMiddleware, upload.single("resume"), uploadResume);

// Get User Resumes
router.get("/", authMiddleware, getUserResumes);

// Delete Resume
router.delete("/:id", authMiddleware, deleteResume);

module.exports = router;
