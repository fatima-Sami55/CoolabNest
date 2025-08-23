import dotenv from 'dotenv';
import { Ratelimit } from '@upstash/ratelimit';
import redis from '../config/redis.js';

dotenv.config();

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 m'),
});

const rateLimitMiddleware = async (req, res, next) => {
  const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';

  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return res.status(429).json({
      message: 'Too many requests. Please try again later.',
    });
  }

  next();
};

export default rateLimitMiddleware;
