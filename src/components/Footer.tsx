import Image from 'next/image'
import Link from 'next/link'

interface FooterContact {
    name: string
    url: string
    icon: string
    value: string
}

const Footer = () => {
    const footerRoutes = ['Nosotros', "Visitanos", "Agenda", "Oración", "Donaciones", "En Vivo"]
    const footerContact: FooterContact[] = [
        {
            name: 'email',
            url: '/',
            icon: '/email-icon.png',
            value: '4c@gmail.com',

        },
        {
            name: 'phone',
            url: '/',
            icon: '/phone-icon.png',
            value: '+34 637-650111',

        },
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
        <footer>
            <div className=" bg-primary text-white p-6 text-base md:text-base-desktop">
                <div className="flex flex-col font-semibold gap-4 max-w-[800px] sm:m-auto">
                    <ul className='flex flex-col gap-4 items-center justify-center sm:flex-row sm:justify-between'>
                        <li>
                            <Image alt='' src={'/logo-4c-white.png'} width={100} height={100} />
                        </li>

                        {footerRoutes.map((item) => (
                            <li key={item.toLowerCase().replace('ó', 'o')}>
                                <Link href={item.toLowerCase().replace('ó', 'o')}>
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className='flex flex-col items-center gap-4 justify-center sm:flex-row sm:items-start sm:gap-14 sm:justify-between sm:mx-auto'>

                        <ul className='flex flex-col gap-2 sm:flex-row sm:gap-4'>

                            {footerContact.filter((social) => !(social.value === 'Facebook' || social.value === 'Instagram' || social.value === 'YouTube')).map((item) => (
                                <li key={item.name}>
                                    <Link href={'/'} className={`flex items-center pb-2 gap-2`}>
                                        <Image alt={item.name} src={item.icon} width={20} height={20} />
                                        {item.value}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <ul className='flex justify-center gap-4'>
                            {footerContact.filter((item) => (item.value === 'Facebook' || item.value === 'YouTube' || item.value === 'Instagram')).map((item) => (
                                <li key={item.name}>
                                    <Link href={'/'} className={`flex flex-col items-center filter invert brightness-100 ${item.value === 'Facebook' || item.value === 'Instagram' || item.value === 'YouTube' ? 'inline' : ""}`}>
                                        <Image alt={item.name} src={item.icon} width={25} className='' height={25} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer