"use client";

import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const socialLinks = [
  { name: "Facebook", href: "#" },
  { name: "Twitter", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "YouTube", href: "#" },
];

export default function ContactSocial() {
  const t = useTranslations("contact.social");

  return (
    <section className="px-4 pb-16 md:px-8 md:pb-24">
      <div className="mx-auto grid max-w-7xl overflow-hidden lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-50px" }}
          className="bg-[var(--contact-ink)] px-8 py-12 text-white md:px-12 md:py-14"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--contact-mint)]">
            {t("eyebrow")}
          </p>
          <h2 className="font-display mt-3 text-3xl tracking-tight md:text-4xl">
            {t("followUs")}
          </h2>
          <p className="mt-3 max-w-sm text-sm text-white/60">{t("subtitle")}</p>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {socialLinks.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium tracking-wide text-white transition hover:text-[var(--contact-mint)]"
                >
                  {social.name}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col justify-between border border-[var(--contact-line)] border-t-0 bg-[var(--contact-mint-soft)] px-8 py-12 md:px-12 md:py-14 lg:border-l-0 lg:border-t"
        >
          <div>
            <h2 className="font-display text-3xl tracking-tight text-[var(--contact-ink)] md:text-4xl">
              {t("haveQuestions")}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--contact-muted)] md:text-base">
              {t("faqDescription")}
            </p>
          </div>
          <Link
            href="/fees#fees-faq"
            className="mt-8 inline-flex w-fit bg-[var(--contact-ink)] px-6 py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-[var(--contact-mint)]"
          >
            {t("viewFAQ")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
