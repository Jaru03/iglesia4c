import Hero from "@/app/(home)/components/Hero"
import LastActivities from "@/app/(home)/components/LastActivities"
import NeedPray from "@/app/(home)/components/NeedPray"
import RecentPreach from "@/app/(home)/components/RecentPreach"
import UpcomingActivities from "@/app/(home)/components/UpcomingActivities"

const page = () => {
  return (
    <>
      <Hero/>
      <RecentPreach/>
      <UpcomingActivities/>
      <LastActivities/>
      <NeedPray/>
    </>
  )
}

export default page