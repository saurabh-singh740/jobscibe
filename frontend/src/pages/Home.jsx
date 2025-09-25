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
    <div className="font-sans bg-indigo-50 min-h-screen">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-700 to-purple-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 animate-fadeIn">
            Optimize Your Resume & Land Your Dream Job
          </h1>
          <p className="text-md sm:text-lg md:text-xl mb-8 animate-fadeIn delay-200">
            Jobscibe parses your resume, matches it with job descriptions, and guides you to success.
          </p>
          {!isAuthenticated ? (
            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={() => navigate("/login")}
                className="bg-indigo-300 text-indigo-900 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-200 hover:translate-y-[-2px] transition-all duration-300"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-indigo-900 text-indigo-50 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-800 hover:translate-y-[-2px] transition-all duration-300"
              >
                Register
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/features")}
              className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-green-500 hover:translate-y-[-2px] transition-all duration-300"
            >
              Explore Features
            </button>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-indigo-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 animate-fadeIn">
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
                className="p-6 bg-indigo-200 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-500 text-center"
              >
                <h3 className="font-semibold text-lg mb-2 text-indigo-900">{feature.title}</h3>
                <p className="text-indigo-800">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-indigo-200 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 animate-fadeIn">Success Stories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="p-6 bg-indigo-300 rounded-lg shadow-md hover:scale-105 transition-transform duration-500">
              <p className="text-indigo-900">"Thanks to Jobscribe, I got interviews from top companies in just 2 weeks!"</p>
              <span className="block mt-4 font-semibold text-indigo-800">- Priya S.</span>
            </div>
            <div className="p-6 bg-indigo-300 rounded-lg shadow-md hover:scale-105 transition-transform duration-500">
              <p className="text-indigo-900">"Resume optimization never felt so easy. Highly recommended!"</p>
              <span className="block mt-4 font-semibold text-indigo-800">- Arjun K.</span>
            </div>
            <div className="p-6 bg-indigo-300 rounded-lg shadow-md hover:scale-105 transition-transform duration-500">
              <p className="text-indigo-900">"The job matching feature saved me hours of searching. Amazing tool!"</p>
              <span className="block mt-4 font-semibold text-indigo-800">- Sneha M.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-indigo-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 animate-fadeIn">Our Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="p-4 bg-indigo-200 rounded-lg shadow-md hover:scale-105 transition-transform duration-500">
              <h3 className="text-3xl font-bold text-indigo-900">500+</h3>
              <p className="text-indigo-800">Resumes Optimized</p>
            </div>
            <div className="p-4 bg-indigo-200 rounded-lg shadow-md hover:scale-105 transition-transform duration-500">
              <h3 className="text-3xl font-bold text-indigo-900">300+</h3>
              <p className="text-indigo-800">Jobs Matched</p>
            </div>
            <div className="p-4 bg-indigo-200 rounded-lg shadow-md hover:scale-105 transition-transform duration-500">
              <h3 className="text-3xl font-bold text-indigo-900">95%</h3>
              <p className="text-indigo-800">User Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-700 to-purple-800 py-16 text-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 animate-fadeIn">
          Ready to Take Your Career to the Next Level?
        </h2>
        {!isAuthenticated ? (
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => navigate("/login")}
              className="bg-indigo-300 text-indigo-900 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-indigo-200 hover:translate-y-[-2px] transition-all duration-300"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-green-500 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-green-400 hover:translate-y-[-2px] transition-all duration-300"
            >
              Register
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/features")}
            className="bg-indigo-300 text-indigo-900 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-indigo-200 hover:translate-y-[-2px] transition-all duration-300"
          >
            Explore Features
          </button>
        )}
      </section>
    </div>
  );
};

export default Home;
