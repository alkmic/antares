import type { Metadata } from "next";
import { Fraunces, Instrument_Serif, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { GrainOverlay } from "@/components/ui";
import { SiteNav } from "@/components/site/site-nav.client";
import { SiteFooter } from "@/components/site/site-footer";
import { ConsentProvider } from "@/components/site/consent-provider.client";
import { CookieBanner } from "@/components/site/cookie-banner.client";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-fraunces",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · Avocats d'affaires`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    url: site.url,
    title: `${site.name} · Avocats d'affaires`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · Avocats d'affaires`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${fraunces.variable} ${instrument.variable} ${manrope.variable} ${mono.variable}`}
    >
      <body className="bg-bone font-body text-ink antialiased">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:top-s-3 focus:left-s-3 focus:z-[220] focus:bg-ink focus:text-bone focus:px-s-4 focus:py-s-2 focus:font-mono focus:text-[12px] focus:uppercase focus:tracking-wider"
        >
          Aller au contenu
        </a>
        <GrainOverlay />
        <ConsentProvider>
          <SiteNav />
          <main id="contenu">{children}</main>
          <SiteFooter />
          <CookieBanner />
        </ConsentProvider>
      </body>
    </html>
  );
}
