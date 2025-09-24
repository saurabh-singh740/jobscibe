const { generateText } = require("./ai.service");

// Helper: clean and safely parse JSON
function safeParseJSON(raw) {
  if (!raw || typeof raw !== "string") {
    throw new Error("AI returned empty response");
  }

  // Trim & remove markdown fences like ```json ... ```
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

// Resume optimisation
async function optimizeResume(resumeText, jobDesc) {
  const prompt = `
You are an advanced ATS Resume Optimization Engine. 
Your role is to maximize job-resume alignment while keeping the resume natural, professional, and recruiter-friendly.

Inputs:
Resume: {resumeText}
Job Description: {jobDesc}

Tasks:
1. **Deep Analysis**
   - Extract key technical skills, tools, and keywords from the job description.
   - Extract existing skills, tools, and keywords from the resume.
   - Identify the overlap and the gaps.

2. **Optimization**
   - Rewrite the resume so it highlights **relevant skills** and **experiences** tailored to this specific job description.
   - Ensure language is ATS-friendly (simple, keyword-rich, no graphics/irrelevant symbols).
   - Add measurable **achievements** (e.g., "improved performance by 30%") where possible.
   - Insert **missing keywords** naturally and in context without keyword stuffing.
   - Do NOT add technologies or skills that are irrelevant to the job description.

3. **ATS Scoring**
   - Calculate an **ATS score (0–100)** based on keyword alignment, relevancy, and coverage.
   - The scoring must be strict: 
     - 90–100 = Excellent alignment
     - 70–89 = Good alignment
     - 50–69 = Moderate alignment
     - Below 50 = Poor alignment

4. **Suggestions**
   - Provide actionable suggestions to further improve the resume (e.g., add metrics, clarify role impact, highlight leadership, emphasize domain knowledge).
   - Keep suggestions clear, short, and directly useful.

Output:
Return ONLY valid JSON (no markdown, no explanations, no extra text). Structure:
{
  "optimizedResume": "...",
  "atsScore": 85,
  "suggestions": ["Add metrics to achievements", "Highlight leadership experience"],
  "matchingKeywords": ["React", "JavaScript", "REST APIs"],
  "missingKeywords": ["TypeScript", "Redux"]
}

`;

  const raw = await generateText(prompt);
  return safeParseJSON(raw);
}

// Resume ↔ Job keyword matching
async function keywordMatch(resumeText, jobDesc) {
  const prompt = `
You are an advanced ATS Resume Matching Engine. 
Your role is to measure alignment between a resume and a job description across all technology domains.

Inputs:
Resume: {resumeText}
Job Description: {jobDesc}

Tasks:
1. **Extract Keywords**
   - From the Job Description: extract role-specific skills, tools, technologies, frameworks, certifications, and responsibilities.
   - From the Resume: extract skills, tools, technologies, frameworks, and project details.

2. **Comparison**
   - Identify **matchingKeywords** (explicitly present in both resume and JD).
   - Identify **missingKeywords** (explicitly present in JD but not in resume).
   - Missing keywords MUST be strictly relevant to the job description domain. Do not add unrelated technologies.

3. **Match Score**
   - Compute a match score (0–100) based on:
     - Percentage of JD keywords present in resume.
     - Importance of the keyword (core skills weigh more).
   - Score should reflect realistic ATS matching standards.

4. **Insights**
   - Provide a short set of insights in JSON as suggestions:
     - e.g., “Emphasize cloud experience”, “Add project metrics”, “Highlight security certifications”.

Output:
Return ONLY valid JSON (no markdown, no explanations, no extra text). Structure:
{
  "matchScore": 78,
  "matchingKeywords": ["Python", "TensorFlow", "Data Pipelines"],
  "missingKeywords": ["MLOps", "Kubernetes"],
  "suggestions": ["Highlight experience with model deployment", "Add metrics for data processing speed"]
}

`;

  const raw = await generateText(prompt);
  return safeParseJSON(raw);
}

module.exports = { optimizeResume, keywordMatch };

