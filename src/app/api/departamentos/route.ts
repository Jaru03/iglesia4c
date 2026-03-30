import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/auth-helpers";

export async function GET() {
  const auth = await requireApiAuth();
  if (!auth.ok) return auth.response;

  const departamentos = await prisma.department.findMany({
    where: { active: true },
    select: { id: true, name: true, churchId: true },
    orderBy: { name: "asc" },
  });
  return NextResponse.json(departamentos);
}
