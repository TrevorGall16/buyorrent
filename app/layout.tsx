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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
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
<body 
        className={`
          ${inter.variable} 
          antialiased 
          min-h-screen 
          flex flex-col
          overflow-x-hidden      /* <--- ADD THIS HERE */
          bg-[#FAFAFA]           /* Light Mode: Paper White */
          dark:bg-[#050505]      /* Dark Mode: Pure Deep Black */
          text-slate-900 
          dark:text-slate-50
          transition-colors duration-300
        `}
      >
        {/* --- BACKGROUND LAYER --- */}
        <div className="fixed inset-0 z-[-1] pointer-events-none">
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[1]" />
          
          {/* Fade Mask (Makes grid fade out at the bottom) */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, var(--bg-page) 100%)',
              maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
            }}
          />
        </div>

        {/* AdSense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8732422930809097"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        <Header />
        
        {/* Main content wrapper with flex-grow to ensure footer stays at bottom */}
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer labels={labels} />
        <CookieBanner />
      </body>
    </html>
  );
}