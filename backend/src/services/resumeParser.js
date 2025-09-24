// src/services/resumeParser.js
const pdfParse = require("pdf-parse");

// Utility: Extract email from text
function extractEmail(text) {
  const match = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/);
  return match ? match[0] : null;
}

// Utility: Extract phone numbers (10-15 digits, flexible format)
function extractPhone(text) {
  const match = text.match(/(\+?\d{1,3}[-.\s]?)?\d{10,15}/);
  return match ? match[0] : null;
}

// Utility: Extract LinkedIn / GitHub links
function extractLinks(text) {
  const links = [];
  const regex = /(https?:\/\/[^\s]+)/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    links.push(match[0]);
  }
  return links;
}

// Utility: Extract skills (customizeable list)
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

// Utility: Extract education info (basic version, regex-based)
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

// Main Parser Function
async function parseResume(buffer) {
  try {
    const data = await pdfParse(buffer);
    const text = data.text;

    // Extract structured data
    const parsedData = {
      rawText: text.trim(), // keep full text for reference
      email: extractEmail(text),
      phone: extractPhone(text),
      links: extractLinks(text),
      skills: extractSkills(text),
      education: extractEducation(text),
      experience: extractExperience(text),
    };

    return parsedData;
  } catch (error) {
    console.error("❌ Error parsing resume:", error.message);
    throw new Error("Resume parsing failed. Please upload a valid PDF.");
  }
}

module.exports = { parseResume };
