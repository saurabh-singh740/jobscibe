const { optimizeResume, keywordMatch } = require("../services/resumeAI.service");

const optimizeResumeController = async (req, res) => {
  try {
    const { resumeId, jobDescription } = req.body;

    if (!resumeId || !jobDescription) {
      return res.status(400).json({ error: "resumeId and jobDescription are required" });
    }

    const result = await optimizeResume(resumeId, jobDescription);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const keywordMatchController = async (req, res) => {
  try {
    const { resumeId, jobDescription } = req.body;

    if (!resumeId || !jobDescription) {
      return res.status(400).json({ error: "resumeId and jobDescription are required" });
    }

    const result = await keywordMatch(resumeId, jobDescription);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { optimizeResumeController, keywordMatchController };
