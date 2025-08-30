const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Helper to generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// Register
const registerUser = async (req, res) => {
  console.log(req.body);
  
  try {
    const { name, email, password } = req.body;

    // Check existing user
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = await User.create({
      name,   // ✅ schema field sahi match ho gaya
      email,
      password: hashedPassword,
    });
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
    res.cookie("token",token)

    res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Register Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};


// Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    // Compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Invalid Credentials" });


    const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
    res.cookie("token",token)

    // Send response
    res.status(200).json({
      message: "Login successful",
      token: generateToken(user),
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { registerUser, loginUser };
