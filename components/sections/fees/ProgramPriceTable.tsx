"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";

const programKeys = ["bachelors", "masters", "doctoral", "online"] as const;
const programConfig = [
  { annualFee: 4000, totalFee: 14000, popular: false },
  { annualFee: 4000, totalFee: 14000, popular: true },
  { annualFee: 4000, totalFee: 14000, popular: false },
  { annualFee: 2800, totalFee: 8400, popular: false },
] as const;

export default function ProgramPriceTable() {
  const t = useTranslations("fees.priceTable");
  const [active, setActive] = useState(0);
  const config = programConfig[active];
  const key = programKeys[active];
  const features = t.raw(`programs.${key}.features`) as string[];

  return (
    <section id="program-fees" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--fees-lagoon)]">
            {t("eyebrow")}
          </p>
          <h2 className="font-display mt-4 text-4xl leading-[1.05] tracking-tight text-[var(--fees-ink)] md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--fees-muted)] md:text-lg">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-12 grid gap-0 border border-[var(--fees-line)] bg-[var(--fees-panel)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div className="border-b border-[var(--fees-line)] lg:border-b-0 lg:border-r">
            {programKeys.map((programKey, index) => {
              const selected = index === active;
              return (
                <button
                  key={programKey}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`flex w-full items-center justify-between gap-4 border-b border-[var(--fees-line)] px-5 py-5 text-left transition last:border-b-0 md:px-7 ${
                    selected
                      ? "bg-[var(--fees-ink)] text-white"
                      : "bg-transparent text-[var(--fees-ink)] hover:bg-[var(--fees-lagoon-soft)]"
                  }`}
                >
                  <span>
                    <span className="block font-medium md:text-lg">
                      {t(`programs.${programKey}.name`)}
                    </span>
                    <span
                      className={`mt-1 block text-xs tracking-wide ${
                        selected ? "text-white/60" : "text-[var(--fees-muted)]"
                      }`}
                    >
                      {t(`programs.${programKey}.duration`)}
                    </span>
                  </span>
                  <span
                    className={`font-display text-2xl tabular-nums ${
                      selected ? "text-[var(--fees-saffron)]" : "text-[var(--fees-lagoon)]"
                    }`}
                  >
                    €{programConfig[index].annualFee.toLocaleString()}
                  </span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={key}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col justify-between px-6 py-8 md:px-10 md:py-10"
            >
              <div>
                <div className="flex flex-wrap items-baseline gap-3">
                  <p className="font-display text-5xl tracking-tight text-[var(--fees-ink)] md:text-6xl">
                    €{config.annualFee.toLocaleString()}
                  </p>
                  <span className="text-sm text-[var(--fees-muted)]">
                    {t("year")}
                  </span>
                  {config.popular && (
                    <span className="ml-auto border border-[var(--fees-saffron)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--fees-ink)]">
                      {t("mostPopular")}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-[var(--fees-muted)]">
                  {t("total")}: €{config.totalFee.toLocaleString()}
                </p>

                <h3 className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--fees-lagoon)]">
                  {t("includes")}
                </h3>
                <ul className="mt-4 space-y-3">
                  {features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-3 border-b border-[var(--fees-line)] pb-3 text-sm text-[var(--fees-slate)] last:border-b-0 md:text-base"
                    >
                      <span
                        className="mt-2 size-1.5 shrink-0 bg-[var(--fees-saffron)]"
                        aria-hidden
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-[var(--fees-muted)]">
          {t("note")}
        </p>
      </div>
    </section>
  );
}
