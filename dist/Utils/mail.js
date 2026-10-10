"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySmtpConnection = exports.transporter = exports.emailFrom = void 0;
require("dotenv/config");
const nodemailer_1 = __importDefault(require("nodemailer"));
const emailUser = process.env.EMAIL;
const emailPassword = process.env.GOOGLE_APP_PASSWORD;
if (!emailUser || !emailPassword) {
    throw new Error("EMAIL and GOOGLE_APP_PASSWORD must be defined.");
}
exports.emailFrom = process.env.EMAIL_FROM ||
    `TailorPro <${emailUser}>`;
exports.transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: emailUser,
        pass: emailPassword,
    },
});
const verifySmtpConnection = async () => {
    try {
        await exports.transporter.verify();
        console.log("SMTP transporter initialized successfully");
    }
    catch (error) {
        console.error("SMTP connection error:", error);
        throw error;
    }
};
exports.verifySmtpConnection = verifySmtpConnection;
//# sourceMappingURL=mail.js.map