import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET() {
  const personas = await prisma.person.findMany({
    select: {
      id: true,
      name: true,
      lastname: true,
      email: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return NextResponse.json(personas);
}
