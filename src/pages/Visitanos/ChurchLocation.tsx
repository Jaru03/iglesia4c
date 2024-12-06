'use client'

import { InfoChurch } from "@/types/InfoChurch"
import Image from "next/image"
import Link from "next/link"
import { Map, Marker } from "pigeon-maps"

interface Props {
    info: InfoChurch
}

const ChurchLocation = ({ info }: Props) => {
    return (
        <article className={`pb-10 grid grid-cols-1 md:grid-cols-2 max-w-[800px] mx-auto`}>
            <div className={`w-full h-full flex justify-center items-center max-w-[280px] max-h-[280px] pb-8 m-auto sm:p-0 ${info?.index % 2 === 0 ? 'md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2' : ''} `}>

                <Map width={280} height={280} defaultCenter={info?.coords} twoFingerDrag={true} defaultZoom={15} maxZoom={19} minZoom={13} metaWheelZoom={true} metaWheelZoomWarning="Use META+wheel to zoom!" >
                    <Marker color="#060735" anchor={info?.coords} width={40} />
                </Map>
            </div>

            <div className="flex flex-col justify-center w-full items-center sm:justify-between max-w-[500px] mx-auto sm:min-h-[370px] sm:p-4">
                <h3 className="text-primary-3 text-xl md:text-xl-desktop text-center">{info?.title}</h3>
                <p className="py-4 text-base md:text-base-desktop">{info?.description}</p>
                <ul className="text-base md:text-base-desktop flex flex-col gap-2">
                    <li className="font-medium"><span className="text-primary-4 font-bold pr-4">Lugar:</span> {info?.place}</li>
                    <li className="flex gap-4 max-w-[100%]">
                        <span className="text-primary-4 font-bold">Horarios:</span>
                        <div className="flex flex-wrap w-full gap-6">
                            {
                                info?.horario.map((dia) => (
                                    <div className="flex flex-col gap-2 items-center w-auto max-w-full" key={dia.dia}>
                                        <span className="font-semibold">{dia.dia}</span>
                                        {Array.isArray(dia.horario) ? 
                                            dia.horario.map((horario) => <span key={horario}>{horario}</span>) :
                                            <span>{dia.horario}</span>
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </li>
                    <li className="flex items-center gap-3">
                        <span className="text-primary-4 font-bold">Responsables:</span>
                        <div className="flex gap-2">
                            {info?.pastors.map((pastor) => (
                                pastor.img === '' ? '' : (
                                    <div className="flex flex-col items-center group relative py-5" key={pastor.nombre}>
                                        <Image
                                            alt={pastor.nombre}
                                            width={100}
                                            height={100}
                                            src={pastor.img}
                                            className="max-w-[60px] max-h-[60px] rounded-full shadow-lg transition-all transform hover:scale-110"
                                        />
                                        <span className="absolute w-96 text-center top-20 text-base font-semibold opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-300">
                                            {pastor.nombre}
                                        </span>
                                    </div>
                                )
                            ))}
                        </div>
                    </li>
                    <li className="flex gap-2"><span className="text-primary-4 font-bold">Redes Sociales:</span>
                        <div className="flex gap-2">
                            {info?.socialLinks.filter((item) => (item.value === 'Facebook' || item.value === 'YouTube' || item.value === 'Instagram')).map((item) => (
                                <Link key={item.name} href={'/'} className={`flex transition-all hover:scale-110 flex-col items-center ${item.value === 'Facebook' || item.value === 'Instagram' || item.value === 'YouTube' ? 'inline' : ""}`}>
                                    <Image alt={item.name} src={item.icon} className="" width={25} height={25} />
                                </Link>
                            ))}
                        </div>
                    </li>
                </ul>
            </div>
        </article>
    )
}

export default ChurchLocation
