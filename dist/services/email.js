"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
require("dotenv/config");
const mail_1 = require("../Utils/mail");
const sendEmail = async ({ to, subject, html, text, }) => {
    try {
        const info = await mail_1.transporter.sendMail({
            from: mail_1.emailFrom,
            to,
            subject,
            html,
            text: text ||
                html.replace(/<[^>]*>?/gm, ""),
        });
        console.log(`Message sent to ${to}. Message ID: ${info.messageId}`);
        return {
            success: true,
            messageId: info.messageId,
        };
    }
    catch (error) {
        console.error(`Failed to send email to ${to}:`, error);
        throw new Error("Email service error");
    }
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=email.js.map