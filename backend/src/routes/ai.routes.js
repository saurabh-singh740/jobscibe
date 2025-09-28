const express = require("express");
const {
  optimizeResumeController,
  keywordMatchController,
} = require("../controllers/ai.controller");

const router = express.Router();

// POST /api/ai/optimize
router.post("/optimize", optimizeResumeController);

// POST /api/ai/match
router.post("/match", keywordMatchController);


module.exports = router;
