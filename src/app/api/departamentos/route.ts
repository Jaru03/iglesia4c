import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const departamentos = await prisma.department.findMany({
    where: { active: true },
    select: { id: true, name: true, churchId: true },
    orderBy: { name: "asc" },
  });
  return NextResponse.json(departamentos);
}
