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
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toLowerCase().trim();
        const password = credentials?.password;

        console.log("[AUTH] Intento de login:", { email });

        if (!email || !password) {
          console.log("[AUTH] Fallo: email o password vacíos");
          return null;
        }

        try {
          const person = await prisma.person.findUnique({
            where: { email },
            include: { user: true },
          });

          console.log("[AUTH] Persona encontrada:", person ? `id=${person.id}` : "null");

          if (!person) {
            console.log("[AUTH] Fallo: persona no encontrada");
            return null;
          }

          if (!person.user) {
            console.log("[AUTH] Fallo: persona sin cuenta de usuario");
            return null;
          }

          const user = person.user;
          const isValidPassword = await bcrypt.compare(password, user.password);
          console.log("[AUTH] Password válida:", isValidPassword);

          if (!isValidPassword) {
            return null;
          }

          return {
            id: user.id.toString(),
            email: person.email,
            role: user.role,
            name: `${person.name} ${person.lastname}`,
          };
        } catch (error) {
          console.error("[AUTH] Error de Prisma:", error);
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (!user) return token;

      token.id = user.id;
      token.role = user.role;

      return token;
    },

    async session({ session, token }) {
      if (!session.user) return session;

      session.user.id = token.id as string;
      session.user.role = token.role as string;

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
