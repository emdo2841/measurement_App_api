import { createClient } from 'redis';

// 1. Create Redis client instance (connection is NOT opened here)
export const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://redis:6379',
});

redisClient.on('error', (err: Error) => console.error('Redis Client Error:', err));