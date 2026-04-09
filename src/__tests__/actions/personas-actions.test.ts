import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Hoisted mocks ─────────────────────────────────────────────────────────────
const mockGetSessionUser = vi.hoisted(() => vi.fn());
const mockCanManagePerson = vi.hoisted(() => vi.fn());
const mockPrisma = vi.hoisted(() => ({
  person: { create: vi.fn(), update: vi.fn(), delete: vi.fn(), findUnique: vi.fn() },
  user: { findFirst: vi.fn(), update: vi.fn() },
  personDepartment: { deleteMany: vi.fn(), createMany: vi.fn() },
  $executeRaw: vi.fn().mockResolvedValue(0),
  $transaction: vi.fn(async (ops: unknown) => {
    if (Array.isArray(ops)) return Promise.all(ops);
    if (typeof ops === "function") {
      // tx callback — provide a minimal tx mock
      return (ops as (tx: unknown) => Promise<unknown>)(mockPrisma);
    }
    return ops;
  }),
}));

vi.mock("@/lib/auth-helpers", () => ({
  getSessionUser: () => mockGetSessionUser(),
  canManagePerson: (...args: unknown[]) => mockCanManagePerson(...args),
}));
vi.mock("@/utils/prisma", () => ({ default: mockPrisma }));

import {
  toggleIsMember,
  crearPersona,
  actualizarPersona,
} from "@/actions/personas-actions";

// ── Helpers ───────────────────────────────────────────────────────────────────
function makeAdmin() {
  return { id: "1", role: "ADMIN", churchId: 10, departmentId: null };
}

function makeFormData(overrides: Record<string, string> = {}): FormData {
  const fd = new FormData();
  const defaults: Record<string, string> = {
    name: "Juan",
    lastname: "García",
    email: "juan@iglesia.com",
    phone: "600111222",
    document: "12345678A",
    birthDate: "1990-01-15",
    churchId: "10",
    membershipStatus: "VISITOR",
    isMember: "false",
  };
  Object.entries({ ...defaults, ...overrides }).forEach(([k, v]) => fd.append(k, v));
  return fd;
}

beforeEach(() => vi.clearAllMocks());

// ── toggleIsMember ────────────────────────────────────────────────────────────
describe("toggleIsMember()", () => {
  it("devuelve error si no hay sesión", async () => {
    mockGetSessionUser.mockResolvedValue(null);
    expect(await toggleIsMember(1, true)).toEqual({ error: "No autenticado" });
  });

  it("devuelve error si el rol no tiene permisos (LEADER)", async () => {
    mockGetSessionUser.mockResolvedValue({ id: "1", role: "LEADER" });
    expect(await toggleIsMember(1, true)).toEqual({ error: "Sin permisos" });
  });

  it("devuelve error si sin permisos sobre la persona", async () => {
    mockGetSessionUser.mockResolvedValue(makeAdmin());
    mockCanManagePerson.mockResolvedValue(false);
    expect(await toggleIsMember(1, true)).toEqual({ error: "Sin permisos sobre esa persona" });
  });

  it("activa la membresía correctamente", async () => {
    mockGetSessionUser.mockResolvedValue(makeAdmin());
    mockCanManagePerson.mockResolvedValue(true);
    mockPrisma.person.update.mockResolvedValue({ id: 1 });
    mockPrisma.user.findFirst.mockResolvedValue(null);

    expect(await toggleIsMember(1, true)).toEqual({ success: "Membresía activada." });
    expect(mockPrisma.person.update).toHaveBeenCalledWith({ where: { id: 1 }, data: { isMember: true } });
  });

  it("desactiva la membresía correctamente", async () => {
    mockGetSessionUser.mockResolvedValue(makeAdmin());
    mockCanManagePerson.mockResolvedValue(true);
    mockPrisma.person.update.mockResolvedValue({ id: 1 });
    mockPrisma.user.findFirst.mockResolvedValue(null);

    expect(await toggleIsMember(1, false)).toEqual({ success: "Membresía desactivada." });
  });

  it("degrada el rol del usuario a USER si no es privilegiado", async () => {
    mockGetSessionUser.mockResolvedValue(makeAdmin());
    mockCanManagePerson.mockResolvedValue(true);
    mockPrisma.person.update.mockResolvedValue({});
    mockPrisma.user.findFirst.mockResolvedValue({ id: 5, role: "MEMBER" });
    mockPrisma.user.update.mockResolvedValue({});

    await toggleIsMember(1, false);
    expect(mockPrisma.user.update).toHaveBeenCalledWith({
      where: { id: 5 },
      data: { role: "USER" },
    });
  });

  it("no degrada roles privilegiados (ADMIN, RESPONSIBLE, LEADER)", async () => {
    mockGetSessionUser.mockResolvedValue(makeAdmin());
    mockCanManagePerson.mockResolvedValue(true);
    mockPrisma.person.update.mockResolvedValue({});
    mockPrisma.user.findFirst.mockResolvedValue({ id: 5, role: "ADMIN" });

    await toggleIsMember(1, false);
    expect(mockPrisma.user.update).not.toHaveBeenCalled();
  });
});

