const Resume = require("../models/resume.model");
const imagekit = require("../utils/imagekit");

// Upload Resume
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // ImageKit me upload karna
    const uploadResponse = await imagekit.upload({
      file: req.file.buffer, // multer memoryStorage se buffer milega
      fileName: `${Date.now()}_${req.file.originalname}`,
    });

    // Database me save karna
    const resume = new Resume({
      user: req.user.id, // ✅ JWT payload me "id" hai
      fileUrl: uploadResponse.url,
      fileId: uploadResponse.fileId,
      originalName: req.file.originalname,
    });

    await resume.save();

    res.status(201).json({
      message: "Resume uploaded successfully",
      resume,
    });
  } catch (error) {
    console.error("Error uploading resume:", error.response?.body || error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get User Resumes
const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(resumes);
  } catch (error) {
    console.error("Error fetching resumes:", error.response?.body || error.message);
    res.status(500).json({ message: "Server error" });
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

    // ImageKit se delete karna
    await imagekit.deleteFile(resume.fileId);

    await Resume.deleteOne({ _id: resume._id });

    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error("Error deleting resume:", error.response?.body || error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { uploadResume, getUserResumes, deleteResume };
