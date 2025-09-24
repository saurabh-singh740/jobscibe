import React from "react";

const Home = () => {
  return (
    <div className="font-sans bg-gray-50 min-h-screen">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 animate-fadeIn">
            Optimize Your Resume & Find Perfect Jobs
          </h1>
          <p className="text-md sm:text-lg md:text-xl mb-8 animate-fadeIn delay-200">
            Jobscibe parses your resume, matches it with job descriptions, and helps you land your dream role.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300 animate-bounce">
              Upload Resume
            </button>
            <button className="bg-indigo-800 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300 animate-bounce delay-200">
              Search Jobs
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 animate-fadeIn">
          Why Jobscibe?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slideUp">
            <h3 className="text-xl font-semibold mb-2">Resume Parsing</h3>
            <p>Instantly extract key details from your CV to make it recruiter-ready.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slideUp delay-100">
            <h3 className="text-xl font-semibold mb-2">JD Comparison</h3>
            <p>Compare your resume with job descriptions to see how well you match.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slideUp delay-200">
            <h3 className="text-xl font-semibold mb-2">Keyword Optimization</h3>
            <p>Highlight important keywords to improve visibility in recruiter searches.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slideUp delay-300">
            <h3 className="text-xl font-semibold mb-2">Job Search</h3>
            <p>Find relevant jobs with real-time listings via the Jooble API integration.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slideUp delay-400">
            <h3 className="text-xl font-semibold mb-2">Insights & Tips</h3>
            <p>Get actionable suggestions to make your resume more impactful and ATS-friendly.</p>
          </div>
        </div>
      </section>

      {/* Job Search Call-to-Action */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 animate-fadeIn">
            Ready to Find Your Next Job?
          </h2>
          <p className="mb-6 animate-fadeIn delay-200">
            Upload your resume, optimize it, and start applying for top jobs today.
          </p>
          <button className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-500 transition-all duration-300 animate-bounce">
            Get Started
          </button>
        </div>
      </section>

      {/* Tailwind Animations */}
      <style>
        {`
          @keyframes fadeIn {
            0% {opacity: 0; transform: translateY(10px);}
            100% {opacity: 1; transform: translateY(0);}
          }
          .animate-fadeIn { animation: fadeIn 1s ease forwards; }
          .delay-200 { animation-delay: 0.2s; }
          .animate-slideUp { animation: fadeIn 0.8s ease forwards; }
          .animate-bounce { animation: bounce 2s infinite; }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
        `}
      </style>
    </div>
  );
};

export default Home;
