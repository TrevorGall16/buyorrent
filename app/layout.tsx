import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { getHomePageLabels } from "@/lib/country-config";

// Font configuration
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
});

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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  if (theme) {
                    if (theme === 'dark') {
                      document.documentElement.classList.add('dark');
                    }
                  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 transition-colors`} style={{
        backgroundImage: `radial-gradient(circle at center, rgb(249 250 251) 0%, rgba(249, 250, 251, 0.95) 40%, rgba(249, 250, 251, 0.9) 100%), radial-gradient(circle, #cbd5e1 1px, transparent 1px)`,
        backgroundSize: '100% 100%, 40px 40px'
      }}>
        {/* AdSense Script */}
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