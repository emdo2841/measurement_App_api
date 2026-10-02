type ListName = 'clients' | 'orders' | 'measurements';
export declare function getListCacheVersion(list: ListName, userId: string): Promise<number>;
export declare function bumpListCacheVersion(list: ListName, userId: string): Promise<void>;
export declare function paginatedListCacheKey(list: ListName, userId: string, values: Record<string, string | number | undefined>): Promise<string>;
export {};
//# sourceMappingURL=paginatedCache.d.ts.map