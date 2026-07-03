import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { transporter, EMAIL_FROM } from "@/lib/email";

// Devuelve los 7 días de la semana a partir del lunes dado
function getWeekDays(monday: Date): Date[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setUTCDate(monday.getUTCDate() + i);
    return d;
  });
}

// Lunes de la semana actual (UTC)
function getMondayUTC(from: Date): Date {
  const d = new Date(from);
  const day = d.getUTCDay(); // 0=Dom, 1=Lun…
  const diff = day === 0 ? -6 : 1 - day;
  d.setUTCDate(d.getUTCDate() + diff);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

const DAY_NAMES = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const MONTH_NAMES = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];

export async function GET(req: Request) {
  const secret = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!process.env.CRON_SECRET || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const now = new Date();
  // Lunes de la PRÓXIMA semana: el recordatorio se envía antes de que ocurran los
  // cumpleaños (ej. ejecutándolo el domingo, avisa de la semana que empieza al día siguiente).
  const monday = getMondayUTC(now);
  monday.setUTCDate(monday.getUTCDate() + 7);
  const weekDays = getWeekDays(monday);

  // Traer todas las personas activas con fecha de nacimiento
  const todas = await prisma.person.findMany({
    where: { active: true, birthDate: { not: null } },
    select: { name: true, lastname: true, email: true, birthDate: true, church: { select: { title: true } } },
  });

  // Agrupar por día de la semana
  type BirthdayEntry = { name: string; lastname: string; email: string | null; age: number; church: string | null };
  const byDay = new Map<number, BirthdayEntry[]>(); // key = índice día (0-6)

  weekDays.forEach((day, idx) => {
    const m = day.getUTCMonth() + 1;
    const d = day.getUTCDate();
    const matches = todas.filter((p) => {
      const bd = new Date(p.birthDate!);
      return bd.getUTCMonth() + 1 === m && bd.getUTCDate() === d;
    });
    if (matches.length > 0) {
      byDay.set(idx, matches.map((p) => ({
        name: p.name,
        lastname: p.lastname,
        email: p.email,
        age: monday.getUTCFullYear() - new Date(p.birthDate!).getUTCFullYear(),
        church: p.church?.title ?? null,
      })));
    }
  });

  // Admins con email (destinatarios)
  const admins = await prisma.user.findMany({
    where: { role: "ADMIN" },
    include: { person: { select: { email: true } } },
  });
  const adminEmails = admins.map((a) => a.person.email).filter((e): e is string => !!e);

  if (adminEmails.length === 0) {
    return NextResponse.json({ error: "No hay admins con email" }, { status: 400 });
  }

  const mondayLabel = `${monday.getUTCDate()} de ${MONTH_NAMES[monday.getUTCMonth()]}`;
  const sundayLabel = `${weekDays[6].getUTCDate()} de ${MONTH_NAMES[weekDays[6].getUTCMonth()]}`;
  const subject = `🎂 Cumpleaños de la semana — ${mondayLabel} al ${sundayLabel}`;

  // Sin cumpleaños esta semana: se envía igualmente un aviso a los admins
  if (byDay.size === 0) {
    const emptyHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 580px; margin: 0 auto; background: #f9fafb; padding: 32px 16px;">
        <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); border-radius: 16px; padding: 28px 32px; margin-bottom: 28px; text-align: center;">
          <div style="font-size: 40px; margin-bottom: 8px;">🎂</div>
          <h1 style="margin: 0; color: #fff; font-size: 22px; font-weight: 700;">Cumpleaños de la semana</h1>
          <p style="margin: 6px 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">${mondayLabel} — ${sundayLabel}</p>
        </div>
        <div style="background: #fff; border-radius: 12px; padding: 24px 20px; text-align: center; border: 1px solid #e5e7eb;">
          <div style="font-size: 28px; margin-bottom: 8px;">📅</div>
          <p style="margin: 0; color: #374151; font-size: 15px;">No hay ningún cumpleaños esta semana.</p>
        </div>
        <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 32px;">
          Enviado automáticamente · Comunidad Cristiana Casa de Dios
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: EMAIL_FROM,
      to: adminEmails.join(", "),
      subject,
      html: emptyHtml,
    });

    return NextResponse.json({ sent: 0, to: adminEmails, week: `${mondayLabel} – ${sundayLabel}`, message: "No hay cumpleaños esta semana" });
  }

  // ── HTML del email ──────────────────────────────────────────────────────────
  const totalCumples = Array.from(byDay.values()).reduce((acc, arr) => acc + arr.length, 0);

  const dayBlocksHtml = Array.from(byDay.entries())
    .sort(([a], [b]) => a - b)
    .map(([idx, persons]) => {
      const day = weekDays[idx];
      const dayName = DAY_NAMES[day.getUTCDay()];
      const dayLabel = `${day.getUTCDate()} de ${MONTH_NAMES[day.getUTCMonth()]}`;

      const rows = persons.map((p) => `
        <tr>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f3f4f6;">
            <strong style="color: #111827;">${p.name} ${p.lastname}</strong>
            ${p.church ? `<span style="color: #9ca3af; font-size: 12px; margin-left: 6px;">${p.church}</span>` : ""}
          </td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f3f4f6; color: #6b7280; white-space: nowrap;">${p.age} años</td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f3f4f6;">
            ${p.email ? `<a href="mailto:${p.email}" style="color: #6366f1; text-decoration: none;">${p.email}</a>` : '<span style="color: #d1d5db;">—</span>'}
          </td>
        </tr>
      `).join("");

      return `
        <div style="margin-bottom: 28px;">
          <div style="display: flex; align-items: baseline; gap: 8px; margin-bottom: 10px;">
            <span style="font-size: 15px; font-weight: 700; color: #111827;">${dayName}</span>
            <span style="font-size: 13px; color: #9ca3af;">${dayLabel}</span>
          </div>
          <table style="width: 100%; border-collapse: collapse; background: #fff; border-radius: 10px; overflow: hidden; border: 1px solid #e5e7eb;">
            ${rows}
          </table>
        </div>
      `;
    }).join("");

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 580px; margin: 0 auto; background: #f9fafb; padding: 32px 16px;">

      <!-- Header -->
      <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); border-radius: 16px; padding: 28px 32px; margin-bottom: 28px; text-align: center;">
        <div style="font-size: 40px; margin-bottom: 8px;">🎂</div>
        <h1 style="margin: 0; color: #fff; font-size: 22px; font-weight: 700;">Cumpleaños de la semana</h1>
        <p style="margin: 6px 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">${mondayLabel} — ${sundayLabel}</p>
      </div>

      <!-- Resumen -->
      <div style="background: #fff; border-radius: 12px; padding: 16px 20px; margin-bottom: 24px; border: 1px solid #e5e7eb; display: flex; align-items: center; gap: 12px;">
        <span style="font-size: 24px;">🎉</span>
        <p style="margin: 0; color: #374151; font-size: 14px;">
          Esta semana celebran su cumpleaños <strong>${totalCumples} ${totalCumples === 1 ? "persona" : "personas"}</strong>.
          ¡No olvides felicitarles!
        </p>
      </div>

      <!-- Días -->
      ${dayBlocksHtml}

      <!-- Footer -->
      <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 32px;">
        Recordatorio semanal de cumpleaños · Comunidad Cristiana Casa de Dios
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: EMAIL_FROM,
    to: adminEmails.join(", "),
    subject,
    html,
  });

  return NextResponse.json({ sent: totalCumples, to: adminEmails, week: `${mondayLabel} – ${sundayLabel}` });
}
