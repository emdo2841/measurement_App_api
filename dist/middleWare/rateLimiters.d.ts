/**
 * General authenticated/public API limiter.
 *
 * 500 requests per 15 minutes per IP should be sufficient
 * for normal dashboard usage.
 */
export declare const publicLimiter: import("express-rate-limit").RateLimitRequestHandler;
/**
 * Authentication limiter.
 *
 * Successful authentication requests are not counted.
 * Failed login attempts are limited to 10 per 15 minutes.
 */
export declare const authLimiter: import("express-rate-limit").RateLimitRequestHandler;
//# sourceMappingURL=rateLimiters.d.ts.map