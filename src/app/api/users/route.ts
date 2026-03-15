import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      role: true,
      person: {
        select: {
          id: true,
          name: true,
          lastname: true,
          email: true,
        },
      },
    },
    orderBy: {
      person: {
        name: "asc",
      },
    },
  });

  const formatted = users.map((u) => ({
    id: u.id,
    name: u.person ? `${u.person.name} ${u.person.lastname}` : `User ${u.id}`,
    email: u.person?.email,
    personId: u.person?.id,
  }));

  return NextResponse.json(formatted);
}
