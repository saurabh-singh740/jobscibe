import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // ✅ correct import

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // ✅ check if token is still valid
  const isTokenValid = (token) => {
    try {
      const decoded = jwtDecode(token);
      if (!decoded.exp) return false;
      return decoded.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  };

  // ✅ check on page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isTokenValid(token)) {
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    }
  }, []);

  // ✅ axios interceptor for expired token
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response && err.response.status === 401) {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          setError("⚠️ Session expired. Please login again.");
          navigate("/login");
        }
        return Promise.reject(err);
      }
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, [navigate]);

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
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-indigo-100 via-white to-indigo-50 px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 sm:p-10">
        <h2 className="text-center text-3xl font-extrabold text-indigo-700 mb-6">
          Jobscribe Login
        </h2>

        {isLoggedIn ? (
          <div className="space-y-6">
            <p className="text-center text-green-600 font-medium">
              ✅ You are logged in
            </p>
            <button
              onClick={handleLogout}
              className="w-full py-3 bg-red-500 text-white font-semibold rounded-xl shadow-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <form className="space-y-6" onSubmit={handleSubmit}>
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
                  className="w-full rounded-xl border px-4 py-3"
                  placeholder="your@email.com"
                />
              </div>

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
                  className="w-full rounded-xl border px-4 py-3"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-100 p-2 rounded-md">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:from-indigo-700 hover:to-indigo-800"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link to="/register" className="text-indigo-600 font-medium">
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
