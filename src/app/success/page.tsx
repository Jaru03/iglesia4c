import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Home } from "lucide-react"

const page = () => {
  return (
    <section className="w-full min-h-screen">
        <div className="p-6 h-screen w-full flex flex-col gap-4 justify-center items-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary-2">Muchas gracias por tu donativo!</h2>
            <Button asChild variant="default" size="default" className="font-semibold">
                <Link href="/">
                    <Home className="w-4 h-4 mr-2" />
                    Volver al Inicio
                </Link>
            </Button>
        </div>
    </section>
  )
}

export default page