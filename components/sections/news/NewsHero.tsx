"use client";

import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function NewsHero() {
  const t = useTranslations("news.hero");

  return (
    <section className="relative overflow-hidden pt-28 md:pt-36">
      <div className="mx-auto grid min-h-[62vh] max-w-7xl items-end gap-8 px-6 pb-14 pt-10 md:px-10 md:pb-16 lg:grid-cols-[1.2fr_0.8fr] lg:px-12 lg:pb-20">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl leading-none tracking-tight text-[var(--news-signal)] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {t("brand")}
          </motion.p>

          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 block h-px w-20 origin-left bg-[var(--news-ink)] md:w-28"
            aria-hidden
          />

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-2xl font-light leading-snug text-[var(--news-ink)] md:text-3xl"
          >
            {t("title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-lg text-base leading-relaxed text-[var(--news-muted)] md:text-lg"
          >
            {t("subtitle")}
          </motion.p>

          <motion.a
            href="#news-feed"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-[var(--news-ink)] transition hover:text-[var(--news-signal)]"
          >
            {t("scrollHint")}
            <ArrowDownRight className="size-4" aria-hidden />
          </motion.a>
        </div>

        <motion.aside
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex min-h-[220px] flex-col justify-between bg-[var(--news-ink)] px-7 py-8 text-white md:px-8 md:py-10"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "linear-gradient(160deg, transparent 30%, rgba(193,18,31,0.35) 100%)",
            }}
            aria-hidden
          />
          <p className="relative text-xs font-semibold uppercase tracking-[0.28em] text-white/50">
            {t("asideLabel")}
          </p>
          <p className="relative font-display text-3xl leading-snug md:text-4xl">
            {t("asideQuote")}
          </p>
        </motion.aside>
      </div>
    </section>
  );
}
