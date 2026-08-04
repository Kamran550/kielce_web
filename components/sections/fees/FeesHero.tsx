"use client";

import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function FeesHero() {
  const t = useTranslations("fees.hero");

  return (
    <section className="relative overflow-hidden pt-28 md:pt-36">
      <div className="mx-auto grid min-h-[70vh] max-w-7xl lg:grid-cols-[1.2fr_0.8fr]">
        <div className="flex flex-col justify-end px-6 pb-14 pt-10 md:px-10 md:pb-20 lg:px-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl leading-none tracking-tight text-[var(--fees-lagoon)] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {t("brand")}
          </motion.p>

          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 block h-px w-20 origin-left bg-[var(--fees-saffron)] md:w-28"
            aria-hidden
          />

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-2xl font-light leading-snug text-[var(--fees-ink)] md:text-3xl"
          >
            {t("title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-lg text-base leading-relaxed text-[var(--fees-muted)] md:text-lg"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            <a
              href="#program-fees"
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-[var(--fees-ink)] transition hover:text-[var(--fees-lagoon)]"
            >
              {t("scrollHint")}
              <ArrowDownRight className="size-4" aria-hidden />
            </a>
          </motion.div>
        </div>

        <motion.aside
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col justify-between bg-[var(--fees-ink)] px-8 py-12 text-white md:px-10 md:py-16"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(135deg, transparent 40%, rgba(232,163,23,0.18) 100%)",
            }}
            aria-hidden
          />
          <p className="relative text-xs font-semibold uppercase tracking-[0.28em] text-[var(--fees-saffron)]">
            {t("asideLabel")}
          </p>
          <div className="relative mt-10 lg:mt-0">
            <p className="font-display text-6xl leading-none tracking-tight md:text-7xl">
              {t("asideFigure")}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
              {t("asideCaption")}
            </p>
          </div>
          <Link
            href="/apply"
            className="relative mt-10 inline-flex w-fit items-center justify-center bg-[var(--fees-saffron)] px-6 py-3 text-sm font-semibold tracking-wide text-[var(--fees-ink)] transition hover:bg-white lg:mt-0"
          >
            {t("asideCta")}
          </Link>
        </motion.aside>
      </div>
    </section>
  );
}
