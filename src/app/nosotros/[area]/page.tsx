import Image from "next/image"
const page = () => {
    return (
        <section>
            <div className="min-h-[95vh] p-6 ">
                <h2 className="text-2xl text-primary text-center pt-28 sm:pt-32">Titulo del ministerio o departamento</h2>

                <div className="flex flex-col justify-center mx-auto items-center sm:flex-row max-w-[800px] gap-8 pb-8">
                    <Image src='/cultomujeres.png' width={500} height={500} className="max-w-[400px] max-h-[400px] w-full h-full" alt="ministerio 1" />
                    <p className="text-center max-w-[300px]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam tempora porro vel quaerat veritatis, dolores quod officiis similique, obcaecati ducimus ipsum nisi culpa molestias, alias ipsa. Necessitatibus facere iure saepe?</p>
                </div>
            </div>
        </section>
    )
}

export default page