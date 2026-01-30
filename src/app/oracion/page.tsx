import PrayForm from "@/app/oracion/components/PrayForm";
import ToastProvider from "@/app/oracion/components/ToastProvider";
import { MessageCircle, Calendar, Heart } from "lucide-react";
import { CallToAction } from "@/components/CallToAction";
import { HeroTitle } from "@/components/typography/HeroTitle";

const page = () => {
  return (
    <section>
      <div className="bg-[url(../../public/oracion-banner.jpg)] h-screen bg-no-repeat bg-center bg-cover before:absolute before:inset-0 before:bg-black/50 before:content-[''] flex flex-col justify-center items-center">
        <HeroTitle title="Oración" size="large" />
      </div>
      <div className="p-6 flex flex-col justify-center items-center ">

        <ToastProvider/>
        <PrayForm />
      </div>

      <CallToAction
        title="Tu Oración es Importante"
        description="Cada petición de oración es atendida con amor y dedicación por nuestra comunidad. Únete a nosotros en esta hermosa experiencia de intercesión y apoyo espiritual mutuo."
        icon={MessageCircle}
        iconLabel="Oración"
        buttons={[
          { label: "Participar en Actividades", href: "/actividades", variant: "primary", icon: Calendar },
          { label: "Apoyar con Donativo", href: "/donaciones", variant: "secondary", icon: Heart },
        ]}
        quote={{ text: "Orad sin cesar. Dad gracias en todo, porque esta es la voluntad de Dios", reference: "- 1 Tesalonicenses 5:17-18" }}
      />
    </section>
    
  );
};

export default page;
