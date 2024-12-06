'use client'

import axios from "axios";
import Area from "./Area";
import { useEffect, useState } from "react";
import AreaType from "@/types/AreaTypes";


const Ministries = () => {
    
    const [info, setInfo] = useState<AreaType[]>()

    useEffect(() => {
      axios.get(`http://localhost:3000/api/ministries`)
        .then(res => setInfo(res.data)).catch(error => error)
    }, [])

    return (
        <section>
            <div>
                <h3 className="text-xl md:text-xl-desktop text-primary-2 text-center">Ministerios</h3>
                <div className="grid sm:grid-cols-2 p-6 justify-items-center gap-4 max-w-[800px] mx-auto">
                    {
                        info?.map((ministerio) => (
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
