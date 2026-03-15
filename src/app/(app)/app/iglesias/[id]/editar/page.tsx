import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma";
import ChurchForm from "@/components/forms/ChurchForm";

export const dynamic = "force-dynamic";

export default async function EditarIglesiaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/app/dashboard");
  }

  const { id } = await params;
  const churchId = parseInt(id);

  if (isNaN(churchId)) {
    redirect("/app/iglesias");
  }

  const church = await prisma.church.findUnique({
    where: { id: churchId },
    include: {
      schedules: true,
    },
  });

  if (!church) {
    redirect("/app/iglesias");
  }

  const responsables = await prisma.churchLeader.findMany({
    where: { churchId, role: "RESPONSIBLE" },
    select: { userId: true },
  });

  const users = await prisma.user.findMany({
    include: {
      person: {
        select: { name: true, lastname: true },
      },
    },
  });

  const userData = users.map((u) => ({
    id: u.id,
    name: u.person.name,
    lastname: u.person.lastname,
  }));

  const churchData = {
    id: church.id,
    title: church.title,
    description: church.description,
    place: church.place,
    latitude: church.latitude,
    longitude: church.longitude,
    active: church.active,
  };

  const currentResponsableIds = responsables.map((r) => r.userId);
  const currentSchedules = church.schedules.map((s) => ({
    day: s.day,
    time: s.time,
  }));

  return (
    <div className="container mx-auto py-6 px-4">
      <ChurchForm
        church={churchData}
        users={userData}
        currentResponsableIds={currentResponsableIds}
        currentSchedules={currentSchedules}
        redirectTo="/app/iglesias"
        isEdit={true}
      />
    </div>
  );
}
