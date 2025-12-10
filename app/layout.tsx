import type { Metadata } from "next";
import Script from "next/script"; // 1. IMPORT THIS
import "./globals.css";
import Header from "@/components/Header";
import CookieBanner from "@/components/CookieBanner";

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
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent dark mode flicker */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (theme === 'dark' || (!theme && systemPrefersDark) || (theme === 'system' && systemPrefersDark)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 bg-grid-pattern transition-colors duration-200" style={{
        backgroundImage: `radial-gradient(circle at center, var(--tw-gradient-from) 0%, var(--tw-gradient-via) 40%, var(--tw-gradient-to) 100%), radial-gradient(circle, var(--grid-color) 1px, transparent 1px)`,
        backgroundSize: '100% 100%, 40px 40px',
        '--tw-gradient-from': 'white',
        '--tw-gradient-via': 'rgba(255, 255, 255, 0.95)',
        '--tw-gradient-to': 'rgba(255, 255, 255, 0.9)',
        '--grid-color': '#cbd5e1'
      } as React.CSSProperties}>
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8732422930809097"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        <Header />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}