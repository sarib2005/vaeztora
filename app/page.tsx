import AnnouncementBar from "@/components/Reusable/AnnouncementBar"
import { FashionShowcase } from "@/components/Screens/Home/FashionShowcase"
import { Hero } from "@/components/Screens/Home/Hero"
import { NewSeason } from "@/components/Screens/Home/NewSeason"

export default function Home() {
  return (
    <main>
      <AnnouncementBar/>
      <Hero />
      <FashionShowcase/>
      <NewSeason/>
    </main>
  )

}