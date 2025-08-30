const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    // Remove "Bearer " if token starts with it
    const jwtToken = token.startsWith("Bearer ")
      ? token.slice(7, token.length).trim()
      : token;

    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.user = decoded; // decoded me user ka id hota hai
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
