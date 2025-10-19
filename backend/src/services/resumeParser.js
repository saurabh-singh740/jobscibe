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
  "Git","GitHub","GitLab","Bitbucket","SVN","Agile","Scrum","Kanban","JIRA","Trello","Asana","Figma","Wireframing","System Design","MongoDB","framer motion",
  "Pinecone",     
  "Weaviate",      
  "Milvus",        
  "Qdrant",       
  "FAISS" ,
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

  // Split by comma, slash, bullets, multiple spaces
  let rawSkills = skillsText
    .replace(/[-•]/g, " ")
    .split(/[,\/]|(?=[A-Z][a-z]+)| {2,}/)
    .map(s => s.trim())
    .filter(Boolean);


 const aliasMap = {
  // Programming Languages
  "js": "JavaScript",
  "javascript": "JavaScript",
  "typescript": "TypeScript",
  "ts": "TypeScript",
  "python": "Python",
  "py": "Python",
  "java": "Java",
  "c": "C",
  "c++": "C++",
  "cpp": "C++",
  "c#": "C#",
  "csharp": "C#",
  "go": "Go",
  "golang": "Go",
  "rust": "Rust",
  "ruby": "Ruby",
  "kotlin": "Kotlin",
  "swift": "Swift",
  "php": "PHP",
  "scala": "Scala",
  "perl": "Perl",
  "r": "R",
  "matlab": "MATLAB",
  "dart": "Dart",
  "haskell": "Haskell",
  "elixir": "Elixir",
  "f#": "F#",
  "lua": "Lua",
  "julia": "Julia",
  "shell": "Shell",
  "bash": "Shell",
  "powershell": "PowerShell",
  "vb": "VB.NET",
  "vb.net": "VB.NET",

  // Frontend Frameworks / Libraries
  "react.js": "React",
  "reactjs": "React",
  "react": "React",
  "tailwind css": "Tailwind",
  "tailwind": "Tailwind",
  "framer motion": "Framer Motion",
  "reduxjs": "Redux",
  "redux": "Redux",
  "next": "Next.js",
  "next.js": "Next.js",
  "vue": "Vue.js",
  "vuejs": "Vue.js",
  "angularjs": "Angular",
  "angular": "Angular",
  "svelte": "Svelte",
  "ember": "Ember.js",
  "emberjs": "Ember.js",
  "backbone": "Backbone.js",
  "backbonejs": "Backbone.js",
  "jquery": "jQuery",
  "bootstrap": "Bootstrap",
  "tailwind": "Tailwind",
  "material ui": "Material UI",
  "mui": "Material UI",
  "chakra": "Chakra UI",
  "chakra ui": "Chakra UI",
  "ant design": "Ant Design",
  "sass": "Sass",
  "scss": "Sass",
  "less": "Less",
  "css": "CSS",
  "html": "HTML",
  "react native": "React Native",
  "rn": "React Native",
  "flutter": "Flutter",
  "swiftui": "SwiftUI",
  "jetpack compose": "Jetpack Compose",

  // Backend / Fullstack
  "nodejs": "Node.js",
  "node": "Node.js",
  "node.js": "Node.js",
  "expressjs": "Express",
  "express": "Express",
  "nestjs": "NestJS",
  "django": "Django",
  "flask": "Flask",
  "spring": "Spring",
  "springboot": "Spring Boot",
  "spring boot": "Spring Boot",
  "fastapi": "FastAPI",
  "laravel": "Laravel",
  "rails": "Rails",
  "ruby on rails": "Rails",
  "asp.net": "ASP.NET",
  "graphql": "GraphQL",
  "rest": "REST API",
  "rest api": "REST API",
  "socket.io": "Socket.IO",
  "microservices": "Microservices",
  "serverless": "Serverless",
  "firebase functions": "Firebase Functions",
  "aws lambda": "AWS Lambda",

  // Databases
  "mysql": "MySQL",
  "postgres": "PostgreSQL",
  "postgresql": "PostgreSQL",
  "sql server": "SQL Server",
  "sqlite": "SQLite",
  "mongodb": "MongoDB",
  "redis": "Redis",
  "cassandra": "Cassandra",
  "oracle": "OracleDB",
  "oracle db": "OracleDB",
  "mariadb": "MariaDB",
  "dynamodb": "DynamoDB",
  "neo4j": "Neo4j",
  "elasticsearch": "ElasticSearch",
  "influxdb": "InfluxDB",
  "firebase": "Firebase Firestore",
  "firebase firestore": "Firebase Firestore",
  "firebase realtime db": "Firebase Realtime DB",
  "cockroachdb": "CockroachDB",
  "bigquery": "BigQuery",
   "pinecone": "Pinecone",
  "weaviate": "Weaviate",
  "milvus": "Milvus",
  "qdrant": "Qdrant",
  "faiss": "FAISS",

  // Cloud / DevOps
  "aws": "AWS",
  "amazon web services": "AWS",
  "azure": "Azure",
  "gcp": "GCP",
  "google cloud": "GCP",
  "docker": "Docker",
  "k8s": "Kubernetes",
  "kubernetes": "Kubernetes",
  "terraform": "Terraform",
  "ansible": "Ansible",
  "chef": "Chef",
  "puppet": "Puppet",
  "jenkins": "Jenkins",
  "circleci": "CircleCI",
  "github actions": "GitHub Actions",
  "linux": "Linux",
  "nginx": "Nginx",
  "apache": "Apache",

  // AI / ML / Data Science
  "machine learning": "Machine Learning",
  "ml": "Machine Learning",
  "deep learning": "Deep Learning",
  "ai": "AI",
  "tensorflow": "TensorFlow",
  "tf": "TensorFlow",
  "pytorch": "PyTorch",
  "torch": "PyTorch",
  "scikit-learn": "Scikit-learn",
  "sklearn": "Scikit-learn",
  "keras": "Keras",
  "pandas": "Pandas",
  "numpy": "NumPy",
  "np": "NumPy",
  "matplotlib": "Matplotlib",
  "plt": "Matplotlib",
  "seaborn": "Seaborn",
  "opencv": "OpenCV",
  "cv2": "OpenCV",
  "nlp": "NLP",
  "huggingface": "HuggingFace",
  "xgboost": "XGBoost",
  "lightgbm": "LightGBM",
  "catboost": "CatBoost",
  "fasttext": "FastText",

  // Testing / QA
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

  // Project management / Tools
  "git": "Git",
  "github": "GitHub",
  "gitlab": "GitLab",
  "bitbucket": "Bitbucket",
  "svn": "SVN",
  "agile": "Agile",
  "scrum": "Scrum",
  "kanban": "Kanban",
  "jira": "JIRA",
  "trello": "Trello",
  "asana": "Asana",
  "figma": "Figma",
  "wireframing": "Wireframing",
  "system design": "System Design",
  "vs code": "VS Code",
  "vscode": "VS Code",
  "sql": "SQL"
};


 const normalized = [...new Set(
    rawSkills.map(s => aliasMap[s.toLowerCase()] || s)
  )];

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
