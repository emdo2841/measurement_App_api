import { readReplicas } from "@prisma/extension-read-replicas";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const mainAdapter = new PrismaPg(pool);

const mianClient = new PrismaClient({ adapter: mainAdapter });

const replicaPool = new Pool({ connectionString: process.env.REPLICA_URL });
const replicaAdapter = new PrismaPg(pool);

const replicaClient = new PrismaClient({ adapter: replicaAdapter });

export const prisma = mianClient.$extends(readReplicas({
    replicas: [replicaClient]
}))