"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const valueKeys = [
  "academicExcellence",
  "globalPerspective",
  "inclusiveCommunity",
  "innovation",
  "integrity",
  "excellence",
] as const;

export default function UniversityValues() {
  const t = useTranslations("about.values");

  return (
    <section className="relative overflow-hidden bg-[var(--about-canopy)] py-24 text-white md:py-32">
      <div
        className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-[var(--about-lime)]/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-[var(--about-fern)]/40 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--about-lime)]">
            {t("eyebrow")}
          </p>
          <h2 className="font-display mt-4 text-4xl leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            {t("title")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/65 md:text-lg">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="mt-14 border-t border-white/15 md:mt-20">
          {valueKeys.map((key, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.55,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true, margin: "-40px" }}
              className="group grid gap-3 border-b border-white/15 py-8 md:grid-cols-[4.5rem_minmax(0,0.9fr)_minmax(0,1.3fr)] md:items-baseline md:gap-10 md:py-10"
            >
              <span className="font-display text-2xl text-[var(--about-lime)] transition-colors group-hover:text-white md:text-3xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-xl tracking-tight text-white md:text-2xl">
                {t(`items.${key}.title`)}
              </h3>
              <p className="text-base leading-relaxed text-white/60 md:text-lg">
                {t(`items.${key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
