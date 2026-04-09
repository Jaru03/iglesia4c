import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma";
import PerfilForm from "@/components/forms/PerfilForm";
import { AvailabilityDaysSection } from "../components/AvailabilityDaysSection";

export const dynamic = "force-dynamic";

export default async function EditarPerfilPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const { id } = session.user;
  const userId = parseInt(id as string);

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const [person, availabilities, exceptions] = await Promise.all([
    prisma.person.findFirst({
      where: { user: { id: userId } },
      include: {
        user: true,
        departments: { where: { active: true }, select: { id: true } },
      },
    }),
    prisma.memberAvailability.findMany({ where: { userId } }),
    prisma.memberUnavailableDate.findMany({
      where: {
        userId,
        date: {
          gte: new Date(Date.UTC(currentYear, currentMonth - 1, 1)),
          lte: new Date(Date.UTC(currentYear, currentMonth, 0, 23, 59, 59, 999)),
        },
      },
    }),
  ]);

  if (!person) redirect("/app/perfil");

  const personaData = {
    id: person.id,
    name: person.name,
    lastname: person.lastname,
    email: person.email,
    phone: person.phone,
    address: person.address,
    birthDate: person.birthDate,
    hasUser: !!person.user,
  };

  const hasDepartments = person.departments.length > 0;
  const initialDays = availabilities.map((a) => a.dayOfWeek);
  const initialExceptions = exceptions.map((e) => {
    const d = new Date(e.date);
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
  });

  return (
    <div className="container mx-auto py-6 px-4 max-w-3xl space-y-6">
      <PerfilForm persona={personaData} redirectTo="/app/perfil" />
      {hasDepartments && (
        <AvailabilityDaysSection
          initialDays={initialDays}
          initialExceptions={initialExceptions}
        />
      )}
    </div>
  );
}
