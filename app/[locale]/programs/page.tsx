import ProgramsHero from "@/components/sections/programs/ProgramsHero";
import ProgramsGrid from "@/components/sections/programs/ProgramsGrid";
// import TestimonialsSection from "@/components/sections/Testimonials";
import ApplyCTA from "@/components/sections/ApplyCTA";

export default function ProgramsPage() {
  return (
    <main className="programs-shell min-h-screen">
      <ProgramsHero />
      <ProgramsGrid />
      {/* <TestimonialsSection /> */}
      <ApplyCTA />
    </main>
  );
}
