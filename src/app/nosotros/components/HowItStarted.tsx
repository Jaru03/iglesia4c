import Icons from "./Icons";
import FeDeclaration from "./FeDeclaration";
import Consejo from "./Consejo";
import { HeroTitle } from "@/components/typography/HeroTitle";
import { Subtitle } from "@/components/typography/Subtitle";

const HowItStarted = () => {
  return (
    <section>
      {/* Hero Section */}
      <div className="relative bg-[url(../../public/cdd-banner.jpg)] h-[100vh] bg-no-repeat bg-center bg-cover flex flex-col justify-center items-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-black/70"></div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-4 mb-6">
            <HeroTitle title="Comunidad Cristiana Casa de Dios" size="large" />
          </div>
        </div>
      </div>

      {/* Vision & Mission Section */}
      <div className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Subtitle className="mb-4">Nuestra Visión y Misión</Subtitle>
            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto mt-4">
              Guiados por la Palabra de Dios, nos comprometemos a ser una
              iglesia que impacta vidas y transforma comunidades con el amor de
              Cristo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <Icons
                description="Nuestra visión es pastorear a cada persona con amor y dedicación, asegurándonos de que ninguno se pierda, tal como Jesús lo expresó en Juan 17:2. Creemos en el llamado de plantar nuevas iglesias que sean centros de transformación, donde cada vida sea alcanzada, discipulada y enviada a impactar el mundo con el evangelio."
                image="/vision-icon.png"
                alt="Visión Icon"
              />
            </div>

            <div className="text-center">
              <Icons
                description="Nuestra misión es cumplir la Gran Comisión, tal como se nos manda en Mateo 28:19 y Marcos 16:15-16: predicar el evangelio, enseñar la Palabra de Dios, bautizar a los creyentes, discipular a las nuevas generaciones y enviar a cada uno a cumplir su propósito en Cristo. Nos comprometemos a ser una iglesia que transforma vidas y extiende el Reino de Dios en todo lugar."
                image="/mision-icon.png"
                alt="Misión Icon"
              />
            </div>
          </div>
        </div>
      </div>

      <FeDeclaration />
      <Consejo />
    </section>
  );
};

export default HowItStarted;
