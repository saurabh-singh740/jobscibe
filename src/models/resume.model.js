const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },

    // 🔹 Parsed resume fields
    parsedText: {
      type: String, // Full extracted text
    },
    parsedData: {
      name: { type: String },
      email: { type: String },
      phone: { type: String },
      skills: [{ type: String }],
      education: [{ type: String }],
      experience: [{ type: String }],
    },
  },
  { timestamps: true }
);

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
