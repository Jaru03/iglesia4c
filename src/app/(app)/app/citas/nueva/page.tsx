import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma";
import { BookingForm } from "../components/BookingForm";
import { CalendarX, ChevronLeft } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function NuevaCitaPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  if (session.user.role === "RESPONSIBLE") redirect("/app/agenda");

  const userId = Number(session.user.id);

  const userWithChurch = await prisma.user.findUnique({
    where: { id: userId },
    include: { person: { select: { churchId: true } } },
  });

  const churchId = userWithChurch?.person.churchId;

  const responsables = churchId
    ? await prisma.churchLeader.findMany({
        where: { churchId, role: "RESPONSIBLE" },
        include: {
          user: {
            include: {
              person: { select: { name: true, lastname: true } },
              availability: true,
            },
          },
        },
      })
    : [];

  const responsablesConDisponibilidad = responsables
    .filter((r) => r.user.availability.length > 0)
    .map((r) => ({
      id: r.user.id,
      name: `${r.user.person.name} ${r.user.person.lastname}`,
      availableDays: r.user.availability.map((a) => a.dayOfWeek),
    }));

  return (
    <div className="max-w-7xl mx-auto p-4 pb-6 space-y-4 h-[100vh] overflow-auto">
      <DashboardHeader
        title="Nueva cita"
        subtitle="Reserva un tiempo con el responsable de tu iglesia."
        action={
          <Link
            href="/app/citas"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Volver
          </Link>
        }
      />

      {responsablesConDisponibilidad.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
          <CalendarX className="h-10 w-10 text-muted-foreground/40 mb-3" />
          <p className="text-sm font-medium text-muted-foreground">
            Sin disponibilidad configurada
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1 max-w-xs">
            El responsable de tu iglesia aún no ha configurado su disponibilidad para citas.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {responsablesConDisponibilidad.map((r) => (
            <BookingForm key={r.id} responsable={r} />
          ))}
        </div>
      )}
    </div>
  );
}
