import React, { useState } from "react";
import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // ✅ Frontend-only mock submit
    setTimeout(() => {
      setSuccess("Message submitted successfully!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-purple-100 via-white to-pink-50 text-gray-800 px-6 md:px-12 py-16 overflow-hidden">
      {/* Floating blobs */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply blur-3xl opacity-25"></div>
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply blur-3xl opacity-25"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold text-purple-700">
            Contact Us
          </h1>
          <p className="mt-4 text-gray-600">
            Questions, feedback, or inquiries? Send us a message below.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full p-3 border rounded-lg"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full p-3 border rounded-lg"
            />

            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              required
              className="w-full p-3 border rounded-lg"
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={5}
              required
              className="w-full p-3 border rounded-lg resize-none"
            />

            <button
              type="submit"
              disabled={loading}
              className={`bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Submitting..." : "Send Message"}
            </button>

            {success && (
              <p className="text-center text-green-600 font-medium">
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
