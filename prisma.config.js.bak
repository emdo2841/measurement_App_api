"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="node" />
require("dotenv/config");
const config_1 = require("prisma/config");
const databaseUrl = (0, config_1.env)("DATABASE_URL");
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
exports.default = (0, config_1.defineConfig)({
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
//# sourceMappingURL=prisma.config.js.map