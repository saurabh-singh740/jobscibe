import React, { useEffect, useState } from "react";
import ResumeUpload from "../components/ResumeUpload";
import OptimiseResume from "../components/Resume/OptimiseResume";
import KeywordMatch from "../components/KeywordMatch";

const Features = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [resumeId, setResumeId] = useState(null);
  const [parsedSkills, setParsedSkills] = useState([]);
  const [parsedText, setParsedText] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const features = [
    {
      title: "Resume Parsing",
      description: "Instantly extract key details from your CV to make it recruiter-ready.",
      component: <ResumeUpload setResumeId={setResumeId} setParsedSkills={setParsedSkills} setParsedText={setParsedText} />,
    },
    {
      title: "Optimise Resume",
      description: "Enhance your resume by identifying strengths and gaps for better alignment with job requirements.",
      component: <OptimiseResume resumeId={resumeId} parsedSkills={parsedSkills} />,
    },
    {
      title: "Keyword Matching",
      description: "Check how well your resume content matches with job description keywords to boost shortlisting chances.",
      component: <KeywordMatch parsedSkills={parsedSkills} parsedText={parsedText} />,
    },
    {
      title: "Job Search",
      description: "Find relevant jobs with real-time listings via the Jooble API integration.",
    },
    {
      title: "Insights & Tips",
      description: "Get actionable suggestions to make your resume more impactful and ATS-friendly.",
    },
  ];

  return (
    <div className="bg-indigo-50 min-h-screen py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-900 animate-fadeIn">
        Explore Jobscribe Features
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <div
            key={i}
            className="p-6 bg-indigo-200 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500"
          >
            <h3 className="text-xl font-semibold mb-3 text-indigo-900">{feature.title}</h3>
            {!isAuthenticated ? (
              <p className="text-red-500 font-medium">Login/Register to use this feature.</p>
            ) : (
              <>
                <p className="mb-4 text-indigo-900">{feature.description}</p>
                {feature.component}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
