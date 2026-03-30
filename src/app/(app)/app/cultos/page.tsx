import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma";
import { PageLayout } from "@/components/dashboard/PageLayout";
import { CultosView } from "./CultosView";
import { HorariosDialog } from "./HorariosDialog";

export const dynamic = "force-dynamic";

export default async function CultosPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const { role, churchId } = session.user;
  const userId = parseInt(session.user.id as string);

  if (role !== "ADMIN" && role !== "RESPONSIBLE") redirect("/app/dashboard");

  const canManage = true;

  let resolvedChurchId: number | null = null;

  if (role === "ADMIN") {
    resolvedChurchId = null; // verá el calendario de todos los cultos
  } else if (churchId) {
    resolvedChurchId = churchId;
  }

  if (role !== "ADMIN" && !resolvedChurchId) redirect("/app/dashboard");

  const now = new Date();
  const rangeStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const rangeEnd = new Date(now.getFullYear(), now.getMonth() + 3, 0);

  // Cargar cultos + persona + datos para el sheet en paralelo
  const [cultos, person, sheetData] = await Promise.all([
    prisma.activity.findMany({
      where: {
        isCulto: true,
        ...(resolvedChurchId ? { churchId: resolvedChurchId } : {}),
        hourStart: { gte: rangeStart, lte: rangeEnd },
      },
      orderBy: { hourStart: "asc" },
      select: {
        id: true,
        title: true,
        place: true,
        hourStart: true,
        church: { select: { title: true } },
      },
    }),
    prisma.person.findFirst({
      where: { user: { id: userId } },
      select: { id: true },
    }),
    // Para ADMIN: todas las iglesias con sus horarios
    // Para RESPONSIBLE: solo los horarios de su iglesia
    canManage
      ? role === "ADMIN"
        ? prisma.church.findMany({
            where: { active: true },
            orderBy: { title: "asc" },
            select: {
              id: true,
              title: true,
              schedules: { orderBy: { id: "asc" }, select: { day: true, time: true, name: true } },
            },
          })
        : prisma.churchSchedule.findMany({
            where: { churchId: resolvedChurchId! },
            orderBy: { id: "asc" },
            select: { day: true, time: true, name: true },
          })
      : Promise.resolve([]),
  ]);

  const attendances = person
    ? await prisma.attendance.findMany({
        where: { personId: person.id, activityId: { in: cultos.map((c) => c.id) } },
        select: { activityId: true, attended: true },
      })
    : [];

  const attendedMap = new Map(attendances.map((a) => [a.activityId, a.attended]));

  const cultoItems = cultos.map((c) => ({
    id: c.id,
    title: c.title,
    place: c.place,
    hourStart: c.hourStart.toISOString(),
    churchTitle: c.church?.title,
    attended: attendedMap.get(c.id) ?? false,
  }));

  // Preparar props del sheet
  const isAdmin = role === "ADMIN";
  const churches = isAdmin
    ? (sheetData as { id: number; title: string; schedules: { day: string; time: string; name: string }[] }[]).map(
        (c) => ({
          id: c.id,
          title: c.title,
          schedules: c.schedules.map((s) => ({ day: s.day, time: s.time, name: s.name ?? "" })),
        })
      )
    : [];

  const initialSchedules = !isAdmin
    ? (sheetData as { day: string; time: string; name: string }[]).map((s) => ({
        day: s.day,
        time: s.time,
        name: s.name ?? "",
      }))
    : [];

  return (
    <PageLayout title="Cultos" listTitle="Calendario de cultos">
      <CultosView
        cultos={cultoItems}
        personId={person?.id}
        isAdmin={isAdmin}
        churches={isAdmin ? churches.map((c) => ({ id: c.id, title: c.title })) : []}
      />

      {canManage && (
        <HorariosDialog
          isAdmin={isAdmin}
          churchId={!isAdmin ? resolvedChurchId! : undefined}
          initialSchedules={initialSchedules}
          churches={churches}
        />
      )}
    </PageLayout>
  );
}
