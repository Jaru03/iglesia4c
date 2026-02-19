import prisma from "@/utils/prisma";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Activity } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const hoy = new Date();

  const [totalPersonas, eventosProximos] = await Promise.all([
    prisma.person.count({ where: { active: true } }),
    prisma.activity.findMany({
      where: { hourStart: { gte: hoy } },
      orderBy: { hourStart: "asc" },
      take: 5,
    }),
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Panel de Control</h1>
          <p className="text-slate-500 mt-1">Resumen diario de la iglesia</p>
        </div>
        <Card className="w-fit">
          <CardContent className="px-4 py-2 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-600">
              {format(hoy, "EEEE d 'de' MMMM, yyyy", { locale: es })}
            </span>
          </CardContent>
        </Card>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Personas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-slate-800">{totalPersonas}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Eventos Próximos</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-slate-800">{eventosProximos.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Próximos Eventos
              </CardTitle>
            </div>
            <Button asChild size="sm">
              <Link href="/admin/actividades">Gestionar</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {eventosProximos.length === 0 ? (
              <p className="text-center text-slate-400 py-8">No hay eventos futuros programados.</p>
            ) : (
              <div className="divide-y divide-slate-100">
                {eventosProximos.map((evento) => (
                  <div key={evento.id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 py-4 first:pt-0 last:pb-0">
                    <div>
                      <p className="font-semibold text-slate-800">{evento.title}</p>
                      <p className="text-sm text-slate-500 mt-1">{evento.place}</p>
                    </div>
                    <span className="text-sm text-slate-600">
                      {format(evento.hourStart, "EEE d MMM • h:mm a", { locale: es })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Accesos Rápidos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/admin/actividades">Actividades</Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/admin/asistencias">Asistencias</Link>
            </Button>
            <Button asChild className="w-full justify-start">
              <a href="/kiosko" target="_blank">Abrir Kiosko</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
