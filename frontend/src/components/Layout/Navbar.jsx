import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-indigo-600">
          JobScribe
        </Link>

        {/* Desktop Links */}
        <div className="space-x-6 hidden md:flex">
          <Link to="/" className="text-gray-700 hover:text-indigo-600">
            Home
          </Link>
          <Link to="/features" className="text-gray-700 hover:text-indigo-600">
            Features
          </Link>
          <Link to="/login" className="text-gray-700 hover:text-indigo-600">
            Login
          </Link>
          <Link to="/register" className="text-gray-700 hover:text-indigo-600">
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 focus:outline-none text-2xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <Link
            to="/"
            className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/features"
            className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
            onClick={() => setIsOpen(false)}
          >
            Features
          </Link>
          <Link
            to="/login"
            className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
            onClick={() => setIsOpen(false)}
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
