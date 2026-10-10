import { prisma } from "../db";
import { Request, Response } from "express";
import { LoginSchema } from "../schemas/user.schema";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import 'dotenv/config';
import { generateAccessToken, generateRefreshToken, hashToken, setRefreshTokenCookie } from '../Utils/auth';
import { z } from "zod";
import { OAuth2Client } from "google-auth-library";
import { generateResetToken } from '../Utils/cryptos';
import { sendEmail } from "../services/email";
import {
  passwordResetTemplate,
  registrationOtpTemplate,
  signupTemplate,
} from "../template/emailTemplate";
import { randomInt } from "node:crypto";


const GoogleLoginSchema = z.object({
  credential: z.string().min(1),
});
const googleClient = new OAuth2Client();

// Both password login and Google login use your EXISTING session system.
async function issueSession(
  res: Response,
  user: { id: string; email: string }
) {
  const accessToken = generateAccessToken(user.id, user.email);
  const refreshToken = generateRefreshToken(user.id);

  await prisma.refreshToken.create({
    data: {
      hashedToken: hashToken(refreshToken),
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  setRefreshTokenCookie(res, refreshToken);
  return accessToken;
}



const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret'

// Your existing email-and-password login, updated.
export const login = async (req: Request, res: Response) => {
  try {
    const validatedData = LoginSchema.safeParse(req.body)

    if (!validatedData.success) {
      return res.status(400).json({
        error: validatedData.error.format(),
      })
    }

    const { email, password } = validatedData.data

    const user = await prisma.user.findUnique({
      where: {
        email: email.trim().toLowerCase(),
      },
    })

    // This also handles Google-only accounts.
    if (!user?.password) {
      return res.status(401).json({
        error: 'Invalid credentials',
      })
    }

    if (user.accountStatus !== 'ACTIVE') {
      return res.status(403).json({
        error: 'This account is not currently active.',
      })
    }

    const isValidPassword = await bcrypt.compare(
      password,
      user.password,
    )

    if (!isValidPassword) {
      return res.status(401).json({
        error: 'Invalid credentials',
      })
    }

    const accessToken = await issueSession(res, user)

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    })

    return res.status(200).json({
      message: 'Successfully logged in',
      accessToken,
    })
  } catch (error) {
    req.log.error({ err: error }, 'Login failed')

    return res.status(500).json({
      error: 'Internal server error',
    })
  }
}

// New endpoint: the SAME Google button handles Google signup and login.
export const googleLogin = async (req: Request, res: Response) => {
  const validatedData = GoogleLoginSchema.safeParse(req.body);

  if (!validatedData.success) {
    return res.status(400).json({
      error: "Google credential is required",
    });
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    console.error("GOOGLE_CLIENT_ID is missing");
    return res.status(500).json({ error: "Server configuration error" });
  }

  let googleId: string;
  let email: string;
  let name: string;

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: validatedData.data.credential,
      audience: clientId,
    });

    const payload = ticket.getPayload();

    if (!payload?.sub || !payload.email || !payload.email_verified) {
      return res.status(401).json({ error: "Invalid Google account" });
    }

    googleId = payload.sub;
    email = payload.email.trim().toLowerCase();
    name = payload.name ?? email;
  } catch (error) {
    req.log.error({ err: error }, "GOOGLE TOKEN VERIFICATION ERROR");
    return res.status(401).json({ error: "Invalid Google credential" });
  }

  try {
    // Returning Google user: identify them by Google's stable ID.
    let user = await prisma.user.findUnique({ where: { googleId } });
    let isNewUser = false;

    if (!user) {
      // An existing password account needs a separate, authenticated
      // account-linking flow. Do not take it over by matching email.
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(409).json({
          error: "This email already has an account. Sign in with your password first.",
        });
      }

      // First Google visit: create the user. No password or phone required.
      user = await prisma.user.create({
        data: {
          googleId,
          email,
          name,
          emailVerifiedAt: new Date(),
        },
      });
       isNewUser = true;
    }

    // Google users get the SAME access token, refresh-token record,
    // and httpOnly refresh cookie as password users.
    const accessToken = await issueSession(res, user);
    if (isNewUser) {
  try {
    await sendEmail({
      to: user.email,
      subject: "Welcome to EJ Services!",
      html: signupTemplate(user.name),
    });
  } catch (emailError) {
    req.log.error({ err: emailError }, "Google signup welcome email failed");
    // Email failure should not undo a successfully created account.
  }
}
    return res.status(200).json({
      message: "Successfully logged in",
      accessToken,
    });
  } catch (error) {
    req.log.error({ err: error }, "Welcome email failed");
    return res.status(500).json({ error: "Internal server error" });
  }
};


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
      res.clearCookie('refreshToken', { path: '/api/v1/auth' });
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
    req.log.error(error)
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
  res.clearCookie('refreshToken', { path: '/api/v1/auth' });
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
    req.log.error(error)
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

  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetTokens: null,
        resetTokenExpiry: null,
      },
    }),
    prisma.refreshToken.updateMany({
      where: { userId: user.id },
      data: { revoked: true },
    }),
  ]);

  return res.status(200).json({ message: 'Password reset successful. You can now log in.' });
};
export const requestRegistrationOtp = async (
  req: Request,
  res: Response,
) => {
  const email =
    typeof req.body?.email === "string"
      ? req.body.email.trim().toLowerCase()
      : "";

  if (!email) {
    return res.status(400).json({
      error: "Email is required.",
    });
  }

  if (!z.email().safeParse(email).success) {
    return res.status(400).json({
      error: "Enter a valid email address.",
    });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(409).json({
      error:
        "An account with this email already exists. Please sign in.",
    });
  }

  const code = String(randomInt(100000, 1000000));
  const codeExpiresAt = new Date(
    Date.now() + 10 * 60 * 1000,
  );

  await prisma.registrationVerification.upsert({
    where: { email },

    create: {
      email,
      codeHash: hashToken(code),
      codeExpiresAt,
    },

    update: {
      codeHash: hashToken(code),
      codeExpiresAt,
      attempts: 0,
      verifiedAt: null,
      registrationTokenHash: null,
      registrationTokenExpiry: null,
    },
  });

  try {
    await sendEmail({
      to: email,
      subject: "Your TailorPro verification code",
      html: registrationOtpTemplate(code),
    });
  } catch (error) {
    req.log.error(
      { err: error },
      "Registration OTP email failed",
    );

    return res.status(500).json({
      error:
        "Unable to send the verification code. Please try again.",
    });
  }

  return res.status(200).json({
    message:
      "A six-digit verification code was sent to your email.",
  });
};


