import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { Session } from "next-auth";

// ─── Credentials login (shared by NextAuth web login + mobile login) ──────

export type AuthenticatedPerson = {
  id: string;
  email: string | null;
  role: string;
  name: string;
  churchId: number | null;
  churchTitle: string | null;
  departmentId: number | null;
  departmentName: string | null;
};

/**
 * Looks up a Person by email, phone or document (DNI) and verifies the
 * password of their linked User account. Returns null on any mismatch or
 * error so callers (NextAuth's authorize(), the mobile login route) can
 * treat every failure as "invalid credentials" without leaking which part
 * failed.
 */
export async function authenticatePerson(
  identifier: string,
  password: string
): Promise<AuthenticatedPerson | null> {
  const input = identifier?.trim();
  if (!input || !password) return null;

  try {
    const person = await prisma.person.findFirst({
      where: {
        OR: [{ email: input.toLowerCase() }, { phone: input }, { document: input }],
      },
      include: { user: true },
    });

    if (!person?.user) return null;

    const isValidPassword = await bcrypt.compare(password, person.user.password);
    if (!isValidPassword) return null;

    const user = person.user;

    let churchId: number | null = null;
    let churchTitle: string | null = null;
    let departmentId: number | null = null;
    let departmentName: string | null = null;

    if (user.role === "RESPONSIBLE" || user.role === "ADMIN") {
      const whereClause: any = { userId: user.id };
      if (user.role === "RESPONSIBLE") whereClause.role = "RESPONSIBLE";

      const churchLeader = await prisma.churchLeader.findFirst({
        where: whereClause,
        include: { church: { select: { title: true } } },
      });
      churchId = churchLeader?.churchId ?? null;
      churchTitle = churchLeader?.church?.title ?? null;
    }

    if (user.role === "LEADER") {
      const deptMembership = await prisma.departmentMember.findFirst({
        where: { userId: user.id, roleInDept: "LEADER", active: true },
        include: { department: { select: { id: true, name: true } } },
      });
      departmentId = deptMembership?.departmentId ?? null;
      departmentName = deptMembership?.department?.name ?? null;
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
    console.error("[AUTH] Error al autenticar:", error);
    return null;
  }
}

const PERSON_MANAGE_ROLES = ["ADMIN", "RESPONSIBLE", "LEADER"];

async function isAtencionPrimariaMember(userId: number): Promise<boolean> {
  const person = await prisma.person.findFirst({
    where: { user: { id: userId } },
    select: { id: true, churchId: true },
  });
  if (!person?.churchId) return false;
  const dept = await prisma.department.findFirst({
    where: { churchId: person.churchId, name: { contains: "Atención Primaria", mode: "insensitive" } },
  });
  if (!dept) return false;
  const membership = await prisma.personDepartment.findFirst({
    where: { personId: person.id, departmentId: dept.id, active: true },
  });
  return !!membership;
}

/**
 * ADMIN/RESPONSIBLE/LEADER can always create Person records; anyone else
 * needs to be an active member of their church's "Atención Primaria"
 * department (visitor intake). Shared by the crearPersona server action and
 * the mobile POST /api/personas route.
 */
export async function canCreatePersons(userId: number, role: string): Promise<boolean> {
  if (PERSON_MANAGE_ROLES.includes(role)) return true;
  return isAtencionPrimariaMember(userId);
}

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

export type MobileAuthenticatedUser = AuthenticatedPerson & { canCreatePersons: boolean };

type MobileApiAuthResult =
  | { ok: true; user: MobileAuthenticatedUser }
  | { ok: false; response: NextResponse };

/**
 * Like requireApiAuth, but for non-browser clients (e.g. the Expo app) that
 * send the JWT from POST /api/auth/mobile-login as `Authorization: Bearer <token>`
 * instead of a NextAuth session cookie.
 *
 * @example
 * const auth = requireMobileAuth(req, ["ADMIN"]);
 * if (!auth.ok) return auth.response;
 */
export function requireMobileAuth(req: Request, allowedRoles?: string[]): MobileApiAuthResult {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) {
    return { ok: false, response: NextResponse.json({ error: "No autenticado" }, { status: 401 }) };
  }

  try {
    const user = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as MobileAuthenticatedUser;
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return { ok: false, response: NextResponse.json({ error: "Sin permisos" }, { status: 403 }) };
    }
    return { ok: true, user };
  } catch {
    return {
      ok: false,
      response: NextResponse.json({ error: "Token inválido o expirado" }, { status: 401 }),
    };
  }
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
      where: { userId: Number(user.id), departmentId, roleInDept: "LEADER", active: true },
    });
    if (membership) return true;

    // Also check PersonDepartment (leader assigned via person, not user)
    const userRecord = await prisma.user.findUnique({
      where: { id: Number(user.id) },
      select: { person: { select: { id: true } } },
    });
    if (userRecord?.person) {
      const pdLeader = await prisma.personDepartment.findFirst({
        where: { personId: userRecord.person.id, departmentId, roleInDept: "LEADER" },
      });
      return !!pdLeader;
    }
    return false;
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
    return activity.department?.churchId === user.churchId;
  }

  if (user.role === "LEADER") {
    if (!activity.departmentId) return false;
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
