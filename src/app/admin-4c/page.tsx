import Button from "@/ui/Button"

const page = () => {

    return (
    <section className="h-screen">
        <div className="h-full">
            <h2 className="text-center pt-28 md:pt-32">Qué quieres modificar?</h2>
            
            <div className="grid grid-rows-3 md:grid-cols-3 justify-items-center p-10">
                <Button variant="primary" className="px-8" text="Predicas" url="/admin-4c/predicas"/>
                <Button variant="primary" className="px-8" text="Actividades" url="/admin-4c/actividades"/>
                <Button variant="primary" className="px-8" text="Últimas Actividades" url="/admin-4c/ultimasActividades"/>
            </div>
        </div>
    </section>
  )
}

export default page