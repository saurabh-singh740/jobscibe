import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div className="relative min-h-screen font-sans bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 overflow-hidden">
      {/* 🔥 Floating gradient blobs for background */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-slow"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
      <div className="absolute top-1/2 left-1/2 w-[28rem] h-[28rem] bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-reverse"></div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="text-white py-24 text-center">
          <div className="max-w-3xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 animate-fade-in-up drop-shadow-lg">
              Optimize Your Resume & Land Your Dream Job
            </h1>
            <p className="text-lg md:text-xl mb-10 animate-fade-in-up delay-200">
              Jobscribe parses your resume, matches it with job descriptions, and
              guides you to success.
            </p>
            {!isAuthenticated ? (
              <div className="flex justify-center gap-4 flex-wrap">
                <button
                  onClick={() => navigate("/login")}
                  className="bg-white/80 text-purple-700 font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-white transition backdrop-blur-md"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-purple-800 transition"
                >
                  Register
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/features")}
                className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-green-400 transition"
              >
                Explore Features
              </button>
            )}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              Why Jobscribe?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { title: "ATS-Friendly", desc: "Make your resume recruiter-ready with smart parsing." },
                { title: "Time Saver", desc: "Instant resume analysis saves hours of manual edits." },
                { title: "Career Growth", desc: "Get insights & suggestions to improve your prospects." },
                { title: "Smart Matching", desc: "See how well your resume fits real job descriptions." },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500 text-center"
                >
                  <h3 className="font-semibold text-lg mb-2 text-purple-700">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-12">Success Stories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[
                { text: "Thanks to Jobscribe, I got interviews from top companies in just 2 weeks!", name: "Priya S." },
                { text: "Resume optimization never felt so easy. Highly recommended!", name: "Arjun K." },
                { text: "The job matching feature saved me hours of searching. Amazing tool!", name: "Sneha M." },
              ].map((t, i) => (
                <div
                  key={i}
                  className="p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
                >
                  <p className="text-gray-800">"{t.text}"</p>
                  <span className="block mt-4 font-semibold text-purple-700">- {t.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-12">Our Impact</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { value: "500+", label: "Resumes Optimized" },
                { value: "300+", label: "Jobs Matched" },
                { value: "95%", label: "User Satisfaction" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
                >
                  <h3 className="text-3xl font-bold text-purple-700">{stat.value}</h3>
                  <p className="text-gray-700">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 bg-gradient-to-b from-white/20 via-white/40 to-white/20 backdrop-blur-lg">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-8">
              About Jobscribe
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Jobscribe was built with one mission: to simplify the job search process.
              From parsing your resume to optimizing it for ATS and matching it with
              real-world job postings, we aim to empower job seekers with tools that
              actually work.
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Founded", desc: "Jobscribe was launched in 2025 with a vision to help millions of graduates & professionals." },
                { title: "Our Values", desc: "Simplicity, innovation, and accessibility are at the core of everything we build." },
                { title: "The Future", desc: "We’re building smarter AI-driven tools to redefine career growth globally." },
              ].map((info, i) => (
                <div
                  key={i}
                  className="p-6 bg-white/70 rounded-2xl shadow-md hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-semibold text-purple-700 mb-2">
                    {info.title}
                  </h3>
                  <p className="text-gray-600">{info.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Take Your Career to the Next Level?
          </h2>
          {!isAuthenticated ? (
            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={() => navigate("/login")}
                className="bg-white/80 text-purple-700 px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-white transition backdrop-blur-md"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-green-400 transition"
              >
                Register
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/features")}
              className="bg-white/80 text-purple-700 px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-white transition backdrop-blur-md"
            >
              Explore Features
            </button>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
