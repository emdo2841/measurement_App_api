export declare function getCache<T>(key: string): Promise<T | null>;
export declare function setCache(key: string, value: unknown, ttlSeconds?: number): Promise<void>;
export declare function delCache(...keys: string[]): Promise<void>;
//# sourceMappingURL=cache.d.ts.map