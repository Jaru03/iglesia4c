import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/utils/prisma";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        const input = credentials?.email?.trim();
        const password = credentials?.password;

        console.log("[AUTH] Intento de login:", { input });

        if (!input || !password) {
          console.log("[AUTH] Fallo: identificador o password vacíos");
          return null;
        }

        const email = input.toLowerCase();
        const phone = input;

        try {
          let person = await prisma.person.findFirst({
            where: {
              OR: [
                { email: email },
                { phone: phone },
              ],
            },
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

          let churchId: number | null = null;
          let churchTitle: string | null = null;
          let departmentId: number | null = null;
          let departmentName: string | null = null;

          if (user.role === "RESPONSIBLE" || user.role === "ADMIN") {
            try {
              const whereClause: any = { userId: user.id };
              if (user.role === "RESPONSIBLE") {
                whereClause.role = "RESPONSIBLE";
              }

              const churchLeader = await prisma.churchLeader.findFirst({
                where: whereClause,
                include: { church: { select: { title: true } } },
              });

              churchId = churchLeader?.churchId ?? null;
              churchTitle = churchLeader?.church?.title ?? null;
              console.log("[AUTH] Iglesia encontrada:", churchId ? `id=${churchId}` : "ninguna");
            } catch (churchError) {
              console.error("[AUTH] Error al buscar iglesia del usuario:", churchError);
              // El login continúa aunque no se encuentre la iglesia
            }
          }

          if (user.role === "LEADER") {
            try {
              const deptMembership = await prisma.departmentMember.findFirst({
                where: { userId: user.id, roleInDept: "LEADER", active: true },
                include: { department: { select: { id: true, name: true } } },
              });
              departmentId = deptMembership?.departmentId ?? null;
              departmentName = deptMembership?.department?.name ?? null;
              console.log("[AUTH] Departamento del líder:", departmentId ? `id=${departmentId}` : "ninguno");
            } catch (deptError) {
              console.error("[AUTH] Error al buscar departamento del líder:", deptError);
            }
          }

          return {
            id: user.id.toString(),
            email: person.email,
            role: user.role,
            name: `${person.name} ${person.lastname}`,
            churchId,
            churchTitle,
            departmentId,
            departmentName,
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
