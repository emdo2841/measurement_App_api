"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySmtpConnection = exports.transporter = void 0;
require("dotenv/config");
const nodemailer_1 = __importDefault(require("nodemailer"));
// Fallback to SMTP_USER / SMTP_PASS if EMAIL / GOOGLE_APP_PASSWORD are not set
const emailUser = process.env.EMAIL || process.env.SMTP_USER;
const emailPass = process.env.GOOGLE_APP_PASSWORD || process.env.SMTP_PASS;
if (!emailUser || !emailPass) {
    console.error("❌ Nodemailer initialization failed: EMAIL or GOOGLE_APP_PASSWORD is not defined in process.env");
}
exports.transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: emailUser,
        pass: emailPass, // The 16-character App Password
    },
});
const verifySmtpConnection = async () => {
    try {
        await exports.transporter.verify();
        console.log(' SMTP Transporter initialized successfully');
    }
    catch (error) {
        console.error('SMTP Connection Error:', error);
    }
};
exports.verifySmtpConnection = verifySmtpConnection;
//# sourceMappingURL=mail.js.map