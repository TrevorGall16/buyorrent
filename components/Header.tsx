'use client';

/**
 * Global Header Component
 * Appears on all pages with navigation, language selector, and mobile menu
 */

import { useState } from 'react';
import Link from 'next/link';
import { Suspense } from 'react';
import LanguageSelector from './LanguageSelector';
import NavigationDropdown from './NavigationDropdown';
import MobileMenu from './MobileMenu';
import ThemeToggle from './ThemeToggle';
import { NavigationItem } from '@/lib/types';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavigationItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Calculator', href: '/calculator' },
    {
      label: 'Resources',
      href: '#',
      children: [
        { label: 'How It Works', href: '/how-it-works' },
        { label: 'Data & Sources', href: '/data-and-sources' },
      ],
    },
  ];

  return (
    <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 shadow-sm transition-colors">
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

          {/* Center: Navigation (Desktop) */}
          <nav className="hidden md:flex items-center gap-2">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/calculator"
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Calculator
            </Link>
            <NavigationDropdown
              label="Resources"
              items={[
                { label: 'How It Works', href: '/how-it-works' },
                { label: 'Data & Sources', href: '/data-and-sources' },
              ]}
            />
          </nav>

          {/* Right: Theme Toggle + Language Selector + Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            <Suspense fallback={<div className="w-32 h-8 bg-gray-100 dark:bg-slate-700 rounded animate-pulse" />}>
              <LanguageSelector />
            </Suspense>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              aria-label="Open menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
      />
    </header>
  );
}
