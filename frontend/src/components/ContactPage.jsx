import React, { useState } from "react";
import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import emailjs from "emailjs-com";

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

    // EmailJS example, free, no backend needed
    try {
      await emailjs.send(
        "service_x16cpnk", // emailjs service ID
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
    <div className="relative min-h-screen bg-gradient-to-b from-purple-100 via-white to-pink-50 text-gray-800 px-6 md:px-12 py-16 overflow-hidden">
      {/* Floating blobs */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply blur-3xl opacity-25 animate-float-slow"></div>
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply blur-3xl opacity-25 animate-float"></div>
      <div className="absolute top-1/2 left-1/2 w-[26rem] h-[26rem] bg-yellow-300 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-float-reverse"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-3xl md:text-5xl font-extrabold text-purple-700 drop-shadow-sm">
            Contact Us
          </h1>
          <p className="mt-4 text-gray-600 text-base md:text-lg">
            Questions, feedback, or inquiries? Send us a message below.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 animate-fade-in-up">
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={5}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 resize-none"
            />

            <button
              type="submit"
              className={`bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {success && (
              <p
                className={`mt-4 text-center font-medium ${
                  success.includes("successfully") ? "text-green-600" : "text-red-600"
                }`}
              >
                {success}
              </p>
            )}
          </form>

          {/* Social Links */}
          <div className="mt-8 flex justify-center space-x-6">
            <a
              href="https://github.com/saurabh-singh740"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-purple-700 text-2xl"
            >
              <FaGithub />
            </a>
            <a
              href="https://instagram.com/saurabhsingh0.1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-pink-500 text-2xl"
            >
              <FaInstagram />
            </a>
            <a
              href="https://x.com/saurabhnxt/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-400 text-2xl"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
