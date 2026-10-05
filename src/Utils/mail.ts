import "dotenv/config";
import nodemailer from "nodemailer";

const emailUser = process.env.EMAIL;
const emailPassword =
  process.env.GOOGLE_APP_PASSWORD;

if (!emailUser || !emailPassword) {
  throw new Error(
    "EMAIL and GOOGLE_APP_PASSWORD must be defined.",
  );
}

export const emailFrom =
  process.env.EMAIL_FROM ||
  `TailorPro <${emailUser}>`;

export const transporter =
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,

    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  });

export const verifySmtpConnection =
  async (): Promise<void> => {
    try {
      await transporter.verify();

      console.log(
        "SMTP transporter initialized successfully",
      );
    } catch (error) {
      console.error(
        "SMTP connection error:",
        error,
      );

      throw error;
    }
  };