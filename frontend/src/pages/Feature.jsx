import React, { useEffect, useState } from "react";
import ResumeUpload from "../components/ResumeUpload";

const Features = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const features = [
    {
      title: "Resume Parsing",
      description: "Instantly extract key details from your CV to make it recruiter-ready.",
      component: <ResumeUpload />,
    },
    {
      title: "JD Comparison",
      description: "Compare your resume with job descriptions to see how well you match.",
    },
    {
      title: "Keyword Optimization",
      description: "Highlight important keywords to improve visibility in recruiter searches.",
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
        Explore Jobscibe Features
      </h2>

      {/* Feature Cards */}
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
                {feature.component && feature.component}
              </>
            )}
          </div>
        ))}
      </div>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="mt-16 bg-gradient-to-r from-indigo-700 to-purple-800 py-12 text-center rounded-xl shadow-lg animate-fadeIn">
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => window.location.href = "/login"}
              className="bg-indigo-300 text-indigo-900 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-indigo-200 hover:-translate-y-1 transition-all duration-300"
            >
              Login
            </button>
            <button
              onClick={() => window.location.href = "/register"}
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-green-400 hover:-translate-y-1 transition-all duration-300"
            >
              Register
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Features;
