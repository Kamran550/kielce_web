"use client";

import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ProgramsHero() {
  const t = useTranslations("programs.hero");

  return (
    <section className="relative overflow-hidden pt-28 md:pt-36">
      <div className="mx-auto flex min-h-[68vh] max-w-7xl flex-col justify-end px-6 pb-16 pt-12 md:px-10 md:pb-20 lg:px-12">
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl leading-none tracking-tight text-[var(--prog-ember)] sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {t("brand")}
        </motion.p>

        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 block h-px w-24 origin-left bg-[var(--prog-ink)] md:w-32"
          aria-hidden
        />

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-2xl font-light leading-snug text-[var(--prog-ink)] md:text-3xl lg:text-4xl"
        >
          {t("title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-xl text-base leading-relaxed text-[var(--prog-muted)] md:text-lg"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <a
            href="#programs-catalog"
            className="inline-flex items-center justify-center gap-2 bg-[var(--prog-ink)] px-7 py-3.5 text-sm font-semibold tracking-wide text-white transition hover:bg-[var(--prog-ember)]"
          >
            {t("browseCta")}
            <ArrowDownRight className="size-4" aria-hidden />
          </a>
          <Link
            href="/apply"
            className="inline-flex items-center justify-center border border-[var(--prog-ink)]/25 px-7 py-3.5 text-sm font-medium tracking-wide text-[var(--prog-ink)] transition hover:border-[var(--prog-ember)] hover:text-[var(--prog-ember)]"
          >
            {t("applyCta")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
