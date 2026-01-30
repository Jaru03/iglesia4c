import Area from "./Area";
import { ministeries as info } from "@/mocks/ministeries";
const Ministries = () => {
    
    return (
        <section>
            <div>
                <h3 className="text-xl md:text-2xl font-semibold text-primary-2 text-center">Ministerios</h3>
                <div className="grid sm:grid-cols-2 p-6 justify-items-center gap-4 max-w-7xl mx-auto">
                    {
                        info?.map((ministerio, index) => (
                            <Area
                                key={index}
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
