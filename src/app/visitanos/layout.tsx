import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visítanos | Iglesia Casa de Dios en Madrid - Horarios y Sedes",
  description:
    "Encuentra la sede más cercana de la iglesia Casa de Dios en Madrid: Plaza de Castilla, Estrecho, Lucero, Getafe, Pinto, Parla y Tarancón. Horarios de cultos y mapas de ubicación.",
  keywords: [
    "iglesia en Madrid",
    "iglesias en Madrid",
    "iglesia Plaza de Castilla",
    "iglesia Tetuán",
    "iglesia Estrecho",
    "iglesia Lucero",
    "iglesia Getafe",
    "iglesia Pinto",
    "iglesia Parla",
    "iglesia Tarancón",
    "iglesia cerca de mí",
    "horarios cultos Madrid",
    "Casa de Dios sedes",
  ],
  alternates: { canonical: "/visitanos" },
  openGraph: {
    title: "Visítanos | Casa de Dios Madrid",
    description:
      "Sedes de Casa de Dios en Madrid y alrededores. Encuentra la más cercana y únete a nuestros cultos.",
    url: "/visitanos",
    type: "website",
    images: ["/visitanos-banner.jpg"],
  },
};

export default function VisitanosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
