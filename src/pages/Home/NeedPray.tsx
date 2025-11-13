import Button from "@/ui/Button"

const NeedPray = () => {
  return (
    <section>
        <div className="bg-secondary md:h-[220px] p-6 flex flex-col justify-center items-center gap-4">
            <h2 className="text-xl md:text-xl-desktop text-secundary-2 text-center">¿Necesitas una oración?</h2>
            <Button url="/oracion" text="Pedir una oración" variant="secundary" className="px-8" />
        </div>
    </section>
  )
}

export default NeedPray