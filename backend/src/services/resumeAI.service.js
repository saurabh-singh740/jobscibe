const { generateText } = require("./ai.service");

// ----------------- Helper: safely parse AI JSON -----------------
function safeParseJSON(raw) {
  if (!raw || typeof raw !== "string")
    throw new Error("AI returned empty response");

  // Remove triple backticks
  let clean = raw
    .replace(/```json/i, "")
    .replace(/```/g, "")
    .trim();

  // Slice JSON only
  const firstBrace = clean.indexOf("{");
  const lastBrace = clean.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    console.error("AI returned malformed JSON:", raw);
    throw new Error("Invalid AI JSON response");
  }
  clean = clean.slice(firstBrace, lastBrace + 1);

  try {
    return JSON.parse(clean);
  } catch (err) {
    console.error("AI returned invalid JSON after cleaning:", clean);
    throw new Error("Invalid AI JSON response");
  }
}

// ----------------- Resume Optimization -----------------
async function optimizeResume(
  parsedSkills,
  parsedProjects,
  jobDesc,
  resumeText
) {
  const skills = Array.isArray(parsedSkills) ? parsedSkills : [];
  const projects = Array.isArray(parsedProjects) ? parsedProjects : [];

  // Extract role/domain dynamically from JD
 const roleMatch = jobDesc ? jobDesc.match(/(frontend|backend|fullstack|mobile|qa|devops|data science|machine learning|ai|nlp|computer vision|cloud|security|cybersecurity|blockchain|web3|embedded|iot|game|ar|vr|metaverse|bi|analytics|database|sre|site reliability|robotics|automation|software|engineer|developer|designer)/i) : null;

const role = roleMatch
  ? roleMatch[0].charAt(0).toUpperCase() + roleMatch[0].slice(1)
  : "Software Developer";

  const prompt = `
You are an advanced ATS Resume Optimization Engine specialized in ${role} and all software/tech domains.

Inputs:
- Resume Skills: ${JSON.stringify(skills)}
- Resume Projects: ${JSON.stringify(projects)}
- Job Description: "${jobDesc}"
- Full Resume Text: "${resumeText || "No resume text provided"}"

Tasks:
1. Match resume skills with the job description semantically, considering synonyms, abbreviations, and related technologies.
2. Evaluate each project for relevance and rank by relevanceScore (0-100).
3. Identify missing skills, keywords, and domain-specific technologies for the role.
4. Suggest improvements for projects, emphasizing tech stack, responsibilities, achievements, and impact.
5. Highlight top 3 projects and top 5 skills most relevant to the JD.
6. Calculate ATS alignment score (0-100) based on skills, projects, and keywords.
7. Provide concise actionable suggestions to improve ATS compatibility (certifications, tools, frameworks, domain-specific tech).
8. Keep output professional, concise, and ATS-friendly.
9. Return ONLY JSON in this structure:

{
  "summary": "...",
  "skills": ["..."],
  "projects": [
    {
      "title": "...",
      "description": "...",
      "relevanceScore": 0
    }
  ],
  "experience": ["..."],
  "topSkills": ["..."],
  "topProjects": ["..."],
  "missingSkills": ["..."],
  "atsScore": 0,
  "suggestions": ["..."]
}
`;

  const raw = await generateText(prompt);
  return safeParseJSON(raw);
}

// ----------------- Resume ↔ Job Keyword Matching -----------------
async function keywordMatch(parsedSkills, jobDesc) {
  const skills = Array.isArray(parsedSkills) ? parsedSkills : [];

  // Extract role/domain dynamically
  const roleMatch = jobDesc.match(
    /(frontend|backend|fullstack|mobile|qa|devops|data science|machine learning|ai|nlp|computer vision|cloud|security|cybersecurity|blockchain|web3|embedded|iot|game|ar|vr|metaverse|bi|analytics|database|sre|site reliability|robotics|automation|software|engineer|developer|designer)/i
  );
  const role = roleMatch
    ? roleMatch[0].charAt(0).toUpperCase() + roleMatch[0].slice(1)
    : "Software Developer";

  const prompt = `
You are an ATS Resume Matching Engine specialized in ${role} and all software/tech domains.

Inputs:
- Resume Skills: ${JSON.stringify(skills)}
- Job Description: "${jobDesc}"

Tasks:
1. Identify matching and missing keywords relevant to this role/domain.
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
