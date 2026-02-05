import { HeroTitle } from "@/components/typography/HeroTitle";
import { SpinningTextLabel } from "@/components/SpinningTextLabel";
import PrayForm from "@/app/oracion/components/PrayForm";
import ToastProvider from "@/app/oracion/components/ToastProvider";
import { CallToAction } from "@/components/CallToAction";

const page = () => {
  return (
    <section>
      <div className="relative bg-[url(../../public/oracion-banner.jpg)] h-[100vh] bg-no-repeat bg-center bg-cover before:absolute before:inset-0 before:bg-black/50 before:content-[''] flex flex-col justify-center items-center">
        <HeroTitle title="Oración" size="large" />

        <SpinningTextLabel />
      </div>
      <div className="section-sm flex flex-col justify-center items-center container-page">

        <ToastProvider/>
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
