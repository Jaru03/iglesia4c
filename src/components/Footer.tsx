import Image from 'next/image'
import Link from 'next/link'

interface FooterContact {
    name: string
    url: string
    icon: string
    value: string
}

const Footer = () => {
    const footerContact: FooterContact[] = [
        {
            name: 'email',
            url: '/',
            icon: '/email-icon.png',
            value: 'secretaria@centrocristiano4c.es',

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
        <footer className='bg-primary'>
            <div className="p-4 md:p-0 max-w-7xl mx-auto text-white text-base md:text-base-desktop">
                    <ul className='grid gap-8 md:gap-0 md:grid-cols-[repeat(4,_auto)] items-center justify-items-center'>
                        <li>
                            <Image alt='' src={'/logo-4c-white.png'} width={100} height={100} />
                        </li>
                        {footerContact.filter((social) => !(social.value === 'Facebook' || social.value === 'Instagram' || social.value === 'YouTube')).map((item) => (
                            <li className='' key={item.name}>
                                <Link href={'/'} className={`flex items-center gap-2`}>
                                    <Image alt={item.name} src={item.icon} width={20} height={20} />
                                    {item.value}
                                </Link>
                            </li>
                        ))}

                        <li className='flex gap-4'>
                            {footerContact.filter((item) => (item.value === 'Facebook' || item.value === 'YouTube' || item.value === 'Instagram')).map((item) => (
                                <span key={item.name}>
                                    <Link href={'/'} className={` ${item.value === 'Facebook' || item.value === 'Instagram' || item.value === 'YouTube' ? 'inline' : ""}`}>
                                        <Image alt={item.name} src={item.icon} width={25} className='hover:scale-125 transition-all cursor-pointer' height={25} />
                                    </Link>
                                </span>
                            ))}
                        </li>
                    </ul>

                </div>
        </footer>
    )
}

export default Footer