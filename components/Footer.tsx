/**
 * Footer Component
 * Displays footer links and copyright information
 * Handles hydration-safe rendering of dynamic date
 */

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface FooterProps {
  labels: {
    footerAbout: string;
    footerMethodology: string;
    footerContact: string;
    footerPrivacy: string;
    footerBuiltWith: string;
    footerCopyright: string;
  };
}

export default function Footer({ labels }: FooterProps) {
  const [year, setYear] = useState('2025');

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="text-center space-y-6 py-8 border-t border-gray-200">
      <div className="flex justify-center gap-8 text-sm text-gray-600">
        <a href="#" className="hover:text-gray-900 transition-colors">
          {labels.footerAbout}
        </a>
        <a href="#" className="hover:text-gray-900 transition-colors">
          {labels.footerMethodology}
        </a>
        <a href="#" className="hover:text-gray-900 transition-colors">
          {labels.footerContact}
        </a>
        <Link href="/privacy" className="hover:text-gray-900 transition-colors">
          {labels.footerPrivacy}
        </Link>
      </div>
      <p className="text-sm text-gray-500">
        {labels.footerBuiltWith}
      </p>
      <p className="text-xs text-gray-400">
        © {year} RentOrBuy-Pro. {labels.footerCopyright}
      </p>
    </footer>
  );
}
