"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authLimiter = exports.publicLimiter = void 0;
const express_rate_limit_1 = require("express-rate-limit");
const rate_limit_redis_1 = require("rate-limit-redis");
const redisClient_1 = require("./redisClient");
// Helper function to send commands safely
const sendCommand = (...args) => redisClient_1.redisClient.sendCommand(args);
// Public Limiter
exports.publicLimiter = (0, express_rate_limit_1.rateLimit)({
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
    store: new rate_limit_redis_1.RedisStore({
        sendCommand,
        prefix: 'rl:public:',
    }),
});
// Auth Limiter
exports.authLimiter = (0, express_rate_limit_1.rateLimit)({
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
    store: new rate_limit_redis_1.RedisStore({
        sendCommand,
        prefix: 'rl:auth:',
    }),
});
//# sourceMappingURL=rateLimiters.js.map