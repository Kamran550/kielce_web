"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

const milestoneYears = ["2020", "2021", "2022", "2023"] as const;

export default function AboutHistory() {
  const t = useTranslations("about.history");

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--about-fern)]">
            {t("eyebrow")}
          </p>
          <h2 className="font-display mt-4 text-4xl leading-[1.05] tracking-tight text-[var(--about-ink)] md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[var(--about-muted)] md:text-lg">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="mt-16 md:mt-20">
          <ol className="relative space-y-0 border-l border-[var(--about-line)] md:ml-2">
            {milestoneYears.map((year, index) => (
              <motion.li
                key={year}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative grid gap-2 py-8 pl-8 md:grid-cols-[7rem_1fr] md:gap-12 md:py-10 md:pl-14"
              >
                <span
                  className="absolute -left-[5px] top-10 h-2.5 w-2.5 rounded-full bg-[var(--about-fern)] ring-4 ring-[var(--about-paper)]"
                  aria-hidden
                />
                <time className="font-display text-3xl tracking-tight text-[var(--about-fern)] md:text-4xl">
                  {year}
                </time>
                <div>
                  <h3 className="font-display text-xl tracking-tight text-[var(--about-ink)] md:text-2xl">
                    {t(`milestones.${year}.title`)}
                  </h3>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--about-muted)] md:text-lg">
                    {t(`milestones.${year}.description`)}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: "-60px" }}
        className="relative mt-16 h-[42vh] min-h-[260px] w-full overflow-hidden md:mt-24 md:h-[52vh]"
      >
        <Image
          src="/images/about-campus.png"
          alt={t("imageAlt")}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, rgba(14,22,18,0.35) 0%, transparent 45%)",
          }}
        />
      </motion.div>
    </section>
  );
}
