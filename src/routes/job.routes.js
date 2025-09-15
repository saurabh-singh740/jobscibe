const express = require("express");
const router = express.Router();
const { addJob, getJobs, updateJobStatus, deleteJob, getExternalJobs } = require("../controllers/job.controllers");
const authMiddleware = require("../middleware/authMiddleware");

// Add job
router.post("/", authMiddleware, addJob);

// Get all jobs
router.get("/", authMiddleware, getJobs);

// Update job status
router.put("/:id", authMiddleware, updateJobStatus);

// Delete job
router.delete("/:id", authMiddleware, deleteJob);

// External job fetch
router.get("/external",authMiddleware,getExternalJobs)

module.exports = router;
