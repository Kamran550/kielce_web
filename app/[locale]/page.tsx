import HeroSection from "@/components/sections/HeroSection";
import AboutPreview from "@/components/sections/AboutPreview";
// import { TeachersSection } from "@/components/sections/Teachers";
import StatisticsSection from "@/components/sections/Statistics";
// import TestimonialsSection from "@/components/sections/Testimonials";
import ApplyCTA from "@/components/sections/ApplyCTA";

export default function Home() {
  return (
    <main className="home-shell min-h-screen">
      <HeroSection />
      <AboutPreview />
      <StatisticsSection />
      {/* <TeachersSection /> */}
      {/* <TestimonialsSection /> */}
      <ApplyCTA />
    </main>
  );
}
