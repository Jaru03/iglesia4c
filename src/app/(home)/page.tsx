import Hero from "@/app/(home)/components/Hero";
import LastActivities from "@/app/(home)/components/LastActivities";
import RecentPreach from "@/app/(home)/components/RecentPreach";
import UpcomingActivities from "@/app/(home)/components/UpcomingActivities";

// La página ya no es "async" ni busca nada. Solo muestra lo que hay.
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