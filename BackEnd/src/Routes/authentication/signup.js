import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
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
      const { email, password, school, experience, userName , country} = req.body;

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
      } else {
        imageUrl = 'https://res.cloudinary.com/dvm6ebpga/image/upload/v1755452660/profile_pictures_CollabNest/icon-7797704_640_sthahm.png'; 
      }

      const currentDate = new Date();

      // Save new user
      const newUser = await User.create({
        email,
        password: hashedPassword,
        profilePicture: imageUrl,
        school,
        experience,
        userName,
        joinedDate: currentDate,
        country
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


export default router;
