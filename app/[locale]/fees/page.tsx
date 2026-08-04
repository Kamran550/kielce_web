import FeesHero from "@/components/sections/fees/FeesHero";
import ProgramPriceTable from "@/components/sections/fees/ProgramPriceTable";
import PaymentPlans from "@/components/sections/fees/PaymentPlans";
import Scholarships from "@/components/sections/fees/Scholarships";
import FeesFAQ from "@/components/sections/fees/FeesFAQ";
import ApplyCTA from "@/components/sections/ApplyCTA";

export default function FeesPage() {
  return (
    <main className="fees-shell min-h-screen">
      <FeesHero />
      <ProgramPriceTable />
      <PaymentPlans />
      <Scholarships />
      <FeesFAQ />
      <ApplyCTA />
    </main>
  );
}
