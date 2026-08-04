import ContactHero from "@/components/sections/contact/ContactHero";
import ContactInfo from "@/components/sections/contact/ContactInfo";
import ContactForm from "@/components/sections/contact/ContactForm";
import ContactMap from "@/components/sections/contact/ContactMap";
import ContactSocial from "@/components/sections/contact/ContactSocial";

export default function ContactPage() {
  return (
    <main className="contact-shell min-h-screen">
      <ContactHero />
      <ContactInfo />
      <section className="pb-8 pt-4 md:pb-12">
        <div className="mx-auto grid max-w-7xl gap-0 px-4 md:px-8 lg:grid-cols-[1.05fr_0.95fr]">
          <ContactForm />
          <ContactMap />
        </div>
      </section>
      <ContactSocial />
    </main>
  );
}
