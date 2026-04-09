import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { requireApiAuth } from "@/lib/auth-helpers";

export async function GET() {
  const auth = await requireApiAuth(["ADMIN", "RESPONSIBLE", "LEADER"]);
  if (!auth.ok) return auth.response;

  const personas = await prisma.person.findMany({
    select: { id: true, name: true, lastname: true, email: true },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(personas);
}
