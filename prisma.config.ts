// iglesia4c/prisma.config.ts
import 'dotenv/config'; // Asegúrate que esta línea sigue aquí arriba
import { defineConfig } from 'prisma/config';

export default defineConfig({
  datasource: {
    url: process.env.DIRECT_URL, 
  },
});