export const verifyRegistrationOtp = async (
  req: Request,
  res: Response,
) => {
  const email =
    typeof req.body?.email === "string"
      ? req.body.email.trim().toLowerCase()
      : "";

  const code =
    typeof req.body?.code === "string"
      ? req.body.code.trim()
      : "";

  if (!email || !/^\d{6}$/.test(code)) {
    return res.status(400).json({
      error:
        "Email and a valid six-digit code are required.",
    });
  }

  const record =
    await prisma.registrationVerification.findUnique({
      where: { email },
    });

  if (
    !record ||
    record.codeExpiresAt <= new Date() ||
    record.attempts >= 5
  ) {
    return res.status(400).json({
      error:
        "This code is invalid or expired. Request a new code.",
    });
  }

  if (record.codeHash !== hashToken(code)) {
    await prisma.registrationVerification.update({
      where: { id: record.id },
      data: {
        attempts: {
          increment: 1,
        },
      },
    });

    return res.status(400).json({
      error: "The verification code is incorrect.",
    });
  }

  const {
    rawToken,
    hashedToken,
    expiresAt,
  } = generateResetToken(30);

  await prisma.registrationVerification.update({
    where: { id: record.id },

    data: {
      verifiedAt: new Date(),
      registrationTokenHash: hashedToken,
      registrationTokenExpiry: expiresAt,
    },
  });

  return res.status(200).json({
    message:
      "Email verified. Complete your registration.",
    registrationToken: rawToken,
  });
};

export const changePassword = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const currentPassword = typeof req.body?.currentPassword === 'string' ? req.body.currentPassword : '';
  const newPassword = typeof req.body?.newPassword === 'string' ? req.body.newPassword : '';

  if (!userId) return res.status(401).json({ error: 'Unauthorized access.' });
  if (!currentPassword || newPassword.length < 8) {
    return res.status(400).json({ error: 'Current password and a new password of at least 8 characters are required.' });
  }
  if (currentPassword === newPassword) {
    return res.status(400).json({ error: 'Your new password must be different from your current password.' });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user?.password) {
    return res.status(400).json({ error: 'This Google account does not have a password to change.' });
  }
  if (!(await bcrypt.compare(currentPassword, user.password))) {
    return res.status(400).json({ error: 'Current password is incorrect.' });
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: { password: await bcrypt.hash(newPassword, 12) },
    }),
    prisma.refreshToken.updateMany({
      where: { userId: user.id },
      data: { revoked: true },
    }),
  ]);

  res.clearCookie('refreshToken', { path: '/api/v1/auth' });
  return res.status(200).json({ message: 'Password changed successfully. Please sign in again.' });
};
