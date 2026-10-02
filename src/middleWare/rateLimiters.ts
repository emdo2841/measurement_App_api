import { rateLimit } from 'express-rate-limit';
import {
  RedisStore,
  type RedisReply,
} from 'rate-limit-redis';

import { redisClient } from './redisClient';

const sendCommand = (
  ...args: string[]
): Promise<RedisReply> => {
  return redisClient.sendCommand(args) as Promise<RedisReply>;
};

/**
 * General authenticated/public API limiter.
 *
 * 500 requests per 15 minutes per IP should be sufficient
 * for normal dashboard usage.
 */
export const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 500,

  standardHeaders: 'draft-8',
  legacyHeaders: false,

  statusCode: 429,

  message: {
    status: 429,
    error: 'Too Many Requests',
    message:
      'You have made too many requests. Please wait a few minutes and try again.',
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

/**
 * Authentication limiter.
 *
 * Successful authentication requests are not counted.
 * Failed login attempts are limited to 10 per 15 minutes.
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,

  standardHeaders: 'draft-8',
  legacyHeaders: false,

  skipSuccessfulRequests: true,

  statusCode: 429,

  message: {
    status: 429,
    error: 'Too Many Requests',
    message:
      'Too many failed authentication attempts. Please try again in 15 minutes.',
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