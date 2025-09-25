const express = require("express");
const router = express.Router();
const { uploadResume, getUserResumes, deleteResume } = require("../controllers/resume.controller");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");

// Multer setup
const storage = multer.memoryStorage(); // buffer me store
const fileFilter = (req, file, cb) => {
  // PDF + DOC + DOCX
  const allowedTypes = [
    "application/pdf",
    "application/msword", // .doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF or Word documents are allowed"), false);
  }
};

// Max file size 5MB
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter,
});

// Routes
router.post("/upload", authMiddleware, upload.single("resume"), uploadResume);
router.get("/", authMiddleware, getUserResumes);
router.delete("/:id", authMiddleware, deleteResume);

module.exports = router;
