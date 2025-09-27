import React, { useState } from "react";
import axios from "axios";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState({ skills: [], email: "", phone: "", links: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setParsedData({ skills: [], email: "", phone: "", links: [] });
    setError("");
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
        "http://localhost:3000/api/resume/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
      );

      const data = response.data?.data?.parsedData;
      setParsedData({
        skills: Array.isArray(data.skills) ? data.skills : [],
        email: data.email || "",
        phone: data.phone || "",
        links: Array.isArray(data.links) ? data.links : []
      });
    } catch (err) {
      console.error(err);
      setError("Failed to upload resume. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setParsedData({ skills: [], email: "", phone: "", links: [] });
    setError("");
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 space-y-8">
      {!parsedData.skills.length && (
        <div className="space-y-3">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="w-full text-sm border rounded-md p-2"
          />
          <button
            onClick={handleUpload}
            disabled={loading}
            className={`w-full py-2 rounded-md font-semibold ${loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-500 text-white"}`}
          >
            {loading ? "Uploading..." : "Upload & Parse"}
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      )}

      {parsedData.skills.length > 0 && (
        <section className="bg-white shadow-md rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {parsedData.skills.map((skill, idx) => (
              <span key={idx} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs md:text-sm">
                {skill}
              </span>
            ))}
          </div>

          {parsedData.email && (
            <p><strong>Email:</strong> {parsedData.email}</p>
          )}
          {parsedData.phone && (
            <p><strong>Phone:</strong> {parsedData.phone}</p>
          )}
          {parsedData.links.length > 0 && (
            <p><strong>Links:</strong> {parsedData.links.join(", ")}</p>
          )}
        </section>
      )}

      {parsedData.skills.length > 0 && (
        <div className="flex justify-end">
          <button
            onClick={handleClear}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400 transition-colors"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
