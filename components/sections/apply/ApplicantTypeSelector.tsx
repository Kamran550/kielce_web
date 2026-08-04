"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

type ApplicantType = "student" | "agency" | "transfer";

interface ApplicantTypeSelectorProps {
  selectedType: ApplicantType | null;
  onSelect: (type: ApplicantType) => void;
}

const TYPES: ApplicantType[] = ["student", "agency", "transfer"];

export default function ApplicantTypeSelector({
  selectedType,
  onSelect,
}: ApplicantTypeSelectorProps) {
  const t = useTranslations("apply.applicantType");

  return (
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

      <div
        className="mt-8 divide-y divide-[var(--apply-line)] border-y border-[var(--apply-line)]"
        role="radiogroup"
        aria-label={t("title")}
      >
        {TYPES.map((type, index) => {
          const selected = selectedType === type;
          return (
            <button
              key={type}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onSelect(type)}
              className={cn(
                "flex w-full items-start gap-5 py-5 text-left transition md:gap-8",
                selected
                  ? "bg-[var(--apply-forest)]/6"
                  : "hover:bg-black/[0.02]"
              )}
            >
              <span
                className={cn(
                  "mt-1 font-display text-sm tabular-nums",
                  selected
                    ? "text-[var(--apply-forest)]"
                    : "text-[var(--apply-muted)]"
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className={cn(
                    "block font-display text-xl font-semibold tracking-tight md:text-2xl",
                    selected
                      ? "text-[var(--apply-forest)]"
                      : "text-[var(--apply-ink)]"
                  )}
                >
                  {t(type)}
                </span>
                <span className="mt-1 block text-sm text-[var(--apply-muted)]">
                  {t(`${type}Desc`)}
                </span>
              </span>
              <span
                className={cn(
                  "mt-1.5 size-4 shrink-0 border-2",
                  selected
                    ? "border-[var(--apply-forest)] bg-[var(--apply-marigold)]"
                    : "border-[var(--apply-line)] bg-transparent"
                )}
                aria-hidden
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
