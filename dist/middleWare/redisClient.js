"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const redis_1 = require("redis");
// 1. Create Redis client instance (connection is NOT opened here)
exports.redisClient = (0, redis_1.createClient)({
    url: process.env.REDIS_URL || 'redis://redis:6379',
});
exports.redisClient.on('error', (err) => console.error('Redis Client Error:', err));
//# sourceMappingURL=redisClient.js.map