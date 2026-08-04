"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";

const contactInfo = {
  phones: {
    poland: "+48 579369968",
    luxembourg: "+352 661115815",
    turkey: "+90 538 6796595",
    global: "+49 15207108026",
  },
  email: "info@kielceuniversity.pl",
  address: "Ogrodowa 58, 00-876 Warsaw / Poland",
};

export function Footer() {
  const t = useTranslations("footer");
  const tLinks = useTranslations("footer.links");
  const tUniversityLinks = useTranslations("footer.universityLinks");
  const tPhoneNumbers = useTranslations("footer.phoneNumbers");
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: "/about", key: "about" },
    { href: "/programs", key: "programs" },
    { href: "/fees", key: "fees" },
    { href: "/contact", key: "contact" },
    { href: "/apply", key: "apply" },
    { href: "/e-library", key: "eLibrary" },
  ] as const;

  const universityLinks = [
    { href: "/programs", key: "academicPrograms" },
    { href: "/about", key: "researchInnovation" },
    { href: "/news", key: "studentLife" },
    { href: "/apply", key: "admissions" },
  ] as const;

  const phones = [
    { key: "turkey", value: contactInfo.phones.turkey },
    { key: "poland", value: contactInfo.phones.poland },
    { key: "luxembourg", value: contactInfo.phones.luxembourg },
    { key: "global", value: contactInfo.phones.global },
  ] as const;

  return (
    <footer className="site-footer relative overflow-hidden bg-[var(--chrome-paper)] text-[var(--chrome-ink)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(135deg, transparent 40%, rgba(201,149,42,0.08) 40%, rgba(201,149,42,0.08) 42%, transparent 42%), linear-gradient(var(--chrome-fog) 1px, transparent 1px), linear-gradient(90deg, var(--chrome-fog) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 28px 28px, 28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-16 lg:px-10 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--chrome-coral)]">
              {t("contact")}
            </p>
            <h2 className="font-display mt-3 max-w-xl text-3xl font-semibold tracking-tight text-[var(--chrome-navy)] md:text-4xl">
              {t("contactHeadline")}
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-[var(--chrome-muted)] md:text-base">
              {t("linesAreOpen")}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {phones.map((phone) => (
                <a
                  key={phone.key}
                  href={`tel:${phone.value.replace(/\s/g, "")}`}
                  className="group border border-[var(--chrome-line)] bg-white/70 px-4 py-4 transition hover:border-[var(--chrome-gold)] hover:bg-white"
                >
                  <span className="block text-[11px] uppercase tracking-[0.16em] text-[var(--chrome-muted)]">
                    {tPhoneNumbers(phone.key)}
                  </span>
                  <span className="mt-2 block font-display text-lg font-semibold tracking-tight text-[var(--chrome-navy)] transition group-hover:text-[var(--chrome-coral)]">
                    {phone.value}
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 border-t border-[var(--chrome-line)] pt-6 sm:flex-row sm:gap-10">
              <div>
                <span className="block text-[11px] uppercase tracking-[0.16em] text-[var(--chrome-muted)]">
                  {t("emailLabel")}
                </span>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="mt-1 inline-block text-sm font-medium text-[var(--chrome-navy)] underline decoration-[var(--chrome-gold)] underline-offset-4 transition hover:text-[var(--chrome-coral)]"
                >
                  {contactInfo.email}
                </a>
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-[0.16em] text-[var(--chrome-muted)]">
                  {t("addressLabel")}
                </span>
                <p className="mt-1 text-sm font-medium text-[var(--chrome-navy)]">
                  {contactInfo.address}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-10 border-[var(--chrome-line)] lg:border-l lg:pl-12">
            <div>
              <Link href="/" className="inline-flex items-center gap-3">
                <Image
                  src="/images/KIELCE-logo.png"
                  alt={t("brand")}
                  width={160}
                  height={64}
                  className="h-11 w-auto object-contain"
                />
                <span className="font-display text-2xl font-semibold tracking-tight text-[var(--chrome-navy)]">
                  {t("brand")}
                </span>
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-[var(--chrome-muted)]">
                {t("description")}
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex bg-[var(--chrome-navy)] px-5 py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-[var(--chrome-coral)]"
              >
                {t("contactCta")}
              </Link>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--chrome-gold)]">
                  {t("quickLinks")}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {footerLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-[var(--chrome-ink)] transition hover:text-[var(--chrome-coral)]"
                      >
                        {tLinks(link.key)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--chrome-gold)]">
                  {t("university")}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {universityLinks.map((link) => (
                    <li key={link.key}>
                      <Link
                        href={link.href}
                        className="text-sm text-[var(--chrome-ink)] transition hover:text-[var(--chrome-coral)]"
                      >
                        {tUniversityLinks(link.key)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-[var(--chrome-line)] pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-[var(--chrome-muted)] md:text-sm">
            {t("copyright", { year: currentYear })}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-[var(--chrome-muted)] md:text-sm">
            <Link
              href="/privacy"
              className="transition hover:text-[var(--chrome-navy)]"
            >
              {t("privacyPolicy")}
            </Link>
            <Link
              href="/terms"
              className="transition hover:text-[var(--chrome-navy)]"
            >
              {t("termsOfService")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
