import 'dotenv/config';
import webpush from 'web-push';
import { prisma } from '../db';
import { sendEmail } from '../services/email';
import { orderDueReminderTemplate } from '../template/emailTemplate';

const { VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT } = process.env;
if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY || !VAPID_SUBJECT) {
  throw new Error('Set VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY and VAPID_SUBJECT');
}
webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

// An order's date is treated as a UTC calendar date. A reminder runs during
// the UTC day three calendar days before that date.
async function sendReminders() {
  const now = new Date();
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 3));
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 1);
  const db = prisma.$primary();
  const orders = await db.order.findMany({
    where: { dueDate: { gte: start, lt: end }, status: { notIn: ['COMPLETED', 'DELIVERED'] } },
    include: { client: { include: { tailor: { include: { pushSubscriptions: true } } } } },
  });

  for (const order of orders) {
    const tailor = order.client.tailor;
    const recipient = tailor.email;
    const emailKey = {
      orderId_dueDate_kind_recipient: {
        orderId: order.id,
        dueDate: order.dueDate!,
        kind: 'DUE_IN_THREE_DAYS',
        recipient,
      },
    };
    // Email is independent of browser push; it works with no subscriptions.
    if (!(await db.emailOrderReminder.findUnique({ where: emailKey }))) {
      try {
        await sendEmail({
          to: recipient,
          subject: 'Reminder: order due in 3 days',
          html: orderDueReminderTemplate(tailor.name, order.client.name, order.dueDate!),
        });
        await db.emailOrderReminder.create({
          data: { orderId: order.id, dueDate: order.dueDate!, kind: 'DUE_IN_THREE_DAYS', recipient },
        });
      } catch (err) {
        console.error('Email order reminder failed', { orderId: order.id, err });
      }
    }
    for (const subscription of order.client.tailor.pushSubscriptions) {
      const key = {
        orderId_dueDate_kind_subscriptionId: {
          orderId: order.id, dueDate: order.dueDate!, kind: 'DUE_IN_THREE_DAYS', subscriptionId: subscription.id,
        },
      };
      if (await db.orderReminder.findUnique({ where: key })) continue;
      try {
        await webpush.sendNotification(
          { endpoint: subscription.endpoint, keys: { p256dh: subscription.p256dh, auth: subscription.auth } },
          JSON.stringify({ title: 'Order due in 3 days', body: `${order.client.name}'s order is due soon`, url: '/dashboard' }),
        );
        // Only one worker is started by Compose. The unique key also protects
        // against another scan after a successful insert.
        await db.orderReminder.create({ data: { orderId: order.id, dueDate: order.dueDate!, kind: 'DUE_IN_THREE_DAYS', subscriptionId: subscription.id } });
      } catch (err) {
        const status = (err as { statusCode?: number }).statusCode;
        if (status === 404 || status === 410) {
          await db.pushSubscription.delete({ where: { id: subscription.id } });
        } else {
          console.error('Order reminder failed', { orderId: order.id, subscriptionId: subscription.id, err });
        }
      }
    }
  }
}

async function run() {
  try { await sendReminders(); } catch (err) { console.error('Reminder scan failed', err); }
}

void run();
setInterval(() => { void run(); }, 60 * 60 * 1000);
