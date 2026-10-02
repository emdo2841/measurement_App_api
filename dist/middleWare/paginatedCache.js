"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getListCacheVersion = getListCacheVersion;
exports.bumpListCacheVersion = bumpListCacheVersion;
exports.paginatedListCacheKey = paginatedListCacheKey;
const cache_1 = require("./cache");
const versionKey = (list, userId) => `${list}:${userId}:version`;
async function getListCacheVersion(list, userId) {
    const cached = await (0, cache_1.getCache)(versionKey(list, userId));
    const version = Number(cached);
    return Number.isInteger(version) && version > 0 ? version : 1;
}
async function bumpListCacheVersion(list, userId) {
    const current = await getListCacheVersion(list, userId);
    await (0, cache_1.setCache)(versionKey(list, userId), current + 1, 60 * 60 * 24 * 365);
}
async function paginatedListCacheKey(list, userId, values) {
    const version = await getListCacheVersion(list, userId);
    const query = Object.entries(values)
        .filter(([, value]) => value !== undefined)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, value]) => `${key}:${String(value).trim().toLowerCase()}`)
        .join(':');
    return `${list}:${userId}:v:${version}:${query}`;
}
//# sourceMappingURL=paginatedCache.js.map