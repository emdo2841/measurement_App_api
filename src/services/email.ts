
import{transporter, verifySmtpConnection}  from "../Utils/mail"
import 'dotenv/config';

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export const sendEmail = async ({to, subject , html, text}: SendEmailOptions) => {
    try{
        const info = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to,
            subject,
            html,

            // Provide plain text fallback stripped of HTML tags if custom text isn't provided
            text: text || html.replace(/<[^>]*>?/gm, ''),
        })

        console.log(`message sent to ${to}. Message ID: ${info.messageId}`)
        return { success: true, messageId: info.messageId };
    }catch(error){
        console.error(`❌ Failed to send email to ${to}:`, error);
        throw new Error('Email service error');
    }
}


