import Icons from "./Icons";
import FeDeclaration from "./FeDeclaration";

const HowItStarted = () => {
  return (
    <section>
      <div className="bg-[url(../../public/cdd-banner.jpg)] h-screen bg-no-repeat bg-center bg-cover before:absolute before:inset-0 before:bg-black/50 before:content-[''] flex flex-col justify-center items-center">
        <h2 className="text-white text-3xl md:text-3xl-desktop z-[5] text-center">
          Comunidad Cristiana <br /> Casa de Dios
        </h2>
      </div>
      <div className="p-6 flex flex-col gap-6 text-base md:text-base-desktop max-w-7xl sm:mx-auto sm:gap-12">
        <div className="grid md:gap-x-8 md:grid-cols-2">
          <h2 className="text-primary-2 text-xl md:text-xl-desktop text-center col-span-full pt-4">
            Visión y Misión
          </h2>
          <Icons
            description="Nuestra visión es pastorear a cada persona con amor y dedicación, asegurándonos de que ninguno se pierda, tal como Jesús lo expresó en Juan 17:2. Creemos en el llamado de plantar nuevas iglesias que sean centros de transformación, donde cada vida sea alcanzada, discipulada y enviada a impactar el mundo con el evangelio."
            image="/vision-icon.png"
            alt="Vision Icon"
          />
          <Icons
            description="Nuestra misión es cumplir la Gran Comisión, tal como se nos manda en Mateo 28:19 y Marcos 16:15-16: predicar el evangelio, enseñar la Palabra de Dios, bautizar a los creyentes, discipular a las nuevas generaciones y enviar a cada uno a cumplir su propósito en Cristo. Nos comprometemos a ser una iglesia que transforma vidas y extiende el Reino de Dios en todo lugar."
            image="/mision-icon.png"
            alt="Mision Icon"
          />
        </div>
        <FeDeclaration/>
      </div>
    </section>
  );
};

export default HowItStarted;
