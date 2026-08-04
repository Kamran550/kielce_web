"use client";

import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";

const planKeys = [
  "fullPayment",
  "semesterPayment",
  "monthlyPayment",
  "installmentPlan",
] as const;
const planRecommended = [false, true, false, false] as const;

export default function PaymentPlans() {
  const t = useTranslations("fees.paymentPlans");
  const [open, setOpen] = useState(1);

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-80px" }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--fees-lagoon)]">
              {t("eyebrow")}
            </p>
            <h2 className="font-display mt-4 text-4xl leading-[1.05] tracking-tight text-[var(--fees-ink)] md:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--fees-muted)]">
              {t("subtitle")}
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex bg-[var(--fees-ink)] px-6 py-3.5 text-sm font-semibold tracking-wide text-white transition hover:bg-[var(--fees-lagoon)]"
            >
              {t("contact")}
            </Link>
          </motion.div>

          <div className="border-t border-[var(--fees-ink)]">
            {planKeys.map((key, index) => {
              const isOpen = open === index;
              const recommended = planRecommended[index];
              const benefits = t.raw(`plans.${key}.benefits`) as string[];

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  viewport={{ once: true, margin: "-40px" }}
                  className="border-b border-[var(--fees-ink)]"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : index)}
                    className="flex w-full items-start gap-4 py-6 text-left md:gap-6 md:py-7"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-2xl text-[var(--fees-saffron)] md:text-3xl">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-3">
                        <span className="font-display text-2xl tracking-tight text-[var(--fees-ink)] md:text-3xl">
                          {t(`plans.${key}.name`)}
                        </span>
                        {recommended && (
                          <span className="bg-[var(--fees-lagoon)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                            {t("recommended")}
                          </span>
                        )}
                      </span>
                      <span className="mt-1 block text-sm text-[var(--fees-muted)]">
                        {t(`plans.${key}.highlight`)}
                      </span>
                    </span>
                    <span
                      className={`mt-2 text-xl leading-none text-[var(--fees-ink)] transition ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-7 pl-12 md:pl-16">
                        <p className="max-w-xl text-sm leading-relaxed text-[var(--fees-muted)] md:text-base">
                          {t(`plans.${key}.description`)}
                        </p>
                        <ul className="mt-5 space-y-2">
                          {benefits.map((benefit) => (
                            <li
                              key={benefit}
                              className="text-sm text-[var(--fees-slate)] md:text-base"
                            >
                              — {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
