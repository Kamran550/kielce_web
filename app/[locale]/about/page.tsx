import AboutHero from "@/components/sections/about/AboutHero";
import MissionVision from "@/components/sections/about/MissionVision";
import UniversityValues from "@/components/sections/about/UniversityValues";
import AboutHistory from "@/components/sections/about/AboutHistory";
import StatisticsSection from "@/components/sections/Statistics";
import ApplyCTA from "@/components/sections/ApplyCTA";

export default function AboutPage() {
  return (
    <main className="about-shell min-h-screen">
      <AboutHero />
      <MissionVision />
      <UniversityValues />
      <AboutHistory />
      <StatisticsSection />
      <ApplyCTA />
    </main>
  );
}
