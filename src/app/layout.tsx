import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies, headers } from "next/headers";
import { PageBackdrop } from "@/components/PageBackdrop";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { ThemeProvider } from "@/components/ThemeProvider";
import { readInitialDarkFromRequest, THEME_STORAGE_KEY } from "@/lib/theme";
import { Analytics } from "@vercel/analytics/next"

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SimpleApps · Catálogo de apps móviles",
    template: "%s · SimpleApps",
  },
  description:
    "Explora un catálogo curado de apps móviles pequeñas: finanzas, salud, productividad y más.",
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "SimpleApps",
    title: "SimpleApps",
    description:
      "Catálogo claro de apps móviles enfocadas, con capturas y enlaces a las tiendas.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const headerList = await headers();
  const themeCookie = cookieStore.get(THEME_STORAGE_KEY)?.value;
  const secCh = headerList.get("sec-ch-prefers-color-scheme");
  const initialDark = readInitialDarkFromRequest(themeCookie, secCh);

  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased${initialDark ? " dark" : ""}`}
    >
      <body className="min-h-full flex flex-col font-sans text-slate-900 dark:text-slate-100">
        <ThemeProvider>
          <PageBackdrop />
          <SiteHeader />
          <main className="relative flex-1">{children}</main>
          <SiteFooter />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
