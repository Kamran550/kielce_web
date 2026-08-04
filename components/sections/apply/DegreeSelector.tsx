"use client";

import { useEffect, useState, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { DegreeService } from "@/lib/services/degree.service";
import { Degree } from "@/lib/types/degree";
import { ApiClientError } from "@/lib/api/client";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface DegreeSelectorProps {
  onSelect: (degree: Degree) => void;
  selectedDegreeId?: number;
}

export default function DegreeSelector({
  onSelect,
  selectedDegreeId,
}: DegreeSelectorProps) {
  const t = useTranslations("apply.degreeSelector");
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDegrees = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await DegreeService.getAll();
      setDegrees(data);
    } catch (err) {
      const errorMessage =
        err instanceof ApiClientError
          ? err.message
          : err instanceof Error
            ? err.message
            : t("error");
      setError(errorMessage);
      console.error("Failed to fetch degrees:", err);
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchDegrees();
  }, [fetchDegrees]);

  if (loading) {
    return (
      <div className="apply-panel flex flex-col items-center justify-center px-6 py-16">
        <Loader2 className="size-7 animate-spin text-[var(--apply-forest)]" />
        <p className="mt-4 text-sm text-[var(--apply-muted)]">{t("loading")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="apply-panel px-6 py-12 text-center">
        <p className="font-medium text-[var(--apply-danger)]">{t("error")}</p>
        <p className="mt-2 text-sm text-[var(--apply-muted)]">{error}</p>
        <button
          type="button"
          onClick={fetchDegrees}
          className="mt-6 inline-flex border border-[var(--apply-line)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--apply-ink)] transition hover:border-[var(--apply-forest)]"
        >
          {t("retry")}
        </button>
      </div>
    );
  }

  if (degrees.length === 0) {
    return (
      <div className="apply-panel px-6 py-12 text-center">
        <p className="text-[var(--apply-muted)]">{t("noDegrees")}</p>
      </div>
    );
  }

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

      <ul className="mt-8 divide-y divide-[var(--apply-line)] border-y border-[var(--apply-line)]">
        {degrees.map((degree, index) => {
          const selected = selectedDegreeId === degree.id;
          return (
            <li key={degree.id}>
              <button
                type="button"
                onClick={() => onSelect(degree)}
                className={cn(
                  "flex w-full items-center gap-4 py-4 text-left transition md:gap-6",
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
                <span className="min-w-0 flex-1 font-display text-lg font-semibold tracking-tight md:text-xl">
                  {degree.name}
                </span>
                {selected && (
                  <span className="pr-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--apply-marigold)]">
                    {t("selected")}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
