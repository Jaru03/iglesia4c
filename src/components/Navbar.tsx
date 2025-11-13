"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

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
        <nav className="z-10 absolute w-full transition-all scroll-bg md:h-24 md:flex md:justify-center">
          <div className="hidden w-full md:absolute md:flex  items-center top-0 h-24 max-w-5xl">
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
            <ul className="grid grid-cols-7 justify-center justify-items-center w-full">
              {navbar.map((item) => (
                <li key={item.name} className="text-base md:text-base-desktop">
                  <Link
                    href={item.value}
                    target={item.target}
                    className={`transition-all duration-200 ease-in-out hover:scale-110
      text-white hover:filter hover:brightness-110
      ${currentRoute ===  item.value ? "font-bold" : ""}
    `}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Menu móvil */}
          <div className="relative overflow-hidden md:hidden">
            {/* Menú hamburguesa */}
            <Image
              alt=""
              src={"/logoCCCD.jpg"}
              width={110}
              height={85}
              className={`${currentRoute === "/" ? "hidden" : ""} pt-2 mx-auto filter invert brightness-110`}
            />
            <Image
              onClick={handleOpen}
              className={`fixed top-7 right-10 z-10
                scroll-menu
               ${buttonOpen ? "hidden" : "block"}`}
              alt=""
              src={"/menu-icon.svg"}
              width={30}
              height={30}
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
                width={110}
                height={85}
                className="pt-2 filter brightness-110"
              />
              <Image
                onClick={handleClose}
                className={`absolute top-7 right-10 ${
                  buttonOpen ? "block" : "hidden"
                }`}
                alt=""
                src={"/close-icon.svg"}
                width={30}
                height={30}
              />
              {navbar.map((item) => (
                <li className="text-base" key={item.value}>
                  <Link
                    target={item.target}
                    href={item.value}
                    className={`text-secundary-4 hover:text-white hover:scale-110 hover:-translate-y-1 transition-all duration-200 ease-in-out 
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
