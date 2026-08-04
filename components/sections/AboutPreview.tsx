"use client";

import { aboutPreviewData } from "@/constants/about";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function AboutPreview() {
  const t = useTranslations("aboutPreview");

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--home-teal)]">
              {t("eyebrow")}
            </p>
            <h2 className="font-display mt-4 text-4xl leading-[1.05] tracking-tight text-[var(--home-ink)] md:text-5xl lg:text-6xl">
              {t("title")}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-80px" }}
            className="lg:pb-2"
          >
            <p className="max-w-2xl text-base leading-relaxed text-[var(--home-muted)] md:text-lg">
              {t("description")}
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-3 text-sm font-semibold tracking-wide text-[var(--home-ink)] transition hover:text-[var(--home-teal)]"
            >
              <span className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-100 after:bg-[var(--home-teal)] after:transition-transform hover:after:scale-x-110">
                {t("button")}
              </span>
              <span
                className="inline-block h-px w-10 bg-[var(--home-teal)]"
                aria-hidden
              />
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: "-60px" }}
        className="relative mt-14 md:mt-20"
      >
        <div className="relative h-[48vh] min-h-[280px] w-full overflow-hidden md:h-[56vh]">
          <Image
            src={aboutPreviewData.image}
            alt={t("imageAlt")}
            fill
            sizes="100vw"
            className="object-cover"
            priority={false}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(0deg, rgba(12,26,20,0.55) 0%, transparent 45%)",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 px-6 py-6 md:px-10 md:py-8">
            <p className="font-display max-w-md text-xl text-white md:text-2xl">
              {t("imageCaption")}
            </p>
            <span
              className="hidden h-16 w-16 shrink-0 border border-[var(--home-chartreuse)]/60 md:block"
              aria-hidden
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
