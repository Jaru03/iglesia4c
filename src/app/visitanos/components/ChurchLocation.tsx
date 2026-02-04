"use client";

import { InfoChurch } from "@/types/InfoChurch";
import Image from "next/image";
import Link from "next/link";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { motion } from "motion/react";
import { useEffect } from "react";
import { MapPin, Clock, Users, Share2 } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  info: InfoChurch;
}

const ChurchLocation = ({ info }: Props) => {
  useEffect(() => {
    const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png";
    const iconUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png";
    const shadowUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png";

    const icon = L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    L.Marker.prototype.options.icon = icon;
  }, []);

  const position: [number, number] = [info.coords[0], info.coords[1]];

  const filteredSocialLinks = info.socialLinks.filter(
    (item) =>
      item.value === "Facebook" ||
      item.value === "YouTube" ||
      item.value === "Instagram" ||
      item.name === "Email" ||
      item.name === "Teléfono" ||
      item.name === "TikTok"
  );

  return (
    <article
      className={`
        grid grid-cols-1 gap-8 md:grid-cols-2
        max-w-7xl mx-auto p-4 md:p-8
        ${info?.index % 2 === 0 ? "md:grid-flow-col" : ""}
      `}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className={`
          w-full h-full flex justify-center items-center
          ${info?.index % 2 === 0 ? "md:order-2" : ""}
        `}
      >
        <div className="w-full h-[350px] md:h-[450px] rounded-xl overflow-hidden shadow-lg">
          <MapContainer
            center={position}
            zoom={15}
            dragging={false}
            doubleClickZoom={true}
            touchZoom={true}
            tapHold={true}
            scrollWheelZoom={false}
            style={{ width: "100%", height: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                <div className="p-2 text-center">
                  <strong className="text-primary-3 text-base">{info.title}</strong>
                  <p className="text-sm text-gray-600 mt-1">{info.place}</p>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className={`
          flex flex-col justify-center w-full
          ${info?.index % 2 === 0 ? "md:order-1" : ""}
        `}
      >
        <h3 className="text-2xl font-bold text-primary-3 mb-3">
          {info?.title}
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {info?.description}
        </p>

        <div className="space-y-4 text-gray-700">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-primary-3 shrink-0 mt-1" />
            <div>
              <span className="font-semibold text-primary-3">Lugar:</span>
              <p className="text-gray-600">{info?.place}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-primary-3 shrink-0 mt-1" />
            <div>
              <span className="font-semibold text-primary-3">Horarios:</span>
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-1">
                {info?.horario.map((dia) => (
                  <div key={dia.dia} className="text-sm">
                    <span className="font-medium">{dia.dia}:</span>{" "}
                    {Array.isArray(dia.horario)
                      ? dia.horario.join(", ")
                      : dia.horario}
                  </div>
                ))}
              </div>
            </div>
          </div>

            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-primary-3 shrink-0 mt-1" />
              <div className="flex-1">
                <span className="font-semibold text-primary-3">Responsables:</span>
                <div className="flex gap-3 mt-2">
                  {info?.pastors.map((pastor) =>
                    pastor.img !== "" ? (
                      <Tooltip key={pastor.nombre}>
                        <TooltipTrigger asChild>
                          <Avatar className="w-14 h-14 cursor-pointer ring-2 ring-primary-3/20 hover:ring-primary-3 transition-all">
                            <AvatarImage
                              src={pastor.img}
                              alt={pastor.nombre}
                              className="object-cover"
                            />
                            <AvatarFallback>
                              {pastor.nombre
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        </TooltipTrigger>
                        <TooltipContent side="top" sideOffset={4}>
                          <p className="text-sm font-medium">{pastor.nombre}</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : null
                  )}
                </div>
              </div>
            </div>

          <div className="flex items-start gap-3">
            <Share2 className="w-5 h-5 text-primary-3 shrink-0 mt-1" />
            <div className="flex gap-3 flex-wrap">
              {filteredSocialLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="transition-transform hover:scale-110"
                >
                  <Image
                    alt={item.name}
                    src={item.icon}
                    width={24}
                    height={24}
                    suppressHydrationWarning
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </article>
  );
};

export default ChurchLocation;
