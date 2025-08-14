import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import crypto from 'crypto';

import User from '../../models/user.js';
import upload from '../../config/multer.js';
import rateLimitMiddleware from '../../middleware/rateLimiter.js';
import validateSignup from '../../middleware/validateSignup.js';
import uploadToCloudinary from '../../helpers/uploadToCloudinary.js';
import redis from '../../config/redis.js';
import sendVerificationEmail from '../../helpers/sendVerificationEmail.js';

const router = express.Router();
dotenv.config();


// ===== GET route =====
router.get('/', (req, res) => {
  res.send('Signup route is working');
});

// ===== POST route =====
router.post('/', rateLimitMiddleware, upload.single('profilePicture'), validateSignup, async (req, res) => {
  try {
      const { email, password, school, experience, userName } = req.body;

      // Check if email exists
      if (await User.findOne({ email })) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      // Check if username exists
      if (await User.findOne({ userName })) {
        return res.status(400).json({ message: 'User Name already registered' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Upload image to Cloudinary
      let imageUrl = '';
      if (req.file) {
        imageUrl = await uploadToCloudinary(
          req.file.buffer,
          'profile_pictures_CollabNest'
        );
      }

      // Save new user
      const newUser = await User.create({
        email,
        password: hashedPassword,
        profilePicture: imageUrl,
        school,
        experience,
        userName
      });

      // Generate JWT
      const token = jwt.sign(
        { id: newUser._id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      // Store token in Redis for session validation
      await redis.set(`jwt:${newUser._id}`, token, {
      EX: 60 * 60 * 24 * 7 // 7 days in seconds
      });

      const emailToken = crypto.randomBytes(32).toString('hex');
      await redis.set(`emailVerify:${newUser._id}`, emailToken, { EX: 60 * 60 * 24 }); // 24h

      // Send verification email
      await sendVerificationEmail(newUser.email, newUser.userName, emailToken, newUser._id);


      // Respond (exclude password)
      res.status(201).json({
        message: 'User registered successfully',
        token,
        user: {
          id: newUser._id,
          email: newUser.email,
          userName: newUser.userName,
          profilePicture: newUser.profilePicture,
          school: newUser.school,
          experience: newUser.experience
        }
      });

    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// ===== Email verification route =====
router.get('/verify-email', async (req, res) => {
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
