"use server";

import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { logAudit } from "./audit-actions";
import { getSessionUser, canManageChurch } from "@/lib/auth-helpers";

const DAY_MAP: Record<string, number> = {
  domingo: 0,
  lunes: 1,
  martes: 2,
  miercoles: 3,
  jueves: 4,
  viernes: 5,
  sabado: 6,
};

const DAY_NAMES: Record<string, string> = {
  domingo: "Domingo",
  lunes: "Lunes",
  martes: "Martes",
  miercoles: "Miércoles",
  jueves: "Jueves",
  viernes: "Viernes",
  sabado: "Sábado",
};

export async function generarCultosAutomaticos(churchId: number): Promise<void> {
  const user = await getSessionUser();
  if (!user) return;
  const allowed = await canManageChurch(user, churchId);
  if (!allowed) return;

  const church = await prisma.church.findUnique({
    where: { id: churchId },
    include: { schedules: true },
  });

  if (!church || church.schedules.length === 0) return;

  const now = new Date();
  const months = [
    { year: now.getFullYear(), month: now.getMonth() },
    { year: now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear(), month: (now.getMonth() + 1) % 12 },
  ];

  for (const { year, month } of months) {
    const monthStart = new Date(year, month, 1);
    const monthEnd = new Date(year, month + 1, 0, 23, 59, 59, 999);

    const existing = await prisma.activity.findFirst({
      where: { isCulto: true, churchId, date: { gte: monthStart, lte: monthEnd } },
      select: { id: true },
    });

    if (existing) continue; // month already has cultos — skip to preserve edits

    const toCreate: { title: string; description: string; place: string; date: Date; hourStart: Date; hourEnd: Date }[] = [];

    for (let day = 1; day <= monthEnd.getDate(); day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = date.getDay();

      for (const schedule of church.schedules) {
        const schedDow = DAY_MAP[schedule.day.toLowerCase()];
        if (schedDow === undefined || schedDow !== dayOfWeek) continue;

        const [hours, minutes] = schedule.time.split(":").map(Number);
        const hourStart = new Date(year, month, day, hours, minutes, 0, 0);
        const hourEnd = new Date(hourStart);
        hourEnd.setHours(hourEnd.getHours() + 2);

        const dayName = DAY_NAMES[schedule.day.toLowerCase()] ?? schedule.day;
        toCreate.push({
          title: schedule.name?.trim() || `Culto del ${dayName}`,
          description: `Culto automático`,
          place: church.place,
          date: hourStart,
          hourStart,
          hourEnd,
        });
      }
    }

    if (toCreate.length > 0) {
      await prisma.activity.createMany({
        data: toCreate.map((a) => ({
          ...a,
          isCulto: true,
          churchId,
          departmentId: null,
          showCalendar: false,
          img: null,
        })),
      });

      await logAudit({
        module: "ACTIVIDADES",
        action: "CREATE",
        entity: "Activity",
        entityId: String(churchId),
        description: `Generados automáticamente ${toCreate.length} cultos para ${year}-${String(month + 1).padStart(2, "0")}`,
      });
    }
  }

  revalidatePath("/app/dashboard");
  revalidatePath("/app/actividades");
}
