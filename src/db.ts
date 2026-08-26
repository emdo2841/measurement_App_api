import { readReplicas } from "@prisma/extension-read-replicas";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const mainAdapter = new PrismaPg(pool);

const mianClient = new PrismaClient({ adapter: mainAdapter });

const replicaPool1 = new Pool({ connectionString: process.env.REPLICA_URL1 });
const replicaAdapter1 = new PrismaPg(replicaPool1);

const replicaClient1 = new PrismaClient({ adapter: replicaAdapter1 });

const replicaPool2 = new Pool({ connectionString: process.env.REPLICA_URL2 });
const replicaAdapter2 = new PrismaPg(replicaPool2);

const replicaClient2 = new PrismaClient({ adapter: replicaAdapter2 });
export const prisma = mianClient.$extends(readReplicas({
    replicas: [replicaClient1, replicaClient2]
}))


