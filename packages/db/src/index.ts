import path from "node:path";
import { config } from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

config({ path: path.resolve(__dirname, "../../../.env"), override: false });

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma: PrismaClient =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export { Prisma } from "./generated/prisma/client";
export type { PrismaClient } from "./generated/prisma/client";

/** Backward-compat shim for files that use rawQuery */
export async function rawQuery<T = any>(
  query: string,
  params?: any[],
): Promise<T[]> {
  return prisma.$queryRawUnsafe<T[]>(query, ...(params ?? []));
}
