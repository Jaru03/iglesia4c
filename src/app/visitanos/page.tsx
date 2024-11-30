import ChurchLocation from "@/pages/Visitanos/ChurchLocation"
import { churches } from '../../mocks/churchues'
import { InfoChurch } from "@/types/InfoChurch"

const page = () => {
  return (
    <section>
      <div className="p-6 pt-24 sm:pt-32">
        <h2 className="text-center text-primary-2 text-2xl md:text-2xl-desktop pb-10 sm:pb-6">Visitanos</h2>

        <div className="gap-y-10 justify-between">
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
