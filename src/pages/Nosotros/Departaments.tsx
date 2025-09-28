import Area from "./Area";
import { departaments as info } from "@/mocks/departaments";

const Departaments = () => {

    return (
        <section>
            <div className="p-6">
                <h3 className="text-primary-2 text-xl md:text-xl-desktop pb-6 text-center">Departamentos</h3>

                <div className="grid md:grid-cols-3 gap-4 max-w-7xl justify-center justify-items-center mb-10 mx-auto">
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
