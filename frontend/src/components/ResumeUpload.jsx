import React, { useState } from "react";
import axios from "axios";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setParsedData(null);
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
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      setParsedData(response.data?.data?.parsedData || null);
    } catch (err) {
      console.error(err);
      setError("Failed to upload resume. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setParsedData(null);
    setFile(null);
    setError("");
  };

  return (
    <div className="mt-4">
      {!parsedData && (
        <>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="mb-2 w-full text-sm text-gray-700 border rounded-md p-2"
          />
          <button
            onClick={handleUpload}
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-500 transition-colors mb-2"
          >
            {loading ? "Uploading..." : "Upload & Parse"}
          </button>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        </>
      )}

      {parsedData && (
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner text-gray-800 relative">
          <button
            onClick={handleClear}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold text-lg"
            title="Clear"
          >
            &times;
          </button>

          {parsedData.email && (
            <p className="text-sm md:text-base mb-1">
              <span className="font-semibold">Email:</span> {parsedData.email}
            </p>
          )}
          {parsedData.phone && (
            <p className="text-sm md:text-base mb-1">
              <span className="font-semibold">Phone:</span> {parsedData.phone}
            </p>
          )}
          {parsedData.skills && parsedData.skills.length > 0 && (
            <div className="mb-1">
              <span className="font-semibold">Skills:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {parsedData.skills.map((skill, index) => (
                  <a
                    key={index}
                    href={`https://www.google.com/search?q=${encodeURIComponent(skill)}+jobs`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-indigo-100 text-indigo-800 text-xs md:text-sm px-2 py-1 rounded-full hover:bg-indigo-200 transition-colors"
                  >
                    {skill}
                  </a>
                ))}
              </div>
            </div>
          )}
          {parsedData.education && parsedData.education.length > 0 && (
            <div className="mb-1">
              <span className="font-semibold">Education:</span>
              <ul className="list-disc list-inside text-sm md:text-base">
                {parsedData.education.map((edu, index) => (
                  <li key={index}>{edu}</li>
                ))}
              </ul>
            </div>
          )}
          {parsedData.experience && (
            <p className="text-sm md:text-base">
              <span className="font-semibold">Experience:</span>{" "}
              {parsedData.experience}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
