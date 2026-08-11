import { PrismaClient } from '../../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { env } from './env';

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function createPrismaClient() {
  const connectionString = env('DATABASE_URL');
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set');
  }

  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

function isUsable(client: PrismaClient | undefined): client is PrismaClient {
  return Boolean(client && typeof (client as { lead?: unknown }).lead !== 'undefined');
}

export function getPrisma(): PrismaClient {
  if (!isUsable(globalForPrisma.prisma)) {
    globalForPrisma.prisma = createPrismaClient();
  }
  return globalForPrisma.prisma;
}
