import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Nunito_Sans,
  Poppins,
  Raleway,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { bannersMock } from "@/src/features/store/presentation/mock/banner.mock";
import { Toaster } from "@/src/features/common/presentation/components/ui/sonner";
import "./globals.css";
import BottomBar from "@/src/features/common/presentation/components/BottomBar";
import SessionProviderClient from "@/src/features/common/presentation/providers/SessionProvider";

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

const raleway = Raleway({
  variable: "--font-gest-raleway",
  display: "swap",
  weight: "800",
  subsets: ["latin"],
});

const nunito = Nunito_Sans({
  variable: "--font-gest-nunito",
  display: "swap",
  weight: "300",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-gest-poppins",
  display: "swap",
  subsets: ["latin"],
  weight: "200",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://angie-shop.vercel.app"),
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
    <html lang="es">
      <head>
        <link
          rel="preload"
          as="image"
          href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/render/image/public/${bannersMock[0].image_url}?width=768&resize=contain&quality=85`}
          fetchPriority="high"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${raleway.variable} ${nunito.variable} ${poppins.variable} antialiased min-h-screen`}
      >
        {/* <div className="fixed inset-0 bg-gradient-to-b from-[var(--angie-soft-start)] to-[var(--angie-white)] pointer-events-none" /> */}
        <SessionProviderClient>{children}</SessionProviderClient>
        <Analytics />
        <SpeedInsights />
        <Toaster />
      </body>
    </html>
  );
}
