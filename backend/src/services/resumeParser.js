const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

// ---------------- Master Skill List ---------------- //
const skillsList = [
  "JavaScript","TypeScript","Python","Java","C","C++","C#","Go","Rust","Ruby","Kotlin","Swift","PHP","Scala","Perl","R","MATLAB","Dart","Haskell","Elixir","F#","Lua","Julia","Shell","PowerShell","VB.NET",
  "React","Redux","Next.js","Vue.js","Angular","Svelte","Ember.js","Backbone.js","jQuery","Bootstrap","Tailwind","Material UI","Chakra UI","Ant Design","Sass","Less","CSS","HTML","React Native","Flutter","SwiftUI","Jetpack Compose",
  "Node.js","Express","NestJS","Django","Flask","Spring","Spring Boot","FastAPI","Laravel","Rails","ASP.NET","GraphQL","REST API","Socket.IO","Microservices","Serverless","Firebase Functions","AWS Lambda",
  "MongoDB","MySQL","PostgreSQL","SQL Server","SQLite","Redis","Cassandra","OracleDB","MariaDB","DynamoDB","Neo4j","ElasticSearch","InfluxDB","Firebase Realtime DB","Firebase Firestore","CockroachDB","BigQuery",
  "AWS","Azure","GCP","Docker","Kubernetes","Terraform","Ansible","Chef","Puppet","Jenkins","CircleCI","GitHub Actions","Linux","Nginx","Apache",
  "Machine Learning","Deep Learning","AI","TensorFlow","PyTorch","Scikit-learn","Keras","Pandas","NumPy","Matplotlib","Seaborn","OpenCV","NLP","HuggingFace","FastText","XGBoost","LightGBM","CatBoost",
  "JUnit","TestNG","Selenium","Cypress","Jest","Mocha","Chai","Playwright","PyTest","Karma","Enzyme","Mockito","Cucumber","Postman","SoapUI","LoadRunner","JMeter",
  "Git","GitHub","GitLab","Bitbucket","SVN","Agile","Scrum","Kanban","JIRA","Trello","Asana","Figma","Wireframing","System Design",
  "VS Code","SQL"
];

// ---------------- Extractors ---------------- //
function extractEmail(text) {
  const match = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/);
  return match ? match[0] : null;
}

function extractPhone(text) {
  const match = text.match(/(\+?\d{1,3}[-.\s]?)?\d{10,15}/);
  return match ? match[0] : null;
}

function extractLinks(text) {
  const regex = /(https?:\/\/[^\s]+)/g;
  return text.match(regex) || [];
}

function extractEducation(text) {
  const eduKeywords = ["B.Tech", "B.E", "M.Tech", "MCA", "B.Sc", "M.Sc", "PhD", "Bachelor", "Master"];
  return eduKeywords.filter(edu => text.toLowerCase().includes(edu.toLowerCase()));
}

function extractExperience(text) {
  const match = text.match(/(\d+)\+?\s+(years?|yrs?)\s+(of)?\s*experience/i);
  return match ? match[0] : null;
}

