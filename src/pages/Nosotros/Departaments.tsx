'use client'

import axios from "axios";
import Area from "./Area";
import { useEffect, useState } from "react";
import AreaType from "@/types/AreaTypes";


const Departaments = () => {

    const [info, setInfo] = useState<AreaType[]>()

    useEffect(() => {
      axios.get(`/api/departaments`)
        .then(res => setInfo(res.data)).catch(error => error)
    }, [])
  
  
    return (
        <section>
            <div className="p-6">
                <h3 className="text-primary-2 text-xl md:text-xl-desktop pb-6 text-center">Departamentos</h3>

                <div className="grid sm:grid-cols-2 justify-items-center sm:grid-rows-2 md:grid-cols-3 gap-4 max-w-[1000px] mx-auto">
                    {
                        info?.map((departament) => (
                            <Area
                                key={departament.id}
                                img={departament.img}
                                title={departament.title}
                                value={departament.value}
                                className={departament.id === info?.at(-1)?.id ? 'md:col-[1/4]' : ''}
                            />
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default Departaments;
