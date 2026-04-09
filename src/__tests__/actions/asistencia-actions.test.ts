import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Hoisted mocks ─────────────────────────────────────────────────────────────
const mockGetSessionUser = vi.hoisted(() => vi.fn());
const mockCanManageActivity = vi.hoisted(() => vi.fn());
const mockPrisma = vi.hoisted(() => ({
  attendance: {
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    deleteMany: vi.fn(),
  },
  person: {
    findUnique: vi.fn(),
    update: vi.fn(),
  },
}));

vi.mock("@/lib/auth-helpers", () => ({
  getSessionUser: () => mockGetSessionUser(),
  canManageActivity: (...args: unknown[]) => mockCanManageActivity(...args),
}));
vi.mock("@/utils/prisma", () => ({ default: mockPrisma }));

import {
  toggleAttendance,
  marcarAsistenciaUsuario,
  preRegistrarseActividad,
  cancelarPreRegistro,
} from "@/actions/asistencia-actions";

beforeEach(() => vi.clearAllMocks());

// ── toggleAttendance ──────────────────────────────────────────────────────────
describe("toggleAttendance()", () => {
  it("devuelve error si no hay sesión", async () => {
    mockGetSessionUser.mockResolvedValue(null);
    expect(await toggleAttendance(1, 1)).toEqual({ error: "No autenticado" });
  });

  it("devuelve error si el rol no tiene permisos", async () => {
    mockGetSessionUser.mockResolvedValue({ id: "1", role: "USER" });
    expect(await toggleAttendance(1, 1)).toEqual({ error: "Sin permisos" });
  });

  it("devuelve error si sin permisos sobre la actividad", async () => {
    mockGetSessionUser.mockResolvedValue({ id: "1", role: "ADMIN" });
    mockCanManageActivity.mockResolvedValue(false);
    expect(await toggleAttendance(1, 1)).toEqual({ error: "Sin permisos sobre esa actividad" });
  });

  it("crea asistencia nueva si no existe registro previo", async () => {
    mockGetSessionUser.mockResolvedValue({ id: "1", role: "ADMIN" });
    mockCanManageActivity.mockResolvedValue(true);
    mockPrisma.attendance.findUnique.mockResolvedValue(null);
    mockPrisma.attendance.create.mockResolvedValue({ id: 1 });
    mockPrisma.person.findUnique.mockResolvedValue({
      id: 1, active: true, membershipStatus: "VISITOR",
      user: null, departments: [], _count: { attendances: 0 },
    });

    await toggleAttendance(1, 1);
    expect(mockPrisma.attendance.create).toHaveBeenCalledWith({
      data: { personId: 1, activityId: 1, attended: true },
    });
  });

  it("invierte attended:true → false si el registro ya existe", async () => {
    mockGetSessionUser.mockResolvedValue({ id: "1", role: "ADMIN" });
    mockCanManageActivity.mockResolvedValue(true);
    mockPrisma.attendance.findUnique.mockResolvedValue({ id: 10, attended: true });
    mockPrisma.attendance.update.mockResolvedValue({});
    mockPrisma.person.findUnique.mockResolvedValue({
      id: 1, active: true, membershipStatus: "ACTIVE",
      user: null, departments: [], _count: { attendances: 2 },
    });

    await toggleAttendance(1, 1);
    expect(mockPrisma.attendance.update).toHaveBeenCalledWith({
      where: { id: 10 },
      data: { attended: false },
    });
  });

  it("invierte attended:false → true si el registro ya existe", async () => {
    mockGetSessionUser.mockResolvedValue({ id: "1", role: "ADMIN" });
    mockCanManageActivity.mockResolvedValue(true);
    mockPrisma.attendance.findUnique.mockResolvedValue({ id: 10, attended: false });
    mockPrisma.attendance.update.mockResolvedValue({});
    mockPrisma.person.findUnique.mockResolvedValue({
      id: 1, active: true, membershipStatus: "VISITOR",
      user: null, departments: [], _count: { attendances: 0 },
    });

    await toggleAttendance(1, 1);
    expect(mockPrisma.attendance.update).toHaveBeenCalledWith({
      where: { id: 10 },
      data: { attended: true },
    });
  });
});

// ── marcarAsistenciaUsuario ───────────────────────────────────────────────────
describe("marcarAsistenciaUsuario()", () => {
  it("devuelve error si no hay sesión", async () => {
    mockGetSessionUser.mockResolvedValue(null);
    expect(await marcarAsistenciaUsuario(1, 1)).toEqual({ error: "No autenticado" });
  });

  it("devuelve error si intenta marcar la asistencia de otro usuario", async () => {
    mockGetSessionUser.mockResolvedValue({ id: "99", role: "USER" });
    mockPrisma.person.findUnique.mockResolvedValue({ user: { id: 1 } });
    expect(await marcarAsistenciaUsuario(1, 1)).toEqual({
      error: "Solo puedes registrar tu propia asistencia",
    });
  });

  it("devuelve error si ya tiene asistencia confirmada", async () => {
    mockGetSessionUser.mockResolvedValue({ id: "1", role: "USER" });
    mockPrisma.person.findUnique.mockResolvedValue({ user: { id: 1 } });
    mockPrisma.attendance.findUnique.mockResolvedValue({ id: 5, attended: true });
    expect(await marcarAsistenciaUsuario(1, 1)).toEqual({
      error: "Ya has confirmado tu asistencia a esta actividad",
    });
  });

  it("registra asistencia nueva correctamente", async () => {
    mockGetSessionUser.mockResolvedValue({ id: "1", role: "USER" });
    mockPrisma.person.findUnique
      .mockResolvedValueOnce({ user: { id: 1 } })
      .mockResolvedValueOnce({
        id: 1, active: true, membershipStatus: "VISITOR",
        user: { id: 1 }, departments: [], _count: { attendances: 1 },
      });
    mockPrisma.attendance.findUnique.mockResolvedValue(null);
    mockPrisma.attendance.create.mockResolvedValue({ id: 1 });

    expect(await marcarAsistenciaUsuario(1, 1)).toEqual({ success: "Asistencia registrada correctamente" });
    expect(mockPrisma.attendance.create).toHaveBeenCalledWith({
      data: { personId: 1, activityId: 1, attended: true },
    });
  });

  it("actualiza a attended:true si existía pre-registro", async () => {
    mockGetSessionUser.mockResolvedValue({ id: "1", role: "USER" });
    mockPrisma.person.findUnique
      .mockResolvedValueOnce({ user: { id: 1 } })
      .mockResolvedValueOnce({
        id: 1, active: true, membershipStatus: "VISITOR",
        user: null, departments: [], _count: { attendances: 0 },
      });
    mockPrisma.attendance.findUnique.mockResolvedValue({ id: 5, attended: false });
    mockPrisma.attendance.update.mockResolvedValue({});

    await marcarAsistenciaUsuario(1, 1);
    expect(mockPrisma.attendance.update).toHaveBeenCalledWith({
      where: { id: 5 },
      data: { attended: true },
    });
  });
});

