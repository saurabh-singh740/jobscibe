import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Star, Info, Phone, LogIn, UserPlus } from "lucide-react";

export default function FloatingNavbar() {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  const links = [
    { name: "Home", path: "/", icon: <Home size={20} /> },
    { name: "Features", path: "/features", icon: <Star size={20} /> },
    { name: "About", path: "/about", icon: <Info size={20} /> },
    { name: "Contact", path: "/contact", icon: <Phone size={20} /> },
    { name: "Login", path: "/login", icon: <LogIn size={20} /> },
    { name: "Register", path: "/register", icon: <UserPlus size={20} /> },
  ];

  return (
    <div className="fixed bottom-1 left-1/2 -translate-x-1/2 z-50 w-full px-4 sm:px-0">
      <nav className="flex items-center justify-center gap-3 sm:gap-6
        bg-gradient-to-r from-[#0f2027]/70 via-[#203a43]/70 to-[#2c5364]/70
        backdrop-blur-xl border border-white/20
        rounded-full shadow-[0_0_35px_rgba(79,70,229,0.25)]
        transition duration-500 mx-auto max-w-[95%] sm:max-w-max overflow-visible"
      >
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setActive(link.path)}
              className="relative flex-shrink-0 group"
            >
              <motion.div
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 1.05 }}
                animate={{
                  scale: isActive ? 1.3 : 1,
                  y: isActive ? -3 : 0,
                }}
                transition={{ type: "spring", stiffness: 350 }}
                className={`p-3 rounded-full flex items-center justify-center transition-all duration-300
                  ${isActive
                    ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-[0_0_25px_rgba(99,102,241,0.9)]"
                    : "bg-white/10 text-gray-200 hover:bg-indigo-500 hover:text-white hover:shadow-md"
                  }`}
              >
                {link.icon}
              </motion.div>
              <motion.span
                initial={{ opacity: 0, y: 5 }}
                whileHover={{ opacity: 1, y: -2 }}
                className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs sm:text-[0.65rem] text-gray-200 transition-all whitespace-nowrap"
              >
                {link.name}
              </motion.span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
