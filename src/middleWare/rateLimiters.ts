import rateLimit from 'express-rate-limit';
import type { Request } from 'express';

// Helper to strip port numbers from IP if Nginx or proxies append them
const customKeyGenerator = (req: Request): string => {
  const clientIp = req.ip || req.socket.remoteAddress || '127.0.0.1';
  return clientIp.replace(/:\d+[^:]*$/, '');
};

// 1. Strict Limiter for sensitive endpoints (Login, Register, Forgot Password, Reset Password)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15-minute window
  limit: 5, // Limit each IP to 5 requests per window
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  keyGenerator: customKeyGenerator,
  message: {
    error: 'Too many attempt attempts from this IP, please try again after 15 minutes.',
  },
});

// 2. General Limiter for standard API routes (Products, Orders, Profile, etc.)
export const generalApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15-minute window
  limit: 100, // Limit each IP to 100 requests per window
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  keyGenerator: customKeyGenerator,
  message: {
    error: 'Too many requests. Please slow down.',
  },
});