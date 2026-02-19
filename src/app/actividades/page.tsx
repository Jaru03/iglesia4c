import prisma from "@/utils/prisma";
import { SpinningTextLabel } from "@/components/SpinningTextLabel";
import Activity from "@/components/Activity";
import CalendarActivities from "@/app/actividades/components/CalendarApp";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { CallToAction } from "@/components/CallToAction";
import { HeroTitle } from "@/components/typography/HeroTitle";
import { Subtitle } from "@/components/typography/Subtitle";

export const dynamic = "force-dynamic";

export default async function ActividadesPage() {
  const actividades = await prisma.activity.findMany({
    where: { hourStart: { gte: new Date() } },
    orderBy: { hourStart: "asc" },
  });

  const hoy = new Date();
  const mesActual = hoy.getMonth();
  const anioActual = hoy.getFullYear();

  const eventosEsteMes = actividades.filter((act) => {
    const fecha = new Date(act.hourStart);
    return fecha.getMonth() === mesActual && fecha.getFullYear() === anioActual;
  });

  const eventosFuturos = actividades.filter((act) => {
    const fecha = new Date(act.hourStart);
    return (fecha.getMonth() !== mesActual && fecha.getFullYear() === anioActual) || fecha.getFullYear() > anioActual;
  });

  return (
    <section>
      <div className="relative bg-[url(../../public/actividades-banner.jpg)] h-screen bg-no-repeat bg-center bg-cover before:absolute before:inset-0 before:bg-black/50 before:content-[''] flex flex-col justify-center items-center">
        <HeroTitle title="Actividades" size="large" />
        <SpinningTextLabel />
      </div>

      <div className="section-sm container-page flex flex-col gap-6">
        <CalendarActivities activities={actividades} />
      </div>

      <div className="bg-secondary section">
        <div className="container-page">
          <Subtitle className="mb-8 text-center">Próximamente...</Subtitle>
          <div className="flex flex-col gap-y-8 max-w-7xl justify-center mx-auto">
            {eventosFuturos.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-slate-500 text-lg">No hay eventos programados para los próximos meses.</p>
              </div>
            ) : (
              eventosFuturos.map((activity) => (
                <Activity
                  key={activity.id}
                  button={false}
                  description={activity.description || "Te esperamos."}
                  hour={dayjs(activity.hourStart).format("HH:mm")}
                  image={activity.img || "/images/placeholder-evento.jpg"}
                  place={activity.place}
                  title={activity.title}
                  className="pb-8"
                />
              ))
            )}
          </div>
        </div>
      </div>

      <CallToAction
        title="¡Únete a Nuestra Comunidad!"
        description="Participa en nuestras actividades..."
        icon="users"
        iconLabel="Comunidad"
        buttons={[
          { label: "Conocenos más", href: "/nosotros", variant: "primary", icon: "info" },
          { label: "Enviar Petición de Oración", href: "/oracion", variant: "secondary", icon: "message-circle" },
        ]}
        quote={{ text: "Donde dos o tres se congregan en mi nombre...", reference: "- Mateo 18:20" }}
      />
    </section>
  );
}
