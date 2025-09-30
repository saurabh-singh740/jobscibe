import React, { useEffect, useState } from "react";
import ResumeUpload from "../components/ResumeUpload";
import OptimiseResume from "../components/Resume/OptimiseResume";
import KeywordMatch from "../components/keywordMatch";

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
      component: null, // no component for Job Search
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 overflow-hidden py-16 px-6">
      {/* Gradient blobs */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
      <div className="absolute bottom-0 -right-32 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-slow"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-reverse"></div>

      <h2 className="relative text-3xl md:text-4xl font-bold text-center mb-12 text-white drop-shadow-lg animate-fadeIn">
        Explore Jobscribe Features
      </h2>

      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {features.map((feature, i) => (
          <div
            key={i}
            className="p-6 bg-gradient-to-br from-white/90 via-indigo-100/80 to-purple-100/80 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 flex flex-col"
            style={{ minHeight: "350px", maxHeight: "450px" }} // fixed height
          >
            <h3 className="text-xl font-semibold mb-3 text-indigo-900">{feature.title}</h3>

            {!isAuthenticated ? (
              <p className="text-red-500 font-medium">Login/Register to use this feature.</p>
            ) : (
              <>
                <p className="mb-4 text-gray-700">{feature.description}</p>

                {/* Scrollable content for all feature components */}
                {feature.component && (
                  <div className="overflow-y-auto h-full scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-indigo-100 rounded-lg p-2">
  <div className="flex flex-col space-y-4">
    {feature.component}
  </div>
</div>

                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
