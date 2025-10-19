import React from "react";
import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const journey = [
  { year: "2023", text: "Idea born to solve resume rejection struggles." },
  { year: "2024", text: "Developed AI-powered resume parsing & optimization." },
  { year: "2025", text: "Launched JobScribe with smart JD matching features." },
  { year: "Future", text: "Building global career tools with automation & AI." },
];

const testimonials = [
  { name: "Rohit Mehra", text: "JobScribe helped me crack interviews at top MNCs within weeks!" },
  { name: "Ananya Sharma", text: "The AI resume suggestions are a game-changer. Super helpful!" },
  { name: "Arjun Kapoor", text: "Smart JD matching saved me so much time while applying." },
];

const AboutPage = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.3 });

  React.useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [controls, inView]);

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen px-4 py-36 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-gray-100 overflow-hidden">
      
      {/* Floating gradient blobs */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply blur-3xl opacity-25 animate-float-slow"></div>
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply blur-3xl opacity-25 animate-float"></div>
      <div className="absolute top-1/2 left-1/2 w-[26rem] h-[26rem] bg-yellow-300 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-float-reverse"></div>

      <div className="relative z-10 w-full max-w-6xl">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in-up">
          <h1 className="text-3xl md:text-5xl font-extrabold text-purple-700 drop-shadow-sm">
            About JobScribe
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-300">
            Empowering professionals with AI-driven resume optimization and smart job matching.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mt-8 flex flex-col md:flex-row items-center gap-10">
          <div className="w-36 h-36 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden shadow-2xl ring-8 ring-white">
            <img
              src="/team.jpg"
              alt="Our Mission"
              className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-500"
            />
          </div>

          <div className="animate-fade-in-up delay-200 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-semibold text-purple-700 mb-3">
              Our Mission
            </h2>
            <p className="text-gray-300 leading-relaxed">
              At <span className="font-semibold">JobScribe</span>, we believe your career deserves the best tools. Our mission is to simplify job applications by making resumes ATS-friendly, providing actionable insights, and ensuring you stand out to recruiters.
            </p>
            <p className="mt-4 text-gray-400 italic">
              "Your dream job is just one optimized resume away."
            </p>

            {/* Social Links */}
            <div className="mt-6 flex justify-center md:justify-start space-x-6">
              <a href="https://github.com/saurabh-singh740" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-purple-700 transition text-2xl"><FaGithub /></a>
              <a href="https://instagram.com/saurabhsingh0.1" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-pink-500 transition text-2xl"><FaInstagram /></a>
              <a href="https://x.com/saurabhnxt/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition text-2xl"><FaTwitter /></a>
            </div>
          </div>
        </div>

        {/* Journey / Timeline */}
        <div className="mt-20 relative">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-700 mb-10">Our Journey</h2>
          <div className="relative space-y-16">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-purple-600"></div>
            {journey.map((item, i) => (
              <motion.div
                key={i}
                ref={ref}
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: -50 },
                  visible: { opacity: 1, y: 0, transition: { delay: i * 0.6, type: "spring", stiffness: 60 } },
                }}
                className="relative flex flex-col md:flex-row md:items-center md:justify-between md:space-x-8"
              >
                <motion.div
                  className="absolute -left-3 md:left-1/2 md:-translate-x-1/2 top-0 w-6 h-6 rotate-45 border-l-4 border-t-4 border-purple-600 z-10"
                  initial={{ scale: 0 }}
                  animate={controls}
                  variants={{
                    hidden: { scale: 0 },
                    visible: { scale: 1, transition: { delay: i * 0.6 } },
                  }}
                />
                <motion.div
                  className="mt-3 md:mt-0 md:w-5/12 bg-gray-800 rounded-lg shadow-md p-5 hover:shadow-xl transition transform hover:-translate-y-2"
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  animate={controls}
                  variants={{
                    hidden: { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
                    visible: { opacity: 1, x: 0, transition: { delay: i * 0.6 + 0.3 } },
                  }}
                >
                  <h3 className="font-semibold text-purple-400">{item.year}</h3>
                  <p className="text-gray-300 mt-1">{item.text}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-20 max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-700 mb-10">What Our Users Say</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {testimonials.map((review, i) => (
              <div
                key={i}
                className="bg-gray-800 rounded-xl shadow-md hover:shadow-xl p-6 flex flex-col transform hover:-translate-y-1 transition"
              >
                <p className="text-gray-300 italic mb-4">“{review.text}”</p>
                <h4 className="font-semibold text-purple-400">{review.name}</h4>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
