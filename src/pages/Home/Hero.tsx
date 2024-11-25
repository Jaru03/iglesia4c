import Button from "@/ui/Button"

const Hero = () => {
    return (
        <section className="bg-[url(../../public/portada.jpg)] bg-center bg-cover bg-no-repeat h-screen w-full flex justify-center px-6">
            <div className="grid grid-rows-auto">
                <h1 className="text-3xl text-white text-center self-end">Bienvenido a la iglesia <span className="text-primary-4 text-stroke">4C</span><br /> Plaza de Castilla</h1>
                <Button text="Visitanos" variant="hero" className='max-h-[40px] self-center justify-self-center px-24' href="visitanos" />
            </div>
        </section>
    )
}

export default Hero