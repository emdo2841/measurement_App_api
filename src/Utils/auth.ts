import jwt from 'jsonwebtoken'
import crypto from 'crypto';
import { Response } from 'express';

const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh-secret';
const ACCESS_SECRET = process.env.JWT_SECRET || 'access-secret';

// 1. Hash token before saving/matching in DB
export const hashToken = (token: string): string => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

// 2. Generate Access Token (Short-lived: 15m)
export const generateAccessToken = (userId: string, email: string): string => {
  return jwt.sign({ userId, email }, ACCESS_SECRET, { expiresIn: '1d' });
};

// 3. Generate Refresh Token (Long-lived: 7d)
export const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ userId }, REFRESH_SECRET, { expiresIn: '7d' });
};

// 4. Set httpOnly Cookie
export const setRefreshTokenCookie = (res: Response, token: string) => {
  res.cookie('refreshToken', token, {
    httpOnly: true, // Prevents client-side JS access (XSS protection)
    secure: process.env.NODE_ENV === 'production', // Sent only over HTTPS in production
    sameSite: 'strict', // CSRF protection
    path: '/api/v1/auth', // Sent only to auth endpoints
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  });
};