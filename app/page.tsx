import AnnouncementBar from "@/components/Reusable/AnnouncementBar"
import { FashionShowcase } from "@/components/Screens/Home/FashionShowcase"
import { Hero } from "@/components/Screens/Home/Hero"
import { NewSeason } from "@/components/Screens/Home/NewSeason"
import { PremiumSection } from "@/components/Screens/Home/PremiumSection"
import { Trending } from "@/components/Screens/Home/Trending"

export default function Home() {
  return (
    <main>
      <AnnouncementBar/>
      <Hero />
      <FashionShowcase/>
      <NewSeason/>
      <Trending/>
      <PremiumSection/>
    </main>
  )

}