// ── crearPersona ──────────────────────────────────────────────────────────────
describe("crearPersona()", () => {
  it("devuelve error si no hay sesión", async () => {
    mockGetSessionUser.mockResolvedValue(null);
    expect(await crearPersona(makeFormData())).toEqual({ error: "No autenticado" });
  });

  it("devuelve error si el rol no puede crear personas", async () => {
    mockGetSessionUser.mockResolvedValue({ id: "1", role: "USER" });
    expect(await crearPersona(makeFormData())).toEqual({ error: "Sin permisos" });
  });

  it("devuelve error si falta el nombre", async () => {
    mockGetSessionUser.mockResolvedValue(makeAdmin());
    expect(await crearPersona(makeFormData({ name: "" }))).toEqual({
      error: "El nombre es obligatorio.",
    });
  });

  it("devuelve error si faltan los apellidos", async () => {
    mockGetSessionUser.mockResolvedValue(makeAdmin());
    expect(await crearPersona(makeFormData({ lastname: "" }))).toEqual({
      error: "Los apellidos son obligatorios.",
    });
  });

  it("RESPONSIBLE no puede crear personas en otra iglesia", async () => {
    mockGetSessionUser.mockResolvedValue({ id: "1", role: "RESPONSIBLE", churchId: 10 });
    expect(await crearPersona(makeFormData({ churchId: "99" }))).toEqual({
      error: "Sin permisos para crear personas en esa iglesia",
    });
  });

  it("crea la persona correctamente", async () => {
    mockGetSessionUser.mockResolvedValue(makeAdmin());
    mockPrisma.person.create.mockResolvedValue({ id: 1 });
    mockPrisma.person.findUnique.mockResolvedValue({
      id: 1, active: true, membershipStatus: "VISITOR",
      departments: [], _count: { attendances: 0 },
    });

    expect(await crearPersona(makeFormData())).toEqual({ success: "Persona creada correctamente." });
    expect(mockPrisma.person.create).toHaveBeenCalledOnce();
  });

  it("devuelve error si falla la base de datos", async () => {
    mockGetSessionUser.mockResolvedValue(makeAdmin());
    mockPrisma.person.create.mockRejectedValue(new Error("DB error"));

    expect(await crearPersona(makeFormData())).toEqual({ error: "Error al crear la persona." });
  });
});

// ── actualizarPersona ─────────────────────────────────────────────────────────
describe("actualizarPersona()", () => {
  it("devuelve error si no hay sesión", async () => {
    mockGetSessionUser.mockResolvedValue(null);
    expect(await actualizarPersona(1, makeFormData())).toEqual({ error: "No autenticado" });
  });

  it("devuelve error si el rol no tiene permisos", async () => {
    mockGetSessionUser.mockResolvedValue({ id: "1", role: "USER" });
    expect(await actualizarPersona(1, makeFormData())).toEqual({ error: "Sin permisos" });
  });

  it("devuelve error si sin permisos sobre la persona", async () => {
    mockGetSessionUser.mockResolvedValue(makeAdmin());
    mockCanManagePerson.mockResolvedValue(false);
    expect(await actualizarPersona(1, makeFormData())).toEqual({
      error: "Sin permisos sobre esa persona",
    });
  });

  it("devuelve error si falta el nombre", async () => {
    mockGetSessionUser.mockResolvedValue(makeAdmin());
    mockCanManagePerson.mockResolvedValue(true);
    expect(await actualizarPersona(1, makeFormData({ name: "" }))).toEqual({
      error: "El nombre es obligatorio.",
    });
  });

  it("actualiza la persona correctamente", async () => {
    mockGetSessionUser.mockResolvedValue(makeAdmin());
    mockCanManagePerson.mockResolvedValue(true);
    mockPrisma.$transaction.mockResolvedValue([{}, {}]);
    mockPrisma.person.findUnique.mockResolvedValue({
      id: 1, active: true, membershipStatus: "VISITOR",
      departments: [], _count: { attendances: 0 },
    });

    expect(await actualizarPersona(1, makeFormData())).toEqual({
      success: "Persona actualizada correctamente.",
    });
  });

  it("devuelve error si falla la transacción", async () => {
    mockGetSessionUser.mockResolvedValue(makeAdmin());
    mockCanManagePerson.mockResolvedValue(true);
    mockPrisma.$transaction.mockRejectedValue(new Error("TX error"));

    expect(await actualizarPersona(1, makeFormData())).toEqual({
      error: "Error al actualizar la persona.",
    });
  });
});
