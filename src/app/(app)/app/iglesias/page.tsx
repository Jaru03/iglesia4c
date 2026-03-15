import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma";
import { IglesiasClient } from "./IglesiasClient";
import type { IglesiaItem } from "@/components/dashboard/items/IglesiaListItem";

export const dynamic = "force-dynamic";

export default async function IglesiasPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/app/dashboard");
  }

  const iglesias = await prisma.church.findMany({
    orderBy: { title: "asc" },
    include: {
      _count: { select: { persons: true } },
      schedules: { select: { id: true } },
      leaders: {
        include: {
          user: {
            include: {
              person: { select: { name: true, lastname: true } },
            },
          },
        },
      },
      responsable: {
        include: {
          person: { select: { name: true, lastname: true } },
        },
      },
    },
  });

  const data: IglesiaItem[] = iglesias.map((i) => ({
    id: i.id,
    title: i.title,
    place: i.place,
    active: i.active,
    _count: { persons: i._count.persons },
    schedules: i.schedules,
    leaders: i.leaders,
    responsable: i.responsable,
  }));

  return <IglesiasClient items={data} />;
}
