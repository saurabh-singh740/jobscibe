import React, { useEffect, useState } from "react";
import axios from "axios";

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
        `/api/jobs/external?query=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(searchLocation)}`,
        // { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(res.data)
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
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-16 px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8 drop-shadow-lg">
        Job Search
      </h2>

      {!isAuthenticated ? (
        <p className="text-center text-red-500 mb-6">Login/Register to access jobs features.</p>
      ) : (
        <>
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-8 flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Job title or keywords..."
              className="flex-1 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location (default: remote)"
              className="flex-1 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button type="submit" className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-indigo-500">
              {loading ? "Searching..." : "Search"}
            </button>
          </form>

          {jobError && <p className="text-red-500 mb-2">{jobError}</p>}

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {externalJobs.map((job, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg shadow-md flex flex-col" style={{ maxHeight: "300px" }}>
                <h4 className="font-semibold text-indigo-700 mb-2">{job.title}</h4>
                <p className="text-gray-700 text-sm mb-1"><strong>Company:</strong> {job.company}</p>
                <p className="text-gray-700 text-sm mb-1"><strong>Location:</strong> {job.location || location}</p>
                <div className="text-gray-600 text-sm overflow-y-auto flex-1">{job.description}</div>
                <a
                  href={`https://jooble.org/jobs/${encodeURIComponent(job.title)}?l=${encodeURIComponent(location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-indigo-600 hover:underline text-sm"
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default JobSearch;
