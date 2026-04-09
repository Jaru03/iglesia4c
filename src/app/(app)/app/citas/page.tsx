import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma";
import { AppointmentsTable } from "../agenda/components/AppointmentsTable";
import { CalendarDays, Clock, CheckCircle, AlertCircle, CalendarX } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FloatingActionButton } from "@/components/admin/FloatingActionButton";
import { PageLayout } from "@/components/dashboard/PageLayout";
import { CitasFilterDrawer } from "./components/CitasFilterDrawer";
import { AdminResponsableSettings } from "./components/AdminResponsableSettings";

export const dynamic = "force-dynamic";

export default async function CitasPage({
  searchParams,
}: {
  searchParams: Promise<{ responsable?: string; status?: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const userId = Number(session.user.id);
  const { role } = session.user;

  if (role === "RESPONSIBLE") redirect("/app/agenda");

  // ── ADMIN: todas las citas ──
  if (role === "ADMIN") {
    const { responsable, status } = await searchParams;
    const selectedResponsableId = responsable ? parseInt(responsable) : null;
    const selectedStatus = status ?? null;

    const where = {
      ...(selectedResponsableId ? { responsableId: selectedResponsableId } : {}),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(selectedStatus ? { status: selectedStatus as any } : {}),
    };

    const [todasLasCitas, responsables] = await Promise.all([
      prisma.appointment.findMany({
        where,
        orderBy: [{ date: "asc" }, { startTime: "asc" }],
        include: {
          user: { include: { person: { select: { name: true, lastname: true, email: true } } } },
          responsable: { include: { person: { select: { name: true, lastname: true } } } },
        },
      }),
      prisma.user.findMany({
        where: { role: "RESPONSIBLE" },
        include: { person: { select: { name: true, lastname: true } } },
        orderBy: { person: { name: "asc" } },
      }),
    ]);

    const pendingCount = todasLasCitas.filter((a) => a.status === "PENDING").length;
    const confirmedCount = todasLasCitas.filter((a) => a.status === "CONFIRMED").length;
    const cancelledCount = todasLasCitas.filter((a) => a.status === "CANCELLED").length;

    const citasData = todasLasCitas.map((a) => ({
      id: a.id,
      date: a.date.toISOString(),
      startTime: a.startTime,
      endTime: a.endTime,
      status: a.status,
      notes: a.notes,
      responsableName: `${a.responsable.person.name} ${a.responsable.person.lastname}`,
      user: {
        person: {
          name: a.user.person.name,
          lastname: a.user.person.lastname,
          email: a.user.person.email,
        },
      },
    }));

    const responsablesData = responsables.map((r) => ({
      id: r.id,
      name: `${r.person.name} ${r.person.lastname}`,
    }));

    const subtitle = selectedResponsableId
      ? responsablesData.find((r) => r.id === selectedResponsableId)?.name ?? "Todas las citas"
      : selectedStatus
      ? { PENDING: "Pendientes", CONFIRMED: "Confirmadas", CANCELLED: "Canceladas", COMPLETED: "Completadas" }[selectedStatus] ?? "Todas las citas"
      : "Todas las citas del sistema.";

    return (
      <>
        <PageLayout
          title="Gestión de Citas"
          subtitle={subtitle}
          statsColumns={4}
          stats={[
            { title: "Total", value: citasData.length, icon: CalendarDays, colorIndex: 0 },
            { title: "Pendientes", value: pendingCount, icon: AlertCircle, colorIndex: 2 },
            { title: "Confirmadas", value: confirmedCount, icon: CheckCircle, colorIndex: 1 },
            { title: "Canceladas", value: cancelledCount, icon: Clock, colorIndex: 4 },
          ]}
          listTitle="Citas"
        >
          <AppointmentsTable appointments={citasData} isResponsable />
        </PageLayout>
        <CitasFilterDrawer
          responsables={responsablesData}
          selectedResponsableId={selectedResponsableId}
          selectedStatus={selectedStatus}
        />
        <AdminResponsableSettings responsables={responsablesData} />
      </>
    );
  }

  // ── Resto de roles: mis citas ──
  const misCitas = await prisma.appointment.findMany({
    where: { userId },
    orderBy: [{ date: "asc" }, { startTime: "asc" }],
    include: {
      responsable: { include: { person: { select: { name: true, lastname: true } } } },
    },
  });

  const misCitasData = misCitas.map((a) => ({
    id: a.id,
    date: a.date.toISOString(),
    startTime: a.startTime,
    endTime: a.endTime,
    status: a.status,
    notes: a.notes,
    user: {
      person: {
        name: a.responsable.person.name,
        lastname: a.responsable.person.lastname,
        email: null,
      },
    },
  }));

  return (
    <>
      <div className="max-w-7xl mx-auto p-4 pb-6 space-y-4 h-[100vh] overflow-auto">
        <DashboardHeader
          title="Mis citas"
          subtitle="Reserva y gestiona tus citas con el responsable."
        />

        <Card className="shadow-md border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Historial de citas</CardTitle>
          </CardHeader>
          <CardContent>
            {misCitasData.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
                <CalendarX className="h-10 w-10 text-muted-foreground/40 mb-3" />
                <p className="text-sm font-medium text-muted-foreground">
                  Aún no tienes citas agendadas
                </p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  Pulsa el botón + para agendar una nueva cita.
                </p>
              </div>
            ) : (
              <AppointmentsTable appointments={misCitasData} isResponsable={false} />
            )}
          </CardContent>
        </Card>
      </div>

      <FloatingActionButton href="/app/citas/nueva" label="Nueva cita" />
    </>
  );
}
