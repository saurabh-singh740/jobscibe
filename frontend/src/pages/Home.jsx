import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const features = [
  { title: "ATS-Friendly", desc: "Make your resume recruiter-ready with smart parsing." },
  { title: "Time Saver", desc: "Instant resume analysis saves hours of manual edits." },
  { title: "Career Growth", desc: "Get insights & suggestions to improve your prospects." },
  { title: "Smart Matching", desc: "See how well your resume fits real job descriptions." },
];

const testimonials = [
  { text: "Thanks to Jobscribe, I got interviews from top companies in just 2 weeks!", name: "Priya S." },
  { text: "Resume optimization never felt so easy. Highly recommended!", name: "Arjun K." },
  { text: "The job matching feature saved me hours of searching. Amazing tool!", name: "Sneha M." },
];

const stats = [
  { value: "500+", label: "Resumes Optimized" },
  { value: "300+", label: "Jobs Matched" },
  { value: "95%", label: "User Satisfaction" },
];

const aboutInfo = [
  { title: "Founded", desc: "Jobscribe was launched in 2025 with a vision to help millions of graduates & professionals." },
  { title: "Our Values", desc: "Simplicity, innovation, and accessibility are at the core of everything we build." },
  { title: "The Future", desc: "We’re building smarter AI-driven tools to redefine career growth globally." },
];

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div className="relative min-h-screen font-sans bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] overflow-hidden text-gray-100">

      {/* 🌟 Floating gradient blobs */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply blur-3xl opacity-25 animate-float-slow"></div>
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply blur-3xl opacity-25 animate-float"></div>
      <div className="absolute top-1/2 left-1/2 w-[28rem] h-[28rem] bg-yellow-300 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-float-reverse"></div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="text-center py-40">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-lg text-purple-400"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Optimize Your Resume & Land Your Dream Job
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-10 text-gray-200"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Jobscribe parses your resume, matches it with job descriptions, and guides you to success.
          </motion.p>

          {!isAuthenticated ? (
            <motion.div className="flex justify-center gap-4 flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
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
            </motion.div>
          ) : (
            <motion.button
              onClick={() => navigate("/features")}
              className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-green-400 transition"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Explore Features
            </motion.button>
          )}
        </section>

        {/* Features Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center text-purple-400 mb-12">Why Jobscribe?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="p-6 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.2 }}
              >
                <h3 className="font-semibold text-lg mb-2 text-purple-300">{feature.title}</h3>
                <p className="text-gray-200">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center text-purple-400 mb-12">Success Stories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="p-6 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.2 }}
              >
                <p className="text-gray-200 italic">"{t.text}"</p>
                <span className="block mt-4 font-semibold text-purple-300">- {t.name}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center text-purple-400 mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto px-6 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="p-6 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.2 }}
              >
                <h3 className="text-3xl font-bold text-purple-300">{stat.value}</h3>
                <p className="text-gray-200">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 bg-gradient-to-b from-white/10 via-white/20 to-white/10 backdrop-blur-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-400 mb-8 text-center">About Jobscribe</h2>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed text-center mb-12">
            Jobscribe was built with one mission: to simplify the job search process. From parsing your resume to optimizing it for ATS and matching it with real-world job postings, we empower job seekers with tools that actually work.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
            {aboutInfo.map((info, i) => (
              <motion.div
                key={i}
                className="p-6 bg-white/20 rounded-2xl shadow-lg hover:shadow-xl transition text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.2 }}
              >
                <h3 className="text-xl font-semibold text-purple-300 mb-2">{info.title}</h3>
                <p className="text-gray-200">{info.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 text-center">
          <h2 className="text-3xl font-bold text-purple-400 mb-6">
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
