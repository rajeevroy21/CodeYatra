const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashed });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//me
router.get('/me', async(req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user=await User.findById(data.id).select('-password');
    if(!user) return res.status(404).json({message:"user not found"});
    res.json({ user});
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
});
// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  
  console.log('Login attempt:', { email, password });  // Debugging log

  const user = await User.findOne({ email });
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid email' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'Lax', 
    secure: false,   
    maxAge: 1 * 24 * 60 * 60 * 1000
  }).json({ message: 'Logged in', user });
});

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'Lax',
    secure: false 
  });
  res.json({ message: 'Logged out successfully' });
});
router.put("/update-profile/:id", async (req, res) => {
  const { name, email, password } = req.body;
  const userId = req.params.id;
  try {
    const user = await User.findById(userId); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Only check email uniqueness if email is being updated
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(400).json({
          message: "Email is already taken by another user"
        });
      }
      user.email = email;
    }

    // Update name if provided
    if (name) user.name = name;

    // Update password only if provided
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully"
    });

  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
