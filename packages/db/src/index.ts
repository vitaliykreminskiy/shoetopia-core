import { PrismaClient } from './generated/prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma: PrismaClient =
  globalForPrisma.prisma ??
  // Prisma 7 requires either `adapter` or `accelerateUrl` in the constructor.
  // We pass DATABASE_URL as accelerateUrl for direct PostgreSQL connections.
  (new (PrismaClient as any)({
    accelerateUrl: process.env.DATABASE_URL,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  }) as PrismaClient)

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export { Prisma } from './generated/prisma/client'
export type { PrismaClient } from './generated/prisma/client'

/** Backward-compat shim for files that use rawQuery */
export async function rawQuery<T = any>(query: string, params?: any[]): Promise<T[]> {
  return prisma.$queryRawUnsafe<T[]>(query, ...(params ?? []))
}
