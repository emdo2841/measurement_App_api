import { redisClient } from './redisClient';

const DEFAULT_TTL_SECONDS = 60 * 5; // 5 minutes

export async function getCache<T>(key: string): Promise<T | null> {
  try {
    if (!redisClient.isOpen) return null;
    const raw = await redisClient.get(key);
    if (raw) {
      console.log(`[cache] HIT  ${key}`);
      return JSON.parse(raw) as T;
    }
    console.log(`[cache] MISS ${key}`);
    return null;
  } catch (err) {
    console.error(`Redis GET failed for key "${key}":`, err);
    return null;
  }
}

export async function setCache(
  key: string,
  value: unknown,
  ttlSeconds: number = DEFAULT_TTL_SECONDS
): Promise<void> {
  try {
    if (!redisClient.isOpen) return;
    await redisClient.set(key, JSON.stringify(value), { EX: ttlSeconds });
    console.log(`[cache] SET  ${key} (ttl ${ttlSeconds}s)`);
  } catch (err) {
    console.error(`Redis SET failed for key "${key}":`, err);
  }
}

export async function delCache(...keys: string[]): Promise<void> {
  try {
    if (!redisClient.isOpen) return;
    if (keys.length === 0) return;
    await redisClient.del(keys);
    console.log(`[cache] DEL  ${keys.join(', ')}`);
  } catch (err) {
    console.error(`Redis DEL failed for keys "${keys.join(', ')}":`, err);
  }
}