import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role: string
      churchId?: number | null
      churchTitle?: string | null
      departmentId?: number | null
      departmentName?: string | null
    }
  }

  interface User {
    role: string
    churchId?: number | null
    churchTitle?: string | null
    departmentId?: number | null
    departmentName?: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: string
    churchId?: number | null
    churchTitle?: string | null
    departmentId?: number | null
    departmentName?: string | null
  }
}
