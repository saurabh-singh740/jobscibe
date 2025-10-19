import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const JobSearch = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("remote");
  const [externalJobs, setExternalJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [jobError, setJobError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  const fetchExternalJobs = async (searchQuery, searchLocation) => {
    if (!searchQuery) return;
    try {
      setLoading(true);
      setJobError("");
      const res = await axios.get(
        `/api/jobs/external?query=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(searchLocation)}`
      );
      setExternalJobs(res.data.data || []);
    } catch (err) {
      console.error(err.response || err);
      setJobError("Failed to fetch jobs. Try again.");
      setExternalJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchExternalJobs(query, location);
  };

  return (
    <div className="relative min-h-screen px-6 py-16 flex flex-col items-center justify-start bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-gray-100">
      {/* Floating gradient blobs */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#203a43]/50 rounded-full mix-blend-multiply blur-3xl animate-float-slow"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#2c5364]/50 rounded-full mix-blend-multiply blur-3xl animate-float"></div>

      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white drop-shadow-lg text-center">
        Job Search
      </h2>

      {!isAuthenticated ? (
        <p className="text-red-400 mb-6 text-center font-medium">
          Login/Register to access job features.
        </p>
      ) : (
        <div className="w-full max-w-6xl flex flex-col space-y-6">
          {/* Search form */}
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 w-full mb-6">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Job title or keywords..."
              className="flex-1 p-3 rounded-md bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location (default: remote)"
              className="flex-1 p-3 rounded-md bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-6 rounded-md transition-colors"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </form>

          {jobError && <p className="text-red-400 text-center mb-4">{jobError}</p>}

          {/* Job listings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {externalJobs.map((job, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-900/50 backdrop-blur-md p-4 rounded-xl shadow-lg flex flex-col max-h-64 overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <h4 className="font-semibold text-indigo-200 mb-1">{job.title}</h4>
                <p className="text-gray-200 text-sm mb-1"><strong>Company:</strong> {job.company}</p>
                <p className="text-gray-200 text-sm mb-2"><strong>Location:</strong> {job.location || location}</p>
                <div className="text-gray-300 text-sm flex-1 overflow-y-auto mb-2">{job.description}</div>
                <a
                  href={`https://jooble.org/jobs/${encodeURIComponent(job.title)}?l=${encodeURIComponent(location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:underline text-sm mt-auto"
                >
                  Apply Now
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobSearch;
