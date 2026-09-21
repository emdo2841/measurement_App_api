/// <reference types="node" />
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

const databaseUrl = env("DATABASE_URL");
let prismaUrl = databaseUrl;

if (process.env.PRISMA_FROM_HOST === "1") {
  const url = new URL(databaseUrl);
  url.hostname = "127.0.0.1";
  url.port = "5433";
  prismaUrl = url.toString();
}

const shadowUrl = new URL(prismaUrl);
shadowUrl.pathname = "/prisma_shadow_web_push";
shadowUrl.search = "";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: prismaUrl,
    ...(process.env.PRISMA_FROM_HOST === "1"
      ? { shadowDatabaseUrl: shadowUrl.toString() }
      : {}),
  },
});
