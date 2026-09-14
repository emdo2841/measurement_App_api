"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const extension_read_replicas_1 = require("@prisma/extension-read-replicas");
const client_1 = require("./generated/prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = require("pg");
const pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
const mainAdapter = new adapter_pg_1.PrismaPg(pool);
const mainClient = new client_1.PrismaClient({ adapter: mainAdapter });
const replicaPool1 = new pg_1.Pool({ connectionString: process.env.REPLICA_URL1 });
const replicaAdapter1 = new adapter_pg_1.PrismaPg(replicaPool1);
const replicaClient1 = new client_1.PrismaClient({ adapter: replicaAdapter1 });
exports.prisma = mainClient.$extends((0, extension_read_replicas_1.readReplicas)({
    replicas: [replicaClient1], // only reference replicas that actually exist
}));
//# sourceMappingURL=db.js.map