import ChurchLocation from "@/pages/Visitanos/ChurchLocation"

const page = () => {

  const churches = [
    {
    index: 1,
    title: "4C Plaza de Castilla",
    description: "lorem",
    place: "Calle Vinca 12-Madrid L1, 9 Y 10 "
  },
    {
    index: 2,
    title: "4C Plaza de Castilla",
    description: "lorem",
    place: "Calle Vinca 12-Madrid L1, 9 Y 10 "
  },
    {
    index: 3,
    title: "4C Plaza de Castilla",
    description: "lorem",
    place: "Calle Vinca 12-Madrid L1, 9 Y 10 "
  },
    {
    index: 4,
    title: "4C Plaza de Castilla",
    description: "lorem",
    place: "Calle Vinca 12-Madrid L1, 9 Y 10 "
  },
]

  return (
    <section>
        <div className="p-6 pt-24 sm:pt-32">
            <h2 className="text-center text-primary-2 text-2xl pb-6">Visitanos</h2>

            <div className=" gap-y-10 justify-between">
                {
                  churches.map((church) => (
                    <ChurchLocation key={church.index} index={church.index} title={church.title} description={church.description} place={church.place}/>
                  ))
                }
            </div>
        </div>
    </section>
  )
}

export default page