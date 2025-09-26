const { optimizeResume, keywordMatch } = require("../services/resumeAI.service");

const optimizeResumeController = async (req, res) => {
  try {
    const { parsedSkills, jobDescription } = req.body;

    if (!parsedSkills || !jobDescription) {
      return res.status(400).json({
        error: "parsedSkills and jobDescription are required",
      });
    }

    // AI ko call sirf parsedSkills + JD ke saath
    const result = await optimizeResume(parsedSkills, jobDescription);
    res.json(result);
  } catch (err) {
    console.error("Optimize Resume Error:", err);
    res.status(500).json({ error: err.message });
  }
};

const keywordMatchController = async (req, res) => {
  try {
    const { parsedSkills, jobDescription } = req.body;

    if (!parsedSkills || !jobDescription) {
      return res.status(400).json({
        error: "parsedSkills and jobDescription are required",
      });
    }

    const result = await keywordMatch(parsedSkills, jobDescription);
    res.json(result);
  } catch (err) {
    console.error("Keyword Match Error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { optimizeResumeController, keywordMatchController };
