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
  res.send('profile editting route is working');
});

// ===== POST route =====
router.post('/', rateLimitMiddleware, upload.single('profilePicture'), validateSignup, async (req, res) => {

});


export default router;
