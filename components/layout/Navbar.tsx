"use client";

import { LanguageSwitcher } from "@/components/ui/language-switcher";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

export function NavbarDemo() {
  return <Navbar />;
}

function Navbar() {
  const t = useTranslations("nav");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);

  const primaryLinks = [
    { href: "/programs", label: t("programs") },
    { href: "/fees", label: t("fees") },
    { href: "/news", label: t("news") },
  ] as const;

  const aboutItems = [
    { href: "/about", label: t("about") },
    { href: "/about/rectorate", label: t("rectorate") },
    { href: "/about/administrative-units", label: t("administrativeUnits") },
  ] as const;

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (
        aboutRef.current &&
        !aboutRef.current.contains(event.target as Node)
      ) {
        setAboutOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "site-nav fixed inset-x-0 top-0 z-50 text-white transition-shadow duration-300",
        scrolled ? "shadow-[0_12px_40px_rgba(7,21,37,0.35)]" : "shadow-none"
      )}
    >
      <div className="bg-[var(--chrome-navy)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8 lg:px-10">
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-3"
            aria-label={t("brandFull")}
          >
            <span className="relative flex size-11 shrink-0 items-center justify-center bg-[var(--chrome-deep)] ring-1 ring-white/15 md:size-12">
              <Image
                src="/images/KIELCE-logo.png"
                alt=""
                width={120}
                height={48}
                className="h-7 w-auto object-contain brightness-0 invert md:h-8"
                priority
              />
            </span>
            <span className="min-w-0">
              <span className="font-display block text-lg font-semibold leading-none tracking-tight md:text-xl">
                {t("brand")}
              </span>
              <span className="mt-1 block truncate text-[11px] tracking-[0.08em] text-white/55">
                {t("brandTag")}
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitcher variant="onDark" />
            <Link
              href="/contact"
              className="inline-flex items-center bg-[var(--chrome-coral)] px-5 py-2.5 text-sm font-semibold tracking-wide text-white transition hover:bg-[#f05a48]"
            >
              {t("contact")}
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher variant="onDark" />
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="inline-flex size-10 items-center justify-center bg-white/5 text-white ring-1 ring-white/15"
                  aria-label={t("openMenu")}
                >
                  <Menu className="size-5" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="site-nav w-full border-r-0 bg-[var(--chrome-navy)] p-0 text-white sm:max-w-sm [&>button]:hidden"
              >
                <SheetHeader className="border-b border-white/10 px-6 py-5 text-left">
                  <div className="flex items-center justify-between gap-4">
                    <SheetTitle className="font-display text-xl font-semibold tracking-tight text-white">
                      {t("menu")}
                    </SheetTitle>
                    <button
                      type="button"
                      onClick={() => setMobileMenuOpen(false)}
                      className="inline-flex size-10 items-center justify-center text-white/80"
                      aria-label={t("closeMenu")}
                    >
                      <X className="size-5" />
                    </button>
                  </div>
                </SheetHeader>

                <nav className="flex h-[calc(100%-5rem)] flex-col px-6 py-6">
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-display py-3 text-2xl font-semibold tracking-tight text-white"
                  >
                    {t("home")}
                  </Link>

                  <div className="border-y border-white/10 py-2">
                    <button
                      type="button"
                      onClick={() => setMobileAboutOpen((v) => !v)}
                      className="flex w-full items-center justify-between py-3 text-left"
                      aria-expanded={mobileAboutOpen}
                    >
                      <span className="font-display text-2xl font-semibold tracking-tight">
                        {t("about")}
                      </span>
                      <ChevronDown
                        className={cn(
                          "size-5 text-white/50 transition",
                          mobileAboutOpen && "rotate-180"
                        )}
                      />
                    </button>
                    {mobileAboutOpen && (
                      <div className="chrome-rail-in mb-3 flex flex-col gap-1 border-l-2 border-[var(--chrome-gold)] pl-4">
                        {aboutItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="py-2 text-base text-white/70 transition hover:text-[var(--chrome-gold)]"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {primaryLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-display border-b border-white/10 py-3 text-2xl font-semibold tracking-tight text-white"
                    >
                      {link.label}
                    </Link>
                  ))}

                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="mt-auto inline-flex items-center justify-center bg-[var(--chrome-coral)] px-5 py-3.5 text-sm font-semibold tracking-wide text-white"
                  >
                    {t("contact")}
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <div className="hidden border-t border-white/10 bg-[var(--chrome-deep)] lg:block">
        <nav className="mx-auto flex max-w-7xl items-stretch px-4 md:px-8 lg:px-10">
          <Link
            href="/"
            className="flex items-center px-4 py-3 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
          >
            {t("home")}
          </Link>

          <div
            ref={aboutRef}
            className="relative"
            onMouseEnter={() => setAboutOpen(true)}
            onMouseLeave={() => setAboutOpen(false)}
          >
            <button
              type="button"
              className={cn(
                "flex items-center gap-1.5 px-4 py-3 text-sm font-medium transition",
                aboutOpen
                  ? "bg-white/5 text-[var(--chrome-gold)]"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              )}
              aria-expanded={aboutOpen}
              onClick={() => setAboutOpen((v) => !v)}
            >
              {t("about")}
              <ChevronDown
                className={cn(
                  "size-3.5 transition",
                  aboutOpen && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "absolute left-0 top-full z-50 min-w-[16rem] border border-[var(--chrome-line)] bg-[var(--chrome-paper)] py-1 text-[var(--chrome-ink)] shadow-[0_16px_40px_rgba(7,21,37,0.25)] transition",
                aboutOpen
                  ? "pointer-events-auto chrome-rail-in opacity-100"
                  : "pointer-events-none opacity-0"
              )}
            >
              {aboutItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block border-l-2 border-transparent px-4 py-3 text-sm transition hover:border-[var(--chrome-gold)] hover:bg-white hover:text-[var(--chrome-navy)]"
                  onClick={() => setAboutOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center px-4 py-3 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}

          <span className="ml-auto flex items-center px-2 text-[11px] uppercase tracking-[0.2em] text-white/35">
            {t("brandFull")}
          </span>
        </nav>
      </div>
    </header>
  );
}
