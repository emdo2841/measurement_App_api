/// <reference types="node" />
import "dotenv/config";
import { defineConfig } from "prisma/config";

const databaseUrl = process.env.DATABASE_URL;
let prismaUrl = databaseUrl;
let shadowDatabaseUrl: string | undefined;

if (databaseUrl && process.env.PRISMA_FROM_HOST === "1") {
  const url = new URL(databaseUrl);
  url.hostname = "127.0.0.1";
  url.port = "5433";
  prismaUrl = url.toString();

  const shadowUrl = new URL(url);
  shadowUrl.pathname = "/prisma_shadow_web_push";
  shadowUrl.search = "";
  shadowDatabaseUrl = shadowUrl.toString();
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: prismaUrl,
    ...(shadowDatabaseUrl ? { shadowDatabaseUrl } : {}),
  },
});