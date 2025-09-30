import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
        "http://localhost:3000/api/auth/register",
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
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 overflow-hidden px-4">
      {/* 🔥 Animated gradient blobs in background */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-slow"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-reverse"></div>

      {/* 🔥 Animated Register card */}
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 sm:p-10 relative z-10 transform transition-all duration-700 ease-out animate-fade-in-up">
        <h2 className="text-center text-3xl font-extrabold text-purple-700 mb-6">
          Create Your Jobscribe Account
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="relative">
            <label className="absolute -top-3 left-3 bg-white px-1 text-sm font-medium text-purple-600">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none transition"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <label className="absolute -top-3 left-3 bg-white px-1 text-sm font-medium text-purple-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none transition"
              placeholder="your@email.com"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="absolute -top-3 left-3 bg-white px-1 text-sm font-medium text-purple-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none transition"
              placeholder="••••••••"
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="absolute -top-3 left-3 bg-white px-1 text-sm font-medium text-purple-600">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength="6"
              className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none transition"
              placeholder="••••••••"
            />
          </div>

          {/* Error/Success messages */}
          {error && (
            <p className="text-sm text-red-600 bg-red-100 p-2 rounded-md animate-pulse">
              {error}
            </p>
          )}
          {success && (
            <p className="text-sm text-green-600 bg-green-100 p-2 rounded-md animate-pulse">
              {success}
            </p>
          )}

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:from-purple-700 hover:to-pink-700 transition transform hover:scale-105"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
