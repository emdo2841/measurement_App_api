"use strict";
// templates/emailTemplates.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderDueReminderTemplate = exports.orderReceiptTemplate = exports.passwordResetSuccessTemplate = exports.passwordResetTemplate = exports.signupTemplate = void 0;
// Base wrapper to maintain consistent branding and styling
const emailLayout = (title, content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f6f8; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
    .header { text-align: center; border-bottom: 1px solid #eaeaea; padding-bottom: 20px; margin-bottom: 20px; }
    .header h1 { margin: 0; color: #1a1a1a; font-size: 22px; }
    .content { font-size: 15px; line-height: 1.6; color: #333333; }
    .btn { display: inline-block; background-color: #0066cc; color: #ffffff !important; padding: 12px 24px; font-weight: 600; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    .feature-box { background: #f9f9f9; border-left: 4px solid #0066cc; padding: 15px; margin: 15px 0; border-radius: 4px; }
    .feature-box p { margin: 6px 0; }
    .warning-box { background: #fff8e6; border-left: 4px solid #ffc107; padding: 12px 15px; border-radius: 4px; margin-top: 20px; }
    .footer { margin-top: 30px; font-size: 12px; color: #888888; text-align: center; border-top: 1px solid #eaeaea; padding-top: 15px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${title}</h1>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} EJ Services. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;
const signupTemplate = (clientName, dashboardUrl) => {
    const content = `
    <p>Hi ${clientName},</p>
    <p>Welcome to <strong>EJ Services</strong>! We are thrilled to have you join us.</p>
    <p>Your account is ready. Here is what you can manage right from your dashboard:</p>
    
    <div class="feature-box">
      <p><strong>📦 Real-time Order Tracking:</strong> Keep track of your job progress from start to completion.</p>
      <p><strong>📐 Digital Measurement Profiles:</strong> Store and reference client measurements accurately.</p>
    </div>

    ${dashboardUrl ? `
    <p style="text-align: center;">
      <a href="${dashboardUrl}" class="btn" target="_blank">Access Your Dashboard</a>
    </p>` : ''}
    
    <p>If you have any questions or need support, simply reply to this email.</p>
  `;
    return emailLayout('Welcome to EJ Services!', content);
};
exports.signupTemplate = signupTemplate;
const passwordResetTemplate = (clientName, resetUrl) => {
    const content = `
    <p>Hi ${clientName},</p>
    <p>You requested a password reset. Click the button below to proceed. This link is valid for <strong>15 minutes</strong>.</p>
    <p style="text-align: center;">
      <a href="${resetUrl}" class="btn" target="_blank">Reset Password</a>
    </p>
    <p>If you didn't request this, you can safely ignore this email.</p>
    <p>Or copy this URL into your browser:</p>
    <p style="word-break: break-all; color: #0066cc;">${resetUrl}</p>
  `;
    return emailLayout('Password Reset Request', content);
};
exports.passwordResetTemplate = passwordResetTemplate;
const passwordResetSuccessTemplate = (clientName, loginUrl) => {
    const content = `
    <p>Hi ${clientName},</p>
    <p>Your password for <strong>EJ Services</strong> has been successfully updated.</p>
    <p>You can now log in using your new password.</p>
    
    ${loginUrl ? `
    <p style="text-align: center;">
      <a href="${loginUrl}" class="btn" target="_blank">Log In Now</a>
    </p>` : ''}
    
    <div class="warning-box">
      <p style="margin: 0; color: #856404; font-size: 14px;">
        <strong>Security Notice:</strong> If you did not perform this request, please contact our support team immediately to protect your account.
      </p>
    </div>
  `;
    return emailLayout('Password Successfully Reset', content);
};
exports.passwordResetSuccessTemplate = passwordResetSuccessTemplate;
const orderReceiptTemplate = (clientName, orderNumber, totalAmount) => {
    const content = `
    <p>Hi ${clientName},</p>
    <p>Thank you for your order! We have received order <strong>#${orderNumber}</strong>.</p>
    <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
      <p style="margin: 5px 0;"><strong>Order ID:</strong> #${orderNumber}</p>
      <p style="margin: 5px 0;"><strong>Total Amount:</strong> ₦${totalAmount}</p>
    </div>
    <p>We will send you another update once production begins or fitting is scheduled.</p>
  `;
    return emailLayout(`Order Confirmation #${orderNumber}`, content);
};
exports.orderReceiptTemplate = orderReceiptTemplate;
const escapeReminderHtml = (value) => value.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char]);
const orderDueReminderTemplate = (tailorName, clientName, dueDate) => {
    const date = new Intl.DateTimeFormat('en-NG', { dateStyle: 'long', timeZone: 'UTC' }).format(dueDate);
    return emailLayout('Order due in 3 days', `
    <p>Hi ${escapeReminderHtml(tailorName)},</p>
    <p>An unfinished order for <strong>${escapeReminderHtml(clientName)}</strong> is due on <strong>${date}</strong>.</p>
    <p>Check the order in your dashboard and plan the remaining work.</p>
  `);
};
exports.orderDueReminderTemplate = orderDueReminderTemplate;
//# sourceMappingURL=emailTemplate.js.map