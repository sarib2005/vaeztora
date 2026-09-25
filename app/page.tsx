import AnnouncementBar from "@/components/Reusable/AnnouncementBar"
import { Blogs } from "@/components/Screens/Home/Blogs"
import { ExploreBeyondFashion } from "@/components/Screens/Home/ExploreBeyondFasion"
import FashionDesign from "@/components/Screens/Home/FashionDesign"
import { FashionShowcase } from "@/components/Screens/Home/FashionShowcase"
import { Hero } from "@/components/Screens/Home/Hero"
import { NewSeason } from "@/components/Screens/Home/NewSeason"
import { PerfectPairing } from "@/components/Screens/Home/PerfectPairing"
import { PicksSale } from "@/components/Screens/Home/PickSale"
import { PremiumSection } from "@/components/Screens/Home/PremiumSection"
import { Trending } from "@/components/Screens/Home/Trending"
import { WordScroll } from "@/components/Screens/Home/WordScroll"

export default function Home() {
  return (
    <main>
      <AnnouncementBar/>
      <Hero />
      <FashionShowcase/>
      <NewSeason/>
      <Trending/>
      <PremiumSection/>
      <WordScroll/>
      <ExploreBeyondFashion/>
      <FashionDesign/>
      <PerfectPairing/>
      <PicksSale/>
      <Blogs/>
    </main>
  )

}