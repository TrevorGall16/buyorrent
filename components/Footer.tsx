/**
 * Footer Component
 * Multi-column footer with brand, tools, and transparency links
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
    footerBrandMission: string;
    footerToolsTitle: string;
    footerLearnMoreTitle: string;
    footerGlobalCalculator: string;
    footerTopCities: string;
    footerHowItWorks: string;
    footerDataSources: string;
  };
}

export default function Footer({ labels }: FooterProps) {
  const [year, setYear] = useState('2025');

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Three Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: Brand */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">RentOrBuy-Pro</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {labels.footerBrandMission}
            </p>
          </div>

          {/* Column 2: Tools */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
              {labels.footerToolsTitle}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/calculator"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {labels.footerGlobalCalculator}
                </Link>
              </li>
              <li>
                <Link
                  href="/#cities"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {labels.footerTopCities}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Learn More */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
              {labels.footerLearnMoreTitle}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/how-it-works"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {labels.footerHowItWorks}
                </Link>
              </li>
              <li>
                <Link
                  href="/data-and-sources"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {labels.footerDataSources}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {labels.footerPrivacy}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="border-t border-gray-200 pt-6 space-y-2">
          <p className="text-center text-sm text-gray-500">
            © {year} RentOrBuy-Pro. {labels.footerCopyright}
          </p>
          <p className="text-center text-xs text-gray-400">
            <strong>Disclaimer:</strong> Educational purposes only. Consult a financial advisor before making decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
