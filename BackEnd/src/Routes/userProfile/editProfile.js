import express from 'express';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

import User from '../../models/user.js';
import upload from '../../config/multer.js';
import rateLimitMiddleware from '../../middleware/rateLimiter.js';
import validateSignup from '../../middleware/validateSignup.js';
import uploadToCloudinary from '../../helpers/uploadToCloudinary.js';
import sendVerificationEmail from '../../helpers/sendVerificationEmail.js';
import authMiddleware from '../../middleware/jwtAuth.js';

const router = express.Router();
dotenv.config();


// ===== GET route =====
router.get('/', (req, res) => {
  res.send('profile editting route is working');
});

// ===== POST route =====
router.put( '/', rateLimitMiddleware, authMiddleware , validateSignup, upload.single('profilePicture'), async (req, res) => {
    try {
      const userId = req.user.id;
      const {
        email,
        password,
        school,
        experience,
        userName,
        country,
        bio,
        skills,
        github,
        linkedin
      } = req.body;

      // Find user
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check unique email (ignore current user)
      if (email && email !== user.email) {
        const emailExists = await User.findOne({ email });
        if (emailExists) {
          return res.status(400).json({ message: 'Email already in use' });
        }
        user.email = email;
      }

      // Check unique username
      if (userName && userName !== user.userName) {
        const userNameExists = await User.findOne({ userName });
        if (userNameExists) {
          return res.status(400).json({ message: 'User Name already taken' });
        }
        user.userName = userName;
      }

      // Update password if provided
      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }

      // Upload new profile picture if provided
      if (req.file) {
        const imageUrl = await uploadToCloudinary(
          req.file.buffer,
          'profile_pictures_CollabNest'
        );
        user.profilePicture = imageUrl;
      }

      // Update other fields
      if (school) user.school = school;
      if (experience) user.experience = experience;
      if (country) user.country = country;
      if (bio) user.bio = bio;
      if (skills) user.skills = skills;
      if (github) user.github = github;
      if (linkedin) user.linkedin = linkedin;

      // Save updates
      await user.save();

      res.status(200).json({
        message: 'Profile updated successfully',
        user: {
          id: user._id,
          email: user.email,
          userName: user.userName,
          profilePicture: user.profilePicture,
          school: user.school,
          experience: user.experience,
          country: user.country,
          bio: user.bio,
          skills: user.skills,
          github: user.github,
          linkedin: user.linkedin
        }
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);


export default router;
