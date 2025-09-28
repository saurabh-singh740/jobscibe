import React, { useState } from "react";
import axios from "axios";

const OptimiseResume = ({ resumeId, parsedSkills }) => { // parsedProjects hata diya
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

          <div className="space-y-2 text-xs md:text-sm">
            {result.summary && <p><strong>Summary:</strong> {result.summary}</p>}
            {result.atsScore !== undefined && <p><strong>ATS Score:</strong> {result.atsScore}</p>}
            {result.topSkills && result.topSkills.length > 0 && <p><strong>Top Skills:</strong> {result.topSkills.join(", ")}</p>}
            {result.missingSkills && result.missingSkills.length > 0 && <p><strong>Missing Skills:</strong> {result.missingSkills.join(", ")}</p>}
            {result.suggestions && result.suggestions.length > 0 && (
              <div>
                <strong>Suggestions:</strong>
                <ul className="list-disc list-inside">
                  {result.suggestions.map((sugg, idx) => <li key={idx}>{sugg}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OptimiseResume;
