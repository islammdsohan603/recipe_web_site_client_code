

import Banner from "@/components/homepage/Banner";
import Community from "@/components/homepage/Community";
import FeatiredSection from "@/components/homepage/FeatiredSection";
import PopularPage from "@/components/homepage/Popular";
import SeasonalHarvestCard from "@/components/homepage/SeasonalHarvestCard";


export default function Home() {
  return (
    <div>
      <Banner />
      <FeatiredSection />
      <PopularPage />

      <SeasonalHarvestCard />
      <Community />
    </div>
  );
}
