import { ReactScan } from "@components/ReactScan";
import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@components/Navigation/Navigation";
import { ReactNode } from "react";
import { unstable_setRequestLocale } from "next-intl/server";
import { generateLanguageSlugs } from "utils/generateParams";
import { ClerkProvider } from "@clerk/nextjs";

import { Maven_Pro } from "next/font/google";
import { SupportedLangCodes } from "data/translations/translations";
import { ConvexClientProvider } from "@components/ConvexClientProvider";
import { SyncUserWithConvex } from "@components/SyncUserWithConvex";
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
  params: Promise<{ locale: SupportedLangCodes }>;
};

export default async function RootLayout(props: RootLayoutProps) {
  const params = await props.params;

  const { locale } = params;

  const { children } = props;

  unstable_setRequestLocale(locale);

  return (
    <html lang={locale}>
      <ReactScan />
      <body className={mavenPro.variable}>
        <ConvexClientProvider>
          <ClerkProvider dynamic>
            <Navigation />
            <SyncUserWithConvex />
            {children}
          </ClerkProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
