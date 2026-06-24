import { Hero } from "@/components/home/Hero";
import { StatsBand } from "@/components/home/StatsBand";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { TrackingTeaser } from "@/components/home/TrackingTeaser";
import { FinalCta } from "@/components/home/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBand />
      <ProcessTimeline />
      <ServicesGrid />
      <TrackingTeaser />
      <FinalCta />
    </>
  );
}
