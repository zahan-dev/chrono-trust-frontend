import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

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
  title: "ChronoTrust - Buy, Sell & Trade Luxury Watches",
  description: "A family-owned luxury watch business built on trust, transparency, and expertise. Buy, sell, and trade premium timepieces with confidence.",
  keywords: ["luxury watches", "buy watches", "sell watches", "trade watches", "Rolex", "Patek Philippe", "Audemars Piguet"],
  openGraph: {
    title: "ChronoTrust - Buy, Sell & Trade Luxury Watches",
    description: "A family-owned luxury watch business built on trust, transparency, and expertise.",
    type: "website",
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
      <body className="min-h-full flex flex-col bg-white">{children}</body>
    </html>
  );
}
