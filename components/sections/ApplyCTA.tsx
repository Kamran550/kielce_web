"use client";

import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ApplyCTA() {
  const t = useTranslations("cta");
  const benefits = t.raw("benefits") as string[];

  return (
    <section className="px-4 pb-16 pt-8 md:px-8 md:pb-24 md:pt-12">
      <div className="mx-auto grid max-w-7xl overflow-hidden lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-80px" }}
          className="relative bg-[var(--home-spruce)] px-8 py-14 text-white md:px-12 md:py-16 lg:px-14"
        >
          <div
            className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[var(--home-chartreuse)]/15 blur-3xl"
            aria-hidden
          />
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--home-chartreuse)]">
            {t("eyebrow")}
          </p>
          <h2 className="font-display mt-5 max-w-lg text-4xl leading-[1.08] tracking-tight md:text-5xl lg:text-6xl">
            {t("title")}
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/70 md:text-lg">
            {t("description")}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 bg-[var(--home-chartreuse)] px-7 py-3.5 text-sm font-semibold tracking-wide text-[var(--home-ink)] transition hover:bg-white"
            >
              {t("button")}
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center border border-white/30 px-7 py-3.5 text-sm font-medium tracking-wide text-white transition hover:border-white hover:bg-white/10"
            >
              {t("learnMore")}
            </Link>
          </div>

          <p className="mt-10 border-t border-white/15 pt-6 text-sm text-white/55">
            <span className="font-semibold text-[var(--home-chartreuse)]">
              {t("deadlineLabel")}
            </span>{" "}
            {t("deadline")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-80px" }}
          className="bg-[var(--home-ink)] px-8 py-14 text-white md:px-10 md:py-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/45">
            {t("benefitsTitle")}
          </p>
          <ol className="mt-8 space-y-0">
            {benefits.map((benefit, index) => (
              <motion.li
                key={benefit}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.45,
                  delay: 0.15 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true, margin: "-40px" }}
                className="flex gap-5 border-b border-white/12 py-6 last:border-b-0"
              >
                <span className="font-display text-2xl leading-none text-[var(--home-chartreuse)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="pt-1 text-base leading-snug text-white/85 md:text-lg">
                  {benefit}
                </span>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
