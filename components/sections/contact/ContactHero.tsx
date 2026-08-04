"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function ContactHero() {
  const t = useTranslations("contact.hero");

  return (
    <section className="relative overflow-hidden pt-28 md:pt-36">
      <div className="mx-auto flex min-h-[58vh] max-w-7xl flex-col justify-end px-6 pb-14 pt-10 md:px-10 md:pb-16 lg:px-12 lg:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl leading-none tracking-tight text-[var(--contact-mint)] sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {t("brand")}
        </motion.p>

        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 block h-px w-20 origin-left bg-[var(--contact-ink)] md:w-28"
          aria-hidden
        />

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-2xl font-light leading-snug text-[var(--contact-ink)] md:text-3xl lg:text-4xl"
        >
          {t("title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-xl text-base leading-relaxed text-[var(--contact-muted)] md:text-lg"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 flex flex-wrap gap-4"
        >
          <a
            href="#contact-channels"
            className="inline-flex bg-[var(--contact-ink)] px-6 py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-[var(--contact-mint)]"
          >
            {t("channelsCta")}
          </a>
          <a
            href="#contact-form"
            className="inline-flex border border-[var(--contact-ink)]/25 px-6 py-3 text-sm font-medium tracking-wide text-[var(--contact-ink)] transition hover:border-[var(--contact-mint)] hover:text-[var(--contact-mint)]"
          >
            {t("formCta")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
