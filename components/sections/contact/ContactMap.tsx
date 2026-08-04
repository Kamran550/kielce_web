"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function ContactMap() {
  const t = useTranslations("contact.map");
  const mapEmbedUrl =
    "https://maps.google.com/maps?q=Ogrodowa+58,00-876+Warsaw,Poland&t=&z=15&ie=UTF8&iwloc=&output=embed";
  const googleMapsUrl =
    "https://www.google.com/maps/place/Ogrodowa+58,00-876+Warsaw,Poland";
  const fullAddress = "Ogrodowa 58, 00-876 Warsaw, Poland";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-50px" }}
      className="flex h-full flex-col border border-[var(--contact-line)] bg-[var(--contact-panel)]"
    >
      <div className="px-6 py-8 md:px-8 md:py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--contact-mint)]">
          {t("eyebrow")}
        </p>
        <h2 className="font-display mt-3 text-3xl tracking-tight text-[var(--contact-ink)] md:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--contact-muted)] md:text-base">
          {t("subtitle")}
        </p>
      </div>

      <div className="relative min-h-[280px] flex-1 md:min-h-[360px]">
        <iframe
          src={mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0"
          title={t("title")}
        />
      </div>

      <div className="flex flex-col gap-4 border-t border-[var(--contact-line)] px-6 py-6 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--contact-muted)]">
            {t("campusAddress")}
          </p>
          <p className="mt-1 text-sm font-medium text-[var(--contact-ink)]">
            {fullAddress}
          </p>
        </div>
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center border border-[var(--contact-ink)] px-5 py-2.5 text-sm font-semibold text-[var(--contact-ink)] transition hover:bg-[var(--contact-ink)] hover:text-white"
        >
          {t("getDirections")}
        </a>
      </div>
    </motion.div>
  );
}
