"use client";
import { SpinningTextLabel } from "@/components/SpinningTextLabel";
import { churches } from "../../mocks/churchues";
import { InfoChurch } from "@/types/InfoChurch";
import dynamic from "next/dynamic";
import { CallToAction } from "@/components/CallToAction";
import { HeroTitle } from "@/components/typography/HeroTitle";
import { Subtitle } from "@/components/typography/Subtitle";
import { SpinningText } from "@/components/ui/spinning-text";

// Importa ChurchLocation deshabilitando SSR
const ChurchLocation = dynamic(
  () => import("@/app/visitanos/components/ChurchLocation"),
  {
    ssr: false,
  },
);

const page = () => {
  return (
    <section>
      <div className="relative bg-[url(../../public/visitanos-banner.jpg)] h-[100vh] bg-no-repeat bg-center bg-cover before:absolute before:inset-0 before:bg-black/50 before:content-[''] flex flex-col justify-center items-center">
        
            <HeroTitle title="Visitanos" size="large" />

        <SpinningTextLabel />
      </div>
      <div className="section container-page">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <Subtitle className="mb-4">Ubicaciones</Subtitle>
          <p className="text-body">
            Encuentra la sede más cercana a ti y únete a nuestros cultos y actividades.
            Cada ubicación es una familia lista para recibirte con amor.
          </p>
        </div>
        <div className="flex flex-col gap-y-10">
          {churches?.map((church) => (
            <ChurchLocation info={church as InfoChurch} key={church.index} />
          ))}
        </div>
      </div>

      <CallToAction
        title="Te Esperamos con los Brazos Abiertos"
        description="Nuestra iglesia es un hogar espiritual para todos. Ya seas nuevo en la fe o busques una comunidad donde crecer, aquí encontrarás amor, aceptación y oportunidades para servir y ser servido."
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
            label: "Envía tu Petición",
            href: "/oracion",
            variant: "secondary",
            icon: "message-circle",
          },
        ]}
        quote={{
          text: "Mirad cuál amor nos ha dado el Padre, para que seamos llamados hijos de Dios",
          reference: "- 1 Juan 3:1",
        }}
      />
    </section>
  );
};

export default page;
