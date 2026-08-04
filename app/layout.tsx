import type { Metadata } from "next";
import { Figtree, Fraunces, Geist, Geist_Mono, Sora, Syne } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin", "latin-ext"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin", "latin-ext"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  // Əsas məlumatlar
  title: {
    default: "KIU - Kielce International University | Study in Poland",
    template: "%s | KIU - Kielce International University",
  },
  description:
    "KIU - Kielce International University. International education in Poland with bachelor's, master's and PhD programs. Quality education through peace and global understanding.",

  // Açar sözlər
  keywords: [
    "KIU",
    "kielce",
    "Kielce International University",
    "kielceuniversity.pl",
    "Poland university",
    "Polish university",
    "international university Poland",
    "international university",
    "peace university",
    "Kielce university",
    "study in Poland",
    "education in Poland",
    "PhD Poland",
    "PhD in Poland",
    "bachelor degree Poland",
    "bachelor programs in Poland",
    "master degree Poland",
    "master programs in Poland",
    "doctoral programs in Poland",
  ],

  // Müəllif və yaradıcı
  authors: [
    {
      name: "Kielce International University",
      url: "https://kielceuniversity.pl",
    },
  ],
  creator: "KIU - Kielce International University",
  publisher: "Kielce International University",

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Canonical URL
  metadataBase: new URL("https://kielceuniversity.pl"),
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      ru: "/ru",
      tr: "/tr",
    },
  },

  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ru_RU", "tr_TR"],
    url: "https://kielceuniversity.pl",
    siteName: "KIU - Kielce International University",
    title: "KIU - Kielce International University | Study in Poland",
    description:
      "KIU - Kielce International University. International education in Poland with bachelor's, master's and PhD programs. Quality education through peace and global understanding.",
    images: [
      {
        url: "/images/KIELCE-logo-tam.jpg",
        width: 1200,
        height: 630,
        alt: "KIU - Kielce International University Logo",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "KIU - Kielce International University",
    description:
      "KIU - Kielce International University. International education in Poland with bachelor's, master's and PhD programs.",
    images: ["/images/KIELCE-logo-tam.jpg"],
    creator: "@kielce_edu",
    site: "@kielce_edu",
  },

  // Verification (Google Search Console, Bing, etc.)
  verification: {
    google: "KLaSW1pDoMKO_L3uMzk9eMceecJ5d0d7Pvke5ldZkNs", // Google Search Console-dan alınacaq
    // yandex: "YOUR_YANDEX_CODE",
    // bing: "YOUR_BING_CODE",
  },

  // Category
  category: "education",

  // Icons / Favicon
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${sora.variable} ${syne.variable} ${figtree.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
