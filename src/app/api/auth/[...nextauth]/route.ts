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
        // 1. Validar que vengan datos
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Faltan credenciales");
        }

        // 2. Buscar el usuario en la Base de Datos
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        // Si no existe el usuario
        if (!user) throw new Error("Usuario no encontrado");

        // 3. Comparar la contraseña (La que escribes vs. la encriptada)
        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) throw new Error("Contraseña incorrecta");

        // 4. Si todo ok, devolvemos el usuario
        return {
          id: user.id.toString(),
          name: user.nombre,
          email: user.email,
          role: user.role,
        };
      }
    })
  ],
  pages: {
    signIn: '/login', 
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };