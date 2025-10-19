import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const OptimiseResume = ({ resumeId, parsedSkills }) => {
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!jobDescription.trim()) {
      setError("Please enter a job description.");
      return;
    }
    if (!resumeId || !parsedSkills || parsedSkills.length === 0) {
      setError("Resume ID or parsed skills are missing. Upload a valid resume first.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        "http://localhost:3000/api/ai/optimize",
        { resumeId, parsedSkills, jobDescription },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      if (response.data) setResult(response.data);
      else setError("No data returned from backend.");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to optimise resume. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setJobDescription("");
    setResult(null);
    setError("");
  };

  return (
    <motion.div
      className="relative flex flex-col p-6 rounded-2xl shadow-2xl backdrop-blur-md text-gray-100 w-full"
      style={{
        minHeight: "350px",
        maxHeight: "700px",
        background: "linear-gradient(to bottom right, #0f2027, #203a43, #2c5364)"
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Floating gradient blobs */}
      <div className="absolute -top-16 -left-16 w-48 h-48 bg-[#203a43]/50 rounded-full mix-blend-multiply blur-3xl animate-float-slow"></div>
      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-[#2c5364]/50 rounded-full mix-blend-multiply blur-3xl animate-float"></div>

      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white drop-shadow-lg">
        Optimise Resume
      </h2>

      {/* Textarea */}
      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste job description here..."
        className="w-full h-28 p-3 mb-3 rounded-md text-gray-100 bg-[#203a43]/50 focus:outline-none focus:ring-2 focus:ring-white resize-none"
      />

      {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

      {/* Result */}
      {result && (
        <motion.div
          className="p-4 rounded-lg shadow-inner text-gray-100 bg-white/10 flex-1 overflow-auto relative mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={handleClear}
            className="absolute top-2 right-2 text-white hover:text-gray-300 font-bold text-lg"
            title="Clear"
          >
            &times;
          </button>

          <h3 className="font-semibold mb-2 text-white">Optimisation Result:</h3>
          <div className="space-y-2 text-sm">
            {result.summary && <p><strong>Summary:</strong> {result.summary}</p>}
            {result.atsScore !== undefined && <p><strong>ATS Score:</strong> {result.atsScore}</p>}
            {result.topSkills?.length > 0 && <p><strong>Top Skills:</strong> {result.topSkills.join(", ")}</p>}
            {result.missingSkills?.length > 0 && <p><strong>Missing Skills:</strong> {result.missingSkills.join(", ")}</p>}
            {result.suggestions?.length > 0 && (
              <div>
                <strong>Suggestions:</strong>
                <ul className="list-disc list-inside">
                  {result.suggestions.map((sugg, idx) => <li key={idx}>{sugg}</li>)}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Optimise Button */}
      <button
        onClick={handleSubmit}
        className="mt-auto bg-white/20 text-white font-semibold py-2 rounded-md hover:bg-white/30 transition backdrop-blur-md"
      >
        {loading ? "Optimising..." : "Optimise"}
      </button>
    </motion.div>
  );
};

export default OptimiseResume;
