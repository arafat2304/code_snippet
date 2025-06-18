const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/user");
const dotenv = require("dotenv");
const verifyToken = require("../meadlewear/userAuth.js");
dotenv.config()


const router = express.Router();
const secret =process.env.JWT_SECRET;

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if(!name || !email || !password){
    res.status(500).json("all field is required");
  }

  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "Email already in use." });

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json("signup succesfully");
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

    if(!email || !password){
        res.status(201).json("all field is required");
    }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: "7d" });
    res.cookie("token",token);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: "Server error" });
  }
});

// GET /api/auth/user for logout 
router.get("/logout",verifyToken ,(req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // change to true in production with HTTPS
    })
    .json({ msg: "Logged out successfully" });
});


module.exports = router;
