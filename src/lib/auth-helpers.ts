import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { Session } from "next-auth";

export async function requireRole(
  allowedRoles: string[]
): Promise<Session["user"]> {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  if (!allowedRoles.includes(session.user.role)) {
    redirect("/dashboard");
  }

  return session.user;
}

export async function requireChurchId(user: Session["user"]): Promise<number> {
  if (!user.churchId) {
    redirect("/dashboard");
  }
  return user.churchId;
}

export async function requireDepartmentId(
  user: Session["user"]
): Promise<number> {
  if (!user.departmentId) {
    redirect("/dashboard");
  }
  return user.departmentId;
}
