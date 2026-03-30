import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma";
import ChurchForm from "@/components/forms/ChurchForm";

export const dynamic = "force-dynamic";

export default async function IglesiaPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const { role, churchId } = session.user;

  if (role !== "RESPONSIBLE" || !churchId) {
    redirect("/app/dashboard");
  }

  const church = await prisma.church.findUnique({
    where: { id: churchId },
    include: {
      schedules: true,
    },
  });

  if (!church) {
    redirect("/app/dashboard");
  }

  const churchData = {
    id: church.id,
    title: church.title,
    description: church.description,
    place: church.place,
    latitude: church.latitude,
    longitude: church.longitude,
    active: church.active,
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <ChurchForm
        church={churchData}
        redirectTo="/app/iglesia"
        isEdit={true}
        role="RESPONSIBLE"
      />
    </div>
  );
}
