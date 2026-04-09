import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Hoisted mocks ─────────────────────────────────────────────────────────────
const mockGetSessionUser = vi.hoisted(() => vi.fn());
const mockCanManageDepartment = vi.hoisted(() => vi.fn());
const mockPrisma = vi.hoisted(() => ({
  department: { create: vi.fn(), update: vi.fn(), delete: vi.fn(), findUnique: vi.fn() },
  departmentMember: {
    upsert: vi.fn(),
    findMany: vi.fn(),
    deleteMany: vi.fn(),
    findFirst: vi.fn(),
  },
  personDepartment: { upsert: vi.fn(), findMany: vi.fn(), update: vi.fn() },
  user: { findUnique: vi.fn(), update: vi.fn() },
}));

vi.mock("@/lib/auth-helpers", () => ({
  getSessionUser: () => mockGetSessionUser(),
  canManageDepartment: (...args: unknown[]) => mockCanManageDepartment(...args),
}));
vi.mock("@/utils/prisma", () => ({ default: mockPrisma }));

import {
  crearDepartamento,
  eliminarDepartamento,
  toggleDepartamento,
} from "@/actions/departamentos-actions";

// ── Helpers ───────────────────────────────────────────────────────────────────
function makeAdmin() {
  return { id: "1", role: "ADMIN", churchId: 10, departmentId: null };
}

function makeFormData(overrides: Record<string, string> = {}): FormData {
  const fd = new FormData();
  const defaults: Record<string, string> = {
    name: "Jóvenes",
    description: "Grupo de jóvenes",
    churchId: "10",
  };
  Object.entries({ ...defaults, ...overrides }).forEach(([k, v]) => fd.append(k, v));
  return fd;
}

beforeEach(() => vi.clearAllMocks());

// ── crearDepartamento ─────────────────────────────────────────────────────────
describe("crearDepartamento()", () => {
  it("devuelve error si no hay sesión", async () => {
    mockGetSessionUser.mockResolvedValue(null);
    expect(await crearDepartamento(makeFormData())).toEqual({ error: "No autenticado" });
  });

  it("devuelve error si el rol no tiene permisos (LEADER)", async () => {
    mockGetSessionUser.mockResolvedValue({ id: "1", role: "LEADER" });
    expect(await crearDepartamento(makeFormData())).toEqual({ error: "Sin permisos" });
  });

  it("devuelve error si faltan nombre o iglesia", async () => {
    mockGetSessionUser.mockResolvedValue(makeAdmin());
    expect(await crearDepartamento(makeFormData({ name: "" }))).toEqual({
      error: "El nombre y la iglesia son obligatorios.",
    });
  });

  it("RESPONSIBLE no puede crear depts en otra iglesia", async () => {
    mockGetSessionUser.mockResolvedValue({ id: "1", role: "RESPONSIBLE", churchId: 10 });
    expect(await crearDepartamento(makeFormData({ churchId: "99" }))).toEqual({
      error: "Sin permisos sobre esa iglesia",
    });
  });

  it("crea el departamento sin líderes correctamente", async () => {
    mockGetSessionUser.mockResolvedValue(makeAdmin());
    mockPrisma.department.create.mockResolvedValue({ id: 1, name: "Jóvenes" });

    expect(await crearDepartamento(makeFormData())).toEqual({
      success: "Departamento creado correctamente.",
    });
    expect(mockPrisma.department.create).toHaveBeenCalledOnce();
  });

  it("devuelve error si falla la base de datos", async () => {
    mockGetSessionUser.mockResolvedValue(makeAdmin());
    mockPrisma.department.create.mockRejectedValue(new Error("DB error"));

    expect(await crearDepartamento(makeFormData())).toEqual({
      error: "Error al crear el departamento.",
    });
  });
});

// ── eliminarDepartamento ──────────────────────────────────────────────────────
describe("eliminarDepartamento()", () => {
  it("devuelve error si no hay sesión", async () => {
    mockGetSessionUser.mockResolvedValue(null);
    const fd = new FormData();
    fd.append("id", "5");
    expect(await eliminarDepartamento(fd)).toEqual({ error: "No autenticado" });
  });

  it("devuelve error si el rol no tiene permisos", async () => {
    mockGetSessionUser.mockResolvedValue({ id: "1", role: "LEADER" });
    const fd = new FormData();
    fd.append("id", "5");
    expect(await eliminarDepartamento(fd)).toEqual({ error: "Sin permisos" });
  });

  it("devuelve error si el id es inválido", async () => {
    mockGetSessionUser.mockResolvedValue(makeAdmin());
    const fd = new FormData();
    fd.append("id", "0");
    expect(await eliminarDepartamento(fd)).toEqual({ error: "ID inválido" });
  });

  it("devuelve error si sin permisos sobre el departamento", async () => {
    mockGetSessionUser.mockResolvedValue(makeAdmin());
    mockCanManageDepartment.mockResolvedValue(false);
    const fd = new FormData();
    fd.append("id", "5");
    expect(await eliminarDepartamento(fd)).toEqual({
      error: "Sin permisos sobre ese departamento",
    });
  });

  it("elimina el departamento correctamente", async () => {
    mockGetSessionUser.mockResolvedValue(makeAdmin());
    mockCanManageDepartment.mockResolvedValue(true);
    mockPrisma.department.delete.mockResolvedValue({});

    const fd = new FormData();
    fd.append("id", "5");
    const result = await eliminarDepartamento(fd);
    expect(mockPrisma.department.delete).toHaveBeenCalledWith({ where: { id: 5 } });
    expect(result).toBeUndefined();
  });
});

// ── toggleDepartamento ────────────────────────────────────────────────────────
describe("toggleDepartamento()", () => {
  it("devuelve error si no hay sesión", async () => {
    mockGetSessionUser.mockResolvedValue(null);
    expect(await toggleDepartamento(5)).toEqual({ error: "No autenticado" });
  });

  it("devuelve error si sin permisos", async () => {
    mockGetSessionUser.mockResolvedValue({ id: "1", role: "USER" });
    expect(await toggleDepartamento(5)).toEqual({ error: "Sin permisos" });
  });

  it("desactiva un departamento activo", async () => {
    mockGetSessionUser.mockResolvedValue(makeAdmin());
    mockCanManageDepartment.mockResolvedValue(true);
    mockPrisma.department.findUnique.mockResolvedValue({ id: 5, active: true });
    mockPrisma.department.update.mockResolvedValue({});

    await toggleDepartamento(5);
    expect(mockPrisma.department.update).toHaveBeenCalledWith({
      where: { id: 5 },
      data: { active: false },
    });
  });

  it("activa un departamento inactivo", async () => {
    mockGetSessionUser.mockResolvedValue(makeAdmin());
    mockCanManageDepartment.mockResolvedValue(true);
    mockPrisma.department.findUnique.mockResolvedValue({ id: 5, active: false });
    mockPrisma.department.update.mockResolvedValue({});

    await toggleDepartamento(5);
    expect(mockPrisma.department.update).toHaveBeenCalledWith({
      where: { id: 5 },
      data: { active: true },
    });
  });
});
