import AnnouncementBar from "@/components/Reusable/AnnouncementBar"
import { FashionShowcase } from "@/components/Screens/Home/FashionShowcase"
import { Hero } from "@/components/Screens/Home/Hero"

export default function Home() {
  return (
    <main>
      <AnnouncementBar/>
      <Hero />
      <FashionShowcase/>
    </main>
  )

}