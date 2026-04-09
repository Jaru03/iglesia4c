import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/auth-helpers";

export async function GET() {
  const auth = await requireApiAuth();
  if (!auth.ok) return auth.response;

  const iglesias = await prisma.church.findMany({
    where: { active: true },
    select: { id: true, title: true },
    orderBy: { title: "asc" },
  });
  return NextResponse.json(iglesias);
}
