import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/utils/prisma";
import { Prisma } from "../../../../generated/prisma/client/client";
import { format } from "date-fns";

function toUTCDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

// GET ?month=M&year=Y → string[] (YYYY-MM-DD) de excepciones del usuario en ese mes
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const userId = Number(session.user.id);
  const { searchParams } = new URL(req.url);
  const month = Number(searchParams.get("month"));
  const year = Number(searchParams.get("year"));

  const where: Prisma.MemberUnavailableDateWhereInput = { userId };
  if (month && year) {
    where.date = {
      gte: new Date(Date.UTC(year, month - 1, 1)),
      lte: new Date(Date.UTC(year, month, 0, 23, 59, 59, 999)),
    };
  }

  const rows = await prisma.memberUnavailableDate.findMany({ where });
  return NextResponse.json(rows.map((r) => format(r.date, "yyyy-MM-dd")));
}

// POST { date: "YYYY-MM-DD" } → toggle (add / remove)
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const userId = Number(session.user.id);
  const { date: dateStr } = (await req.json()) as { date: string };
  const date = toUTCDate(dateStr);

  const existing = await prisma.memberUnavailableDate.findUnique({
    where: { userId_date: { userId, date } },
  });

  if (existing) {
    await prisma.memberUnavailableDate.delete({ where: { id: existing.id } });
    return NextResponse.json({ action: "removed" });
  } else {
    await prisma.memberUnavailableDate.create({ data: { userId, date } });
    return NextResponse.json({ action: "added" });
  }
}
