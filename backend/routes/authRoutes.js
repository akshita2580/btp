const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // define name, email, password fields

// Register
router.post("/signup", async (req, res) => {
  try {
    console.log("Signup route hit ✅");
    console.log("Body =>", req.body);
    console.log("Content-Type =>", req.get('Content-Type'));
    console.log("Raw body type =>", typeof req.body);
    
    const { fullName, email, password } = req.body;
    
    // Validate required fields
    if (!fullName || !email || !password) {
      console.log("❌ Validation failed - missing fields");
      return res.status(400).json({ 
        msg: "Missing required fields",
        received: { fullName: !!fullName, email: !!email, password: !!password }
      });
    }

    console.log("✅ Fields validated, checking for existing user...");
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("❌ User already exists with email:", email);
      return res.status(400).json({ msg: "Email already in use" });
    }

    console.log("✅ No existing user, hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);
    
    console.log("✅ Creating new user...");
    const user = new User({ fullName, email, password: hashedPassword });
    
    console.log("✅ Saving user to database...");
    await user.save();

    console.log("✅ User registered successfully!");
    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error("❌ Signup error:", err);
    console.error("Error name:", err.name);
    console.error("Error message:", err.message);
    console.error("Error stack:", err.stack);
    
    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message).join(', ');
      return res.status(400).json({ msg: `Validation error: ${errors}`, error: errors });
    }
    
    // Handle duplicate key errors (unique constraint)
    if (err.code === 11000) {
      return res.status(400).json({ msg: "Email already in use" });
    }
    
    res.status(500).json({ msg: err.message || "Internal server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user: { id: user._id, fullName: user.fullName, email: user.email } });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
