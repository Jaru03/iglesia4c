import Hero from "./(home)/components/Hero"
import LastActivities from "./(home)/components/LastActivities"
import NeedPray from "./(home)/components/NeedPray"
import RecentPreach from "./(home)/components/RecentPreach"
import UpcomingActivities from "./(home)/components/UpcomingActivities"


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