import Icons from "./Icons"

const HowItStarted = () => {
    return (
        <section>
            <div className="p-6 pt-24 flex flex-col gap-6 text-base sm:pt-32 max-w-[1000px] sm:mx-auto sm:gap-12">
                <h2 className="text-primary-2 text-2xl text-center">Centro Cristiano 4C</h2>

                <article>
                    <h3 className="text-primary-2 text-xl text-center pb-4">¿Cómo Inició?</h3>
                    <p className="text-center">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi quis quibusdam repudiandae natus fugit, iusto deleniti, veritatis maxime perspiciatis quas sapiente, libero voluptas inventore obcaecati soluta doloremque quae? Aliquid, vero?</p>
                </article>
                <div className="flex flex-col gap-6 sm:flex-row sm:gap-12">
                    <Icons description="Que todos sean Pastoreados y ninguno se pierda, Juan 17:2- Plantando nuevas Iglesias" image="/vision-icon.png" alt="Vision Icon" />
                    <Icons description="La gran comisión Mateo 24:19- Marcos 16:16-16 Predicar, enseñar, bautizar, discipular y enviar." image="/mision-icon.png" alt="Mision Icon" />
                </div>
            </div>
        </section>
    )
}

export default HowItStarted