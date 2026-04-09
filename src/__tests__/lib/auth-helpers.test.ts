import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Hoisted mocks (vi.mock is hoisted before imports) ─────────────────────────
const mockGetServerSession = vi.hoisted(() => vi.fn());
const mockPrisma = vi.hoisted(() => ({
  department: { findUnique: vi.fn() },
  departmentMember: { findFirst: vi.fn(), findMany: vi.fn() },
  activity: { findUnique: vi.fn() },
  person: { findUnique: vi.fn() },
  personDepartment: { findFirst: vi.fn() },
}));

vi.mock("next-auth", () => ({ getServerSession: (...args: unknown[]) => mockGetServerSession(...args) }));
vi.mock("@/utils/prisma", () => ({ default: mockPrisma }));
vi.mock("@/lib/auth", () => ({ authOptions: {} }));

import {
  checkActionAuth,
  requireApiAuth,
  getSessionUser,
  canManageDepartment,
  canManageActivity,
  canManageChurch,
  canManagePerson,
} from "@/lib/auth-helpers";

// ── Helpers ───────────────────────────────────────────────────────────────────
function makeUser(overrides = {}) {
  return { id: "1", role: "ADMIN", churchId: 10, departmentId: null, ...overrides };
}

beforeEach(() => vi.clearAllMocks());

// ── checkActionAuth ───────────────────────────────────────────────────────────
describe("checkActionAuth()", () => {
  it("devuelve { error } cuando no hay sesión", async () => {
    mockGetServerSession.mockResolvedValue(null);
    expect(await checkActionAuth()).toEqual({ error: "No autenticado" });
  });

  it("devuelve null cuando el rol está permitido", async () => {
    mockGetServerSession.mockResolvedValue({ user: makeUser({ role: "ADMIN" }) });
    expect(await checkActionAuth(["ADMIN", "RESPONSIBLE"])).toBeNull();
  });

  it("devuelve { error } cuando el rol no está permitido", async () => {
    mockGetServerSession.mockResolvedValue({ user: makeUser({ role: "USER" }) });
    expect(await checkActionAuth(["ADMIN", "RESPONSIBLE"])).toEqual({
      error: "Sin permisos para realizar esta acción",
    });
  });

  it("devuelve null sin lista de roles (cualquier usuario autenticado)", async () => {
    mockGetServerSession.mockResolvedValue({ user: makeUser({ role: "USER" }) });
    expect(await checkActionAuth()).toBeNull();
  });
});

// ── getSessionUser ────────────────────────────────────────────────────────────
describe("getSessionUser()", () => {
  it("devuelve el usuario cuando hay sesión", async () => {
    const user = makeUser();
    mockGetServerSession.mockResolvedValue({ user });
    expect(await getSessionUser()).toEqual(user);
  });

  it("devuelve null cuando no hay sesión", async () => {
    mockGetServerSession.mockResolvedValue(null);
    expect(await getSessionUser()).toBeNull();
  });
});

// ── requireApiAuth ────────────────────────────────────────────────────────────
describe("requireApiAuth()", () => {
  it("devuelve { ok: false, response 401 } cuando no hay sesión", async () => {
    mockGetServerSession.mockResolvedValue(null);
    const result = await requireApiAuth();
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.response.status).toBe(401);
  });

  it("devuelve { ok: false, response 403 } cuando el rol no coincide", async () => {
    mockGetServerSession.mockResolvedValue({ user: makeUser({ role: "USER" }) });
    const result = await requireApiAuth(["ADMIN"]);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.response.status).toBe(403);
  });

  it("devuelve { ok: true, user } cuando está autorizado", async () => {
    const user = makeUser({ role: "ADMIN" });
    mockGetServerSession.mockResolvedValue({ user });
    const result = await requireApiAuth(["ADMIN"]);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.user).toEqual(user);
  });
});

// ── canManageDepartment ───────────────────────────────────────────────────────
describe("canManageDepartment()", () => {
  it("ADMIN siempre puede", async () => {
    expect(await canManageDepartment(makeUser({ role: "ADMIN" }), 5)).toBe(true);
  });

  it("RESPONSIBLE puede si el dept pertenece a su iglesia", async () => {
    mockPrisma.department.findUnique.mockResolvedValue({ churchId: 10 });
    expect(await canManageDepartment(makeUser({ role: "RESPONSIBLE", churchId: 10 }), 5)).toBe(true);
  });

  it("RESPONSIBLE no puede si el dept es de otra iglesia", async () => {
    mockPrisma.department.findUnique.mockResolvedValue({ churchId: 99 });
    expect(await canManageDepartment(makeUser({ role: "RESPONSIBLE", churchId: 10 }), 5)).toBe(false);
  });

  it("RESPONSIBLE devuelve false si el dept no existe", async () => {
    mockPrisma.department.findUnique.mockResolvedValue(null);
    expect(await canManageDepartment(makeUser({ role: "RESPONSIBLE", churchId: 10 }), 5)).toBe(false);
  });

  it("LEADER puede si es líder activo del dept", async () => {
    mockPrisma.department.findUnique.mockResolvedValue({ churchId: 10 });
    mockPrisma.departmentMember.findFirst.mockResolvedValue({ id: 1 });
    expect(await canManageDepartment(makeUser({ role: "LEADER", id: "1" }), 5)).toBe(true);
  });

  it("LEADER no puede si no es líder del dept", async () => {
    mockPrisma.department.findUnique.mockResolvedValue({ churchId: 10 });
    mockPrisma.departmentMember.findFirst.mockResolvedValue(null);
    expect(await canManageDepartment(makeUser({ role: "LEADER", id: "1" }), 5)).toBe(false);
  });

  it("USER nunca puede", async () => {
    mockPrisma.department.findUnique.mockResolvedValue({ churchId: 10 });
    expect(await canManageDepartment(makeUser({ role: "USER" }), 5)).toBe(false);
  });
});

