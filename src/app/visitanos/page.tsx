'use client'
import { churches } from '../../mocks/churchues'
import { InfoChurch } from "@/types/InfoChurch"
import dynamic from "next/dynamic"

// Importa ChurchLocation deshabilitando SSR
const ChurchLocation = dynamic(() => import("@/pages/Visitanos/ChurchLocation"), {
  ssr: false,
})

const page = () => {
  return (
    <section>
      <div className="p-6 pt-24 sm:pt-32 overflow-hidden">
        <h2 className="text-center text-primary-2 text-2xl md:text-2xl-desktop pb-10 sm:pb-6">Visitanos</h2>

        <div className="flex flex-col gap-y-10">
          {
            churches?.map((church) => (
              <ChurchLocation info={church as InfoChurch} key={church.index} />
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default page
