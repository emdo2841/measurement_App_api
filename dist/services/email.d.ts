import 'dotenv/config';
interface SendEmailOptions {
    to: string;
    subject: string;
    html: string;
    text?: string;
}
export declare const sendEmail: ({ to, subject, html, text }: SendEmailOptions) => Promise<{
    success: boolean;
    messageId: string;
}>;
export {};
//# sourceMappingURL=email.d.ts.map