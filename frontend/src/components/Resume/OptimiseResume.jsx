import React, { useState } from "react";
import axios from "axios";

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

      console.log("Submitting:", { jobDescription, parsedSkills, resumeId });

      const response = await axios.post(
        "http://localhost:3000/api/ai/optimize",
        {
          resumeId,
          parsedSkills,
          jobDescription,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data) {
        setResult(response.data);
      } else {
        setError("No data returned from backend.");
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to optimise resume. Try again.");
      }
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
    <div className="bg-white p-4 rounded-lg shadow-md mt-6">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">
        Optimise Resume
      </h2>

      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste job description here..."
        className="w-full h-28 p-2 border rounded-md mb-3 text-sm text-gray-700"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-500 transition-colors mb-2"
      >
        {loading ? "Optimising..." : "Optimise"}
      </button>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      {result && (
        <div className="bg-gray-50 p-3 rounded-lg shadow-inner text-sm text-gray-800 relative">
          <button
            onClick={handleClear}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold text-lg"
            title="Clear"
          >
            &times;
          </button>
          <h3 className="font-semibold mb-2">Optimisation Result:</h3>
          <pre className="whitespace-pre-wrap text-xs md:text-sm">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default OptimiseResume;
