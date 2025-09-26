import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // check if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
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
        navigate("/"); // redirect after login
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
    navigate("/login"); // stay on login page
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-indigo-100 via-white to-indigo-50 px-4">
      <div className="w-full max-w-md bg-white backdrop-blur-md shadow-2xl rounded-3xl p-8 sm:p-10 transition-transform transform hover:scale-105 duration-500">
        <h2 className="text-center text-3xl font-extrabold text-indigo-700 mb-6 animate-pulse">
          Jobscribe Login
        </h2>

        {isLoggedIn ? (
          <div className="space-y-6">
            <p className="text-center text-green-600 font-medium">
              ✅ You are logged in
            </p>
            <button
              onClick={handleLogout}
              className="w-full py-3 bg-red-500 text-white font-semibold rounded-xl shadow-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <form className="space-y-6" onSubmit={handleSubmit}>
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

              {/* Error message */}
              {error && (
                <p className="text-sm text-red-600 bg-red-100 p-2 rounded-md animate-shake">
                  {error}
                </p>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 transform hover:scale-105"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-indigo-600 font-medium hover:underline"
              >
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
