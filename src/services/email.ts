import "dotenv/config";

import {
  transporter,
  emailFrom,
} from "../Utils/mail";

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export const sendEmail = async ({
  to,
  subject,
  html,
  text,
}: SendEmailOptions) => {
  try {
    const info = await transporter.sendMail({
      from: emailFrom,
      to,
      subject,
      html,

      text:
        text ||
        html.replace(/<[^>]*>?/gm, ""),
    });

    console.log(
      `Message sent to ${to}. Message ID: ${info.messageId}`,
    );

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error(
      `Failed to send email to ${to}:`,
      error,
    );

    throw new Error("Email service error");
  }
};