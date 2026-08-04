"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function RectoratePage() {
  const t = useTranslations("about.rectorate");
  const [activeTab, setActiveTab] = useState<"profile" | "welcomeMessage">(
    "profile"
  );

  return (
    <main className="office-shell min-h-screen pt-28 pb-20 md:pt-36">
      <section className="mx-auto max-w-7xl px-6 pt-10 md:px-10 md:pt-14">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="font-display text-4xl leading-none tracking-tight text-[var(--office-bronze)] sm:text-5xl md:text-6xl">
            {t("brand")}
          </p>
          <span
            className="mt-5 block h-px w-20 bg-[var(--office-ink)] md:w-28"
            aria-hidden
          />
          <h1 className="mt-5 text-2xl font-light leading-snug text-[var(--office-ink)] md:text-3xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--office-muted)] md:text-lg">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-14">
          <nav className="flex flex-wrap gap-2 lg:sticky lg:top-28 lg:flex-col lg:gap-0 lg:self-start lg:border-t lg:border-[var(--office-line)]">
            {(
              [
                ["profile", t("tabs.profile")],
                ["welcomeMessage", t("tabs.welcomeMessage")],
              ] as const
            ).map(([key, label]) => {
              const active = activeTab === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveTab(key)}
                  className={`text-left text-sm transition lg:border-b lg:border-[var(--office-line)] lg:py-4 ${
                    active
                      ? "bg-[var(--office-ink)] px-3 py-2 font-semibold text-white lg:bg-transparent lg:px-0 lg:text-[var(--office-bronze)]"
                      : "border border-[var(--office-line)] px-3 py-2 text-[var(--office-muted)] hover:text-[var(--office-ink)] lg:border-0 lg:px-0"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </nav>

          <div>
            <AnimatePresence mode="wait">
              {activeTab === "profile" ? (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--office-bronze)]">
                    {t("profile.roleLabel")}
                  </p>
                  <h2 className="font-display mt-3 text-3xl tracking-tight text-[var(--office-ink)] md:text-4xl lg:text-5xl">
                    {t("profile.title")}
                  </h2>

                  <dl className="mt-10 border-t border-[var(--office-ink)]">
                    <div className="grid gap-2 border-b border-[var(--office-line)] py-5 md:grid-cols-[10rem_1fr]">
                      <dt className="text-xs uppercase tracking-[0.18em] text-[var(--office-muted)]">
                        {t("profile.fullName")}
                      </dt>
                      <dd className="text-lg font-medium text-[var(--office-ink)]">
                        {t("profile.fullNameValue")}
                      </dd>
                    </div>
                    <div className="grid gap-2 border-b border-[var(--office-line)] py-5 md:grid-cols-[10rem_1fr]">
                      <dt className="text-xs uppercase tracking-[0.18em] text-[var(--office-muted)]">
                        {t("profile.position")}
                      </dt>
                      <dd className="text-base leading-relaxed text-[var(--office-ink)]">
                        {t("profile.positionValue")}
                      </dd>
                    </div>
                    <div className="grid gap-2 border-b border-[var(--office-line)] py-5 md:grid-cols-[10rem_1fr]">
                      <dt className="text-xs uppercase tracking-[0.18em] text-[var(--office-muted)]">
                        {t("profile.email")}
                      </dt>
                      <dd>
                        <a
                          href={`mailto:${t("profile.emailValue")}`}
                          className="text-base font-medium text-[var(--office-bronze)] transition hover:text-[var(--office-ink)]"
                        >
                          {t("profile.emailValue")}
                        </a>
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-[var(--office-muted)]">
                    <p>{t("profile.description")}</p>
                    <p>{t("profile.qualifications")}</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="welcomeMessage"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                >
                  <h2 className="font-display text-3xl tracking-tight text-[var(--office-ink)] md:text-4xl lg:text-5xl">
                    {t("welcomeMessage.title")}
                  </h2>
                  <span
                    className="mt-5 block h-px w-20 bg-[var(--office-bronze)]"
                    aria-hidden
                  />

                  <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-[var(--office-muted)]">
                    <p className="text-xl font-medium text-[var(--office-ink)]">
                      {t("welcomeMessage.greeting")}
                    </p>
                    <p>{t("welcomeMessage.paragraph1")}</p>
                    <p>{t("welcomeMessage.paragraph2")}</p>
                    <p>{t("welcomeMessage.paragraph3")}</p>
                    <p className="font-medium text-[var(--office-ink)]">
                      {t("welcomeMessage.closing")}
                    </p>
                  </div>

                  <div className="mt-12 border-t border-[var(--office-ink)] pt-8">
                    <p className="text-sm text-[var(--office-muted)]">
                      {t("welcomeMessage.signature")}
                    </p>
                    <p className="font-display mt-2 text-2xl text-[var(--office-ink)]">
                      {t("welcomeMessage.signatureName")}
                    </p>
                    <p className="mt-1 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--office-bronze)]">
                      {t("welcomeMessage.signatureTitle")}
                    </p>
                    <p className="mt-6 text-xs uppercase tracking-[0.2em] text-[var(--office-muted)]">
                      {t("welcomeMessage.seal")}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
}
