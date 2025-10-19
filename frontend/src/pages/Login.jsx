import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { motion } from "framer-motion";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // ✅ Check if token is valid
  const isTokenValid = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  };

  // ✅ On component mount, check token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isTokenValid(token)) {
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    }
  }, []);

  // ✅ Axios interceptor for session expiry
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          setError("⚠️ Session expired. Please login again.");
        }
        return Promise.reject(err);
      }
    );
    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Login handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email: formData.email, password: formData.password },
        { withCredentials: true }
      );
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        setIsLoggedIn(true);
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setFormData({ email: "", password: "" });
    navigate("/");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-gray-100">
      {/* Floating gradient orbs */}
      <div className="absolute top-[-10rem] left-[-5rem] w-80 h-80 bg-indigo-500/40 rounded-full blur-[100px] animate-[float_8s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-[-10rem] right-[-5rem] w-96 h-96 bg-pink-500/40 rounded-full blur-[120px] animate-[float-rev_10s_ease-in-out_infinite]"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-[0_0_40px_rgba(99,102,241,0.3)] p-8 sm:p-10"
      >
        <h2 className="text-center text-3xl font-extrabold bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent mb-8">
          Welcome Back to JobScribe
        </h2>

        {isLoggedIn ? (
          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-green-400 bg-green-900/30 p-2 rounded-md font-medium"
            >
              ✅ You are logged in
            </motion.p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={handleLogout}
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md hover:shadow-lg transition-all"
            >
              Logout
            </motion.button>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="relative">
              <label className="absolute -top-3 left-3 text-sm font-medium text-indigo-300 bg-transparent">
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
              <label className="absolute -top-3 left-3 text-sm font-medium text-indigo-300 bg-transparent">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full rounded-xl bg-white/5 border border-white/20 px-4 py-3 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 outline-none transition"
                placeholder="••••••••"
              />
            </div>

            {/* Error */}
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-red-400 bg-red-900/30 p-2 rounded-md"
              >
                {error}
              </motion.p>
            )}

            {/* Login Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md hover:shadow-lg transition-all"
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>

            {/* Footer */}
            <p className="mt-6 text-center text-sm text-gray-300">
              Don’t have an account?{" "}
              <Link to="/register" className="text-indigo-400 font-medium hover:underline">
                Register
              </Link>
            </p>
          </form>
        )}
      </motion.div>
    </div>
  );
}

export default Login;
