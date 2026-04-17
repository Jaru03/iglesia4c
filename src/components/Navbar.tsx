"use client";

import { Menu, X } from "lucide-react";
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
    { name: "Iniciar Sesión", value: "/login", target: "_self" },
  ];
  const [buttonOpen, setButtonOpen] = useState(false);

  const handleOpen = () => {
    setButtonOpen(true);
  };
  const handleClose = () => {
    setButtonOpen(false);
  };

  const currentRoute = usePathname();

  if (currentRoute === "/registro") {
    return null;
  }

  const isActive = (value: string, name: string) => {
    if (value.startsWith("http")) return false;
    const normalizedValue = value.replace(/\/$/, "");
    const normalizedRoute = currentRoute.replace(/\/$/, "");
    if (name === "Inicio")
      return normalizedRoute === "/" || normalizedRoute === "";
    return normalizedRoute === normalizedValue;
  };

  useEffect(() => {
    handleClose();
  }, [currentRoute]);

  return (
    <header>
      <div>
        <nav className="z-5000 absolute w-full transition-all lg:h-24 lg:flex lg:justify-center mt-4">
          <div className="hidden w-full lg:absolute lg:flex items-center top-0 h-24 max-w-7xl px-4">
            <Link
              className={`filter invert brightness-0 hidden lg:block hover:scale-105 transition-all duration-300 ease-in-out`}
              href={"/"}
              aria-label="Ir al inicio"
            >
              <Image
                src={"/logoCCCD.jpg"}
                alt="Logo 4C"
                className="w-30 h-21.25"
                width={100}
                height={100}
              />
            </Link>
            <ul
              className="hidden xs:grid xs:grid-cols-2 xs:gap-2 lg:grid lg:grid-cols-8 justify-center justify-items-center w-full"
              role="navigation"
              aria-label="Navegación principal"
            >
              {navbar.map((item) => {
                const isSpecial = item.name === "Iniciar Sesión";
                const active = isActive(item.value, item.name);

                return (
                  <li
                    key={item.name}
                    className="text-xs xs:text-sm lg:text-sm flex items-center justify-center"
                  >
                    <Link
                      href={item.value}
                      target={item.target}
                      aria-label={
                        item.target === "_blank"
                          ? `${item.name} (se abre en nueva pestaña)`
                          : `Ir a ${item.name}`
                      }
                      className={`transition-all duration-200 ease-in-out flex items-center justify-center
                          ${
                            isSpecial
                              ? /* ESTILO VIP para Iniciar Sesión*/
                                "bg-white text-[#060735] font-bold px-2.5 py-1.5 text-sm text-center rounded-full shadow-md hover:scale-105"
                              : /* ESTILO NORMAL mejorado*/
                                `text-white px-3 py-1.5 rounded-full hover:bg-white/10 hover:scale-105 ${active ? "font-bold bg-white/20" : ""}`
                          }
                        `}
                      suppressHydrationWarning
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            {/* <div className="flex items-center gap-2">
              <ThemeToggle />
            </div> */}
          </div>

          <div className="relative lg:hidden">
            <Image
              alt=""
              src={"/logoCCCD.jpg"}
              width={90}
              height={70}
              className={`${currentRoute === "/" ? "hidden" : ""} pt-2 mx-auto w-30 h-25 filter invert brightness-0`}
              suppressHydrationWarning
            />

            <div className={`fixed top-7 xs:right-6 right-10 z-50 flex items-center justify-center w-10 h-10 bg-secondary rounded-lg ${buttonOpen ? "hidden" : "block"}`}>
              <Menu
                onClick={handleOpen}
                size={28}
                className="text-primary"
                aria-label="Abrir menú de navegación"
              />
            </div>
            <ul
              className={`flex flex-col items-center justify-center shadow-form fixed pt-1 pb-10 w-full gap-8 right-0 top-0 bg-primary rounded-b-xl duration-300 ease-out z-50 
                            ${
                              !buttonOpen
                                ? "transform -translate-y-full opacity-0"
                                : "transform translate-y-0 opacity-100"
                            }`}
              role="navigation"
              aria-label="Menú de navegación móvil"
            >
              <Image
                alt=""
                src={"/logoCCCD-white.jpg"}
                width={90}
                height={70}
                className="pt-2 mt-2 w-30 h-25 filter invert brightness-0"
              />
              <div
                className={`absolute top-7 xs:right-6 right-10 z-50 flex items-center justify-center w-10 h-10 bg-secondary rounded-lg ${buttonOpen ? "block" : "hidden"}`}
              >
                <button
                  onClick={handleClose}
                  className="text-primary"
                  aria-label="Cerrar menú de navegación"
                >
                  <X size={28} />
                </button>
              </div>
              {navbar.map((item) => {
                const isSpecial = item.name === "Iniciar Sesión";
                return (
                  <li className="text-base xs:text-sm" key={item.value}>
                    <Link
                      target={item.target}
                      href={item.value}
                      aria-label={
                        item.target === "_blank"
                          ? `${item.name} (se abre en nueva pestaña)`
                          : `Ir a ${item.name}`
                      }
                      className={`px-4 py-2 rounded-full transition-all duration-200 ease-in-out
                        ${isSpecial
                          ? "bg-white text-primary font-bold shadow-md hover:scale-105"
                          : `text-secondary-4 hover:text-white hover:scale-110 ${isActive(item.value, item.name) ? "text-white font-bold" : ""}`
                        }`}
                      suppressHydrationWarning
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;