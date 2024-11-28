'use client'
import Link from "next/link"
import { useEffect, useState } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"

const Navbar = () => {
    const navbar = [
        { name: "Inicio",
            value: '/',
            target: '_self'

         },
        { name: 'Nosotros',
            value: '/nosotros',
            target: '_self'

         },
        { name: "Visitanos" ,
            value: '/visitanos',
            target: '_self'

        },
        { name: "En Vivo",
            value: 'https://www.youtube.com/@CentroCristiano4C/streams',
            target: '_blank'

         }, 
        { name: "Donaciones",
            value: '/donaciones',
            target: '_self'

         }, 
        { name: "Actividades" ,
            value: '/actividades',
            target: '_self'

        }
    ]
    const [buttonOpen, setButtonOpen] = useState(false)

    const handleOpen = () => {
        setButtonOpen(true)
    }
    const handleClose = () => {
        setButtonOpen(false)
    }

    const currentRoute = usePathname()

    useEffect(() => {
        handleClose()
    }, [currentRoute])

    return (
        <header>
            <div>
                <div className={`${currentRoute === '/' ? 'scroll-animation' : ''} fixed z-[9] left-1/2 transform -translate-x-1/2`}>
                    <Link className="md:hidden" href={'/'}>
                        <Image src={'/logo-4c-png.png'} alt="Logo 4C" className="w-[85px] h-[85px]" width={100} height={100} />
                    </Link>
                </div>
                <nav className="z-10 fixed w-screen transition-all scroll-bg md:h-24 md:flex md:justify-center">
                    <div className="hidden w-full md:fixed md:flex px-4 justify-between items-center top-0 h-24 max-w-[850px]">
                        <Link className={`${currentRoute === '/' ? 'logo-filter' : 'scroll-logo-desktop'} hidden md:block hover:scale-105 transition-all duration-300 ease-in-out`} href={'/'}>
                            <Image src={'/logo-4c-png.png'} alt="Logo 4C" className="w-[85px] h-[85px]" width={100} height={100} />
                        </Link>
                        <ul className="flex gap-12">
                            {navbar.map((item) => (
                                <li className="text-base md:text-base-desktop" key={item.name}>
                                    <Link
                                        target={item.target}
                                        /* Redirección condicional */
                                        href={item.value}
                                        /* Aplicamos el fontbold condicional con respecto a la ruta en la que estemos */
                                        /* Si no estamos en la ruta '/' el hover será blanco, si no, será del color primario  */
                                        className={`${'/' + item.name.toLowerCase() === currentRoute ? 'scroll-letter-bold font-bold scale-50' : 'text-gray-500 '} 
                                            
                                        ${currentRoute === '/' && item.name === 'Inicio' ? 'scroll-letter-bold font-bold ' : 'text-gray-500 scale-50 scale'} 
                                             hover:scale-110 hover:-translate-y-1 transition-all duration-200 ease-in-out hover:text-secundary-4 `}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Menu móvil */}
                    <div className="relative overflow-hidden md:hidden">
                        <Image onClick={handleOpen} className={`text-green-500 fixed top-7 right-10 z-10 ${buttonOpen ? "hidden" : 'block'}`} alt='' src={'/menu-icon.svg'} width={30} height={30} />
                        <ul className={`flex flex-col items-center justify-center shadow-form fixed pt-1 pb-10 w-full gap-10 right-0 top-0 bg-primary rounded-b-xl transition-transform duration-300 ease-out 
                            ${!buttonOpen ? 'transform -translate-y-full opacity-0' : 'transform translate-y-0 opacity-100'}`}>
                            <Image alt='' src={'/logo-4c-white.png'} width={85} height={85} className="" />
                            <Image onClick={handleClose} className={`text-red-500 absolute top-7 right-10 ${buttonOpen ? "block" : 'hidden'}`} alt='' src={'/close-icon.svg'} width={30} height={30} />
                            {navbar.map((item) => (
                                <li className="text-base" key={item.value}>
                                    <Link
                                        target={item.target}
                                        href={item.value}
                                        className={`text-secundary-4 hover:text-white hover:scale-110 hover:-translate-y-1 transition-all duration-200 ease-in-out 
                                            ${'/' + item.name.toLowerCase() === currentRoute ? 'text-white font-bold' : ''}`}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Navbar
