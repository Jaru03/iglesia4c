import Area from "./Area";
import { departaments as info } from "@/mocks/departaments";

const Departaments = () => {
    return (
        <section className="py-20 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 mb-6">
                        
                        <h2 className="text-2xl xs:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-3">
                            Nuestros Departamentos
                        </h2>
                       
                    </div>

                    <p className="text-gray-600 text-base xs:text-lg max-w-2xl mx-auto font-normal">
                        Cada departamento de nuestra iglesia está dedicado a servir y apoyar
                        a diferentes grupos de nuestra comunidad, creando espacios de crecimiento espiritual.
                    </p>
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-6 xs:gap-8 lg:gap-12">
                    {
                        info?.map((departament, index) => (
                            <Area
                                key={index}
                                img={departament.img}
                                title={departament.title}
                                value={departament.value}
                            />
                        ))
                    }
                </div>

                
            </div>
        </section>
    );
};

export default Departaments;
