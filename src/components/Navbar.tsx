"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

const Navbar = () => {
  const navbar = [
    { name: "Inicio", value: "/", target: "_self" },
    { name: "Nosotros", value: "/nosotros", target: "_self" },
    { name: "Visitanos", value: "/visitanos", target: "_self" },
    {
      name: "Directo",
      value: "https://www.youtube.com/@casasdediosmadrid/streams",
      target: "_blank",
    },
    { name: "Oración", value: "/oracion", target: "_self" },
    { name: "Donaciones", value: "/donaciones", target: "_self" },
    { name: "Actividades", value: "/actividades", target: "_self" },
  ];
  const [buttonOpen, setButtonOpen] = useState(false);

  const handleOpen = () => {
    setButtonOpen(true);
  };
  const handleClose = () => {
    setButtonOpen(false);
  };

  const currentRoute = usePathname();

  useEffect(() => {
    handleClose();
  }, [currentRoute]);

  console.log(currentRoute)

  return (
    <header>
      <div>
        <nav className="z-10 absolute w-full transition-all scroll-bg md:h-24 md:flex md:justify-center mt-4">
          <div className="hidden w-full md:absolute md:flex items-center top-0 h-24 max-w-5xl">
            <Link
              className={`filter invert brightness-0 hidden md:block hover:scale-105 transition-all duration-300 ease-in-out`}
              href={"/"}
            >
              <Image
                src={"/logoCCCD.jpg"}
                alt="Logo 4C"
                className="w-[120px] h-[85px]"
                width={100}
                height={100}
              />
            </Link>
            <ul className="hidden xs:grid xs:grid-cols-2 xs:gap-2 md:grid md:grid-cols-7 justify-center justify-items-center w-full">
              {navbar.map((item) => {
                
                const isDonation = item.name === "Donaciones";
                
                return (
                    <li key={item.name} className="text-xs xs:text-sm md:text-lg flex items-center justify-center">
                    <Link
                        href={item.value}
                        target={item.target}
                        className={`transition-all duration-200 ease-in-out flex items-center justify-center
                            ${isDonation 
                                /* ESTILO VIP para Donaciones*/
                                ? "bg-white text-[#060735] font-bold px-3 py-1.5 rounded-full shadow-md hover:scale-105"
                                /* ESTILO NORMAL mejorado*/
                                : `text-white px-3 py-1.5 rounded-full hover:bg-white/10 hover:scale-105 ${currentRoute ===  item.value ? "font-bold bg-white/20" : ""}`
                            }
                        `}
                    >
                        {item.name}
                    </Link>
                    </li>
                );
              })}
            </ul>
            <div className="flex items-center gap-2">
              <ThemeToggle />
            </div>
          </div>

         
          <div className="relative overflow-hidden md:hidden">
            <Image
              alt=""
              src={"/logoCCCD.jpg"}
              width={90}
              height={70}
              className={`${currentRoute === "/" ? "hidden" : ""} pt-2 mx-auto filter invert brightness-110 w-[70px] xs:w-[90px] h-[55px] xs:h-[70px]`}
            />
            <Image
              onClick={handleOpen}
              className={`fixed top-7 xs:right-6 right-10 z-10
                scroll-menu
               ${buttonOpen ? "hidden" : "block"}`}
              alt=""
              src={"/menu-icon.svg"}
              width={25}
              height={25}
            />
            <ul
              className={`flex flex-col items-center justify-center shadow-form fixed pt-1 pb-10 w-full gap-8 right-0 top-0 bg-primary rounded-b-xl transition-transform duration-300 ease-out 
                            ${
                              !buttonOpen
                                ? "transform -translate-y-full opacity-0"
                                : "transform translate-y-0 opacity-100"
                            }`}
            >
              <Image
                alt=""
                src={"/logoCCCD-white.jpg"}
                width={90}
                height={70}
                className="pt-2 filter brightness-110 w-[70px] xs:w-[90px] h-[55px] xs:h-[70px]"
              />
              <Image
                onClick={handleClose}
                className={`absolute top-7 xs:right-6 right-10 ${
                  buttonOpen ? "block" : "hidden"
                }`}
                alt=""
                src={"/close-icon.svg"}
                width={25}
                height={25}
              />
              {navbar.map((item) => (
                <li className="text-base xs:text-sm" key={item.value}>
                  <Link
                    target={item.target}
                    href={item.value}
                    className={`text-secondary-4 hover:text-white hover:scale-110 hover:-translate-y-1 transition-all duration-200 ease-in-out 
                                            ${
                                              "/" + item.name.toLowerCase() ===
                                                currentRoute ||
                                              "/" +
                                                item.name.toLocaleLowerCase() ===
                                                "Inicio"
                                                ? "text-white font-bold"
                                                : ""
                                            }`}
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
  );
};

export default Navbar;