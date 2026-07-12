import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { routing } from "@/i18n/routing";
import { NavbarDemo } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SeoJsonLd } from "@/components/seo/JsonLd";
import { TopLoader } from "@/components/ui/TopLoader";
import type { Metadata } from "next";

// Hər dil üçün SEO məlumatları - Title həmişə ingilis dilindədir
const seoData: Record<
  string,
  { title: string; description: string; keywords: string[] }
> = {
  en: {
    title: "KIELCE - European International Peace University | Study in Poland",
    description:
      "KIELCE - European International Peace University. International education in Poland with bachelor's, master's and PhD programs. Quality education through peace and global understanding.",
    keywords: [
      "KIELCE",
      "European International Peace University",
      "study in Poland",
      "international university",
      "Poland education",
      "bachelor degree Poland",
      "master degree Poland",
      "PhD Poland",
      "European university",
      "peace university",
    ],
  },
  ru: {
    title: "KIELCE - Европейский Международный Университет По миру и безопасности | Study in Poland",
    description:
      "KIELCE - Европейский Международный Университет По миру и безопасности. Международный образовательный центр в Польше с программами бакалавриата, магистратуры и докторантуры. Качественное образование через мир и глобальное понимание.",
    keywords: [
      "KIELCE",
      "Европейский Международный Университет По миру и безопасности",
      "Образование в Польше",
      "Обучение в Польше",
      "Международный университет",
      "Польский университет",
      "Бакалавриат в Польше",
      "Магистратура в Польше",
      "Докторантура в Польше",
      "Европейский университет",
    ],
  },
  tr: {
    title: "KIELCE - European International Peace University | Study in Poland",
    description:
      "KIELCE - European International Peace University. International education in Poland with bachelor's, master's and PhD programs. Quality education through peace and global understanding.",
    keywords: [
      "KIELCE",
      "Avrupa Uluslararası Barış Üniversitesi",
      "Polonya'da eğitim",
      "Polonya'da okumak",
      "uluslararası üniversite",
      "Polonya üniversitesi",
      "lisans programları",
      "yüksek lisans programları",
      "doktora",
      "Avrupa üniversitesi",
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = seoData[locale] || seoData.en;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    icons: {
      icon: [
        { url: "/images/KIELCE-logo.png", sizes: "any", type: "image/png" },
        { url: "/images/KIELCE-logo.png", sizes: "32x32", type: "image/png" },
        { url: "/images/KIELCE-logo.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [
        { url: "/images/KIELCE-logo.png", sizes: "180x180", type: "image/png" },
      ],
      shortcut: "/images/KIELCE-logo.png",
    },
    alternates: {
      canonical: `https://kielceuniversity.pl/${locale}`,
      languages: {
        en: "https://kielceuniversity.pl/en",
        ru: "https://kielceuniversity.pl/ru",
        tr: "https://kielceuniversity.pl/tr",
      },
    },
    openGraph: {
      locale: locale === "ru" ? "ru_RU" : locale === "tr" ? "tr_TR" : "en_US",
      title: seo.title,
      description: seo.description,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages}>
      <SeoJsonLd />
      <Suspense fallback={null}>
        <TopLoader />
      </Suspense>
      <NavbarDemo />
      {children}
      <Footer />
    </NextIntlClientProvider>
  );
}
