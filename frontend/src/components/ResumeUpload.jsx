import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const ResumeUpload = ({ setResumeId, setParsedSkills, setParsedText }) => {
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState({ skills: [], email: "", phone: "", links: [], text: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setParsedData({ skills: [], email: "", phone: "", links: [], text: "" });
    setError("");
    setResumeId(null);
    setParsedSkills([]);
    setParsedText("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        "https://jobscibe.onrender.com/api/resume/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
      );

      const data = response.data?.data?.parsedData;
      const id = response.data?.data?._id;

      const skills = Array.isArray(data.skills) ? data.skills : [];
      const text = data.text || "";

      setParsedData({
        skills,
        email: data.email || "",
        phone: data.phone || "",
        links: Array.isArray(data.links) ? data.links : [],
        text
      });

      setResumeId(id);
      setParsedSkills(skills);
      setParsedText(text);

    } catch (err) {
      console.error(err);
      setError("Failed to upload resume. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setParsedData({ skills: [], email: "", phone: "", links: [], text: "" });
    setError("");
    setResumeId(null);
    setParsedSkills([]);
    setParsedText("");
  };

  return (
    <div className="relative flex items-center justify-center px-4 py-20 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-gray-100">
      <div className="absolute -top-20 -left-20 w-52 h-52 bg-[#203a43]/50 rounded-full mix-blend-multiply blur-3xl animate-float-slow"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-[#2c5364]/50 rounded-full mix-blend-multiply blur-3xl animate-float"></div>

      <motion.div
        className="relative w-full max-w-3xl space-y-8 bg-gray-900 bg-opacity-70 p-8 rounded-2xl shadow-2xl backdrop-blur-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {!parsedData.skills.length && (
          <div className="space-y-4">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="w-full text-sm border border-gray-400 rounded-md p-3 bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={handleUpload}
              disabled={loading}
              className={`w-full py-3 rounded-md font-semibold transition-colors ${
                loading ? "bg-gray-500 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500 text-white"
              }`}
            >
              {loading ? "Uploading..." : "Upload & Parse"}
            </button>
            {error && <p className="text-red-400 text-sm">{error}</p>}
          </div>
        )}

        {parsedData.skills.length > 0 && (
  <section className="bg-gray-800 rounded-xl p-6 space-y-5 border border-gray-700 max-h-[60vh] overflow-y-auto">
    <h2 className="text-2xl font-bold text-gray-100 border-b pb-2">Parsed Resume Details</h2>

    <div>
      <h3 className="font-semibold text-gray-200 mb-2">Skills:</h3>
      <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
        {parsedData.skills.map((skill, idx) => (
          <span
            key={idx}
            className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>

    {parsedData.email && <p><strong>Email:</strong> {parsedData.email}</p>}
    {parsedData.phone && <p><strong>Phone:</strong> {parsedData.phone}</p>}
    {parsedData.links.length > 0 && <p><strong>Links:</strong> {parsedData.links.join(", ")}</p>}

    <div className="flex justify-end mt-4">
      <button
        onClick={handleClear}
        className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-400 transition-colors"
      >
        Clear
      </button>
    </div>
  </section>
)}

      </motion.div>
    </div>
  );
};

export default ResumeUpload;
