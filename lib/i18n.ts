export const SUPPORTED_LANGUAGES = ['en', 'fr', 'de', 'es', 'it', 'nl', 'sv', 'pt'] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];
export const DEFAULT_LANGUAGE: Language = 'en';

/** Validate and return a Language, falling back to 'en' */
export function resolveLanguage(lang: string | undefined): Language {
  if (lang && SUPPORTED_LANGUAGES.includes(lang as Language)) {
    return lang as Language;
  }
  return DEFAULT_LANGUAGE;
}

/** Check if a string is a valid language code */
export function isValidLanguage(lang: string): lang is Language {
  return SUPPORTED_LANGUAGES.includes(lang as Language);
}

/** Generate the static params array for [lang] segment */
export function generateLanguageParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
}
