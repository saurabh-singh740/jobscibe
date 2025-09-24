// src/services/job.service.js
const axios = require("axios");

/**
 * Fetch jobs from Jooble API
 * @param {string} query - Job title or keywords
 * @param {string} location - Location (city, country or "remote")
 * @returns {Promise<Array>} - Array of job objects
 */
const fetchJobs = async (query = "", location = "") => {
  try {
    const response = await axios.post(
      `https://jooble.org/api/${process.env.JOOBLE_API_KEY}`,
      {
        keywords: query,
        location: location,
      },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 10000,
      }
    );

    // Format response data
    const jobs = (response.data.jobs || []).map((job) => ({
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.type || "N/A",
      link: job.link,
      snippet: job.snippet,
      updated: job.updated,
      salary: job.salary || "Not specified",
    }));

    return jobs;
  } catch (error) {
    console.error("Error fetching jobs via Jooble:", error.message);
    throw new Error("Failed to fetch jobs from Jooble");
  }
};

module.exports = { fetchJobs };
