import Banner from "@/components/homepage/Banner";
import Community from "@/components/homepage/Community";
import SeasonalHarvestCard from "@/components/homepage/SeasonalHarvestCard";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner />
      <SeasonalHarvestCard />
      <Community />
    </div>
  );
}
