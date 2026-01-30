"use client";
import { churches } from "../../mocks/churchues";
import { InfoChurch } from "@/types/InfoChurch";
import dynamic from "next/dynamic";
import { Users, MessageCircle, Info } from "lucide-react";
import { CallToAction } from "@/components/CallToAction";
import { HeroTitle } from "@/components/typography/HeroTitle";
import { Subtitle } from "@/components/typography/Subtitle";

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
      <div className="bg-[url(../../public/visitanos-banner.jpg)] h-screen bg-no-repeat bg-center bg-cover before:absolute before:inset-0 before:bg-black/50 before:content-[''] flex flex-col justify-center items-center">
        
            <HeroTitle title="Visitanos" size="large" />
      </div>
      <div className="p-6 overflow-hidden">
        <Subtitle>Ubicaciones</Subtitle>
        <div className="flex flex-col gap-y-10">
          {churches?.map((church) => (
            <ChurchLocation info={church as InfoChurch} key={church.index} />
          ))}
        </div>
      </div>

      <CallToAction
        title="Te Esperamos con los Brazos Abiertos"
        description="Nuestra iglesia es un hogar espiritual para todos. Ya seas nuevo en la fe o busques una comunidad donde crecer, aquí encontrarás amor, aceptación y oportunidades para servir y ser servido."
        icon={Users}
        iconLabel="Comunidad"
        buttons={[
          {
            label: "Conocenos más",
            href: "/nosotros",
            variant: "primary",
            icon: Info,
          },
          {
            label: "Envía tu Petición",
            href: "/oracion",
            variant: "secondary",
            icon: MessageCircle,
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
