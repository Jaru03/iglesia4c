import PrayForm from "@/pages/Peticiones de Oración/PrayForm"

const page = () => {
  return (
    <section>
        <div className="p-6 flex flex-col justify-center items-center ">
            <h2 className="text-primary-2 text-2xl text-center md:text-2xl-desktop pt-24">Petición de Oración</h2>

            <PrayForm />
        </div>
    </section>
  )
}

export default page