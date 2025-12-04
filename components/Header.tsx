'use client';

/**
 * Global Header Component
 * Appears on all pages with language selector
 */

import Link from 'next/link';
import { Suspense } from 'react';
import LanguageSelector from './LanguageSelector';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Logo/Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-900 hover:text-gray-700 transition-colors"
          >
            <span className="text-xl font-bold">RentOrBuy-Pro</span>
          </Link>

          {/* Right: Language Selector */}
          <Suspense fallback={<div className="w-32 h-8 bg-gray-100 rounded animate-pulse" />}>
            <LanguageSelector />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
