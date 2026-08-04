import ApplyHero from "@/components/sections/apply/ApplyHero";
import ApplyForm from "@/components/sections/apply/ApplyForm";

export default function ApplyPage() {
  return (
    <main className="apply-shell min-h-screen">
      <ApplyHero />
      <section
        id="apply-intake"
        className="scroll-mt-28 px-4 pb-20 pt-10 md:px-8 md:pb-28 md:pt-14 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <ApplyForm />
        </div>
      </section>
    </main>
  );
}
