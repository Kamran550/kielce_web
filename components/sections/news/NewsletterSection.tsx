"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function NewsletterSection() {
  const t = useTranslations("news.newsletter");
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log("Newsletter subscription:", email);
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <section className="px-4 pb-16 md:px-8 md:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto grid max-w-7xl overflow-hidden bg-[var(--news-ink)] text-white lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div className="px-8 py-12 md:px-12 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--news-signal)]">
            {t("eyebrow")}
          </p>
          <h2 className="font-display mt-4 text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/65">
            {t("description")}
          </p>
        </div>

        <div className="flex flex-col justify-center border-t border-white/10 px-8 py-12 md:px-12 md:py-16 lg:border-l lg:border-t-0">
          {isSubscribed ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <p className="font-display text-2xl text-[var(--news-signal)]">
                {t("thankYou")}
              </p>
              <p className="mt-2 text-sm text-white/65">{t("successMessage")}</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="sr-only">{t("emailPlaceholder")}</span>
                <input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border-0 border-b border-white/30 bg-transparent py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-[var(--news-signal)]"
                />
              </label>
              <button
                type="submit"
                className="inline-flex bg-[var(--news-signal)] px-6 py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-white hover:text-[var(--news-ink)]"
              >
                {t("subscribe")}
              </button>
              <p className="text-xs leading-relaxed text-white/40">
                {t("privacy")}
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
}
