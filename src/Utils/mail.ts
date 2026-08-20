import 'dotenv/config';
import nodemailer from "nodemailer";

// Fallback to SMTP_USER / SMTP_PASS if EMAIL / GOOGLE_APP_PASSWORD are not set
const emailUser = process.env.EMAIL || process.env.SMTP_USER;
const emailPass = process.env.GOOGLE_APP_PASSWORD || process.env.SMTP_PASS;

if (!emailUser || !emailPass) {
  console.error("❌ Nodemailer initialization failed: EMAIL or GOOGLE_APP_PASSWORD is not defined in process.env");
}

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailUser,
    pass: emailPass, // The 16-character App Password
  },
});


export const verifySmtpConnection = async (): Promise<void> => {
  try {
    await transporter.verify();
    console.log(' SMTP Transporter initialized successfully');
  } catch (error) {
    console.error('SMTP Connection Error:', error);
  }
};