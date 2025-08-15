import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import User from '../../models/user.js';
import redis from '../../config/redis.js';

const router = express.Router();
dotenv.config();

// ===== Email verification route =====
router.get('/', async (req, res) => {
  try {
    const { token, userId } = req.query;

    // Basic validation
    if (!token || !userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send('<h2>Invalid verification link.</h2>');
    }

    // Get token from Redis
    const storedToken = await redis.get(`emailVerify:${userId}`);
    if (!storedToken || storedToken !== token) {
      return res.status(400).send('<h2>Invalid or expired verification link.</h2>');
    }

    // Invalidate token first (race condition prevention)
    await redis.del(`emailVerify:${userId}`);

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('<h2>User not found.</h2>');
    }

    // Already verified
    if (user.isVerified) {
      return res.status(400).send('<h2>Email already verified.</h2>');
    }

    // Mark verified
    user.isVerified = true;
    await user.save();

    // Redirect to frontend success page
    res.redirect(`${process.env.REDIRECT_URL}`);

  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).send('<h2>Server error. Please try again later.</h2>');
  }
});


export default router;