import { SpinningTextLabel } from "@/components/SpinningTextLabel";
import Activity from "@/components/Activity";
import CalendarActivities from "@/app/actividades/components/CalendarApp";
import dayjs from "dayjs";
import { events } from "@/mocks/activities";
import { CallToAction } from "@/components/CallToAction";
import { HeroTitle } from "@/components/typography/HeroTitle";
import { Subtitle } from "@/components/typography/Subtitle";
import { SpinningText } from "@/components/ui/spinning-text";

const page = () => {
  return (
    <>
      <section>
        <div className="relative bg-[url(../../public/actividades-banner.jpg)] h-[100vh] bg-no-repeat bg-center bg-cover before:absolute before:inset-0 before:bg-black/50 before:content-[''] flex flex-col justify-center items-center">
          <HeroTitle title="Actividades" size="large" />

          <SpinningTextLabel />
        </div>
        <div className="section-sm container-page flex flex-col gap-6">
          <CalendarActivities />
        </div>

        <div className="bg-secondary section">
          <div className="container-page">
            <Subtitle className="mb-8 text-center">Más actividades</Subtitle>

            <div className="flex flex-col gap-y-8 max-w-7xl justify-center mx-auto">
              {events.map((activity) => (
                <Activity
                  key={activity.index}
                  button={false}
                  description={activity.description}
                  hour={dayjs(activity.start.toString()).format("HH:mm")}
                  image={activity.img}
                  place={activity.place}
                  title={activity.title}
                  className="pb-8"
                />
              ))}
            </div>
          </div>
        </div>

        <CallToAction
          title="¡Únete a Nuestra Comunidad!"
          description="Participa en nuestras actividades y forma parte de una comunidad que crece en fe, amor y servicio. Cada actividad es una oportunidad para conectarte con Dios y con los demás miembros de nuestra iglesia."
          icon="users"
          iconLabel="Comunidad"
          buttons={[
            {
              label: "Conocenos más",
              href: "/nosotros",
              variant: "primary",
              icon: "info",
            },
            {
              label: "Enviar Petición de Oración",
              href: "/oracion",
              variant: "secondary",
              icon: "message-circle",
            },
          ]}
          quote={{
            text: "Donde dos o tres se congregan en mi nombre, allí estoy yo en medio de ellos",
            reference: "- Mateo 18:20",
          }}
        />
      </section>
    </>
  );
};

export default page;
