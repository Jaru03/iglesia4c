import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const iglesias = await prisma.church.findMany({
    where: { active: true },
    select: { id: true, title: true },
    orderBy: { title: "asc" },
  });
  return NextResponse.json(iglesias);
}
