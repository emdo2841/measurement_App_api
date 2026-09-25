import { rateLimit } from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import { redisClient } from './redisClient';

// Helper function to send commands safely
const sendCommand = (...args: string[]): Promise<any> =>
  redisClient.sendCommand(args);

// Public Limiter
export const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
  statusCode: 429,
  message: {
    status: 429,
    error: 'Too Many Requests',
    message: 'You have exceeded the request limit. Please try again later.',
  },
  ...(process.env.NODE_ENV === 'test'
   ? {}
   : {
       store: new RedisStore({
         sendCommand,
         prefix: 'rl:auth:',
       }),
     }),
});

// Auth Limiter
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  statusCode: 429,
  message: {
    status: 429,
    error: 'Too Many Requests',
    message: 'Too many authentication attempts. Account locked for 15 minutes.',
  },
  ...(process.env.NODE_ENV === 'test'
    ? {}
    : {
        store: new RedisStore({
          sendCommand,
          prefix: 'rl:public:',
        }),
      }),
});