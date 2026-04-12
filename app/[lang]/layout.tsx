import { Inter, Playfair_Display } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { getHomePageLabels } from "@/lib/country-config";
import { resolveLanguage, generateLanguageParams } from "@/lib/i18n";
import type { Metadata } from "next";

export const dynamic = 'error';

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
  metadataBase: new URL('https://rentorbuyworld.com'),
  verification: {
    google: "ngEI4shSwK612Qfhfo-EHwAua2nf376xPxU6ib9ta74",
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.webmanifest',
};

export function generateStaticParams() {
  return generateLanguageParams();
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = resolveLanguage(rawLang);
  const labels = getHomePageLabels(lang);

  return (
    <html lang={lang} dir="ltr" suppressHydrationWarning className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
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
          overflow-x-hidden
          bg-[#FAFAFA]
          dark:bg-[#050505]
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

        {/* @ts-expect-error - lang prop will be added to Header in Task 8 */}
        <Header lang={lang} />

        {/* Main content wrapper with flex-grow to ensure footer stays at bottom */}
        <main className="flex-grow">
          {children}
        </main>

        {/* @ts-expect-error - lang prop will be added to Footer in Task 8 */}
        <Footer labels={labels} lang={lang} />
        <CookieBanner />
      </body>
    </html>
  );
}
