import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/utils/prisma";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials) {
        console.log("🔍 INTENTO DE LOGIN:");
        console.log("   - Email recibido:", credentials?.email);
        console.log("   - Password recibida:", credentials?.password);

        // 1. Validar que vengan datos
        if (!credentials?.email || !credentials?.password) {
          console.log("❌ FALLO: Faltan credenciales");
          throw new Error("Faltan credenciales");
        }

        // 2. Buscar el usuario en la tabla de Usuarios Registrados (User)
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        console.log("   - Usuario en DB (Tabla User):", user ? "ENCONTRADO ✅" : "NO EXISTE ❌");

        if (!user) throw new Error("Usuario no encontrado");

        // 3. Comparar contraseña
        const isValid = await bcrypt.compare(credentials.password, user.password);
        console.log("   - Contraseña válida:", isValid ? "SÍ ✅" : "NO ❌");
        
        if (!isValid) throw new Error("Contraseña incorrecta");

        // 4. VALIDACIÓN DE SEGURIDAD (WHITELIST)
        const allowed = await prisma.allowedUser.findUnique({
          where: { email: credentials.email } 
        });

        console.log("   - Permiso en AllowedUser:", allowed ? "AUTORIZADO ✅" : "BLOQUEADO (No está en la lista) ❌");
        console.log("   - Datos de AllowedUser:", allowed);

        if (!allowed) {
          throw new Error("No tienes permisos para acceder.");
        }

        // 5. Devolvemos el usuario
        return {
          id: user.id.toString(),
          name: user.nombre,
          email: user.email,
          role: allowed.role, 
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
 callbacks: {
    // 6. [NUEVO] Pasar el Rol al Token
    async jwt({ token, user }) {
      if (user) {
        // Usamos (user as any) para saltarnos la restricción de tipos de TS
        token.role = (user as any).role; 
      }
      return token;
    },
    // 7. [NUEVO] Pasar el Rol a la Sesión (Cliente)
    async session({ session, token }) {
      if (session.user) {
        // @ts-ignore - Esto le dice a TS que ignore la siguiente línea
        session.user.role = token.role; 
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };