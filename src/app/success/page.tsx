import Button from "@/ui/Button"

const page = () => {
  return (
    <section className="w-full min-h-screen">
        <div className="p-6 h-screen w-full flex flex-col gap-4 justify-center items-center">
            <h2 className="text-2xl md:text-2xl-desktop text-primary-2">Muchas gracias por tu donativo!</h2>
            <Button url="/" variant="primary" text="Volver al Inicio" className="font-semibold px-4"/>
        </div>
    </section>
  )
}

export default page