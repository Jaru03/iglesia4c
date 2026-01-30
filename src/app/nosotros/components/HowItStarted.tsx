import Icons from "./Icons";
import FeDeclaration from "./FeDeclaration";
import Consejo from "./Consejo";
import { Cross, Heart, Users, BookOpen } from "lucide-react";

const HowItStarted = () => {
  return (
    <section>
      {/* Hero Section */}
      <div className="relative bg-[url(../../public/cdd-banner.jpg)] h-screen bg-no-repeat bg-center bg-cover flex flex-col justify-center items-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-black/70"></div>

        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <Cross className="absolute top-20 left-20 w-12 h-12 text-white" />
          <Heart className="absolute top-32 right-32 w-16 h-16 text-white" />
          <BookOpen className="absolute bottom-32 left-32 w-14 h-14 text-white" />
          <Users className="absolute bottom-20 right-20 w-18 h-18 text-white" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-4 mb-6">
            <h1 className="text-white text-5xl md:text-6xl font-bold leading-tight">
              Comunidad Cristiana Casa de Dios
            </h1>
          </div>
        </div>
      </div>

      {/* Vision & Mission Section */}
      <div className="py-20 px-6 bg-linear-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-primary-3 text-4xl md:text-5xl font-bold mb-6">
              Nuestra Visión y Misión
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto font-normal ">
              Guiados por la Palabra de Dios, nos comprometemos a ser una
              iglesia que impacta vidas y transforma comunidades con el amor de
              Cristo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 group">
              <Icons
                description="Nuestra visión es pastorear a cada persona con amor y dedicación, asegurándonos de que ninguno se pierda, tal como Jesús lo expresó en Juan 17:2. Creemos en el llamado de plantar nuevas iglesias que sean centros de transformación, donde cada vida sea alcanzada, discipulada y enviada a impactar el mundo con el evangelio."
                image="/vision-icon.png"
                alt="Visión Icon"
              />
            </div>

            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 group">
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
