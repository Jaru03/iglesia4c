"use server";

import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { logAudit } from "./audit-actions";

const DAY_MAP: Record<string, number> = {
  domingo: 0,
  lunes: 1,
  martes: 2,
  miercoles: 3,
  jueves: 4,
  viernes: 5,
  sabado: 6,
};

export async function generarCultosAutomaticos(churchId: number, weeksAhead: number = 4) {
  const church = await prisma.church.findUnique({
    where: { id: churchId },
    include: { schedules: true },
  });

  if (!church) {
    return { error: "Iglesia no encontrada" };
  }

  if (church.schedules.length === 0) {
    return { error: "No hay horarios de culto configurados" };
  }

  let cultoDepartment = await prisma.department.findFirst({
    where: { churchId, name: { contains: "Culto", mode: "insensitive" } },
  });

  if (!cultoDepartment) {
    cultoDepartment = await prisma.department.create({
      data: {
        name: "Cultos",
        description: "Departamento de cultos dominicales y especiales",
        churchId,
        active: true,
      },
    });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const generatedActivities: { date: Date; schedule: typeof church.schedules[0] }[] = [];

  for (let week = 0; week < weeksAhead; week++) {
    for (const schedule of church.schedules) {
      const dayOfWeek = DAY_MAP[schedule.day.toLowerCase()];
      if (dayOfWeek === undefined) continue;

      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() + (dayOfWeek - today.getDay() + 7 * week));

      const [hours, minutes] = schedule.time.split(":").map(Number);
      targetDate.setHours(hours, minutes, 0, 0);

      if (targetDate >= today) {
        generatedActivities.push({ date: targetDate, schedule });
      }
    }
  }

  const existingActivities = await prisma.activity.findMany({
    where: {
      departmentId: cultoDepartment.id,
      date: {
        gte: today,
      },
    },
    select: { date: true, hourStart: true },
  });

  const existingKeys = new Set(
    existingActivities.map((a) => `${a.date.toDateString()}-${a.hourStart.getHours()}:${a.hourStart.getMinutes()}`)
  );

  const newActivities: { title: string; date: Date; hourStart: Date; hourEnd: Date }[] = [];

  for (const { date, schedule } of generatedActivities) {
    const key = `${date.toDateString()}-${date.getHours()}:${date.getMinutes()}`;
    if (!existingKeys.has(key)) {
      const hourEnd = new Date(date);
      hourEnd.setHours(hourEnd.getHours() + 2);

      newActivities.push({
        title: `Culto del ${schedule.day}`,
        date,
        hourStart: date,
        hourEnd,
      });
    }
  }

  if (newActivities.length === 0) {
    return { success: "Los cultos ya están generados para las próximas semanas" };
  }

  await prisma.activity.createMany({
    data: newActivities.map((activity) => ({
      title: activity.title,
      description: `Culto automático generado el ${today.toLocaleDateString("es-ES")}`,
      place: church.place,
      img: null,
      date: activity.date,
      hourStart: activity.hourStart,
      hourEnd: activity.hourEnd,
      showCalendar: false,
      departmentId: cultoDepartment.id,
    })),
  });

  await logAudit({
    module: "ACTIVIDADES",
    action: "CREATE",
    entity: "Activity",
    entityId: String(cultoDepartment.id),
    description: `Generados automáticamente ${newActivities.length} cultos para las próximas ${weeksAhead} semanas`,
  });

  revalidatePath("/admin/actividades");
  revalidatePath("/admin/calendario");
  revalidatePath("/responsable/actividades");
  revalidatePath("/responsable");
  revalidatePath("/responsable/asistencias");

  return { success: `Se generaron ${newActivities.length} cultos para las próximas ${weeksAhead} semanas` };
}
