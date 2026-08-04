"use client";

import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";

const faqKeys = [
  "q1",
  "q2",
  "q3",
  "q4",
  "q5",
  "q6",
  "q7",
  "q8",
  "q9",
  "q10",
] as const;

export default function FeesFAQ() {
  const t = useTranslations("fees.faq");
  const [active, setActive] = useState(0);

  return (
    <section id="fees-faq" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--fees-lagoon)]">
            {t("eyebrow")}
          </p>
          <h2 className="font-display mt-4 text-4xl leading-[1.05] tracking-tight text-[var(--fees-ink)] md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--fees-muted)] md:text-lg">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-0">
          <div className="border border-[var(--fees-line)] bg-[var(--fees-panel)] lg:border-r-0">
            <ul className="divide-y divide-[var(--fees-line)]">
              {faqKeys.map((key, index) => {
                const selected = index === active;
                return (
                  <li key={key}>
                    <button
                      type="button"
                      onClick={() => setActive(index)}
                      className={`flex w-full items-start gap-4 px-5 py-4 text-left transition md:px-6 ${
                        selected
                          ? "bg-[var(--fees-lagoon-soft)]"
                          : "hover:bg-[var(--fees-paper)]"
                      }`}
                    >
                      <span
                        className={`mt-0.5 font-mono text-xs ${
                          selected
                            ? "text-[var(--fees-lagoon)]"
                            : "text-[var(--fees-muted)]"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`text-sm font-medium leading-snug md:text-base ${
                          selected
                            ? "text-[var(--fees-ink)]"
                            : "text-[var(--fees-slate)]"
                        }`}
                      >
                        {t(`items.${key}.question`)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <motion.div
            key={faqKeys[active]}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-between border border-[var(--fees-ink)] bg-[var(--fees-ink)] px-6 py-8 text-white md:px-10 md:py-10"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--fees-saffron)]">
                {t("answerLabel")}
              </p>
              <h3 className="font-display mt-4 text-2xl leading-snug md:text-3xl">
                {t(`items.${faqKeys[active]}.question`)}
              </h3>
              <p className="mt-6 text-base leading-relaxed text-white/70 md:text-lg">
                {t(`items.${faqKeys[active]}.answer`)}
              </p>
            </div>
            <div className="mt-10 border-t border-white/15 pt-6">
              <p className="text-sm text-white/55">{t("contact")}</p>
              <Link
                href="/contact"
                className="mt-2 inline-flex text-sm font-semibold text-[var(--fees-saffron)] transition hover:text-white"
              >
                {t("contactLink")}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
