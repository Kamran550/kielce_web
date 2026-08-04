"use client";

import { Faculty } from "@/lib/types/faculty";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export type TeachingLanguage = "EN" | "TR";

interface FacultySelectorProps {
  faculties: Faculty[];
  selectedFacultyId: number | null;
  onSelect: (faculty: Faculty) => void;
  selectedLanguage: TeachingLanguage | null;
  onLanguageSelect: (language: TeachingLanguage) => void;
}

export default function FacultySelector({
  faculties,
  selectedFacultyId,
  onSelect,
  selectedLanguage,
  onLanguageSelect,
}: FacultySelectorProps) {
  const t = useTranslations("apply.facultySelector");
  const langT = useTranslations("apply.facultySelector.languageSelection");

  if (faculties.length === 0) {
    return (
      <div className="apply-panel px-6 py-12 text-center">
        <p className="text-[var(--apply-muted)]">{t("noFaculties")}</p>
      </div>
    );
  }

  const selectedFaculty = faculties.find((f) => f.id === selectedFacultyId);

  return (
    <div className="space-y-6">
      <div className="apply-panel p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--apply-muted)]">
          {t("eyebrow")}
        </p>
        <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight text-[var(--apply-ink)] md:text-3xl">
          {t("title")}
        </h2>
        <p className="mt-2 max-w-xl text-sm text-[var(--apply-muted)] md:text-base">
          {t("subtitle")}
        </p>

        <ul className="mt-8 max-h-[28rem] divide-y divide-[var(--apply-line)] overflow-y-auto border-y border-[var(--apply-line)]">
          {faculties.map((faculty, index) => {
            const selected = selectedFacultyId === faculty.id;
            return (
              <li key={faculty.id}>
                <button
                  type="button"
                  onClick={() => onSelect(faculty)}
                  className={cn(
                    "flex w-full items-center gap-4 py-3.5 text-left transition md:gap-6",
                    selected
                      ? "bg-[var(--apply-forest)] text-white"
                      : "hover:bg-black/[0.02]"
                  )}
                >
                  <span
                    className={cn(
                      "w-10 shrink-0 font-display text-sm tabular-nums",
                      selected
                        ? "text-[var(--apply-marigold)]"
                        : "text-[var(--apply-muted)]"
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1 text-sm font-medium md:text-base">
                    {faculty.name}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {selectedFaculty && (
          <p className="mt-4 text-sm text-[var(--apply-muted)]">
            {t("selected")}:{" "}
            <span className="font-semibold text-[var(--apply-ink)]">
              {selectedFaculty.name}
            </span>
          </p>
        )}
      </div>

      {selectedFacultyId && (
        <div className="apply-panel p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--apply-muted)]">
            {langT("eyebrow")}
          </p>
          <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight text-[var(--apply-ink)] md:text-3xl">
            {langT("title")}
          </h2>
          <p className="mt-2 max-w-xl text-sm text-[var(--apply-muted)] md:text-base">
            {langT("subtitle")}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {(
              [
                { code: "EN" as const, label: langT("english") },
                { code: "TR" as const, label: langT("turkish") },
              ] as const
            ).map((lang) => {
              const selected = selectedLanguage === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => onLanguageSelect(lang.code)}
                  className={cn(
                    "flex items-center justify-between border px-5 py-4 text-left transition",
                    selected
                      ? "border-[var(--apply-forest)] bg-[var(--apply-forest)] text-white"
                      : "border-[var(--apply-line)] bg-white hover:border-[var(--apply-forest)]"
                  )}
                >
                  <span>
                    <span className="block text-xs uppercase tracking-[0.16em] opacity-70">
                      {lang.code}
                    </span>
                    <span className="mt-1 block font-display text-lg font-semibold">
                      {lang.label}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "size-3.5 border-2",
                      selected
                        ? "border-white bg-[var(--apply-marigold)]"
                        : "border-[var(--apply-line)]"
                    )}
                    aria-hidden
                  />
                </button>
              );
            })}
          </div>

          {selectedLanguage && (
            <p className="mt-4 text-sm text-[var(--apply-muted)]">
              {langT("selected")}:{" "}
              <span className="font-semibold text-[var(--apply-ink)]">
                {selectedLanguage === "EN"
                  ? langT("english")
                  : langT("turkish")}
              </span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
