import type { Server } from 'http';
import { verifySmtpConnection } from "./Utils/mail";
import { redisClient } from './middleWare/redisClient';

const port = process.env.PORT || 8000;
const appName = process.env.APP_NAME || 'App';

let server: Server;


async function start() {
  try {
    // Connect Redis BEFORE app.ts (and therefore rateLimiters.ts / RedisStore) is ever loaded
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
    console.log('Connected to Redis successfully');

    // Dynamic import ensures app.ts's module graph (which imports rateLimiters.ts)
    // only evaluates AFTER the redis client is connected.
    const { default: app } = await import('./app');

    verifySmtpConnection();

    server = app.listen(port, () => {
      console.log(`${appName} is listening on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
  // log it, don't crash — let the specific request fail instead
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // same idea — log and continue rather than let Node kill the process
});


async function shutdown(signal: string) {
  console.log(`Received ${signal}. Shutting down gracefully...`);

  if (server) {
    server.close(() => console.log('HTTP server closed'));
  }

  if (redisClient.isOpen) {
    await redisClient.disconnect();
    console.log('Redis client disconnected');
  }

  process.exit(0);
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

start();