// ── canManageActivity ─────────────────────────────────────────────────────────
describe("canManageActivity()", () => {
  it("ADMIN siempre puede", async () => {
    expect(await canManageActivity(makeUser({ role: "ADMIN" }), 1)).toBe(true);
  });

  it("RESPONSIBLE puede si la actividad pertenece a su iglesia", async () => {
    mockPrisma.activity.findUnique.mockResolvedValue({
      departmentId: 5,
      department: { churchId: 10 },
    });
    expect(await canManageActivity(makeUser({ role: "RESPONSIBLE", churchId: 10 }), 1)).toBe(true);
  });

  it("RESPONSIBLE no puede si la actividad es de otra iglesia", async () => {
    mockPrisma.activity.findUnique.mockResolvedValue({
      departmentId: 5,
      department: { churchId: 99 },
    });
    expect(await canManageActivity(makeUser({ role: "RESPONSIBLE", churchId: 10 }), 1)).toBe(false);
  });

  it("devuelve false si la actividad no existe", async () => {
    mockPrisma.activity.findUnique.mockResolvedValue(null);
    expect(await canManageActivity(makeUser({ role: "RESPONSIBLE", churchId: 10 }), 99)).toBe(false);
  });

  it("LEADER puede si es líder activo del dept de la actividad", async () => {
    mockPrisma.activity.findUnique.mockResolvedValue({
      departmentId: 5,
      department: { churchId: 10 },
    });
    mockPrisma.departmentMember.findFirst.mockResolvedValue({ id: 1 });
    expect(await canManageActivity(makeUser({ role: "LEADER", id: "2" }), 1)).toBe(true);
  });
});

// ── canManageChurch ───────────────────────────────────────────────────────────
describe("canManageChurch()", () => {
  it("ADMIN puede en cualquier iglesia", async () => {
    expect(await canManageChurch(makeUser({ role: "ADMIN" }), 99)).toBe(true);
  });

  it("RESPONSIBLE puede en su propia iglesia", async () => {
    expect(await canManageChurch(makeUser({ role: "RESPONSIBLE", churchId: 10 }), 10)).toBe(true);
  });

  it("RESPONSIBLE no puede en otra iglesia", async () => {
    expect(await canManageChurch(makeUser({ role: "RESPONSIBLE", churchId: 10 }), 20)).toBe(false);
  });

  it("LEADER nunca puede", async () => {
    expect(await canManageChurch(makeUser({ role: "LEADER" }), 10)).toBe(false);
  });
});

// ── canManagePerson ───────────────────────────────────────────────────────────
describe("canManagePerson()", () => {
  it("ADMIN siempre puede", async () => {
    expect(await canManagePerson(makeUser({ role: "ADMIN" }), 1)).toBe(true);
  });

  it("RESPONSIBLE puede si la persona pertenece a su iglesia", async () => {
    mockPrisma.person.findUnique.mockResolvedValue({ churchId: 10 });
    expect(await canManagePerson(makeUser({ role: "RESPONSIBLE", churchId: 10 }), 1)).toBe(true);
  });

  it("RESPONSIBLE no puede si la persona es de otra iglesia", async () => {
    mockPrisma.person.findUnique.mockResolvedValue({ churchId: 99 });
    expect(await canManagePerson(makeUser({ role: "RESPONSIBLE", churchId: 10 }), 1)).toBe(false);
  });

  it("devuelve false si la persona no existe", async () => {
    mockPrisma.person.findUnique.mockResolvedValue(null);
    expect(await canManagePerson(makeUser({ role: "RESPONSIBLE", churchId: 10 }), 99)).toBe(false);
  });

  it("LEADER puede si la persona está en uno de sus depts", async () => {
    mockPrisma.person.findUnique.mockResolvedValue({ churchId: 10 });
    mockPrisma.departmentMember.findMany.mockResolvedValue([{ departmentId: 5 }]);
    mockPrisma.personDepartment.findFirst.mockResolvedValue({ id: 1 });
    expect(await canManagePerson(makeUser({ role: "LEADER", id: "3" }), 1)).toBe(true);
  });

  it("LEADER no puede si la persona no está en sus depts", async () => {
    mockPrisma.person.findUnique.mockResolvedValue({ churchId: 10 });
    mockPrisma.departmentMember.findMany.mockResolvedValue([{ departmentId: 5 }]);
    mockPrisma.personDepartment.findFirst.mockResolvedValue(null);
    expect(await canManagePerson(makeUser({ role: "LEADER", id: "3" }), 1)).toBe(false);
  });
});
