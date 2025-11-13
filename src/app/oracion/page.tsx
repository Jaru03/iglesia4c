import PrayForm from "@/pages/Peticiones de Oración/PrayForm"

const page = () => {
  return (
    <section>
      <div className="bg-[url(../../public/oracion-banner.jpg)] h-screen bg-no-repeat bg-center bg-cover before:absolute before:inset-0 before:bg-black/50 before:content-[''] flex flex-col justify-center items-center">
          <h2 className="text-white text-3xl md:text-3xl-desktop z-[5] text-center">
            Oración
          </h2>
        </div>
        <div className="p-6 flex flex-col justify-center items-center ">
            <h2 className="text-primary-2 text-xl text-center md:text-xl-desktop">Petición de Oración</h2>

            <PrayForm />
        </div>
    </section>
  )
}

export default page