import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const isTokenValid = (token) => {
    try {
      const decoded = jwtDecode(token);
      if (!decoded.exp) return false;
      return decoded.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isTokenValid(token)) {
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response && err.response.status === 401) {
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 overflow-hidden px-4">
      {/* 🔥 Animated gradient blobs in background */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-slow"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-reverse"></div>

      {/* 🔥 Animated login card */}
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 sm:p-10 relative z-10 transform transition-all duration-700 ease-out animate-fade-in-up">
        <h2 className="text-center text-3xl font-extrabold text-purple-700 mb-6">
          Jobscribe Login
        </h2>

        {isLoggedIn ? (
          <div className="space-y-6">
            <p className="text-center text-green-600 font-medium">
              ✅ You are logged in
            </p>
            <button
              onClick={handleLogout}
              className="w-full py-3 bg-red-500 text-white font-semibold rounded-xl shadow-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <form className="space-y-6" onSubmit={handleSubmit}>
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

              {error && (
                <p className="text-sm text-red-600 bg-red-100 p-2 rounded-md animate-pulse">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:from-purple-700 hover:to-pink-700 transition transform hover:scale-105"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link to="/register" className="text-purple-600 font-medium">
                Register
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
