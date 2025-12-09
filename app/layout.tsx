import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: "RentOrBuy-Pro - Buy vs Rent Calculator",
  description: "Compare buying vs renting with real market data for 500+ cities. Make informed financial decisions.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://rentorbuy-pro.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Tinos:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-tinos antialiased">
        <Header />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
