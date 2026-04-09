import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { sendReminderEmail } from "@/lib/email";
import { format } from "date-fns";
import { es } from "date-fns/locale";

// Llamar diariamente: GET /api/cron/reminders
// En producción proteger con: Authorization: Bearer $CRON_SECRET
export async function GET(req: Request) {
  const secret = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!process.env.CRON_SECRET || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  const startOfTomorrow = new Date(tomorrowStr + "T00:00:00.000Z");
  const endOfTomorrow = new Date(tomorrowStr + "T23:59:59.999Z");

  const appointments = await prisma.appointment.findMany({
    where: {
      date: { gte: startOfTomorrow, lte: endOfTomorrow },
      status: { in: ["PENDING", "CONFIRMED"] },
      reminderSent: false,
    },
    include: {
      user: { include: { person: { select: { name: true, lastname: true, email: true } } } },
      responsable: { include: { person: { select: { name: true, lastname: true } } } },
    },
  });

  let sent = 0;

  for (const appt of appointments) {
    if (!appt.user.person.email) continue;

    const dateLabel = format(appt.date, "EEEE d 'de' MMMM 'de' yyyy", { locale: es });

    await sendReminderEmail({
      toName: `${appt.user.person.name} ${appt.user.person.lastname}`,
      toEmail: appt.user.person.email,
      responsableName: `${appt.responsable.person.name} ${appt.responsable.person.lastname}`,
      date: dateLabel,
      startTime: appt.startTime,
      endTime: appt.endTime,
    });

    await prisma.appointment.update({
      where: { id: appt.id },
      data: { reminderSent: true },
    });

    sent++;
  }

  return NextResponse.json({ sent, total: appointments.length });
}
