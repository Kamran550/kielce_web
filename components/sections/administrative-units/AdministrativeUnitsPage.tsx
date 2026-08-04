"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function AdministrativeUnitsPage() {
  const t = useTranslations("about.administrativeUnits");

  const staff = [
    {
      id: "vice-rector",
      positionKey: "viceRector.position",
      nameKey: "viceRector.name",
      emailKey: "viceRector.email",
    },
    {
      id: "rector-advisor",
      positionKey: "rectorAdvisor.position",
      nameKey: "rectorAdvisor.name",
      emailKey: "rectorAdvisor.email",
    },
    {
      id: "secretary-general",
      positionKey: "secretaryGeneral.position",
      nameKey: "secretaryGeneral.name",
      emailKey: "secretaryGeneral.email",
    },
    {
      id: "office-director",
      positionKey: "officeDirector.position",
      nameKey: "officeDirector.name",
      emailKey: "officeDirector.email",
    },
  ] as const;

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

        <div className="mt-14 border-t border-[var(--office-ink)]">
          <div className="hidden border-b border-[var(--office-line)] py-3 text-xs uppercase tracking-[0.18em] text-[var(--office-muted)] md:grid md:grid-cols-[4rem_1fr_1.2fr_1.4fr]">
            <span>#</span>
            <span>{t("columns.role")}</span>
            <span>{t("columns.name")}</span>
            <span>{t("columns.email")}</span>
          </div>

          {staff.map((member, index) => (
            <motion.article
              key={member.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="grid gap-3 border-b border-[var(--office-line)] py-7 md:grid-cols-[4rem_1fr_1.2fr_1.4fr] md:items-baseline md:gap-6 md:py-8"
            >
              <span className="font-display text-2xl text-[var(--office-bronze)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--office-muted)] md:hidden">
                  {t("columns.role")}
                </p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--office-bronze)] md:mt-0 md:text-base md:normal-case md:tracking-normal md:font-medium md:text-[var(--office-ink)]">
                  {t(member.positionKey)}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--office-muted)] md:hidden">
                  {t("columns.name")}
                </p>
                <h2 className="font-display mt-1 text-2xl tracking-tight text-[var(--office-ink)] md:mt-0 md:text-3xl">
                  {t(member.nameKey)}
                </h2>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--office-muted)] md:hidden">
                  {t("columns.email")}
                </p>
                <a
                  href={`mailto:${t(member.emailKey)}`}
                  className="mt-1 inline-block text-sm break-all text-[var(--office-ink)] transition hover:text-[var(--office-bronze)] md:mt-0"
                >
                  {t(member.emailKey)}
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
