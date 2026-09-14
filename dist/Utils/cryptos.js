"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashToken = exports.generateResetToken = void 0;
// utils/crypto.ts
const crypto_1 = __importDefault(require("crypto"));
const generateResetToken = (validityMinutes = 15) => {
    // Generate a cryptographically secure random string
    const rawToken = crypto_1.default.randomBytes(32).toString('hex');
    // Hash the token with SHA-256 before saving to the DB
    const hashedToken = crypto_1.default
        .createHash('sha256')
        .update(rawToken)
        .digest('hex');
    const expiresAt = new Date(Date.now() + validityMinutes * 60 * 1000);
    return { rawToken, hashedToken, expiresAt };
};
exports.generateResetToken = generateResetToken;
const hashToken = (token) => {
    return crypto_1.default.createHash('sha256').update(token).digest('hex');
};
exports.hashToken = hashToken;
//# sourceMappingURL=cryptos.js.map