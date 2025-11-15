import ConsejoItem from "./ConsejoItem"

const Consejo = () => {
    const consejo = [
    {
      src:"/presidenteItem-1.png",
      title: "Presidente",
      name: "Roberto Ricardo López Esquivel"
    },
    {
      src:"/secretariaLili.png",
      title: "Secretaria",
      name: "Liliana Beatríz Bogado Acosta"
    },
    {
      src:"/tesoreroWilson-2.png",
      title: "Tesorero",
      name: "Wilson Perdomo González "
    },
    {
      src:"/vocalAlberto-2.png",
      title: "Vocal",
      name: "Alberto Reyen Larramendia"
    },
    {
      src:"/vocalIvan-3.png",
      title: "Vocal",
      name: "Iván Gerardo Ibarrola"
    },
  ]
  return (
    <section className=" bg-secondary">
        <div className="grid gap-y-8 md:gap-0 md:grid-cols-5 justify-center place-content-center items-end max-w-7xl mx-auto py-6 overflow-hidden">

        <h2 className="text-primary-2 text-xl md:text-xl-desktop text-center col-span-full object-cover">
            Consejo Ejecutivo
          </h2>
          {
              consejo.map((item, key) => (
                  
                  <ConsejoItem item={item} key={key}/>
                ))
            }
            </div>
    </section>
  )
}

export default Consejo