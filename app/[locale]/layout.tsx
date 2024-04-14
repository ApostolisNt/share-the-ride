import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@components/Navigation/Navigation";
import { ReactNode } from "react";
import { unstable_setRequestLocale } from "next-intl/server";
import { generateLanguageSlugs } from "utils/generateParams";

import { Maven_Pro } from "next/font/google";
import { SupportedLangCodes } from "data/translations/translations";
const mavenPro = Maven_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-mavenPro",
  display: "swap",
  style: ["normal"],
  preload: true,
});

export const metadata: Metadata = {
  title: "Share the ride",
  description: "Let's share the journey together.",
};

export function generateStaticParams() {
  return generateLanguageSlugs();
}

type RootLayoutProps = {
  children: ReactNode;
  params: { locale: SupportedLangCodes };
};

export default function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  unstable_setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className={mavenPro.variable}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
