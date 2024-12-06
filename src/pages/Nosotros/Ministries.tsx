import Area from "./Area"
import prisma from "@/utils/prisma"

const Ministries = async() => {
    
    const ministries = await prisma.area.findMany({
        where: {
            rol:'ministerio'
        }
    })

    return (
        <section>
            <div>
                <h3 className="text-xl md:text-xl-desktop text-primary-2 text-center">Ministerios</h3>
                <div className="grid sm:grid-cols-2 p-6 justify-items-center gap-4 max-w-[800px] mx-auto">
                    {
                        ministries.map((ministerio) => (
                            <Area
                                key={ministerio.id}
                                img={ministerio.img}
                                title={ministerio.title}
                                value={ministerio.value}
                            />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default Ministries
