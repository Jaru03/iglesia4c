import Image from "next/image";

interface Props {
  info: {
    id: number;
    value: string;
    title: string;
    description: string | null;
    img: string | null;
    rol: string;
  } | null
}


const AreaPage = ({ info }: Props) => {

  return (
    <section>
      <div className="min-h-[95vh] p-6 ">
        <h2 className="text-2xl text-primary text-center pt-28 pb-10 sm:pt-32">{info?.title ? info.title : 'titulo'}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 mx-auto items-center max-w-[800px] gap-8">
          <Image src={info?.img ? info.img : '/logoJovenes.jpeg'} width={500} height={500} className="max-w-[400px] max-h-[400px] w-full h-full" alt={info?.title ? info?.title : 'Logo'} />
          <p>{info?.description ? info.description : 'description'}</p>
        </div>
      </div>
    </section>
  )
}

export default AreaPage