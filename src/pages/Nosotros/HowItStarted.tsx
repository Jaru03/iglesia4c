import Icons from "./Icons"

const HowItStarted = () => {
    return (
        <section>
            <div className="p-6 pt-24 flex flex-col gap-6 text-base md:text-base-desktop sm:pt-32 max-w-[1000px] sm:mx-auto sm:gap-12">
                <h2 className="text-primary-2 text-2xl md:text-2xl-desktop text-center">Centro Cristiano 4C</h2>

                <article>
                    <h3 className="text-primary-2 text-xl md:text-xl-desktop text-center pb-4">¿Cómo Inició?</h3>
                    <p className="text-center">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi quis quibusdam repudiandae natus fugit, iusto deleniti, veritatis maxime perspiciatis quas sapiente, libero voluptas inventore obcaecati soluta doloremque quae? Aliquid, vero?</p>
                </article>
                <div className="flex flex-col gap-6 sm:flex-row sm:gap-12">
                    <Icons description="Nuestra visión es pastorear a cada persona con amor y dedicación, asegurándonos de que ninguno se pierda, tal como Jesús lo expresó en Juan 17:2. Creemos en el llamado de plantar nuevas iglesias que sean centros de transformación, donde cada vida sea alcanzada, discipulada y enviada a impactar el mundo con el evangelio." image="/vision-icon.png" alt="Vision Icon" />
                    <Icons description="Nuestra misión es cumplir la Gran Comisión, tal como se nos manda en Mateo 28:19 y Marcos 16:15-16: predicar el evangelio, enseñar la Palabra de Dios, bautizar a los creyentes, discipular a las nuevas generaciones y enviar a cada uno a cumplir su propósito en Cristo. Nos comprometemos a ser una iglesia que transforma vidas y extiende el Reino de Dios en todo lugar." image="/mision-icon.png" alt="Mision Icon" />
                </div>
            </div>
        </section>
    )
}

export default HowItStarted