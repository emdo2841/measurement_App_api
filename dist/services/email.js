"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const mail_1 = require("../Utils/mail");
require("dotenv/config");
const sendEmail = async ({ to, subject, html, text }) => {
    try {
        const info = await mail_1.transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to,
            subject,
            html,
            // Provide plain text fallback stripped of HTML tags if custom text isn't provided
            text: text || html.replace(/<[^>]*>?/gm, ''),
        });
        console.log(`message sent to ${to}. Message ID: ${info.messageId}`);
        return { success: true, messageId: info.messageId };
    }
    catch (error) {
        console.error(`❌ Failed to send email to ${to}:`, error);
        throw new Error('Email service error');
    }
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=email.js.map