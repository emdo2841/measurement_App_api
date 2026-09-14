"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCache = getCache;
exports.setCache = setCache;
exports.delCache = delCache;
const redisClient_1 = require("./redisClient");
const DEFAULT_TTL_SECONDS = 60 * 5; // 5 minutes
async function getCache(key) {
    try {
        if (!redisClient_1.redisClient.isOpen)
            return null;
        const raw = await redisClient_1.redisClient.get(key);
        if (raw) {
            console.log(`[cache] HIT  ${key}`);
            return JSON.parse(raw);
        }
        console.log(`[cache] MISS ${key}`);
        return null;
    }
    catch (err) {
        console.error(`Redis GET failed for key "${key}":`, err);
        return null;
    }
}
async function setCache(key, value, ttlSeconds = DEFAULT_TTL_SECONDS) {
    try {
        if (!redisClient_1.redisClient.isOpen)
            return;
        await redisClient_1.redisClient.set(key, JSON.stringify(value), { EX: ttlSeconds });
        console.log(`[cache] SET  ${key} (ttl ${ttlSeconds}s)`);
    }
    catch (err) {
        console.error(`Redis SET failed for key "${key}":`, err);
    }
}
async function delCache(...keys) {
    try {
        if (!redisClient_1.redisClient.isOpen)
            return;
        if (keys.length === 0)
            return;
        await redisClient_1.redisClient.del(keys);
        console.log(`[cache] DEL  ${keys.join(', ')}`);
    }
    catch (err) {
        console.error(`Redis DEL failed for keys "${keys.join(', ')}":`, err);
    }
}
//# sourceMappingURL=cache.js.map