import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Hoisted mocks ─────────────────────────────────────────────────────────────
const mockGetSessionUser = vi.hoisted(() => vi.fn());
const mockCanManageDepartment = vi.hoisted(() => vi.fn());
const mockCanManageActivity = vi.hoisted(() => vi.fn());
const mockPrisma = vi.hoisted(() => ({
  activity: {
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    findUnique: vi.fn(),
  },
}));

vi.mock("@/lib/auth-helpers", () => ({
  getSessionUser: () => mockGetSessionUser(),
  canManageDepartment: (...args: unknown[]) => mockCanManageDepartment(...args),
  canManageActivity: (...args: unknown[]) => mockCanManageActivity(...args),
}));
vi.mock("@/utils/prisma", () => ({ default: mockPrisma }));
vi.mock("@/actions/audit-actions", () => ({ logAudit: vi.fn() }));
vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn(() => ({
    storage: { from: vi.fn(() => ({ remove: vi.fn() })) },
  })),
}));

import {
  crearActividad,
  eliminarActividadPorId,
  actualizarActividad,
} from "@/actions/actividades-actions";

// ── Helpers ───────────────────────────────────────────────────────────────────
function makeAdmin() {
  return { id: "1", role: "ADMIN", churchId: 10, departmentId: null };
}

function makeFormData(overrides: Record<string, string> = {}): FormData {
  const fd = new FormData();
  const defaults: Record<string, string> = {
    title: "Culto dominical",
    place: "Salón principal",
    description: "Descripción",
    img: "",
    fecha: "2026-04-20",
    horaInicio: "10:00",
    horaFin: "12:00",
    departmentId: "5",
    showCalendar: "on",
    allowPreRegistration: "on",
  };
  Object.entries({ ...defaults, ...overrides }).forEach(([k, v]) => fd.append(k, v));
  return fd;
}

beforeEach(() => vi.clearAllMocks());

// ── crearActividad ────────────────────────────────────────────────────────────
describe("crearActividad()", () => {
  it("devuelve error si no hay sesión", async () => {
    mockGetSessionUser.mockResolvedValue(null);
    expect(await crearActividad(makeFormData())).toEqual({ error: "No autenticado" });
  });

  it("devuelve error si el rol no tiene permisos", async () => {
    mockGetSessionUser.mockResolvedValue({ ...makeAdmin(), role: "USER" });
    expect(await crearActividad(makeFormData())).toEqual({ error: "Sin permisos" });
  });

  it("devuelve error si faltan campos obligatorios", async () => {
    mockGetSessionUser.mockResolvedValue(makeAdmin());
    expect(await crearActividad(makeFormData({ title: "" }))).toMatchObject({
      error: expect.stringContaining("Faltan datos"),
    });
  });

  it("devuelve error si no tiene permisos sobre el departamento", async () => {
    mockGetSessionUser.mockResolvedValue(makeAdmin());
    mockCanManageDepartment.mockResolvedValue(false);
    expect(await crearActividad(makeFormData())).toEqual({
      error: "Sin permisos sobre ese departamento",
    });
  });

  it("crea la actividad y devuelve success", async () => {
    mockGetSessionUser.mockResolvedValue(makeAdmin());
    mockCanManageDepartment.mockResolvedValue(true);
    mockPrisma.activity.create.mockResolvedValue({ id: 1, title: "Culto dominical" });

    expect(await crearActividad(makeFormData())).toEqual({ success: "Actividad creada." });
    expect(mockPrisma.activity.create).toHaveBeenCalledOnce();
  });

  it("la actividad creada tiene los campos correctos", async () => {
    mockGetSessionUser.mockResolvedValue(makeAdmin());
    mockCanManageDepartment.mockResolvedValue(true);
    mockPrisma.activity.create.mockResolvedValue({ id: 1, title: "Culto dominical" });

    await crearActividad(makeFormData());
    const call = mockPrisma.activity.create.mock.calls[0][0];
    expect(call.data.title).toBe("Culto dominical");
    expect(call.data.place).toBe("Salón principal");
    expect(call.data.departmentId).toBe(5);
  });
});

// ── eliminarActividadPorId ────────────────────────────────────────────────────
describe("eliminarActividadPorId()", () => {
  it("devuelve error si no hay sesión", async () => {
    mockGetSessionUser.mockResolvedValue(null);
    expect(await eliminarActividadPorId(1)).toEqual({ error: "No autenticado" });
  });

  it("devuelve error si sin permisos sobre la actividad", async () => {
    mockGetSessionUser.mockResolvedValue(makeAdmin());
    mockCanManageActivity.mockResolvedValue(false);
    expect(await eliminarActividadPorId(1)).toEqual({ error: "Sin permisos sobre esa actividad" });
  });

  it("elimina correctamente y devuelve success", async () => {
    mockGetSessionUser.mockResolvedValue(makeAdmin());
    mockCanManageActivity.mockResolvedValue(true);
    mockPrisma.activity.findUnique.mockResolvedValue({ id: 1, title: "Culto", img: null });
    mockPrisma.activity.delete.mockResolvedValue({});

    expect(await eliminarActividadPorId(1)).toEqual({ success: "Actividad eliminada." });
    expect(mockPrisma.activity.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it("maneja errores de base de datos", async () => {
    mockGetSessionUser.mockResolvedValue(makeAdmin());
    mockCanManageActivity.mockResolvedValue(true);
    mockPrisma.activity.findUnique.mockResolvedValue({ id: 1, title: "Culto", img: null });
    mockPrisma.activity.delete.mockRejectedValue(new Error("DB error"));

    expect(await eliminarActividadPorId(1)).toEqual({ error: "No se pudo eliminar la actividad." });
  });
});

// ── actualizarActividad ───────────────────────────────────────────────────────
describe("actualizarActividad()", () => {
  it("devuelve error si no hay sesión", async () => {
    mockGetSessionUser.mockResolvedValue(null);
    expect(await actualizarActividad(1, makeFormData())).toEqual({ error: "No autenticado" });
  });

  it("devuelve error si el rol no tiene permisos", async () => {
    mockGetSessionUser.mockResolvedValue({ ...makeAdmin(), role: "MEMBER" });
    expect(await actualizarActividad(1, makeFormData())).toEqual({ error: "Sin permisos" });
  });

  it("devuelve error si sin permisos sobre la actividad", async () => {
    mockGetSessionUser.mockResolvedValue(makeAdmin());
    mockCanManageActivity.mockResolvedValue(false);
    expect(await actualizarActividad(1, makeFormData())).toEqual({
      error: "Sin permisos sobre esa actividad",
    });
  });

  it("actualiza correctamente y devuelve success", async () => {
    mockGetSessionUser.mockResolvedValue(makeAdmin());
    mockCanManageActivity.mockResolvedValue(true);
    mockPrisma.activity.update.mockResolvedValue({ id: 1, title: "Culto dominical" });

    expect(await actualizarActividad(1, makeFormData())).toEqual({ success: "Actividad actualizada." });
    expect(mockPrisma.activity.update).toHaveBeenCalledOnce();
  });
});
