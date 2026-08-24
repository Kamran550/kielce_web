"use client";

import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function AboutHero() {
  const t = useTranslations("about.hero");
  const tNav = useTranslations("nav");

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/about-campus.png"
          alt={t("imageAlt")}
          fill
          priority
          sizes="100vw"
          className="about-ken object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(14,22,18,0.88) 0%, rgba(21,48,40,0.72) 42%, rgba(14,22,18,0.35) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pb-16 pt-32 md:px-10 md:pb-24 lg:px-12">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="font-display max-w-4xl text-4xl leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {t("brand")}
        </motion.p>

        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 block h-px w-24 origin-left bg-[var(--about-lime)] md:w-32"
          aria-hidden
        />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 max-w-2xl text-xl font-light leading-snug text-white/90 md:text-2xl lg:text-3xl"
        >
          {t("title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-xl text-base leading-relaxed text-white/65 md:text-lg"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center gap-6"
        >
          <a
            href="#mission-vision"
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-white transition hover:text-[var(--about-lime)]"
          >
            {t("scrollHint")}
            <ArrowDownRight className="size-4" aria-hidden />
          </a>
          <Link
            href="/programs"
            className="text-sm font-medium tracking-wide text-white/55 transition hover:text-white"
          >
            {tNav("programs")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
