import Button from "@/ui/Button"
import { Heart } from "lucide-react"

const NeedPray = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-gradient-to-r from-secondary via-secondary to-secondary-2 md:h-[260px] p-8 flex flex-col justify-center items-center gap-6 relative">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 opacity-8">
          <div className="absolute top-6 right-6">
            <Heart className="w-12 h-12 text-white/30" />
          </div>
          <div className="absolute bottom-6 left-6">
            <Heart className="w-10 h-10 text-white/20" />
          </div>
        </div>

        {/* Main content */}
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-3">
              ¿Necesitas una oración?
            </h2>
          </div>

          <p className="text-gray-700 text-base md:text-lg mb-6 max-w-xl mx-auto leading-relaxed">
            Estamos aquí para ti. Comparte tu petición de oración y nuestra comunidad se unirá en fe por ti.
          </p>

          <Button
            url="/oracion"
            text="Pedir una oración"
            variant="primary"
            className="px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl"
          />
        </div>
      </div>
    </section>
  )
}

export default NeedPray
