const { generateText } = require("./ai.service");

// Helper: clean and safely parse JSON
function safeParseJSON(raw) {
  if (!raw || typeof raw !== "string") {
    throw new Error("AI returned empty response");
  }

  let clean = raw.trim();
  if (clean.startsWith("```")) {
    clean = clean.replace(/```json/i, "").replace(/```/g, "").trim();
  }

  try {
    return JSON.parse(clean);
  } catch (err) {
    console.error("AI returned invalid JSON:", raw);
    throw new Error("Invalid AI JSON response");
  }
}

// Resume optimisation: structured, context-aware
async function optimizeResume(parsedSkills, jobDesc, resumeText) {
  const skills = Array.isArray(parsedSkills) ? parsedSkills : [];

  const prompt = `
You are an ATS Resume Optimization Engine.

Inputs:
- Resume Skills: ${JSON.stringify(skills)}
- Job Description: "${jobDesc}"
- Full Resume Text: "${resumeText || "No resume text provided"}"

Rules:
1. Rewrite the resume to highlight relevant skills, projects, and experience.
2. Keep it professional, concise, and ATS-friendly.
3. Suggest missing skills/keywords relevant to the role.
4. Calculate ATS score (0-100) based on alignment.
5. Return ONLY JSON in this structure:

{
  "summary": "...",
  "skills": ["..."],
  "projects": ["..."],
  "experience": ["..."],
  "atsScore": 0,
  "suggestions": ["..."]
}
`;

  const raw = await generateText(prompt);
  return safeParseJSON(raw);
}

// Resume ↔ Job keyword matching: context-aware
async function keywordMatch(parsedSkills, jobDesc) {
  const skills = Array.isArray(parsedSkills) ? parsedSkills : [];

  const prompt = `
You are an ATS Resume Matching Engine.

Inputs:
- Resume Skills: ${JSON.stringify(skills)}
- Job Description: "${jobDesc}"

Tasks:
1. Identify matching and missing keywords relevant to the role.
2. Compute matchScore (0-100) based on skill alignment.
3. Provide actionable suggestions.
4. Return ONLY JSON:

{
  "matchScore": 0,
  "matchingKeywords": ["..."],
  "missingKeywords": ["..."],
  "suggestions": ["..."]
}
`;

  const raw = await generateText(prompt);
  return safeParseJSON(raw);
}

module.exports = { optimizeResume, keywordMatch };
