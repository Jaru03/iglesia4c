'use client'

import AreaType from "@/types/AreaTypes";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const AreaPage = ({ area }: { area: string | string[] | undefined; }) => {
  const param = area

  const [info, setInfo] = useState<AreaType>()

  useEffect(() => {
    axios.get(`/api/nosotros/${param}`)
      .then(res => setInfo(res.data)).catch(error => error)
  }, [param])



  return (
    <section>
      <div className="min-h-[95vh] p-6 ">
        <h2 className="text-2xl text-primary text-center pt-28 pb-10 sm:pt-32">{info?.title ? info.title : 'titulo'}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 mx-auto items-center max-w-[800px] gap-8">
          <Image src={info?.img ? info.img : '/logoJovenes.jpeg'} width={500} height={500} className="max-w-[400px] max-h-[400px] w-full h-full" alt={info?.title ? info?.title : 'Logo'} suppressHydrationWarning />
          <p>{info?.description ? info.description : 'description'}</p>
        </div>
      </div>
    </section>
  )
}

export default AreaPage