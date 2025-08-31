const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // 1️⃣ Pehle cookies me check karo
  let token = req.cookies?.token;

  // 2️⃣ Agar header me hai to wahan se bhi le lo
  if (!token && req.header("Authorization")) {
    token = req.header("Authorization").replace("Bearer ", "").trim();
  }

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // decoded me user id/email hai
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
