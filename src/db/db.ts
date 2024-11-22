import { currentUser } from '@/lid/extensions/current-user';
import { PrismaClient } from '@prisma/client'

const baseClient = new PrismaClient();

const client = baseClient.$extends(currentUser());


const globalForPrisma = global as unknown as {
  prisma: typeof client | undefined;
  basePrisma: typeof baseClient | undefined;
}

if (!globalForPrisma.basePrisma) {
  globalForPrisma.basePrisma = baseClient;
}

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = client
}

// export const db = globalForPrisma.prisma || client
export const db = globalForPrisma.prisma 

export const baseDb = globalForPrisma.basePrisma
// export const baseDb = globalForPrisma.basePrisma || baseClient;

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
  globalForPrisma.basePrisma = baseDb;
}

export default db