import Button from "../../ui/Button"

const Hero = () => {
    return (
        <section className="bg-[url(../../public/portada.jpg)] before:absolute before:inset-0 before:bg-black/50 before:content-['']
 bg-center bg-cover bg-no-repeat h-screen w-full flex justify-center px-4 xs:px-6">
            <div className="grid grid-rows-auto ">
                <h1 className="text-xl xs:text-2xl md:text-3xl-desktop z-[5] text-white text-center self-end">Bienvenido a <br /> Casa de Dios Madrid</h1>
                <Button text="Visitanos" variant="hero" className='z-[5] self-center justify-self-center' url="/visitanos" />
            </div>
        </section>
    )
}

export default Hero
