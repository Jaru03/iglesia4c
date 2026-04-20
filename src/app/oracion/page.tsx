import type { Metadata } from "next";
import { HeroTitle } from "@/components/typography/HeroTitle";
import { SpinningTextLabel } from "@/components/SpinningTextLabel";
import PrayForm from "@/app/oracion/components/PrayForm";
import { CallToAction } from "@/components/CallToAction";
import Link from "next/link";
import { Title } from "@/components/typography/Title";

export const metadata: Metadata = {
  title: "Petición de Oración | Casa de Dios Madrid",
  description:
    "Envía tu petición de oración a la iglesia Casa de Dios en Madrid. Nuestra comunidad cristiana ora por ti con amor y dedicación.",
  alternates: { canonical: "/oracion" },
  openGraph: {
    title: "Petición de Oración | Casa de Dios Madrid",
    description:
      "Envía tu petición de oración a nuestra comunidad cristiana en Madrid.",
    url: "/oracion",
    type: "website",
    images: ["/oracion-banner.jpg"],
  },
}

const page = () => {
  return (
    <section>
      <div className="relative bg-[url(../../public/oracion-banner.jpg)] h-[100vh] bg-no-repeat bg-center bg-cover before:absolute before:inset-0 before:bg-black/50 before:content-[''] flex flex-col justify-center items-center">
        <HeroTitle title="Oración" size="large" />

        <SpinningTextLabel />
      </div>
      <div className="section-sm flex flex-col justify-center items-center container-page">
        <div className="text-center mb-12">
          <Title className="mb-3 md:mb-4 text-2xl md:text-3xl">Petición de Oración</Title>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-4">
            Escribe tu petición de oración para poder apoyarte
          </p>
        </div>
        <PrayForm />
      </div>

      <CallToAction
        title="Tu Oración es Importante"
        description="Cada petición de oración es atendida con amor y dedicación por nuestra comunidad. Únete a nosotros en esta hermosa experiencia de intercesión y apoyo espiritual mutuo."
        icon="message-circle"
        iconLabel="Oración"
        buttons={[
          { label: "Participar en Actividades", href: "/actividades", variant: "primary", icon: "calendar" },
          { label: "Apoyar con Donativo", href: "/donaciones", variant: "secondary", icon: "heart" },
        ]}
        quote={{ text: "Orad sin cesar. Dad gracias en todo, porque esta es la voluntad de Dios", reference: "- 1 Tesalonicenses 5:17-18" }}
      />
    </section>

  );
};

export default page;
