'use client';

/**
 * Language Selector Component
 * Switches between languages via path-based routing (e.g., /en/ -> /fr/)
 */

import { usePathname, useRouter } from 'next/navigation';
import { SUPPORTED_LANGUAGES, type Language } from '@/lib/i18n';

interface LanguageOption {
  code: Language;
  label: string;
  flag: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  { code: 'sv', label: 'Svenska', flag: '🇸🇪' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
];

export default function LanguageSelector() {
  const pathname = usePathname();
  const router = useRouter();

  // Extract current lang from path: /en/... -> 'en'
  const segments = pathname.split('/').filter(Boolean);
  const currentLang = (SUPPORTED_LANGUAGES.includes(segments[0] as Language) ? segments[0] : 'en') as Language;

  const handleLanguageChange = (newLang: Language) => {
    // Replace the lang segment in the current path
    const restOfPath = segments.slice(1).join('/');
    const newPath = `/${newLang}/${restOfPath}`;
    router.push(newPath);
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
