import React, { useState } from "react";
import axios from "axios";

const KeywordMatch = ({ parsedSkills = [] }) => {
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!jobDescription.trim())
      return setError("Please enter a job description.");

    try {
      setLoading(true);
      setError("");
      const response = await axios.post(
        "http://localhost:3000/api/ai/match",
        { parsedSkills, jobDescription }, // sirf ye do hi bhejenge
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      if (response.data) setResult(response.data);
      else setError("No data returned from backend.");
    } catch (err) {
      console.error(err.response?.data || err);
      setError(
        err.response?.data?.error || "Failed to match keywords. Try again."
      );
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
    <div
  className="p-6 bg-gradient-to-br from-white/90 via-indigo-100/80 to-purple-100/80 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 flex flex-col w-full"
  style={{ minHeight: "350px", maxHeight: "450px" }}
>
  <h2 className="text-lg font-semibold mb-3 text-indigo-900 text-center">Keyword Match</h2>

  {/* Textarea */}
  <textarea
    value={jobDescription}
    onChange={(e) => setJobDescription(e.target.value)}
    placeholder="Paste job description here..."
    className="w-full h-24 p-3 mb-3 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
  />

  {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

  {/* Result area */}
  {result && (
    <div
      className="p-3 rounded-lg shadow-inner text-sm text-gray-800 relative flex-1 overflow-y-auto"
    >
      <button
        onClick={handleClear}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold text-lg"
        title="Clear"
      >
        &times;
      </button>

      <div className="space-y-2 text-xs md:text-sm">
        {result.matchScore !== undefined && (
          <p><strong>Match Score:</strong> {result.matchScore}</p>
        )}
        {result.matchingKeywords?.length > 0 && (
          <p><strong>Matching Keywords:</strong> {result.matchingKeywords.join(", ")}</p>
        )}
        {result.missingKeywords?.length > 0 && (
          <p><strong>Missing Keywords:</strong> {result.missingKeywords.join(", ")}</p>
        )}
        {result.suggestions?.length > 0 && (
          <div>
            <strong>Suggestions:</strong>
            <ul className="list-disc list-inside">
              {result.suggestions.map((s, idx) => <li key={idx}>{s}</li>)}
            </ul>
          </div>
        )}
      </div>
    </div>
  )}

  {/* Match button at bottom */}
  <button
    onClick={handleSubmit}
    className={`w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-500 transition-colors mt-3`}
    disabled={loading}
  >
    {loading ? "Matching..." : "Match Keywords"}
  </button>
</div>

  );
};

export default KeywordMatch;
