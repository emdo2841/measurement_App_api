// utils/crypto.ts
import crypto from 'crypto';

export interface GeneratedToken {
  rawToken: string;
  hashedToken: string;
  expiresAt: Date;
}

export const generateResetToken = (validityMinutes = 15): GeneratedToken => {
  // Generate a cryptographically secure random string
  const rawToken = crypto.randomBytes(32).toString('hex');

  // Hash the token with SHA-256 before saving to the DB
  const hashedToken = crypto
    .createHash('sha256')
    .update(rawToken)
    .digest('hex');

  const expiresAt = new Date(Date.now() + validityMinutes * 60 * 1000);

  return { rawToken, hashedToken, expiresAt };
};

export const hashToken = (token: string): string => {
  return crypto.createHash('sha256').update(token).digest('hex');
};
