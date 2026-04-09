import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST ?? "smtp.gmail.com",
  port: Number(process.env.EMAIL_PORT ?? 587),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER ?? "placeholder@email.com",
    pass: process.env.EMAIL_PASS ?? "placeholder-password",
  },
});

export async function GET(req: Request) {
  const secret = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!process.env.CRON_SECRET || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const month = tomorrow.getMonth() + 1;
  const day = tomorrow.getDate();

  const todas = await prisma.person.findMany({
    where: { active: true, birthDate: { not: null } },
    select: { name: true, lastname: true, email: true, birthDate: true },
  });

  const personas = todas.filter((p) => {
    const bd = new Date(p.birthDate!);
    return bd.getMonth() + 1 === month && bd.getDate() === day;
  });

  if (personas.length === 0) {
    return NextResponse.json({ message: "No hay cumpleaños mañana", sent: 0 });
  }

  // Obtener todos los admins con email
  const admins = await prisma.user.findMany({
    where: { role: "ADMIN" },
    include: { person: { select: { email: true, name: true } } },
  });

  const adminEmails = admins
    .map((a) => a.person.email)
    .filter((e): e is string => !!e);

  if (adminEmails.length === 0) {
    return NextResponse.json({ error: "No hay admins con email" }, { status: 400 });
  }

  const dateLabel = tomorrow.toLocaleDateString("es-ES", { day: "numeric", month: "long" });

  const listHtml = personas
    .map((p) => {
      const age = tomorrow.getFullYear() - new Date(p.birthDate!).getFullYear();
      const emailLink = p.email ? ` — <a href="mailto:${p.email}">${p.email}</a>` : "";
      return `<li><strong>${p.name} ${p.lastname}</strong> (${age} años)${emailLink}</li>`;
    })
    .join("");

  await transporter.sendMail({
    from: process.env.EMAIL_FROM ?? "Iglesia <no-reply@iglesia.com>",
    to: adminEmails.join(", "),
    subject: `🎂 Cumpleaños de mañana — ${dateLabel}`,
    html: `
      <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto;">
        <h2 style="margin-bottom: 4px;">Cumpleaños de mañana</h2>
        <p style="color: #6b7280; margin-top: 0;">${dateLabel}</p>
        <ul style="padding-left: 20px; line-height: 2;">
          ${listHtml}
        </ul>
        <p style="color: #9ca3af; font-size: 13px; margin-top: 24px;">
          Enviado automáticamente cada día a las 10:00 (hora España).
        </p>
      </div>
    `,
  });

  return NextResponse.json({ sent: personas.length, to: adminEmails });
}
