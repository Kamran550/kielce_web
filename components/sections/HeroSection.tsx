"use client";

import { heroData } from "@/constants/hero";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      <div
        className="home-ken absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroData.backgroundImage})` }}
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(12,26,20,0.92) 0%, rgba(12,26,20,0.72) 42%, rgba(12,26,20,0.28) 70%, rgba(12,26,20,0.15) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-30 mix-blend-soft-light"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(200,232,108,0.35) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-6 pb-16 pt-28 md:px-10 md:pb-20 md:pt-36 lg:px-16 lg:pb-24">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display mb-5 text-3xl leading-none tracking-tight text-[var(--home-chartreuse)] sm:text-4xl md:text-5xl lg:text-6xl"
          >
            {t("brand")}
          </motion.p>

          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 block h-px w-24 origin-left bg-[var(--home-chartreuse)] md:w-32"
            aria-hidden
          />

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl text-2xl font-light leading-snug text-white sm:text-3xl md:text-4xl"
          >
            {t("title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-xl text-base leading-relaxed text-white/75 md:text-lg"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 bg-[var(--home-chartreuse)] px-7 py-3.5 text-sm font-semibold tracking-wide text-[var(--home-ink)] transition hover:bg-white"
            >
              {t("primaryButton")}
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center border border-white/35 px-7 py-3.5 text-sm font-medium tracking-wide text-white transition hover:border-white hover:bg-white/10"
            >
              {t("secondaryButton")}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
