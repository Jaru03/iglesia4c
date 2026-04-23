import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma";
import { AppointmentsTable } from "./components/AppointmentsTable";
import { AgendaFilterDrawer } from "./components/AgendaFilterDrawer";
import { AvailabilityDrawer } from "./components/AvailabilityDrawer";
import { ObrerosAvailabilityDrawer } from "./components/ObrerosAvailabilityDrawer";
import { CalendarDays, Clock, CheckCircle, AlertCircle, CalendarX } from "lucide-react";
import { PageLayout } from "@/components/dashboard/PageLayout";

export const dynamic = "force-dynamic";

export default async function AgendaPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");
  if (!["RESPONSIBLE", "OBRERO"].includes(session.user.role)) redirect("/app/dashboard");

  const userId = Number(session.user.id);
  const role = session.user.role;
  const { status } = await searchParams;
  const selectedStatus = status ?? null;

  // Obreros visibles solo para RESPONSIBLE: los de las iglesias que lidera
  let obreros: { id: number; name: string }[] = [];
  if (role === "RESPONSIBLE") {
    const responsableChurches = await prisma.churchLeader.findMany({
      where: { userId, role: "RESPONSIBLE" },
      select: { churchId: true },
    });
    const churchIds = responsableChurches.map((c) => c.churchId);
    if (churchIds.length > 0) {
      const obrerosRows = await prisma.user.findMany({
        where: { role: "OBRERO", person: { churchId: { in: churchIds } } },
        include: { person: { select: { name: true, lastname: true } } },
        orderBy: { person: { name: "asc" } },
      });
      obreros = obrerosRows.map((o) => ({
        id: o.id,
        name: `${o.person.name} ${o.person.lastname}`,
      }));
    }
  }

  const [availability, appointments] = await Promise.all([
    prisma.availability.findMany({ where: { userId }, orderBy: { dayOfWeek: "asc" } }),
    prisma.appointment.findMany({
      where: {
        responsableId: userId,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(selectedStatus ? { status: selectedStatus as any } : {}),
      },
      orderBy: [{ date: "asc" }, { startTime: "asc" }],
      include: {
        user: { include: { person: { select: { name: true, lastname: true, email: true } } } },
      },
    }),
  ]);

  const availabilityData = availability.map((a) => ({
    id: a.id,
    dayOfWeek: a.dayOfWeek,
    slotIndex: a.slotIndex,
    startTime: a.startTime,
    endTime: a.endTime,
    slotDuration: a.slotDuration,
  }));

  const appointmentsData = appointments.map((a) => ({
    id: a.id,
    date: a.date.toISOString(),
    startTime: a.startTime,
    endTime: a.endTime,
    status: a.status,
    notes: a.notes,
    user: {
      person: {
        name: a.user.person.name,
        lastname: a.user.person.lastname,
        email: a.user.person.email,
      },
    },
  }));

  // Counts always from all appointments (no filter) for accurate stats
  const allAppointments = await prisma.appointment.findMany({
    where: { responsableId: userId },
    select: { status: true },
  });
  const pendingCount = allAppointments.filter((a) => a.status === "PENDING").length;
  const confirmedCount = allAppointments.filter((a) => a.status === "CONFIRMED").length;
  const cancelledCount = allAppointments.filter((a) => a.status === "CANCELLED").length;

  const subtitle = selectedStatus
    ? { PENDING: "Pendientes", CONFIRMED: "Confirmadas", CANCELLED: "Canceladas", COMPLETED: "Completadas" }[selectedStatus] ?? "Todas las citas"
    : "Configura tu disponibilidad y gestiona las citas de tu iglesia.";

  return (
    <>
      <PageLayout
        title="Mi Agenda"
        subtitle={subtitle}
        statsColumns={4}
        stats={[
          { title: "Total", value: allAppointments.length, icon: CalendarDays, colorIndex: 0 },
          { title: "Pendientes", value: pendingCount, icon: AlertCircle, colorIndex: 2 },
          { title: "Confirmadas", value: confirmedCount, icon: CheckCircle, colorIndex: 1 },
          { title: "Canceladas", value: cancelledCount, icon: Clock, colorIndex: 4 },
        ]}
        listTitle="Citas recibidas"
      >
        {appointmentsData.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
            <CalendarX className="h-10 w-10 text-muted-foreground/40 mb-3" />
            <p className="text-sm font-medium text-muted-foreground">
              No hay citas recibidas aún
            </p>
          </div>
        ) : (
          <AppointmentsTable appointments={appointmentsData} isResponsable />
        )}
      </PageLayout>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-center gap-4">
        <AvailabilityDrawer initial={availabilityData} />
        <AgendaFilterDrawer selectedStatus={selectedStatus} />
        {role === "RESPONSIBLE" && <ObrerosAvailabilityDrawer obreros={obreros} />}
      </div>
    </>
  );
}
