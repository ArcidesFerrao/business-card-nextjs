import { currentUser } from '@/lid/extensions/current-user';
import { PrismaClient } from '@prisma/client'

const baseClient = new PrismaClient();

const client = baseClient.$extends(currentUser());


const globalForPrisma = global as unknown as {
  prisma: typeof client;
  basePrisma: typeof baseClient;
}

export const db = globalForPrisma.prisma || client

export const baseDb = globalForPrisma.basePrisma || baseClient;

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
  globalForPrisma.basePrisma = baseDb;
}

export default db