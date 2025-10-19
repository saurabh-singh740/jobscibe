import React, { useEffect, useState } from "react";
import ResumeUpload from "../components/ResumeUpload";
import OptimiseResume from "../components/Resume/OptimiseResume";
import KeywordMatch from "../components/keywordMatch";
import axios from "axios";
import { motion } from "framer-motion";

const Features = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [resumeId, setResumeId] = useState(null);
  const [parsedSkills, setParsedSkills] = useState([]);
  const [parsedText, setParsedText] = useState("");

  const [jobs, setJobs] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [jobLocation, setJobLocation] = useState("remote");
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [jobError, setJobError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  const fetchExternalJobs = async () => {
    if (!jobTitle.trim()) {
      setJobError("Please enter a job title or keyword.");
      setJobs([]);
      return;
    }

    try {
      setLoadingJobs(true);
      setJobError("");

      const res = await axios.get(
        `/api/jobs/external?query=${encodeURIComponent(jobTitle)}&location=${encodeURIComponent(jobLocation)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const jobsData = res.data?.data;
      if (res.data?.success && Array.isArray(jobsData)) {
        setJobs(jobsData.length ? jobsData : []);
        if (!jobsData.length) setJobError("No jobs found for the given criteria.");
      } else {
        setJobs([]);
        setJobError(res.data?.message || "Unexpected response from server.");
      }
    } catch (err) {
      console.error(err);
      setJobError(err.response?.data?.message || err.message || "Error fetching jobs.");
      setJobs([]);
    } finally {
      setLoadingJobs(false);
    }
  };

  const features = [
    {
      title: "Resume Parsing",
      description: "Instantly extract key details from your CV to make it recruiter-ready.",
      component: <ResumeUpload setResumeId={setResumeId} setParsedSkills={setParsedSkills} setParsedText={setParsedText} />,
    },
    {
      title: "Optimise Resume",
      description: "Enhance your resume for better alignment with job requirements.",
      component: <OptimiseResume resumeId={resumeId} parsedSkills={parsedSkills} />,
    },
    {
      title: "Keyword Matching",
      description: "Check how well your resume matches job keywords to boost shortlisting.",
      component: <KeywordMatch parsedSkills={parsedSkills} parsedText={parsedText} />,
    },
    {
      title: "Job Search",
      description: "Find relevant jobs and directly apply from the list.",
      component: isAuthenticated ? (
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col md:flex-row md:space-x-3 space-y-2 md:space-y-0">
            <input
              type="text"
              placeholder="Job title or keywords..."
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="flex-1 p-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Location (default: remote)"
              value={jobLocation}
              onChange={(e) => setJobLocation(e.target.value)}
              className="flex-1 p-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="button"
            onClick={fetchExternalJobs}
            className="w-full md:w-auto bg-indigo-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-indigo-500 transition-colors"
          >
            {loadingJobs ? "Searching..." : "Search Jobs"}
          </button>

          {jobError && <p className="text-red-500 text-sm">{jobError}</p>}

          <div className="mt-2 overflow-y-auto max-h-[400px] space-y-3">
            {jobs.map((job, idx) => (
              <div
                key={idx}
                className="p-4 border rounded-lg hover:shadow-lg transition flex flex-col space-y-1 bg-white"
              >
                <p className="font-semibold text-indigo-800">{job.title}</p>
                <p className="text-gray-700 text-sm">{job.company}</p>
                <p className="text-gray-500 text-sm">
                  {job.location} | {job.type || "N/A"} | {job.salary || "Salary not specified"}
                </p>
                <p className="text-gray-600 text-sm line-clamp-3" dangerouslySetInnerHTML={{ __html: job.snippet }}></p>
                <a
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 text-sm font-medium underline"
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-red-500 font-medium">Login/Register to search jobs.</p>
      ),
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] overflow-hidden text-gray-100 py-36 px-6">

      {/* 🌟 Floating gradient blobs */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply blur-3xl opacity-25 animate-float-slow"></div>
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply blur-3xl opacity-25 animate-float"></div>
      <div className="absolute top-1/2 left-1/2 w-[28rem] h-[28rem] bg-yellow-300 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-float-reverse"></div>

      {/* Heading */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-400 drop-shadow-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Explore Jobscribe Features
      </motion.h2>

      {/* Full-width grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            className="p-6 bg-indigo-100/20 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:scale-105 flex flex-col w-full"
            style={{ minHeight: "350px", maxHeight: "650px" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-3 text-purple-300">{feature.title}</h3>
            {!isAuthenticated && feature.title !== "Job Search" ? (
              <p className="text-red-500 font-medium">Login/Register to use this feature.</p>
            ) : (
              <>
                <p className="mb-4 text-gray-200">{feature.description}</p>
                {feature.component}
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Features;
