import prisma from "@/utils/prisma";
import Link from "next/link";
import { format, formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{
  sede?: string;
  alcance?: string;
}>;

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const sede = params.sede || "TODAS";
  const alcance = params.alcance || "15";

  const hoy = new Date();
  const dias = Number(alcance) || 15;
  const fechaLimite = new Date();
  fechaLimite.setDate(fechaLimite.getDate() - dias);

  const jovenFilter = sede === "TODAS" ? {} : { sede };
  const auditLogModel = (prisma as any).auditLog;
  const auditLogsPromise = auditLogModel
    ? auditLogModel
        .findMany({
          orderBy: { createdAt: "desc" },
          take: 6,
        })
        .catch(() => [])
    : Promise.resolve([]);

  const [
    sedesDisponibles,
    totalJovenes,
    jovenesActivos,
    jovenesEnRiesgo,
    jovenesSinGrupo,
    totalPersonas,
    nuevosMes,
    pendientesOracion,
    gruposActivos,
    eventosProximos,
    ultimasAsistencias,
    peticionesRecientes,
    ultimosLogs,
  ] = await Promise.all([
    prisma.joven.findMany({
      select: { sede: true },
      distinct: ["sede"],
      orderBy: { sede: "asc" },
    }),
    prisma.joven.count({ where: { ...jovenFilter } }),
    prisma.joven.count({ where: { ...jovenFilter, activo: true } }),
    prisma.joven.count({
      where: {
        ...jovenFilter,
        activo: true,
        OR: [{ ultimaVisita: { lt: fechaLimite } }, { ultimaVisita: null }],
      },
    }),
    prisma.joven.count({ where: { ...jovenFilter, activo: true, grupoId: null } }),
    prisma.persona.count(),
    prisma.persona.count({
      where: {
        fechaVisita: {
          gte: new Date(hoy.getFullYear(), hoy.getMonth(), 1),
        },
      },
    }),
    prisma.peticion.count({ where: { estado: "PENDIENTE" } }),
    prisma.grupo.count({ where: { activo: true } }),
    prisma.activities.findMany({
      where: { hour_start: { gte: hoy } },
      orderBy: { hour_start: "asc" },
      take: 5,
    }),
    prisma.asistencia.findMany({
      orderBy: { fecha: "desc" },
      include: { joven: true },
      take: 8,
    }),
    prisma.peticion.findMany({
      where: { estado: "PENDIENTE" },
      include: { persona: true },
      orderBy: { fecha: "desc" },
      take: 8,
    }),
    auditLogsPromise,
  ]);

  const alertas: string[] = [];
  if (jovenesEnRiesgo > 0) alertas.push(`${jovenesEnRiesgo} jóvenes requieren seguimiento pastoral`);
  if (pendientesOracion > 0) alertas.push(`${pendientesOracion} peticiones de oración pendientes`);
  if (jovenesSinGrupo > 0) alertas.push(`${jovenesSinGrupo} jóvenes aún no están asignados a grupo`);
  if (eventosProximos.length === 0) alertas.push("No hay eventos próximos en agenda");

  const sedes = ["TODAS", ...sedesDisponibles.map((s: { sede: string | null }) => s.sede).filter(Boolean)] as string[];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Panel de Control</h1>
          <p className="text-slate-500 mt-1">Resumen diario de iglesia, jóvenes y seguimiento.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 shadow-sm">
          📅 {format(hoy, "EEEE d 'de' MMMM, yyyy", { locale: es })}
        </div>
      </header>

      <section className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col md:flex-row gap-3">
        <form className="flex flex-col md:flex-row gap-3 w-full">
          <select
            name="sede"
            defaultValue={sede}
            className="px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 outline-none"
          >
            {sedes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            name="alcance"
            defaultValue={alcance}
            className="px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 outline-none"
          >
            <option value="7">Riesgo en 7 días</option>
            <option value="15">Riesgo en 15 días</option>
            <option value="30">Riesgo en 30 días</option>
          </select>
          <button className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition">
            Aplicar filtros
          </button>
        </form>
      </section>

      <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
        <h2 className="text-lg font-bold text-amber-800">Centro de Alertas</h2>
        {alertas.length === 0 ? (
          <p className="text-emerald-700 mt-2 font-medium">No hay alertas críticas por ahora.</p>
        ) : (
          <ul className="mt-2 space-y-1 text-sm text-amber-800">
            {alertas.map((a) => (
              <li key={a}>• {a}</li>
            ))}
          </ul>
        )}
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <article className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Jóvenes Totales</p>
          <p className="text-4xl font-black text-slate-800 mt-2">{totalJovenes}</p>
          <p className="text-xs text-slate-500 mt-2">{jovenesActivos} activos</p>
        </article>

        <article className="bg-red-50 rounded-2xl border border-red-100 p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-red-600">Radar de Riesgo</p>
          <p className="text-4xl font-black text-red-700 mt-2">{jovenesEnRiesgo}</p>
          <p className="text-xs text-red-600 mt-2">Más de {dias} días sin asistir</p>
        </article>

        <article className="bg-indigo-50 rounded-2xl border border-indigo-100 p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">Pendientes de Oración</p>
          <p className="text-4xl font-black text-indigo-700 mt-2">{pendientesOracion}</p>
          <p className="text-xs text-indigo-600 mt-2">Solicitudes por atender</p>
        </article>

        <article className="bg-emerald-50 rounded-2xl border border-emerald-100 p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Grupos Activos</p>
          <p className="text-4xl font-black text-emerald-700 mt-2">{gruposActivos}</p>
          <p className="text-xs text-emerald-700 mt-2">{jovenesSinGrupo} jóvenes sin grupo</p>
        </article>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Próximos Eventos</h2>
              <p className="text-sm text-slate-500 mt-1">Siguientes {eventosProximos.length} en agenda</p>
            </div>
            <Link
              href="/admin/actividades"
              className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Gestionar
            </Link>
          </div>

          {eventosProximos.length === 0 ? (
            <div className="p-10 text-center text-slate-400">No hay eventos futuros programados.</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {eventosProximos.map((evento: any) => (
                <div key={evento.id} className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <p className="font-bold text-slate-800">{evento.title}</p>
                    <p className="text-sm text-slate-500 mt-1">📍 {evento.place}</p>
                  </div>
                  <div className="text-sm font-semibold text-slate-600">
                    {format(new Date(evento.hour_start), "EEE d MMM • h:mm a", { locale: es })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-200 bg-slate-50">
            <h2 className="text-lg font-bold text-slate-800">Accesos Rápidos</h2>
            <p className="text-sm text-slate-500 mt-1">Acciones de uso frecuente</p>
          </div>
          <div className="p-5 space-y-3">
            <Link href="/admin/jovenes/nuevo" className="block w-full text-center bg-blue-50 text-blue-700 font-semibold py-2.5 rounded-lg hover:bg-blue-100 transition">
              + Nuevo Joven
            </Link>
            <Link href="/admin/asistencias" className="block w-full text-center bg-purple-50 text-purple-700 font-semibold py-2.5 rounded-lg hover:bg-purple-100 transition">
              Revisar Asistencias
            </Link>
            <Link href="/admin/peticiones" className="block w-full text-center bg-fuchsia-50 text-fuchsia-700 font-semibold py-2.5 rounded-lg hover:bg-fuchsia-100 transition">
              Ver Peticiones
            </Link>
            <Link href="/admin/grupos" className="block w-full text-center bg-emerald-50 text-emerald-700 font-semibold py-2.5 rounded-lg hover:bg-emerald-100 transition">
              Organizar Grupos
            </Link>
            <a href="/kiosko" target="_blank" className="block w-full text-center bg-slate-900 text-white font-semibold py-2.5 rounded-lg hover:bg-slate-800 transition">
              Abrir Kiosko
            </a>
          </div>
        </aside>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Peticiones Recientes</h2>
              <p className="text-sm text-slate-500 mt-1">Solicitudes de oración pendientes</p>
            </div>
            <Link
              href="/admin/peticiones"
              className="text-sm bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              Ver todas
            </Link>
          </div>

          {peticionesRecientes.length === 0 ? (
            <div className="p-10 text-center text-slate-400">No hay peticiones pendientes.</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {peticionesRecientes.map((peticion) => (
                <div key={peticion.id} className="p-5 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800 truncate">
                      {peticion.persona?.nombre || "Persona no identificada"}
                    </p>
                    <p className="text-sm text-slate-600 mt-1 break-words">"{peticion.motivo}"</p>
                  </div>
                  <span className="text-xs text-slate-500 whitespace-nowrap">
                    {format(new Date(peticion.fecha), "dd MMM, h:mm a", { locale: es })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="bg-white rounded-2xl border border-purple-100 shadow-sm p-5">
          <h3 className="font-bold text-purple-800">Centro de Oración</h3>
          <p className="text-sm text-purple-700 mt-2">
            Cada petición nueva aparece aquí para seguimiento inmediato de administración.
          </p>
          <div className="mt-4 bg-purple-50 rounded-xl p-4">
            <p className="text-xs uppercase tracking-wide text-purple-600 font-semibold">Pendientes ahora</p>
            <p className="text-3xl font-black text-purple-700 mt-1">{pendientesOracion}</p>
          </div>
          <Link
            href="/admin/peticiones"
            className="mt-4 block w-full text-center bg-purple-600 text-white font-semibold py-2.5 rounded-lg hover:bg-purple-700 transition"
          >
            Gestionar peticiones
          </Link>
        </aside>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-200 bg-slate-50">
            <h2 className="text-lg font-bold text-slate-800">Actividad Reciente</h2>
            <p className="text-sm text-slate-500 mt-1">Últimas asistencias registradas</p>
          </div>
          <div className="divide-y divide-slate-100">
            {ultimasAsistencias.length === 0 ? (
              <div className="p-10 text-center text-slate-400">Sin asistencias registradas todavía.</div>
            ) : (
              ultimasAsistencias.map((asistencia: any) => (
                <div key={asistencia.id} className="p-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-800">
                      {asistencia.joven.nombres} {asistencia.joven.apellidos}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{asistencia.joven.sede || "General"}</p>
                  </div>
                  <p className="text-xs text-slate-500 text-right">
                    {format(new Date(asistencia.fecha), "dd MMM, h:mm a", { locale: es })}
                    <br />
                    Hace {formatDistanceToNow(new Date(asistencia.fecha), { locale: es })}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        <aside className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-5">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Resumen General</h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Personas Registradas</span>
                <span className="font-bold text-slate-700">{totalPersonas}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Nuevos este mes</span>
                <span className="font-bold text-slate-700">{nuevosMes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Jóvenes sin grupo</span>
                <span className="font-bold text-slate-700">{jovenesSinGrupo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Eventos próximos</span>
                <span className="font-bold text-slate-700">{eventosProximos.length}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <h3 className="font-bold text-slate-700">Auditoría Reciente</h3>
            <ul className="mt-3 space-y-2">
              {ultimosLogs.length === 0 ? (
                <li className="text-sm text-slate-400">Sin eventos registrados.</li>
              ) : (
                ultimosLogs.map((log: any) => (
                  <li key={log.id} className="text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">{log.module}</span>: {log.description}
                  </li>
                ))
              )}
            </ul>
          </div>
        </aside>
      </section>
    </div>
  );
}
