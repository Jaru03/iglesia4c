import Image from "next/image"

interface Props{
    title: string,
    description: string,
    place: string,
    index: number,
}

const ChurchLocation = ({title, description, place, index}:Props) => {

    const horarios = [
        {dia: 'Domingo', horario: ['10:00', '12:00'] },    
        {dia: 'Miercoles', horario: '20:00' },    
        {dia: 'Viernes', horario: '20:00' },    
        {dia: 'Sabado', horario: '20:00' },
    ]

    return (
        <article className={`sm:flex sm:flex-row max-w-[800px] sm:mx-auto sm:pb-10 ${index % 2 === 1 ? 'sm:flex-row-reverse' : ''}`}>
            <Image src="/cultomujeres.png" width={1000} height={1000} alt="Ubicación" className='w-full h-full max-w-[370px] max-h-[370px] pb-8 mx-auto sm:p-0' />
            <div className="flex flex-col justify-center items-center sm:justify-between sm:min-h-[370px] sm:p-4">
                <h3 className="text-primary-3 text-xl text-center">{title}</h3>
                <p className="py-4">{description}</p>
                <ul className="text-base flex flex-col gap-2">
                    <li className="font-medium"><span className="text-primary-4 font-bold pr-4">Lugar:</span> {place}</li>
                    <li className="flex gap-4 max-w-[100%]">
                        <span className="text-primary-4 font-bold">Horarios:</span>
                        <div className="flex flex-wrap w-full gap-6">
                            {
                                horarios.map((dia) => (
                                    <div className="flex flex-col gap-2 items-center w-auto max-w-full" key={dia.dia}>
                                        <span className="font-semibold">{dia.dia}</span>
                                        {Array.isArray(dia.horario)? 
                                            dia.horario.map((horario) => <span key={horario}>{horario}</span>) 
                                        : 
                                            <span>{dia.horario}</span>
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </li>
                    <li><span className="text-primary-4 font-bold">Pastores:</span></li>
                    <li><span className="text-primary-4 font-bold">Redes Sociales:</span></li>
                </ul>
            </div>
        </article>
    )
}

export default ChurchLocation