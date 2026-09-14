import { readReplicas } from "@prisma/extension-read-replicas";
import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const mainAdapter = new PrismaPg(pool);
const mainClient = new PrismaClient({ adapter: mainAdapter });

const replicaPool1 = new Pool({ connectionString: process.env.REPLICA_URL1 });
const replicaAdapter1 = new PrismaPg(replicaPool1);
const replicaClient1 = new PrismaClient({ adapter: replicaAdapter1 });

export const prisma = mainClient.$extends(readReplicas({
  replicas: [replicaClient1], // only reference replicas that actually exist
}));