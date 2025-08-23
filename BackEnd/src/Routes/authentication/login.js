import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


import User from '../../models/user.js';
import redis from '../../config/redis.js'; 

const router = express.Router();
dotenv.config();


router.get('/', (req, res) => {
  res.send('Login route is working');
})

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    let exsistingToken = await redis.get(`jwt:${user._id}`);

    if (exsistingToken) {
     return res.status(400).json({ 
      message: 'You are already logged in. Please log out before logging in again.' 
     });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: 'Please verify your email before logging in' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Try to get existing JWT from Redis
    let token = await redis.get(`jwt:${user._id}`);
    
    // If no token found (expired or deleted), generate a new one
    if (!token) {
      token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      // Store in Redis
      await redis.set(`jwt:${user._id}`, token, { EX: 60 * 60 * 24 * 7 });
    }

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        userName: user.userName,
        profilePicture: user.profilePicture,
        school: user.school,
        experience: user.experience
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;