// ── preRegistrarseActividad ───────────────────────────────────────────────────
describe("preRegistrarseActividad()", () => {
  it("devuelve error si no hay sesión", async () => {
    mockGetSessionUser.mockResolvedValue(null);
    expect(await preRegistrarseActividad(1, 1)).toEqual({ error: "No autenticado" });
  });

  it("devuelve error si intenta pre-registrar a otro usuario", async () => {
    mockGetSessionUser.mockResolvedValue({ id: "99", role: "USER" });
    mockPrisma.person.findUnique.mockResolvedValue({ user: { id: 1 } });
    expect(await preRegistrarseActividad(1, 1)).toEqual({
      error: "Solo puedes pre-registrarte tú mismo",
    });
  });

  it("devuelve error si ya tiene asistencia confirmada", async () => {
    mockGetSessionUser.mockResolvedValue({ id: "1", role: "USER" });
    mockPrisma.person.findUnique.mockResolvedValue({ user: { id: 1 } });
    mockPrisma.attendance.findUnique.mockResolvedValue({ id: 5, attended: true, preRegistered: false });
    expect(await preRegistrarseActividad(1, 1)).toEqual({ error: "Ya tienes asistencia confirmada" });
  });

  it("devuelve error si ya está pre-registrado", async () => {
    mockGetSessionUser.mockResolvedValue({ id: "1", role: "USER" });
    mockPrisma.person.findUnique.mockResolvedValue({ user: { id: 1 } });
    mockPrisma.attendance.findUnique.mockResolvedValue({ id: 5, attended: false, preRegistered: true });
    expect(await preRegistrarseActividad(1, 1)).toEqual({ error: "Ya estás pre-registrado" });
  });

  it("crea pre-registro nuevo correctamente", async () => {
    mockGetSessionUser.mockResolvedValue({ id: "1", role: "USER" });
    mockPrisma.person.findUnique.mockResolvedValue({ user: { id: 1 } });
    mockPrisma.attendance.findUnique.mockResolvedValue(null);
    mockPrisma.attendance.create.mockResolvedValue({ id: 1 });

    expect(await preRegistrarseActividad(1, 1)).toEqual({ success: "Pre-registro confirmado" });
    expect(mockPrisma.attendance.create).toHaveBeenCalledWith({
      data: { personId: 1, activityId: 1, attended: false, preRegistered: true },
    });
  });

  it("actualiza preRegistered:true si existía registro sin preregistro", async () => {
    mockGetSessionUser.mockResolvedValue({ id: "1", role: "USER" });
    mockPrisma.person.findUnique.mockResolvedValue({ user: { id: 1 } });
    mockPrisma.attendance.findUnique.mockResolvedValue({ id: 5, attended: false, preRegistered: false });
    mockPrisma.attendance.update.mockResolvedValue({});

    await preRegistrarseActividad(1, 1);
    expect(mockPrisma.attendance.update).toHaveBeenCalledWith({
      where: { id: 5 },
      data: { preRegistered: true },
    });
  });
});

// ── cancelarPreRegistro ───────────────────────────────────────────────────────
describe("cancelarPreRegistro()", () => {
  it("devuelve error si no hay sesión", async () => {
    mockGetSessionUser.mockResolvedValue(null);
    expect(await cancelarPreRegistro(1, 1)).toEqual({ error: "No autenticado" });
  });

  it("devuelve error si intenta cancelar el pre-registro de otro", async () => {
    mockGetSessionUser.mockResolvedValue({ id: "99", role: "USER" });
    mockPrisma.person.findUnique.mockResolvedValue({ user: { id: 1 } });
    expect(await cancelarPreRegistro(1, 1)).toEqual({
      error: "Solo puedes cancelar tu propio pre-registro",
    });
  });

  it("cancela el pre-registro correctamente", async () => {
    mockGetSessionUser.mockResolvedValue({ id: "1", role: "USER" });
    mockPrisma.person.findUnique.mockResolvedValue({ user: { id: 1 } });
    mockPrisma.attendance.deleteMany.mockResolvedValue({ count: 1 });

    expect(await cancelarPreRegistro(1, 1)).toEqual({ success: "Pre-registro cancelado" });
    expect(mockPrisma.attendance.deleteMany).toHaveBeenCalledWith({
      where: { personId: 1, activityId: 1, preRegistered: true, attended: false },
    });
  });
});
