import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Layout/Navbar.jsx"; // ✅ lowercase 'layout'
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Features from "./pages/feature.jsx"; // ✅ file ka naam capital hona chahiye

function AppRoutes() {
  return (
    <BrowserRouter>
      {/* Navbar har page pe visible */}
      <Navbar />
      <div className="pt-20">

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} /> {/* ✅ Features route */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppRoutes;
