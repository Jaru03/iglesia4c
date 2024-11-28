import Image from "next/image"
import Link from "next/link"

interface Props {
    title: string,
    description: string,
    place: string,
    index: number,
}

interface SocialLinks {
    name: string,
    url: string,
    icon: string,
    value: string,
}

const ChurchLocation = ({ title, description, place, index }: Props) => {

    const horarios = [
        { dia: 'Domingo', horario: ['10:00', '12:00'] },
        { dia: 'Miercoles', horario: '20:00' },
        { dia: 'Viernes', horario: '20:00' },
    ]

    const socialLinks: SocialLinks[] = [
        {
            name: 'facebook',
            url: 'https://www.facebook.com/people/Centro-Cristiano-4C/61551474157006/',
            icon: '/facebook-icon.svg',
            value: 'Facebook',

        },
        {
            name: 'Instagram',
            url: 'https://www.instagram.com/centro4c/',
            icon: '/instagram-icon.svg',
            value: 'Instagram',

        },
        {
            name: 'YouTube',
            url: 'https://www.youtube.com/@CentroCristiano4C',
            icon: '/youtube-icon.svg',
            value: 'YouTube',

        }]

    return (
        <article className={`sm:flex sm:flex-row max-w-[800px] sm:mx-auto sm:pb-10 ${index % 2 === 1 ? 'sm:flex-row-reverse' : ''}`}>
            <Image src="/cultomujeres.png" width={1000} height={1000} alt="Ubicación" className='w-full h-full max-w-[370px] max-h-[370px] pb-8 mx-auto sm:p-0' />
            <div className="flex flex-col justify-center items-center sm:justify-between sm:min-h-[370px] sm:p-4">
                <h3 className="text-primary-3 text-xl md:text-xl-desktop text-center">{title}</h3>
                <p className="py-4 text-base md:text-base-desktop">{description}</p>
                <ul className="text-base md:text-base-desktop flex flex-col gap-2">
                    <li className="font-medium"><span className="text-primary-4 font-bold pr-4">Lugar:</span> {place}</li>
                    <li className="flex gap-4 max-w-[100%]">
                        <span className="text-primary-4 font-bold">Horarios:</span>
                        <div className="flex flex-wrap w-full gap-6">
                            {
                                horarios.map((dia) => (
                                    <div className="flex flex-col gap-2 items-center w-auto max-w-full" key={dia.dia}>
                                        <span className="font-semibold">{dia.dia}</span>
                                        {Array.isArray(dia.horario) ?
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
                    <li className="flex gap-2"><span className="text-primary-4 font-bold">Redes Sociales:</span>
                        <div className="flex gap-2">
                            {socialLinks.filter((item) => (item.value === 'Facebook' || item.value === 'YouTube' || item.value === 'Instagram')).map((item) => (
                                <Link key={item.name} href={'/'} className={`flex flex-col items-center ${item.value === 'Facebook' || item.value === 'Instagram' || item.value === 'YouTube' ? 'inline' : ""}`}>
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