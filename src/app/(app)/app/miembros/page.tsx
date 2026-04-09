import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma";
import { Users } from "lucide-react";
import { PageLayout } from "@/components/dashboard/PageLayout";
import { ResourceList } from "@/components/dashboard/ResourceList";
import { PersonasClient } from "@/app/(app)/app/personas/components/PersonasClient";

export const dynamic = "force-dynamic";

export default async function MiembrosPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const { role, churchId } = session.user;

  if (!["ADMIN", "RESPONSIBLE"].includes(role)) {
    redirect("/app/dashboard");
  }

  let churchName = "";
  let personas;

  if (role === "RESPONSIBLE" && churchId) {
    const church = await prisma.church.findUnique({
      where: { id: churchId },
      select: { title: true },
    });
    churchName = church?.title || "";
  }

  const whereClause = role === "RESPONSIBLE" && churchId 
    ? { churchId, membershipStatus: "ACTIVE" as const }
    : { membershipStatus: "ACTIVE" as const };

  personas = await prisma.person.findMany({
    where: whereClause,
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      lastname: true,
      email: true,
      phone: true,
      document: true,
      membershipStatus: true,
      active: true,
      birthDate: true,
      arrivedAt: true,
      attendsChurch: true,
      howDidYouMeetUs: true,
      authorizedContact: true,
      prayerRequest: true,
      signature: true,
    },
  });

  return (
    <PersonasClient
      personasData={{ type: "persons", data: personas }}
      role={role as "ADMIN" | "RESPONSIBLE"}
      churchId={churchId ?? undefined}
      churchName={churchName}
    />
  );
}
