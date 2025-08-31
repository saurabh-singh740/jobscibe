const express = require("express");
const router = express.Router();
const {
  uploadResume,
  getUserResumes,
  deleteResume,
} = require("../controllers/resume.controller");
const authMiddleware = require("../middleware/authMiddleware");

// file upload middleware (multer or multer-s3)
const multer = require("multer");
const upload = multer({ dest: "uploads/resumes/" });

// @route   POST /api/resumes/upload
// @desc    Upload Resume
router.post("/upload", authMiddleware, upload.single("resume"), uploadResume);

// @route   GET /api/resumes
// @desc    Get all resumes of logged-in user
router.get("/", authMiddleware, getUserResumes);

// @route   DELETE /api/resumes/:id
// @desc    Delete a resume
router.delete("/:id", authMiddleware, deleteResume);

module.exports = router;
