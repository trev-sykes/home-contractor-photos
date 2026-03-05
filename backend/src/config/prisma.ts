import { env } from "./env.js";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";  // Change this import based on your DB
import { Pool } from "pg";          // Only for PostgreSQL

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// For PostgreSQL (most common case)
const pool = new Pool({ connectionString: env.DATABASE_URL });
const adapter = new PrismaPg(pool);

// If using MySQL instead:
// import { PrismaMysql } from "@prisma/adapter-mysql";
// import { createPool } from "mysql2/promise";
// const pool = createPool({ uri: process.env.DATABASE_URL });
// const adapter = new PrismaMysql(pool);

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        adapter,
        log: ["query"],
    });

if (env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}