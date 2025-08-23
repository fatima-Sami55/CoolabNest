import jwt from 'jsonwebtoken';
import redis from '../config/redis.js';

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if token exists in Redis
    const storedToken = await redis.get(`jwt:${decoded.id}`);
    if (!storedToken || storedToken !== token) {
      return res.status(401).json({ message: 'Token expired or revoked' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authMiddleware;
