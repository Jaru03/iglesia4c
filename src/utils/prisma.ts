// src/utils/prisma.ts

// 1. IMPORTANTE: Apuntamos a la carpeta 'generated' 
import { PrismaClient } from '../../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

// 👇 ¡AQUÍ FALTABA EL SSL! Sin esto, se queda cargando.
const pool = new Pool({ 
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? true : { rejectUnauthorized: false }
});

const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;