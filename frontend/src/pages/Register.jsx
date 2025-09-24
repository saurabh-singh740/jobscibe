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
        setTimeout(() => navigate("/"), 1000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-indigo-100 via-white to-indigo-50 px-4">
      <div className="w-full max-w-md bg-white backdrop-blur-md shadow-2xl rounded-3xl p-8 sm:p-10 transition-transform transform hover:scale-105 duration-500">
        <h2 className="text-center text-3xl font-extrabold text-indigo-700 mb-6 animate-pulse">
          Create Your Jobscribe Account
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="relative">
            <label className="absolute -top-3 left-3 bg-white px-1 text-sm font-medium text-indigo-600">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-indigo-500 focus:ring focus:ring-indigo-100 focus:ring-opacity-50 transition"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <label className="absolute -top-3 left-3 bg-white px-1 text-sm font-medium text-indigo-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-indigo-500 focus:ring focus:ring-indigo-100 focus:ring-opacity-50 transition"
              placeholder="your@email.com"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="absolute -top-3 left-3 bg-white px-1 text-sm font-medium text-indigo-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-indigo-500 focus:ring focus:ring-indigo-100 focus:ring-opacity-50 transition"
              placeholder="••••••••"
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="absolute -top-3 left-3 bg-white px-1 text-sm font-medium text-indigo-600">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength="6"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-indigo-500 focus:ring focus:ring-indigo-100 focus:ring-opacity-50 transition"
              placeholder="••••••••"
            />
          </div>

          {/* Error/Success messages */}
          {error && (
            <p className="text-sm text-red-600 bg-red-100 p-2 rounded-md animate-shake">
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
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 transform hover:scale-105"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
