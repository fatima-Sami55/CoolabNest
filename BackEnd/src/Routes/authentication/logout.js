import express from 'express';
import dotenv from 'dotenv';

import redis from '../../config/redis.js'; 
import authMiddleware from '../../middleware/jwtAuth.js';

const router = express.Router();
dotenv.config();


router.post('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; 

    // Delete token from Redis
    await redis.del(`jwt:${userId}`);

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;