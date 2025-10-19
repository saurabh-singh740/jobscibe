import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "https://jobscibe.onrender.com//api/auth/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );

      if (res.status === 201 || res.status === 200) {
        setSuccess("Account created successfully! Redirecting...");
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
        setTimeout(() => navigate("/"), 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 
    bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-gray-100">

      {/* ✨ Floating gradient orbs */}
      <div className="absolute top-[-10rem] left-[-5rem] w-80 h-80 bg-indigo-500/40 rounded-full blur-[100px] animate-[float_8s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-[-10rem] right-[-5rem] w-96 h-96 bg-pink-500/40 rounded-full blur-[120px] animate-[float-rev_10s_ease-in-out_infinite]"></div>

      {/* 🌌 Floating Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md relative z-10 bg-white/10 backdrop-blur-xl border border-white/20
        rounded-3xl shadow-[0_0_40px_rgba(99,102,241,0.3)] p-8 sm:p-10"
      >
        <h2 className="text-center text-3xl font-extrabold bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent mb-8">
          Create Your JobScribe Account
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="relative">
            <label className="absolute -top-3 left-3 bg-transparent text-sm font-medium text-indigo-300">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl bg-white/5 border border-white/20 px-4 py-3 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 outline-none transition"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <label className="absolute -top-3 left-3 bg-transparent text-sm font-medium text-indigo-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl bg-white/5 border border-white/20 px-4 py-3 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 outline-none transition"
              placeholder="your@email.com"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="absolute -top-3 left-3 bg-transparent text-sm font-medium text-indigo-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              className="w-full rounded-xl bg-white/5 border border-white/20 px-4 py-3 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 outline-none transition"
              placeholder="••••••••"
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="absolute -top-3 left-3 bg-transparent text-sm font-medium text-indigo-300">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength="6"
              className="w-full rounded-xl bg-white/5 border border-white/20 px-4 py-3 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 outline-none transition"
              placeholder="••••••••"
            />
          </div>

          {/* Error / Success */}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-400 bg-red-900/30 p-2 rounded-md"
            >
              {error}
            </motion.p>
          )}
          {success && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-green-400 bg-green-900/30 p-2 rounded-md"
            >
              {success}
            </motion.p>
          )}

          {/* Register Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_20px_rgba(99,102,241,0.5)] 
            hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] transition-all"
          >
            {loading ? "Registering..." : "Register"}
          </motion.button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 font-medium hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Register;
