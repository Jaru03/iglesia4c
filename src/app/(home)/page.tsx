import type { Metadata } from "next";
import Hero from "@/app/(home)/components/Hero";
import LastActivities from "@/app/(home)/components/LastActivities";
import RecentPreach from "@/app/(home)/components/RecentPreach";
import UpcomingActivities from "@/app/(home)/components/UpcomingActivities";

export const metadata: Metadata = {
  title: "Casa de Dios Madrid | Iglesia Cristiana Evangélica en Madrid",
  description:
    "Comunidad Cristiana Casa de Dios: iglesia cristiana evangélica en Madrid con sedes en Plaza de Castilla, Estrecho, Lucero, Getafe, Pinto, Parla y Tarancón. Cultos, oración y una familia de fe que te espera.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Casa de Dios Madrid | Iglesia Cristiana Evangélica en Madrid",
    description:
      "Iglesia cristiana en Madrid. Únete a nuestros cultos y a una familia de fe.",
    url: "/",
    type: "website",
    images: ["/cdd-banner.jpg"],
  },
};

export default function HomePage() {
  return (
    <main>
      <Hero />

      <RecentPreach />

      <UpcomingActivities />

      <LastActivities />
    </main>
  );
}