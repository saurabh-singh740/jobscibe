import React, { useState } from "react";
import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send(
        "service_x16cpnk", // service ID
        "template_bzt0uxd", // template ID
        formData,
        "3D4s8dXBVzSuUQ_S6" // public key
      );
      setSuccess("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setSuccess("Failed to send message. Please try again.");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-gray-100 px-6 md:px-12 py-32 overflow-hidden">

      {/* ✨ Floating gradient orbs */}
      <div className="absolute top-[-10rem] left-[-5rem] w-80 h-80 bg-indigo-500/40 rounded-full blur-[100px] animate-[float_8s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-[-10rem] right-[-5rem] w-96 h-96 bg-pink-500/40 rounded-full blur-[120px] animate-[float-rev_10s_ease-in-out_infinite]"></div>
      <div className="absolute top-1/2 left-1/2 w-[26rem] h-[26rem] bg-yellow-300/20 rounded-full blur-[120px] animate-[float_12s_ease-in-out_infinite]"></div>

      {/* 🌌 Floating Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-3xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-[0_0_40px_rgba(99,102,241,0.3)] p-8 sm:p-12"
      >
        <motion.div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="mt-4 text-gray-200 text-base md:text-lg">
            Questions, feedback, or inquiries? Send us a message below.
          </p>
        </motion.div>

        <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
          {["name", "email", "subject"].map((field) => (
            <motion.input
              key={field}
              type={field === "email" ? "email" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              required
              className="w-full p-3 bg-white/5 border border-white/20 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              whileFocus={{ scale: 1.02 }}
            />
          ))}

          <motion.textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            rows={5}
            required
            className="w-full p-3 bg-white/5 border border-white/20 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none transition"
          />

          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className={`w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] transition-all ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Sending..." : "Send Message"}
          </motion.button>

          {success && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`mt-4 text-center font-medium ${
                success.includes("successfully") ? "text-green-400" : "text-red-400"
              }`}
            >
              {success}
            </motion.p>
          )}
        </form>

        {/* Social Links */}
        <motion.div className="mt-8 flex justify-center space-x-6 text-2xl text-gray-100">
          <a
            href="https://github.com/saurabh-singh740"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://instagram.com/saurabhsingh0.1"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition"
          >
            <FaInstagram />
          </a>
          <a
            href="https://x.com/saurabhnxt/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            <FaTwitter />
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
