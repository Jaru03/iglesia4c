import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
// import prisma from "@/utils/prisma";
//Esta es la importación que funciona correctamente. seguramente tiendes que hacer pnpx prisma generate para que genere el prismaClient y funcione correctamente esta línea.

// tienes que descomentar esto de prisma y usarlo.
// prisma 

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        // MODO SEGURO APAGADO TEMPORALMENTE
        // Como no hay DB, devolvemos un usuario falso para que no explote
        // Mañana descomentamos la lógica real.
        return null; 
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/login',
  },
  // ESTO ES IMPORTANTE PARA QUE NO TE DE ERROR DE "NO SECRET"
  secret: process.env.NEXTAUTH_SECRET, 
});

// ESTA ES LA PARTE QUE SOLUCIONA TU ERROR ROJO
export { handler as GET, handler as POST };