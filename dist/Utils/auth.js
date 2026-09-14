"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRefreshTokenCookie = exports.generateRefreshToken = exports.generateAccessToken = exports.hashToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh-secret';
const ACCESS_SECRET = process.env.JWT_SECRET || 'access-secret';
// 1. Hash token before saving/matching in DB
const hashToken = (token) => {
    return crypto_1.default.createHash('sha256').update(token).digest('hex');
};
exports.hashToken = hashToken;
// 2. Generate Access Token (Short-lived: 15m)
const generateAccessToken = (userId, email) => {
    return jsonwebtoken_1.default.sign({ userId, email }, ACCESS_SECRET, { expiresIn: '1d' });
};
exports.generateAccessToken = generateAccessToken;
// 3. Generate Refresh Token (Long-lived: 7d)
const generateRefreshToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, REFRESH_SECRET, { expiresIn: '7d' });
};
exports.generateRefreshToken = generateRefreshToken;
// 4. Set httpOnly Cookie
const setRefreshTokenCookie = (res, token) => {
    res.cookie('refreshToken', token, {
        httpOnly: true, // Prevents client-side JS access (XSS protection)
        secure: process.env.NODE_ENV === 'production', // Sent only over HTTPS in production
        sameSite: 'strict', // CSRF protection
        path: '/api/v1/auth', // Sent only to auth endpoints
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });
};
exports.setRefreshTokenCookie = setRefreshTokenCookie;
//# sourceMappingURL=auth.js.map