// src/utils/prisma.ts

// 1. MANTENEMOS TU RUTA PERSONALIZADA
// Asegúrate de que esta carpeta exista. Si te da error, usa '@prisma/client'
import { PrismaClient } from '../../generated/prisma/client';

const prismaClientSingleton = () => {
  // 2. Instanciamos el cliente DIRECTAMENTE.
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;