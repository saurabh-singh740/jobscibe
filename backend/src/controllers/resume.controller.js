const Resume = require("../models/resume.model");
const imagekit = require("../utils/imagekit");
const { parseResume } = require("../services/resumeParser");

// ---------------- Upload Resume ---------------- //
const uploadResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });

    

    // Detect file type
    let fileType = "";
    if (req.file.mimetype === "application/pdf") fileType = "pdf";
    else if (
      req.file.mimetype === "application/msword" ||
      req.file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) fileType = "docx";
    else return res.status(400).json({ success: false, message: "Unsupported file type. Only PDF or DOC/DOCX allowed." });

    // ---------------- Parse Resume FIRST ---------------- //
    let parsedData = {};
    try {
      parsedData = await parseResume(req.file.buffer, fileType);
    } catch (parseError) {
      console.warn("⚠️ Resume parsing failed:", parseError.message);
    }

    // ---------------- THEN Upload to ImageKit ---------------- //
    const uploadResponse = await imagekit.upload({
      file: req.file.buffer,
      fileName: `${Date.now()}_${req.file.originalname}`,
    });

    // Save to DB
    const resume = new Resume({
      user: req.user.id,
      fileUrl: uploadResponse.url,
      fileId: uploadResponse.fileId,
      originalName: req.file.originalname,
      parsedData,
    });

    await resume.save();

    res.status(201).json({
      success: true,
      message: "Resume uploaded & parsed successfully",
      data: resume,
    });
    

  } catch (error) {
    console.error("Error uploading resume:", error.response?.body || error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ---------------- Get User Resumes ---------------- //
const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: resumes });
  } catch (error) {
    console.error("Error fetching resumes:", error.response?.body || error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ---------------- Delete Resume ---------------- //
const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) return res.status(404).json({ success: false, message: "Resume not found" });
    if (resume.user.toString() !== req.user.id.toString())
      return res.status(403).json({ success: false, message: "Unauthorized" });

    // Delete from ImageKit
    if (resume.fileId) {
      try {
        await imagekit.deleteFile(resume.fileId);
      } catch (ikError) {
        console.error("Failed to delete from ImageKit:", ikError.response?.body || ikError.message);
        return res.status(500).json({ success: false, message: "Failed to delete file from storage" });
      }
    }

    // Delete from DB
    await Resume.deleteOne({ _id: resume._id });

    res.status(200).json({ success: true, message: "Resume deleted successfully" });
  } catch (error) {
    console.error("Error deleting resume:", error.response?.body || error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { uploadResume, getUserResumes, deleteResume };
