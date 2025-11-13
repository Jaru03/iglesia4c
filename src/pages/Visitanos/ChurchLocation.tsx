"use client";

import { InfoChurch } from "@/types/InfoChurch";
import Image from "next/image";
import Link from "next/link";
import { Map, Marker } from "pigeon-maps";
import { motion } from "motion/react";

interface Props {
  info: InfoChurch;
}

import { useEffect, useState } from "react";

const ChurchLocation = ({ info }: Props) => {
  const [mapSize, setMapSize] = useState(280); // valor por defecto (mobile)

  useEffect(() => {
    const calcSize = () => {
      const width = window.innerWidth; // 👈 en lugar de screen
      if (width >= 640 && width < 768) {
        return 400;
      } else if (width >= 768 && width < 1024) {
        return 450;
      } else if (width >= 1024) {
        return 500;
      } else {
        return 280;
      }
    };

    setMapSize(calcSize());

    // actualizar tamaño si cambia el viewport
    const handleResize = () => setMapSize(calcSize());
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <article
      className={`pb-10 grid grid-cols-1 gap-8 md:grid-cols-2 max-w-7xl mx-auto p-4 sm:p-6 md:p-8`}
    >
      <div
        className={`w-full h-full flex justify-center items-center pb-8 m-auto sm:p-0 ${
          info?.index % 2 === 0
            ? "md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2"
            : ""
        } `}
      >
        <Map
          width={mapSize}
          height={mapSize}
          defaultCenter={info?.coords}
          twoFingerDrag={true}
          defaultZoom={15}
          maxZoom={19}
          minZoom={13}
          metaWheelZoom={true}
          metaWheelZoomWarning="Use META+wheel to zoom!"
        >
          <Marker color="#060735" anchor={info?.coords} width={40} />
        </Map>
      </div>

      <motion.div
        initial={{
          opacity: 0,
          x: -50,
          scale: 0.8,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          scale: 1,
        }}
        transition={{
          duration: 1.5,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        viewport={{ once: true }}
        className="flex flex-col justify-center w-full  sm:justify-between mx-auto"
      >
        <h3 className="text-primary-3 text-xl md:text-xl-desktop text-center">
          {info?.title}
        </h3>
        <p className="py-4 text-base md:text-base-desktop">
          {info?.description}
        </p>
        <ul className="text-base md:text-base-desktop flex flex-col gap-2">
          <li className="font-medium">
            <span className="text-primary-4 font-bold pr-4">Lugar:</span>{" "}
            {info?.place}
          </li>
          <li className="flex gap-4 max-w-full">
            <span className="text-primary-4 font-bold">Horarios:</span>
            <div className="flex gap-4 flex-wrap">
              {info?.horario.map((dia) => (
                <div
                  className="flex flex-col gap-2 items-center w-auto max-w-full"
                  key={dia.dia}
                >
                  <span className="font-semibold">{dia.dia}</span>
                  {Array.isArray(dia.horario) ? (
                    dia.horario.map((horario) => (
                      <span key={horario}>{horario}</span>
                    ))
                  ) : (
                    <span>{dia.horario}</span>
                  )}
                </div>
              ))}
            </div>
          </li>
          <li className="flex items-center gap-3">
            <span className="text-primary-4 font-bold">Responsables:</span>
            <div className="flex gap-2">
              {info?.pastors.map((pastor) =>
                pastor.img === "" ? (
                  ""
                ) : (
                  <div
                    className="flex flex-col items-center group relative py-5"
                    key={pastor.nombre}
                  >
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
              )}
            </div>
          </li>
          <li className="flex gap-2">
            <span className="text-primary-4 font-bold">Redes Sociales:</span>
            <div className="flex gap-2">
              {info?.socialLinks
                .filter(
                  (item) =>
                    item.value === "Facebook" ||
                    item.value === "YouTube" ||
                    item.value === "Instagram" ||
                    item.name === "Email" ||
                    item.name === "Teléfono" ||
                    item.name === "TikTok"
                )
                .map((item) => (
                  <Link
                    key={item.name}
                    href={item.url}
                    className={`flex transition-all hover:scale-110 flex-col items-center ${
                      item.value === "Facebook" ||
                      item.value === "Instagram" ||
                      item.name === "Email" ||
                      item.name === "Teléfono" ||
                      item.name === "TikTok" ||
                      item.value === "YouTube"
                        ? "inline"
                        : ""
                    }`}
                  >
                    <Image
                      alt={item.name}
                      src={item.icon}
                      className=""
                      width={25}
                      height={25}
                    />
                  </Link>
                ))}
            </div>
          </li>
        </ul>
      </motion.div>
    </article>
  );
};

export default ChurchLocation;
