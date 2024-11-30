import Button from "@/ui/Button"
import Input from "@/ui/Input"

const PrayForm = () => {
    return (
        <form className="w-full max-w-[500px] rounded-[20px] items-center shadow-form p-6 mb-10 flex flex-col gap-4">
            <h2 className="text-secundary-3 text-center text-xl">Escrite tu petición y te estaremos apoyando en oración</h2>

            <Input placeholder="Nombre" type="text" />

            <Input placeholder="Email" type="text" />

            <Input type="date" />
            <div className="flex flex-col w-full gap-4 sm:flex-row">
                <Input type="select" />
                <Input placeholder="Tipo de Petición" type="text" />
            </div>
            <Input placeholder="Escribe tu petición" type="textarea" className="pb-32"/>

            <Button url="" variant="form" text="Enviar" className="mt-8"  />
        </form>
    )
}

export default PrayForm