const Resume = require("../models/resume.model");

// Upload Resume
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const resume = new Resume({
      user: req.user.id,
      fileUrl: req.file.location || req.file.path, // from multer-s3 or local storage
      originalName: req.file.originalname,
    });

    await resume.save();

    res.status(201).json({
      message: "Resume uploaded successfully",
      resume,
    });
  } catch (error) {
    console.error("Upload Resume Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get User Resumes
const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json(resumes);
  } catch (error) {
    console.error("Get Resumes Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Resume
const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    if (resume.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await resume.deleteOne();

    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error("Delete Resume Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  uploadResume,
  getUserResumes,
  deleteResume,
};
