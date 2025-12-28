import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import QueryProvider from "@/src/features/common/presentation/providers/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Angie Shop | Perfumes y Tecnología en Matanzas, Cuba",
  description:
    "Tienda online de perfumes y tecnología en Matanzas, Cuba. Encuentra las mejores ofertas en fragancias y gadgets de última generación.",
  authors: [{ name: "Li Anthony", url: "https://lianthonygg.vercel.app" }],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Angie Shop",
    description:
      "Tienda online de perfumes y tecnología en Matanzas, Cuba. Las mejores ofertas en fragancias y gadgets.",
    url: "https://angie-shop.vercel.app",
    siteName: "Angie Shop",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Angie Shop | Perfumes y Tecnología en Matanzas, Cuba",
    description: "Tienda online de perfumes y tecnología en Matanzas, Cuba.",
    images: ["https://angie-shop.vercel.app/favicon.ico"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>{children}</QueryProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
