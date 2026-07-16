import CredentialsProvider from "next-auth/providers/credentials";
import { authenticatePerson } from "@/lib/auth-helpers";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email, DNI o teléfono", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        return authenticatePerson(credentials.email, credentials.password);
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
      token.churchId = user.churchId ?? undefined;
      token.churchTitle = user.churchTitle ?? undefined;
      token.departmentId = user.departmentId ?? undefined;
      token.departmentName = user.departmentName ?? undefined;

      return token;
    },

    async session({ session, token }) {
      if (!session.user) return session;

      session.user.id = token.id as string;
      session.user.role = token.role as string;
      session.user.churchId = token.churchId ?? null;
      session.user.churchTitle = token.churchTitle ?? null;
      session.user.departmentId = token.departmentId ?? null;
      session.user.departmentName = token.departmentName ?? null;

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
