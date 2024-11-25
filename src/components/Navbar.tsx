'use client'
import Link from "next/link"
import { useEffect, useState } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"

const Navbar = () => {
    const navbar = ["Inicio", 'Nosotros', "Visitanos", "En Vivo", "Donaciones", "Actividades"]
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
                <div className={`${currentRoute === '/' ? 'scroll-animation' : ''} fixed left-1/2 transform -translate-x-1/2`}>
                    <Link className="md:hidden" href={'/'}>
                        <Image src={'/logo-4c-png.png'} alt="Logo 4C" className={` w-[85px] h-[85px]`} width={100} height={100} />
                    </Link>
                </div>
                <nav className="fixed w-screen transition-all scroll-bg md:h-24 md:flex md:justify-center">
                    <div className="hidden w-full md:fixed md:flex px-4 justify-between items-center top-0 h-24 max-w-[850px]  ">
                        <Link className={`hidden md:block ${currentRoute === '/' ? 'logo-filter' : 'scroll-logo-desktop'}`} href={'/'}>
                            <Image src={'/logo-4c-png.png'} alt="Logo 4C" className={` w-[85px] h-[85px]`} width={100} height={100} />
                        </Link>
                        <ul className="flex gap-12">
                            {navbar.map((item) => (
                                <li className="text-base md:text-base-desktop" key={item}>
                                    <Link href={`/${item === 'Inicio' ? '' : item.toLocaleLowerCase()}`} className={`${'/' + item.toLowerCase() === currentRoute ? 'scroll-letter font-bold' : 'text-secundary-4'} ${currentRoute === '/' && item === 'Inicio' ? 'scroll-letter font-bold' : 'text-secundary-4'}`}>{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="relative overflow-hidden md:hidden">
                        <Image onClick={handleOpen} className={`text-green-500 fixed top-7 right-10 z-10 ${buttonOpen ? "hidden" : 'block'}`} alt='' src={'/menu-icon.svg'} width={30} height={30} />
                        <ul className={`flex flex-col items-center justify-center shadow-form fixed pt-1 pb-10 w-full gap-10 right-0 top-0 bg-primary rounded-b-xl ${!buttonOpen ? 'right-[1000px]' : 'right-0'}`} >
                            <Image alt='' src={'/logo-4c-white.png'} width={85} height={85} className="" />
                            <Image onClick={handleClose} className={`text-red-500 absolute top-7 right-10 ${buttonOpen ? "block" : 'hidden'}`} alt='' src={'/close-icon.svg'} width={30} height={30} />

                            {navbar.map((item) => (
                                <li className="text-base" key={item}>
                                    <Link href={`/${item === 'Inicio' ? '' : item.toLocaleLowerCase()}`} className={`${'/' + item.toLowerCase() === currentRoute ? 'text-white font-bold' : 'text-secundary-4'} ${currentRoute === '/' && item === 'Inicio' ? 'text-white font-bold' : 'text-secundary-4'}`}>{item}</Link>
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