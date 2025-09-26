const { generateText } = require("./ai.service");

// Helper: safely parse AI JSON
function safeParseJSON(raw) {
  if (!raw || typeof raw !== "string") throw new Error("AI returned empty response");

  let clean = raw.trim();
  if (clean.startsWith("```")) clean = clean.replace(/```json/i, "").replace(/```/g, "").trim();

  try {
    return JSON.parse(clean);
  } catch (err) {
    console.error("AI returned invalid JSON:", raw);
    throw new Error("Invalid AI JSON response");
  }
}

// Resume optimization: includes projects
async function optimizeResume(parsedSkills, parsedProjects, jobDesc, resumeText) {
  const skills = Array.isArray(parsedSkills) ? parsedSkills : [];
  const projects = Array.isArray(parsedProjects) ? parsedProjects : [];

  const prompt = `
You are an advanced ATS Resume Optimization Engine with deep knowledge of backend development hiring.

Inputs:
- Resume Skills: ${JSON.stringify(skills)}
- Resume Projects: ${JSON.stringify(projects)}
- Job Description: "${jobDesc}"
- Full Resume Text: "${resumeText || "No resume text provided"}"

You are an advanced ATS Resume Optimization Engine with deep knowledge of backend development hiring.

Inputs:
- Resume Skills: ${JSON.stringify(skills)}
- Resume Projects: ${JSON.stringify(projects)}
- Job Description: "${jobDesc}"
- Full Resume Text: "${resumeText || "No resume text provided"}"

Tasks:
1. Match resume skills with the job description semantically. Do not rely on exact string matches; consider synonyms, abbreviations, and related technologies.
2. Evaluate each project for relevance to the JD and rank them by relevance. Provide a relevanceScore (0-100) for each.
3. Identify missing skills or keywords important for this JD, including backend-specific technologies, frameworks, and tools.
4. Suggest improvements for projects, e.g., emphasize tech stack, responsibilities, achievements, and impact.
5. Highlight top 3 projects and top 5 skills most relevant to the JD.
6. Calculate an ATS alignment score (0-100) based on skills, projects, and keywords.
7. Provide concise suggestions to improve ATS compatibility, including adding certifications, keywords, or backend-specific technologies.
8. Keep all output professional, concise, and ATS-friendly.
9. Return ONLY JSON in the following structure:

{
  "summary": "...",                    // concise resume summary tailored for JD
  "skills": ["..."],                   // optimized skills list
  "projects": [                        // only relevant projects
    {
      "title": "...",
      "description": "...",
      "relevanceScore": 0             // 0-100 relevance to JD
    }
  ],
  "experience": ["..."],               // optimized experience highlights
  "topSkills": ["..."],                // top 5 skills most relevant
  "topProjects": ["..."],              // titles of top 3 relevant projects
  "missingSkills": ["..."],            // skills/keywords missing
  "atsScore": 0,                        // 0-100
  "suggestions": ["..."]               // actionable tips for ATS optimization
}

`;

  const raw = await generateText(prompt);
  return safeParseJSON(raw);
}


// Resume ↔ Job keyword matching
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
