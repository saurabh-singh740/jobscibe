const Job = require("../models/job.model");

// Add a job
const addJob = async (req, res) => {
  try {
    const { title, company, location, description, applyLink } = req.body;

    const job = new Job({
      user: req.user.id,
      title,
      company,
      location,
      description,
      applyLink,
    });

    await job.save();
    res.status(201).json({ message: "Job added", job });
  } catch (error) {
    console.error("Error adding job:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all jobs for logged-in user
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Update job status
const updateJobStatus = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { status } = req.body;
    job.status = status || job.status;
    await job.save();

    res.status(200).json({ message: "Job updated", job });
  } catch (error) {
    console.error("Error updating job:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete job
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Job.deleteOne({ _id: job._id });
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addJob, getJobs, updateJobStatus, deleteJob };
