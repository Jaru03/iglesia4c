import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
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

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  if (session.user.role !== "ADMIN") return NextResponse.json({ error: "Sin permiso" }, { status: 403 });

  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const month = tomorrow.getMonth() + 1;
  const day = tomorrow.getDate();

  // Traer todas las personas con birthDate y filtrar por día/mes en JS
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

  const adminEmail = session.user.email;
  if (!adminEmail) return NextResponse.json({ error: "El admin no tiene email" }, { status: 400 });

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
    to: process.env.ADMIN_EMAIL ?? "josearu03@gmail.com",
    subject: `🎂 Cumpleaños de mañana — ${dateLabel}`,
    html: `
      <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto;">
        <h2 style="margin-bottom: 4px;">Cumpleaños de mañana</h2>
        <p style="color: #6b7280; margin-top: 0;">${dateLabel}</p>
        <ul style="padding-left: 20px; line-height: 2;">
          ${listHtml}
        </ul>
        <p style="color: #9ca3af; font-size: 13px; margin-top: 24px;">
          Enviado desde el panel de administración.
        </p>
      </div>
    `,
  });

  return NextResponse.json({ sent: personas.length });
}
