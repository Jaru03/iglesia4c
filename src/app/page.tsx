import Hero from "@/pages/Home/Hero"
import LastActivities from "@/pages/Home/LastActivities"
import NeedPray from "@/pages/Home/NeedPray"
import RecentPreach from "@/pages/Home/RecentPreach"
import UpcomingActivities from "@/pages/Home/UpcomingActivities"

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