"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function ApplyHero() {
  const t = useTranslations("apply.hero");

  return (
    <section className="relative overflow-hidden pt-28 md:pt-36">
      <div className="absolute inset-0 bg-[var(--apply-ink)]" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(120deg, transparent 0%, rgba(217,162,27,0.18) 45%, transparent 70%), radial-gradient(circle at 85% 20%, rgba(47,107,79,0.45), transparent 40%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--apply-marigold)] to-transparent"
      />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-14 pt-10 md:grid-cols-[1.2fr_0.8fr] md:items-end md:gap-14 md:px-8 md:pb-16 md:pt-12 lg:px-10">
        <div className="apply-rise max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--apply-marigold)]">
            {t("brand")}
          </p>
          <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-[3.4rem] lg:leading-[1.05]">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
            {t("subtitle")}
          </p>
          <a
            href="#apply-intake"
            className="mt-8 inline-flex bg-[var(--apply-marigold)] px-5 py-3 text-sm font-semibold tracking-wide text-[var(--apply-ink)] transition hover:bg-white"
          >
            {t("cta")}
          </a>
        </div>

        <aside className="apply-rise border border-white/15 bg-white/5 p-6 backdrop-blur-sm md:p-7 [animation-delay:120ms]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
            {t("asideLabel")}
          </p>
          <ol className="mt-5 space-y-4">
            {(["step1", "step2", "step3", "step4"] as const).map((key, i) => (
              <li key={key} className="flex gap-4">
                <span className="font-display text-lg text-[var(--apply-marigold)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="pt-0.5 text-sm leading-snug text-white/80">
                  {t(key)}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-6 border-t border-white/10 pt-4 text-xs leading-relaxed text-white/45">
            {t("note")}{" "}
            <Link
              href="/contact"
              className="text-[var(--apply-marigold)] underline-offset-2 hover:underline"
            >
              {t("contactLink")}
            </Link>
          </p>
        </aside>
      </div>
    </section>
  );
}
