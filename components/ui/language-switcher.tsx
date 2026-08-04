"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

const languages = [
  { code: "en", label: "EN" },
  { code: "tr", label: "TR" },
  { code: "ru", label: "RU" },
] as const;

type LanguageSwitcherProps = {
  variant?: "default" | "onDark";
};

export function LanguageSwitcher({
  variant = "default",
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const t = useTranslations("language");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (newLocale: string) => {
    startTransition(() => {
      const segments = pathname.split("/");
      const pathWithoutLocale = segments.slice(2).join("/") || "";
      router.push(
        `/${newLocale}${pathWithoutLocale ? `/${pathWithoutLocale}` : ""}`
      );
      router.refresh();
    });
  };

  return (
    <Select
      value={locale}
      onValueChange={handleLanguageChange}
      disabled={isPending}
    >
      <SelectTrigger
        className={cn(
          "h-9 w-[4.5rem] gap-1 rounded-none border bg-transparent px-2 text-xs font-semibold uppercase tracking-wider shadow-none focus:ring-0",
          variant === "onDark"
            ? "border-white/20 text-white [&_svg]:text-white/70"
            : "border-[var(--chrome-line,#c5d0db)] text-[var(--chrome-ink,#102033)]"
        )}
        aria-label={t("select")}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="rounded-none">
        {languages.map((lang) => (
          <SelectItem
            key={lang.code}
            value={lang.code}
            className="text-xs uppercase tracking-wider"
          >
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
