'use client';

/**
 * Global Header Component
 * Appears on all pages with language selector, theme toggle, and home button
 */

import Link from 'next/link';
import { Suspense } from 'react';
import LanguageSelector from './LanguageSelector';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Logo/Brand with Home Link */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="text-xl font-bold">RentOrBuy-Pro</span>
            </Link>
          </div>

          {/* Right: Theme Toggle + Language Selector */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Suspense fallback={<div className="w-32 h-8 bg-gray-100 dark:bg-slate-800 rounded animate-pulse" />}>
              <LanguageSelector />
            </Suspense>
          </div>
        </div>
      </div>
    </header>
  );
}
