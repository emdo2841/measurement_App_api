import { prisma } from "../db";
import { Request, Response } from "express";
import { LoginSchema } from "../schemas/user.schema";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import 'dotenv/config';
import {
  generateAccessToken,
  generateRefreshToken,
  hashToken,
  setRefreshTokenCookie,
} from '../Utils/auth';

import { generateResetToken } from '../Utils/cryptos';
import { sendEmail } from "../services/email";
import { passwordResetTemplate } from "../template/emailTemplate";

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret'

export const login = async (req: Request, res: Response) => {
  try {
    const validatedDate = LoginSchema.safeParse(req.body);
    if (!validatedDate.success) {
      return res.status(400).json({ error: validatedDate.error.format() })
    }

    const { email, password } = validatedDate.data;

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(401).json({ error: "Invalid Credentials" })
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({ error: "invalid credentials" })
    }
    // generate token with non sensitive payload

    const accessToken = generateAccessToken(user.id, user.email);
    const refreshToken = generateRefreshToken(user.id);
    const hashedRefreshToken = hashToken(refreshToken);

    // Store the hashed refresh token in the database   
    await prisma.refreshToken.create({
      data: {
        hashedToken: hashedRefreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      },
    });

    // Set the refresh token in an httpOnly cookie
    setRefreshTokenCookie(res, refreshToken);
    return res.status(200).json({ message: "successfully Login", accessToken });
  } catch (error) {
    return res.status(200).json({ error: "Internal server Error", })
  }
}



export const refreshToken = async (req: Request, res: Response) => {
  const incomingToken = req.cookies.refreshToken;

  if (!incomingToken) {
    return res.status(401).json({ error: 'Refresh token missing' });
  }

  const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh-secret';

  try {
    // 1. Verify token signature
    const decoded = jwt.verify(incomingToken, REFRESH_SECRET) as { userId: string };
    const hashed = hashToken(incomingToken);

    // 2. Find token in DB
    const storedToken = await prisma.refreshToken.findUnique({
      where: { hashedToken: hashed },
    });

    // 3. REUSE DETECTION: If token exists but is revoked, flag breach!
    if (storedToken && storedToken.revoked) {
      // Revoke ALL tokens for this user immediately
      await prisma.refreshToken.updateMany({
        where: { userId: decoded.userId },
        data: { revoked: true },
      });
      res.clearCookie('refreshToken', { path: '/api/auth' });
      return res.status(403).json({ error: 'Security breach detected. Please log in again.' });
    }

    if (!storedToken || storedToken.expiresAt < new Date()) {
      return res.status(403).json({ error: 'Invalid or expired refresh token' });
    }

    // 4. ROTATION: Revoke the used token
    await prisma.refreshToken.update({
      where: { id: storedToken.id },
      data: { revoked: true },
    });

    // 5. Issue NEW Access + Refresh Tokens
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const newAccessToken = generateAccessToken(user.id, user.email);
    const newRefreshToken = generateRefreshToken(user.id);

    // 6. Save NEW Refresh Token to DB
    const newHashed = hashToken(newRefreshToken);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await prisma.refreshToken.create({
      data: {
        hashedToken: newHashed,
        userId: user.id,
        expiresAt,
      },
    });

    // 7. Update Cookie & Return New Access Token
    setRefreshTokenCookie(res, newRefreshToken);
    return res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(403).json({ error: 'Invalid refresh token' });
  }
};

export const logout = async (req: Request, res: Response) => {
  const incomingToken = req.cookies.refreshToken;

  if (incomingToken) {
    const hashed = hashToken(incomingToken);

    // Revoke token in DB
    await prisma.refreshToken.updateMany({
      where: { hashedToken: hashed },
      data: { revoked: true },
    });
  }

  // Clear client cookie
  res.clearCookie('refreshToken', { path: '/api/auth' });
  return res.status(200).json({ message: 'Logged out successfully' });
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  // 1. Generic response to prevent user enumeration attacks
  const genericResponse = {
    message: 'If an account with that email exists, a password reset link has been sent.',
  };

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  if (!user) {
    // Return early without revealing if the user exists
    return res.status(200).json(genericResponse);
  }

  // 2. Generate token and expiry (15 mins)
  const { rawToken, hashedToken, expiresAt } = generateResetToken(15);

  // 3. Save hashed token and expiry in DB
  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetTokens: hashedToken,
      resetTokenExpiry: expiresAt,
    },
  });

  // 4. Send email with the RAW token in the URL
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${rawToken}`;
  const htmlContent = passwordResetTemplate(user.name, resetUrl);

  try {
    await sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      html: htmlContent
    });
  } catch (error) {
    // Rollback token on email failure
    await prisma.user.update({
      where: { id: user.id },
      data: { resetTokens: null, resetTokenExpiry: null },
    });
    return res.status(500).json({ error: 'Failed to send reset email. Please try again.' });
  }

  return res.status(200).json(genericResponse);
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ error: 'Token and new password are required.' });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long.' });
  }

  // 1. Hash the incoming raw token to match against DB record
  const hashedToken = hashToken(token);

  // 2. Find user where hashed token matches AND expiry date is in the future
  const user = await prisma.user.findFirst({
    where: {
      resetTokens: hashedToken,
      resetTokenExpiry: {
        gt: new Date(), // Expiry must be greater than current time
      },
    },
  });

  if (!user) {
    return res.status(400).json({ error: 'Invalid or expired password reset token.' });
  }

  // 3. Hash new password and clear token fields
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetTokens: null,
      resetTokenExpiry: null,
    },
  });

  return res.status(200).json({ message: 'Password reset successful. You can now log in.' });
};