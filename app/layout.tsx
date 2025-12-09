import type { Metadata } from "next";
import Script from "next/script"; // 1. IMPORT THIS
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { getHomePageLabels } from "@/lib/country-config";

export const metadata: Metadata = {
  title: "RentOrBuy-Pro - Buy vs Rent Calculator",
  description: "Compare buying vs renting with real market data for 500+ cities. Make informed financial decisions.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://www.rentorbuyworld.com'),
  
  verification: {
    google: "ngEI4shSwK612Qfhfo-EHwAua2nf376xPxU6ib9ta74",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const labels = getHomePageLabels('en');

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-grid-pattern" style={{
        backgroundImage: `radial-gradient(circle at center, white 0%, rgba(255, 255, 255, 0.95) 40%, rgba(255, 255, 255, 0.9) 100%), radial-gradient(circle, #cbd5e1 1px, transparent 1px)`,
        backgroundSize: '100% 100%, 40px 40px'
      }}>
        {/* 2. ADD THIS BLOCK HERE */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8732422930809097"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        <Header />
        {children}
        <Footer labels={labels} />
        <CookieBanner />
      </body>
    </html>
  );
}