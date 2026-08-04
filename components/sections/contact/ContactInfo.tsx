"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const contactData = {
  phone: {
    primary: "+48 579369968",
    secondary: "+48 579369968",
  },
  email: {
    primary: "info@kielceuniversity.pl",
    admissions: "international@kielceuniversity.pl",
    support: "rectorate@kielceuniversity.pl",
  },
  address: {
    line1: "Ogrodowa 58",
    line2: "00-876 Warsaw",
    line3: "Poland",
  },
};

export default function ContactInfo() {
  const t = useTranslations("contact.info");

  const rows = [
    {
      id: "phone",
      label: t("phone"),
      body: (
        <>
          <a
            href={`tel:${contactData.phone.primary.replace(/\s/g, "")}`}
            className="block font-medium text-[var(--contact-ink)] transition hover:text-[var(--contact-mint)]"
          >
            {contactData.phone.primary}
          </a>
          <a
            href={`tel:${contactData.phone.secondary.replace(/\s/g, "")}`}
            className="mt-1 block text-sm text-[var(--contact-muted)] transition hover:text-[var(--contact-mint)]"
          >
            {contactData.phone.secondary}
          </a>
        </>
      ),
    },
    {
      id: "email",
      label: t("email"),
      body: (
        <>
          <a
            href={`mailto:${contactData.email.primary}`}
            className="block font-medium break-all text-[var(--contact-ink)] transition hover:text-[var(--contact-mint)]"
          >
            {contactData.email.primary}
          </a>
          <p className="mt-3 text-xs uppercase tracking-[0.16em] text-[var(--contact-muted)]">
            {t("admissions")}
          </p>
          <a
            href={`mailto:${contactData.email.admissions}`}
            className="mt-1 block text-sm break-all text-[var(--contact-ink)] transition hover:text-[var(--contact-mint)]"
          >
            {contactData.email.admissions}
          </a>
          <p className="mt-3 text-xs uppercase tracking-[0.16em] text-[var(--contact-muted)]">
            {t("support")}
          </p>
          <a
            href={`mailto:${contactData.email.support}`}
            className="mt-1 block text-sm break-all text-[var(--contact-ink)] transition hover:text-[var(--contact-mint)]"
          >
            {contactData.email.support}
          </a>
        </>
      ),
    },
    {
      id: "address",
      label: t("address"),
      body: (
        <div className="space-y-1 text-[var(--contact-ink)]">
          <p className="font-medium">{contactData.address.line1}</p>
          <p>{contactData.address.line2}</p>
          <p>{contactData.address.line3}</p>
        </div>
      ),
    },
    {
      id: "hours",
      label: t("officeHours"),
      body: (
        <div className="space-y-1 text-sm text-[var(--contact-ink)]">
          <p>{t("hours.weekdays")}</p>
          <p>{t("hours.saturday")}</p>
          <p>{t("hours.sunday")}</p>
        </div>
      ),
    },
  ];

  return (
    <section id="contact-channels" className="scroll-mt-24 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--contact-mint)]">
            {t("eyebrow")}
          </p>
          <h2 className="font-display mt-3 text-4xl tracking-tight text-[var(--contact-ink)] md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--contact-muted)] md:text-lg">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-12 border-t border-[var(--contact-ink)]">
          {rows.map((row, index) => (
            <motion.div
              key={row.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true, margin: "-40px" }}
              className="grid gap-3 border-b border-[var(--contact-ink)]/15 py-7 md:grid-cols-[12rem_1fr] md:gap-10 md:py-9"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--contact-muted)]">
                {row.label}
              </p>
              <div>{row.body}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
