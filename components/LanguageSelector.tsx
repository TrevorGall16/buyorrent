'use client';

/**
 * Language Selector Component
 * Allows users to manually switch between languages via URL params
 */

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export type Language = 'en' | 'fr' | 'de';

interface LanguageOption {
  code: Language;
  label: string;
  flag: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
];

export default function LanguageSelector() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentLang = (searchParams.get('lang') || 'en') as Language;

  const handleLanguageChange = (lang: Language) => {
    const params = new URLSearchParams(searchParams.toString());

    if (lang === 'en') {
      // Remove lang param for English (default)
      params.delete('lang');
    } else {
      params.set('lang', lang);
    }

    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.push(newUrl);
  };

  return (
    <div className="relative inline-block">
      <select
        value={currentLang}
        onChange={(e) => handleLanguageChange(e.target.value as Language)}
        className="appearance-none bg-white border-2 border-gray-200 hover:border-blue-300 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-all"
        aria-label="Select language"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}
