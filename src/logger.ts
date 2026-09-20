import pino from "pino";

export const logger = pino({
  level: process.env.NODE_ENV === "test"
    ? "silent"
    : process.env.LOG_LEVEL || "info",

  // Hide these if a request or response is included in a log.
  redact: [
    'req.headers.authorization',
    'req.headers.cookie',
    'res.headers["set-cookie"]',
  ],
});