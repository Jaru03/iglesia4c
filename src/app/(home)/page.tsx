import Hero from "@/app/(home)/components/Hero"
import LastActivities from "@/app/(home)/components/LastActivities"
import RecentPreach from "@/app/(home)/components/RecentPreach"
import UpcomingActivities from "@/app/(home)/components/UpcomingActivities"
import { CallToAction } from "@/components/CallToAction"

const page = () => {
  return (
    <>
    
      <Hero/>
      <RecentPreach/>
      <UpcomingActivities/>
      <LastActivities/>
      
    </>
  )
}

export default page