// ---------------- Skills Extractor ---------------- //
function extractSkills(text) {
  text = text.replace(/\r\n/g, "\n").replace(/\n+/g, "\n").trim();

  // Capture skills section robustly
  const skillsSectionRegex = /(skills|technical skills|programming skills)[\s\S]*?(?=experience|education|projects|certifications|$)/i;
  const sectionMatch = text.match(skillsSectionRegex);
  let skillsText = sectionMatch ? sectionMatch[0] : text;

  // Split by comma, slash, " / ", or capital letters followed by lowercase letters (for combined words)
  let rawSkills = skillsText
    .replace(/[-•]/g, " ") // remove bullets
    .split(/[,\/]|(?=[A-Z][a-z]+)| {2,}/) 
    .map(s => s.trim())
    .filter(Boolean);

  const aliasMap = {
  // Programming Languages
  "js": "JavaScript",
  "javascript": "JavaScript",
  "ts": "TypeScript",
  "nodejs": "Node.js",
  "node": "Node.js",
  "py": "Python",
  "csharp": "C#",
  "c#": "C#",
  "cpp": "C++",
  "c++": "C++",
  "vb": "VB.NET",
  "vb.net": "VB.NET",
  "r": "R",
  "matlab": "MATLAB",
  "golang": "Go",
  "php": "PHP",
  "html": "HTML",
  "css": "CSS",
  "sql": "SQL",

  // Frameworks / Libraries
  "reactjs": "React",
  "react": "React",
  "reduxjs": "Redux",
  "node.js": "Node.js",
  "expressjs": "Express",
  "nestjs": "NestJS",
  "django": "Django",
  "flask": "Flask",
  "springboot": "Spring Boot",
  "spring": "Spring",
  "fastapi": "FastAPI",
  "laravel": "Laravel",
  "rails": "Rails",
  "asp.net": "ASP.NET",
  "vue": "Vue.js",
  "angularjs": "Angular",
  "angular": "Angular",
  "svelte": "Svelte",
  "react native": "React Native",
  "flutter": "Flutter",
  "swiftui": "SwiftUI",
  "jetpack compose": "Jetpack Compose",

  // Tools / Platforms
  "vs code": "VS Code",
  "vscode": "VS Code",
  "git": "Git",
  "github": "GitHub",
  "gitlab": "GitLab",
  "bitbucket": "Bitbucket",
  "sql server": "SQL Server",
  "postgres": "PostgreSQL",
  "postgresql": "PostgreSQL",
  "mysql": "MySQL",
  "mongodb": "MongoDB",
  "redis": "Redis",
  "cassandra": "Cassandra",
  "oracle": "OracleDB",
  "mariadb": "MariaDB",
  "dynamodb": "DynamoDB",
  "neo4j": "Neo4j",
  "elasticsearch": "ElasticSearch",
  "influxdb": "InfluxDB",
  "firebase": "Firebase Firestore",

  // UI / CSS / Frontend
  "mui": "Material UI",
  "chakra": "Chakra UI",
  "ant design": "Ant Design",
  "bootstrap": "Bootstrap",
  "tailwind": "Tailwind",
  "sass": "Sass",
  "less": "Less",

  // AI / ML / Data
  "tensorflow": "TensorFlow",
  "pytorch": "PyTorch",
  "scikit": "Scikit-learn",
  "scikit-learn": "Scikit-learn",
  "keras": "Keras",
  "pandas": "Pandas",
  "numpy": "NumPy",
  "matplotlib": "Matplotlib",
  "seaborn": "Seaborn",
  "opencv": "OpenCV",
  "nlp": "NLP",
  "huggingface": "HuggingFace",
  "xgboost": "XGBoost",
  "lightgbm": "LightGBM",
  "catboost": "CatBoost",

  // Testing
  "junit": "JUnit",
  "testng": "TestNG",
  "selenium": "Selenium",
  "cypress": "Cypress",
  "jest": "Jest",
  "mocha": "Mocha",
  "chai": "Chai",
  "playwright": "Playwright",
  "pytest": "PyTest",
  "karma": "Karma",
  "enzyme": "Enzyme",
  "mockito": "Mockito",
  "cucumber": "Cucumber",
  "postman": "Postman",
  "soapui": "SoapUI",
  "loadrunner": "LoadRunner",
  "jmeter": "JMeter",

  // Others
  "agile": "Agile",
  "scrum": "Scrum",
  "kanban": "Kanban",
  "jira": "JIRA",
  "trello": "Trello",
  "asana": "Asana",
  "figma": "Figma",
  "wireframing": "Wireframing",
  "system design": "System Design",
  "aws": "AWS",
  "azure": "Azure",
  "gcp": "GCP",
  "docker": "Docker",
  "k8s": "Kubernetes",
  "kubernetes": "Kubernetes",
  "terraform": "Terraform",
  "ansible": "Ansible",
  "chef": "Chef",
  "puppet": "Puppet",
  "jenkins": "Jenkins",
  "circleci": "CircleCI"
};


  const normalized = [...new Set(
    rawSkills.map(s => aliasMap[s.toLowerCase()] || s)
  )];

  // Filter against master list case-insensitively
  return normalized.filter(skill => skillsList.some(master => master.toLowerCase() === skill.toLowerCase()));
}



// ---------------- Parser ---------------- //
async function parseResume(buffer, fileType) {
  try {
    let text = "";

    if (fileType === "pdf") {
      const data = await pdfParse(buffer);
      text = data.text;
    } else if (fileType === "docx" || fileType === "doc") {
      const data = await mammoth.extractRawText({ buffer });
      text = data.value;
    } else {
      throw new Error("Unsupported file type. Only PDF or DOC/DOCX allowed.");
    }

    text = text.replace(/\s+/g, " ").trim();

    return {
      rawText: text,
      email: extractEmail(text),
      phone: extractPhone(text),
      links: extractLinks(text),
      skills: extractSkills(text),
      education: extractEducation(text),
      experience: extractExperience(text),
    };
  } catch (err) {
    console.error("❌ Error parsing resume:", err.message);
    throw new Error("Resume parsing failed. Please upload a valid PDF or Word document.");
  }
}

module.exports = { parseResume };
