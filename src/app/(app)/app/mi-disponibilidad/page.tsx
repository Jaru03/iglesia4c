import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MemberView } from "../calendario-equipo/components/MemberView";

export const dynamic = "force-dynamic";

export default async function MiDisponibilidadPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const { role } = session.user;
  const userId = Number(session.user.id);

  if (!["LEADER", "RESPONSIBLE", "USER", "OBRERO"].includes(role)) {
    redirect("/app/dashboard");
  }

  const person = await prisma.person.findFirst({
    where: { user: { id: userId } },
    include: {
      departments: { where: { active: true }, include: { department: true } },
    },
  });

  if (!person || person.departments.length === 0) redirect("/app/dashboard");

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const [availabilities, exceptions, myEntries] = await Promise.all([
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
    prisma.calendarEntry.findMany({
      where: { userId, date: { gte: startOfMonth, lte: endOfMonth } },
      include: { calendar: { include: { department: { select: { name: true } } } } },
      orderBy: { date: "asc" },
    }),
  ]);

  const initialExceptions = exceptions.map((e) => {
    const d = new Date(e.date);
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
  });

  return (
    <div className="max-w-7xl mx-auto p-4 pb-6 space-y-4 h-[100vh] overflow-auto">
      <DashboardHeader
        title="Mi Disponibilidad"
        subtitle="Configura cuándo puedes participar y ve tu calendario asignado."
      />
      <MemberView
        availableDays={availabilities.map((a) => a.dayOfWeek)}
        initialExceptions={initialExceptions}
        myEntries={myEntries.map((e) => ({
          id: e.id,
          date: e.date.toISOString(),
          task: e.task,
          notes: e.notes,
          departmentName: e.calendar.department.name,
          calendarId: e.calendarId,
        }))}
      />
    </div>
  );
}
