"use client";

import { programs, categories, Program } from "@/constants/programs";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

export default function ProgramsGrid() {
  const t = useTranslations("programs.grid");
  const tCategories = useTranslations("programs.categories");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      const matchesCategory =
        selectedCategory === "all" || program.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.degree.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="programs-catalog" className="scroll-mt-24 pb-24 pt-4 md:pb-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--prog-ember)]">
              {t("eyebrow")}
            </p>
            <h2 className="font-display mt-3 text-3xl tracking-tight text-[var(--prog-ink)] md:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--prog-muted)]">
              {t("subtitle")}
            </p>

            <nav className="mt-8 flex flex-wrap gap-2 lg:flex-col lg:gap-0 lg:border-t lg:border-[var(--prog-line)]">
              {categories.map((category) => {
                const active = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`text-left text-sm transition lg:border-b lg:border-[var(--prog-line)] lg:py-3 ${
                      active
                        ? "bg-[var(--prog-ink)] px-3 py-2 font-semibold text-white lg:bg-transparent lg:px-0 lg:font-semibold lg:text-[var(--prog-ember)]"
                        : "border border-[var(--prog-line)] px-3 py-2 text-[var(--prog-steel)] hover:text-[var(--prog-ink)] lg:border-0 lg:px-0"
                    }`}
                  >
                    {tCategories(category.id)}
                  </button>
                );
              })}
            </nav>
          </aside>

          <div>
            <div className="relative mb-6">
              <Search
                className="pointer-events-none absolute left-0 top-1/2 size-4 -translate-y-1/2 text-[var(--prog-muted)]"
                aria-hidden
              />
              <input
                type="search"
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-0 border-b border-[var(--prog-ink)] bg-transparent py-3 pl-7 pr-3 text-sm outline-none placeholder:text-[var(--prog-muted)] focus:border-[var(--prog-ember)]"
              />
            </div>

            {filteredPrograms.length > 0 && (
              <p className="mb-4 text-xs uppercase tracking-[0.18em] text-[var(--prog-muted)]">
                {t("found")} {filteredPrograms.length}{" "}
                {filteredPrograms.length === 1
                  ? t("programs")
                  : t("programsPlural")}
              </p>
            )}

            {filteredPrograms.length > 0 ? (
              <div className="border-t border-[var(--prog-ink)]">
                {filteredPrograms.map((program, index) => (
                  <ProgramRow
                    key={program.id}
                    program={program}
                    index={index}
                    expanded={expandedId === program.id}
                    onToggle={() =>
                      setExpandedId((id) =>
                        id === program.id ? null : program.id
                      )
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="border border-[var(--prog-line)] bg-[var(--prog-panel)] px-6 py-14 text-center">
                <p className="text-[var(--prog-muted)]">{t("noResults")}</p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery("");
                  }}
                  className="mt-4 text-sm font-semibold text-[var(--prog-ember)] underline-offset-4 hover:underline"
                >
                  {t("clearFilters")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgramRow({
  program,
  index,
  expanded,
  onToggle,
}: {
  program: Program;
  index: number;
  expanded: boolean;
  onToggle: () => void;
}) {
  const t = useTranslations("programs.grid");

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.04, 0.24),
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, margin: "-40px" }}
      className="border-b border-[var(--prog-ink)]/20"
    >
      <button
        type="button"
        onClick={onToggle}
        className="grid w-full grid-cols-1 gap-2 py-6 text-left md:grid-cols-[1fr_auto_auto] md:items-baseline md:gap-8"
        aria-expanded={expanded}
      >
        <span>
          <span className="flex flex-wrap items-center gap-3">
            <span className="font-display text-2xl tracking-tight text-[var(--prog-ink)] md:text-3xl">
              {program.title}
            </span>
            {program.featured && (
              <span className="bg-[var(--prog-ember)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                {t("featuredProgram")}
              </span>
            )}
          </span>
          <span className="mt-1 block text-sm text-[var(--prog-muted)] md:hidden">
            {program.degree} · {program.duration}
          </span>
        </span>
        <span className="hidden text-sm text-[var(--prog-steel)] md:block">
          {program.degree}
        </span>
        <span className="hidden text-sm tabular-nums text-[var(--prog-steel)] md:block">
          {program.duration}
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-out ${
          expanded
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-7">
            <p className="max-w-2xl text-sm leading-relaxed text-[var(--prog-muted)] md:text-base">
              {program.description}
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--prog-ember)]">
                  {t("keyFeatures")}
                </h3>
                <ul className="mt-3 space-y-1.5">
                  {program.features.slice(0, 4).map((feature) => (
                    <li
                      key={feature}
                      className="text-sm text-[var(--prog-steel)]"
                    >
                      — {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--prog-ember)]">
                  {t("careerPaths")}
                </h3>
                <p className="mt-3 text-sm text-[var(--prog-steel)]">
                  {program.career.slice(0, 3).join(" · ")}
                  {program.career.length > 3
                    ? ` · +${program.career.length - 3} ${t("more")}`
                    : ""}
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={`/programs/${program.id}`}
                className="inline-flex bg-[var(--prog-ink)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--prog-ember)]"
              >
                {t("learnMore")}
              </Link>
              <Link
                href="/apply"
                className="inline-flex border border-[var(--prog-ink)]/25 px-5 py-2.5 text-sm font-medium text-[var(--prog-ink)] transition hover:border-[var(--prog-ember)] hover:text-[var(--prog-ember)]"
              >
                {t("apply")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
