"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authLimiter = exports.publicLimiter = void 0;
const express_rate_limit_1 = require("express-rate-limit");
const rate_limit_redis_1 = require("rate-limit-redis");
const redisClient_1 = require("./redisClient");
const sendCommand = (...args) => {
    return redisClient_1.redisClient.sendCommand(args);
};
/**
 * General authenticated/public API limiter.
 *
 * 500 requests per 15 minutes per IP should be sufficient
 * for normal dashboard usage.
 */
exports.publicLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000,
    limit: 500,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    statusCode: 429,
    message: {
        status: 429,
        error: 'Too Many Requests',
        message: 'You have made too many requests. Please wait a few minutes and try again.',
    },
    ...(process.env.NODE_ENV === 'test'
        ? {}
        : {
            store: new rate_limit_redis_1.RedisStore({
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
exports.authLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    statusCode: 429,
    message: {
        status: 429,
        error: 'Too Many Requests',
        message: 'Too many failed authentication attempts. Please try again in 15 minutes.',
    },
    ...(process.env.NODE_ENV === 'test'
        ? {}
        : {
            store: new rate_limit_redis_1.RedisStore({
                sendCommand,
                prefix: 'rl:auth:',
            }),
        }),
});
//# sourceMappingURL=rateLimiters.js.map