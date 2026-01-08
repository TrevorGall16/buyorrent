/**
 * GDPR-Compliant Cookie Banner Component
 * Provides granular consent with "Accept All" and "Essential Only" options
 * Triggers consent event to reload ad components without page refresh
 */

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface ConsentPreferences {
  essential: boolean;
  advertising: boolean;
  timestamp: string;
}

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a consent decision
    const savedConsent = localStorage.getItem('cookieConsent');
    if (!savedConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const consent: ConsentPreferences = {
      essential: true,
      advertising: true,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setIsVisible(false);

    // Dispatch custom event to notify ad components to load
    window.dispatchEvent(new CustomEvent('consentUpdated', { detail: consent }));
  };

  const handleEssentialOnly = () => {
    const consent: ConsentPreferences = {
      essential: true,
      advertising: false,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setIsVisible(false);

    // Dispatch event (ads won't load since advertising = false)
    window.dispatchEvent(new CustomEvent('consentUpdated', { detail: consent }));
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl border-t-2 border-blue-500">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Content Section */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍪</span>
              <h3 className="font-bold text-lg">We Value Your Privacy</h3>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed">
              We use <strong>essential cookies</strong> for site functionality (language preferences, theme settings)
              and <strong>advertising cookies</strong> to display relevant ads via Adsterra.
              You can choose which cookies to accept.
            </p>

            <div className="flex items-center gap-4 text-xs">
              <Link
                href="/privacy"
                className="text-blue-400 hover:text-blue-300 underline transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="text-gray-500">•</span>
              <a
                href="https://adsterra.com/privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline transition-colors"
              >
                Adsterra Privacy Policy
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <button
              onClick={handleEssentialOnly}
              className="w-full sm:w-auto px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg active:scale-95 whitespace-nowrap"
              aria-label="Accept essential cookies only"
            >
              Essential Only
            </button>
            <button
              onClick={handleAcceptAll}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/50 active:scale-95 whitespace-nowrap"
              aria-label="Accept all cookies including advertising"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
