"use client";

import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

const scholarshipKeys = [
  "academicExcellence",
  "meritBased",
  "needBased",
  "internationalStudents",
  "researchFellowships",
] as const;

export default function Scholarships() {
  const t = useTranslations("fees.scholarships");

  return (
    <section className="py-20 md:py-28">
      <div className="bg-[var(--fees-ink)] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--fees-saffron)]">
                {t("eyebrow")}
              </p>
              <h2 className="font-display mt-4 text-4xl leading-[1.05] tracking-tight md:text-5xl">
                {t("title")}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/65 md:text-lg">
                {t("subtitle")}
              </p>
            </div>
            <Link
              href="/apply"
              className="inline-flex shrink-0 items-center gap-2 bg-[var(--fees-saffron)] px-6 py-3.5 text-sm font-semibold tracking-wide text-[var(--fees-ink)] transition hover:bg-white"
            >
              {t("apply")}
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </div>

          <div className="mt-14 border-t border-white/15">
            {scholarshipKeys.map((key, index) => {
              const eligibility = t.raw(`items.${key}.eligibility`) as string[];

              return (
                <motion.article
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  viewport={{ once: true, margin: "-40px" }}
                  className="grid gap-6 border-b border-white/15 py-8 md:grid-cols-[10rem_1fr_auto] md:gap-10 md:py-10"
                >
                  <div>
                    <p className="font-display text-3xl tracking-tight text-[var(--fees-saffron)] md:text-4xl">
                      {t(`items.${key}.coverage`)}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-wider text-white/45">
                      {t("coverage")}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium md:text-2xl">
                      {t(`items.${key}.name`)}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/60 md:text-base">
                      {t(`items.${key}.description`)}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                      {eligibility.map((item) => (
                        <li
                          key={item}
                          className="text-xs text-white/50 md:text-sm"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="md:text-right">
                    <p className="text-xs uppercase tracking-wider text-white/45">
                      {t("applicationDeadline")}
                    </p>
                    <p className="mt-1 text-sm font-medium text-white/90">
                      {t(`items.${key}.deadline`)}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
