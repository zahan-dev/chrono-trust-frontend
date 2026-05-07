import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Providers } from "@/lib/providers";
import "./globals.css";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ChronoTrust - Buy, Sell & Trade Luxury Watches",
    template: "%s | ChronoTrust",
  },
  description: "A family-owned luxury watch business built on trust, transparency, and expertise. Buy, sell, and trade premium timepieces with confidence.",
  keywords: ["luxury watches", "buy watches", "sell watches", "trade watches", "Rolex", "Patek Philippe", "Audemars Piguet", "Omega", "luxury timepieces"],
  authors: [{ name: "ChronoTrust" }],
  creator: "ChronoTrust",
  publisher: "ChronoTrust",
  metadataBase: new URL("https://chronotrust.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ChronoTrust - Buy, Sell & Trade Luxury Watches",
    description: "A family-owned luxury watch business built on trust, transparency, and expertise. Buy, sell, and trade premium timepieces with confidence.",
    type: "website",
    locale: "en_US",
    siteName: "ChronoTrust",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChronoTrust - Buy, Sell & Trade Luxury Watches",
    description: "A family-owned luxury watch business built on trust, transparency, and expertise.",
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white">
        <Header />
        <Providers>{children}</Providers>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
