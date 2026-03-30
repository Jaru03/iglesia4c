import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import type { Session } from "next-auth";

// ─── Page helpers (redirect on fail) ───────────────────────────────────────

export async function requireRole(allowedRoles: string[]): Promise<Session["user"]> {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");
  if (!allowedRoles.includes(session.user.role)) redirect("/app/dashboard");
  return session.user;
}

export async function requireChurchId(user: Session["user"]): Promise<number> {
  if (!user.churchId) redirect("/app/dashboard");
  return user.churchId;
}

export async function requireDepartmentId(user: Session["user"]): Promise<number> {
  if (!user.departmentId) redirect("/app/dashboard");
  return user.departmentId;
}

// ─── Server action helpers (return { error } on fail) ──────────────────────

type ActionAuthError = { error: string };

/**
 * Use at the top of server actions.
 * Returns null if authorized, or { error } if not.
 *
 * @example
 * const deny = await checkActionAuth(["ADMIN", "RESPONSIBLE"]);
 * if (deny) return deny;
 */
export async function checkActionAuth(
  allowedRoles?: string[]
): Promise<ActionAuthError | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { error: "No autenticado" };
  if (allowedRoles && !allowedRoles.includes(session.user.role)) {
    return { error: "Sin permisos para realizar esta acción" };
  }
  return null;
}

/** Gets the current session user (for server actions / API routes). */
export async function getSessionUser(): Promise<Session["user"] | null> {
  const session = await getServerSession(authOptions);
  return session?.user ?? null;
}

// ─── API route helpers (return NextResponse on fail) ───────────────────────

type ApiAuthResult =
  | { ok: true; user: Session["user"] }
  | { ok: false; response: NextResponse };

/**
 * Use at the top of API route handlers.
 * Returns { ok: true, user } or { ok: false, response } — return the response on failure.
 *
 * @example
 * const auth = await requireApiAuth(["ADMIN"]);
 * if (!auth.ok) return auth.response;
 */
export async function requireApiAuth(allowedRoles?: string[]): Promise<ApiAuthResult> {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return {
      ok: false,
      response: NextResponse.json({ error: "No autenticado" }, { status: 401 }),
    };
  }
  if (allowedRoles && !allowedRoles.includes(session.user.role)) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Sin permisos" }, { status: 403 }),
    };
  }
  return { ok: true, user: session.user };
}

// ─── Resource-level authorization ─────────────────────────────────────────

/**
 * Returns true if the user can manage the given department.
 * - ADMIN: always true
 * - RESPONSIBLE: only if the dept belongs to their church
 * - LEADER: only if they are an active leader of that dept
 */
export async function canManageDepartment(
  user: Session["user"],
  departmentId: number
): Promise<boolean> {
  if (user.role === "ADMIN") return true;

  const dept = await prisma.department.findUnique({
    where: { id: departmentId },
    select: { churchId: true },
  });
  if (!dept) return false;

  if (user.role === "RESPONSIBLE") {
    return dept.churchId === user.churchId;
  }

  if (user.role === "LEADER") {
    const membership = await prisma.departmentMember.findFirst({
      where: {
        userId: Number(user.id),
        departmentId,
        roleInDept: "LEADER",
        active: true,
      },
    });
    return !!membership;
  }

  return false;
}

/**
 * Returns true if the user can manage the given activity.
 * - ADMIN: always true
 * - RESPONSIBLE: only if the activity's dept belongs to their church
 * - LEADER: only if the activity belongs to one of their departments
 */
export async function canManageActivity(
  user: Session["user"],
  activityId: number
): Promise<boolean> {
  if (user.role === "ADMIN") return true;

  const activity = await prisma.activity.findUnique({
    where: { id: activityId },
    include: { department: { select: { churchId: true } } },
  });
  if (!activity) return false;

  if (user.role === "RESPONSIBLE") {
    return activity.department.churchId === user.churchId;
  }

  if (user.role === "LEADER") {
    const membership = await prisma.departmentMember.findFirst({
      where: {
        userId: Number(user.id),
        departmentId: activity.departmentId,
        roleInDept: "LEADER",
        active: true,
      },
    });
    return !!membership;
  }

  return false;
}

/**
 * Returns true if the user can manage the given church.
 * - ADMIN: always true
 * - RESPONSIBLE: only if it is their own church
 */
export async function canManageChurch(
  user: Session["user"],
  churchId: number
): Promise<boolean> {
  if (user.role === "ADMIN") return true;
  if (user.role === "RESPONSIBLE") return user.churchId === churchId;
  return false;
}

/**
 * Returns true if the user can view/edit the given person.
 * - ADMIN: always true
 * - RESPONSIBLE: person must belong to their church
 * - LEADER: person must be a member of one of their departments
 */
export async function canManagePerson(
  user: Session["user"],
  personId: number
): Promise<boolean> {
  if (user.role === "ADMIN") return true;

  const person = await prisma.person.findUnique({
    where: { id: personId },
    select: { churchId: true },
  });
  if (!person) return false;

  if (user.role === "RESPONSIBLE") {
    return person.churchId === user.churchId;
  }

  if (user.role === "LEADER") {
    const leaderDepts = await prisma.departmentMember.findMany({
      where: { userId: Number(user.id), roleInDept: "LEADER", active: true },
      select: { departmentId: true },
    });
    const deptIds = leaderDepts.map((d) => d.departmentId);
    const inDept = await prisma.personDepartment.findFirst({
      where: { personId, departmentId: { in: deptIds }, active: true },
    });
    return !!inDept;
  }

  return false;
}
