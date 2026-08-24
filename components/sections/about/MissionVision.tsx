"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const coreValueKeys = [
  "excellence",
  "globalCitizenship",
  "diversity",
  "innovation",
  "ethicalLeadership",
] as const;

export default function MissionVision() {
  const t = useTranslations("about.missionVision");

  return (
    <section id="mission-vision" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-80px" }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--about-fern)]">
              {t("eyebrow")}
            </p>
            <h2 className="font-display mt-4 text-4xl leading-[1.05] tracking-tight text-[var(--about-ink)] md:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--about-muted)]">
              {t("subtitle")}
            </p>
          </motion.div>

          <div className="space-y-0 border-t border-[var(--about-line)]">
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-60px" }}
              className="grid gap-4 border-b border-[var(--about-line)] py-10 md:grid-cols-[5rem_1fr] md:gap-10 md:py-12"
            >
              <span className="font-display text-3xl text-[var(--about-fern)] md:text-4xl">
                01
              </span>
              <div>
                <h3 className="font-display text-2xl tracking-tight text-[var(--about-ink)] md:text-3xl">
                  {t("mission.title")}
                </h3>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--about-muted)] md:text-lg">
                  {t("mission.description")}
                </p>
              </div>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true, margin: "-60px" }}
              className="grid gap-4 border-b border-[var(--about-line)] py-10 md:grid-cols-[5rem_1fr] md:gap-10 md:py-12"
            >
              <span className="font-display text-3xl text-[var(--about-fern)] md:text-4xl">
                02
              </span>
              <div>
                <h3 className="font-display text-2xl tracking-tight text-[var(--about-ink)] md:text-3xl">
                  {t("vision.title")}
                </h3>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--about-muted)] md:text-lg">
                  {t("vision.description")}
                </p>
              </div>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true, margin: "-60px" }}
              className="grid gap-4 py-10 md:grid-cols-[5rem_1fr] md:gap-10 md:py-12"
            >
              <span className="font-display text-3xl text-[var(--about-fern)] md:text-4xl">
                03
              </span>
              <div>
                <h3 className="font-display text-2xl tracking-tight text-[var(--about-ink)] md:text-3xl">
                  {t("coreValues.title")}
                </h3>
                <ul className="mt-6 flex flex-col gap-0">
                  {coreValueKeys.map((key, index) => (
                    <li
                      key={key}
                      className="flex items-baseline gap-4 border-b border-[var(--about-line)] py-3.5 last:border-b-0"
                    >
                      <span className="font-mono text-[11px] tracking-widest text-[var(--about-muted)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-base text-[var(--about-ink)] md:text-lg">
                        {t(`coreValues.items.${key}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          </div>
        </div>
      </div>
    </section>
  );
}
