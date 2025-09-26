const pdfParse = require("pdf-parse");

// Utility: Extract email from text
function extractEmail(text) {
  const match = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/);
  return match ? match[0] : null;
}

// Utility: Extract phone numbers
function extractPhone(text) {
  const match = text.match(/(\+?\d{1,3}[-.\s]?)?\d{10,15}/);
  return match ? match[0] : null;
}

// Utility: Extract links
function extractLinks(text) {
  const links = [];
  const regex = /(https?:\/\/[^\s]+)/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    links.push(match[0]);
  }
  return links;
}

// Utility: Extract skills
function extractSkills(text) {
  const skillsList = [
    "JavaScript", "React", "Node.js", "Express", "MongoDB",
    "Python", "Django", "Flask", "Java", "Spring",
    "C++", "C#", "SQL", "MySQL", "PostgreSQL",
    "AWS", "Docker", "Kubernetes", "Git", "Machine Learning",
  ];
  return skillsList.filter(skill =>
    text.toLowerCase().includes(skill.toLowerCase())
  );
}

// Utility: Extract education info
function extractEducation(text) {
  const eduKeywords = ["B.Tech", "B.E", "M.Tech", "MCA", "B.Sc", "M.Sc", "PhD", "Bachelor", "Master"];
  return eduKeywords.filter(edu =>
    text.toLowerCase().includes(edu.toLowerCase())
  );
}

// Utility: Extract experience years
function extractExperience(text) {
  const match = text.match(/(\d+)\+?\s+(years?|yrs?)\s+(of)?\s*experience/i);
  return match ? match[0] : null;
}

// Utility: Extract structured projects
function extractProjects(text) {
  const projects = [];
  const projectSectionMatch = text.match(/(projects|personal projects|academic projects)\s*[:\n]/i);
  
  if (!projectSectionMatch) return projects;

  const startIndex = projectSectionMatch.index + projectSectionMatch[0].length;
  const remainingText = text.slice(startIndex);

  const projectBlocks = remainingText.split(/\n{2,}/);

  for (const block of projectBlocks) {
    if (/experience|education|skills|certifications|achievements/i.test(block)) break;
    if (!block.trim()) continue;

    const lines = block.trim().split("\n");
    const title = lines[0];
    const description = lines.slice(1).join(" ");
    projects.push({ title, description });
  }

  return projects;
}

// Main Parser
async function parseResume(buffer) {
  try {
    const data = await pdfParse(buffer);
    const text = data.text;

    return {
      rawText: text.trim(),
      email: extractEmail(text),
      phone: extractPhone(text),
      links: extractLinks(text),
      skills: extractSkills(text),
      education: extractEducation(text),
      experience: extractExperience(text),
      projects: extractProjects(text),
    };
  } catch (error) {
    console.error("❌ Error parsing resume:", error.message);
    throw new Error("Resume parsing failed. Please upload a valid PDF.");
  }
}

module.exports = { parseResume };
