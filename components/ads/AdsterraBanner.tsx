/**
 * GDPR-Compliant Adsterra Banner Ad Component
 * Only loads ad scripts after user has consented to advertising cookies
 * Listens for consent events to load dynamically without page refresh
 */

'use client';

import { useEffect, useRef, useState } from 'react';

interface ConsentPreferences {
  essential: boolean;
  advertising: boolean;
  timestamp: string;
}

export default function AdsterraBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniqueId = useRef(`ad-banner-${Math.random().toString(36).substring(7)}`);
  const [hasConsent, setHasConsent] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const hasLoadedRef = useRef(false);

  // Check for existing consent on mount
  useEffect(() => {
    const checkConsent = () => {
      try {
        const savedConsent = localStorage.getItem('cookieConsent');
        if (savedConsent) {
          const consent: ConsentPreferences = JSON.parse(savedConsent);
          setHasConsent(consent.advertising === true);
        } else {
          setHasConsent(false);
        }
      } catch (error) {
        console.error('Error checking cookie consent:', error);
        setHasConsent(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkConsent();

    // Listen for consent updates
    const handleConsentUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<ConsentPreferences>;
      if (customEvent.detail) {
        setHasConsent(customEvent.detail.advertising === true);
        setIsChecking(false);
      }
    };

    window.addEventListener('consentUpdated', handleConsentUpdate);

    return () => {
      window.removeEventListener('consentUpdated', handleConsentUpdate);
    };
  }, []);

  // Load ad script when consent is granted
  useEffect(() => {
    if (hasConsent && containerRef.current && !hasLoadedRef.current) {
      hasLoadedRef.current = true;

      const atOptions = {
        'key': '4835f066503ccf64dbfccdbf254e2d2c',
        'format': 'iframe',
        'height': 90,
        'width': 728,
        'params': {}
      };

      const configScript = document.createElement('script');
      configScript.innerHTML = `atOptions = ${JSON.stringify(atOptions)};`;

      const invokeScript = document.createElement('script');
      invokeScript.src = `https://www.highperformanceformat.com/${atOptions.key}/invoke.js`;
      invokeScript.async = true;

      const adBox = document.createElement('div');
      adBox.id = uniqueId.current;

      containerRef.current.appendChild(configScript);
      containerRef.current.appendChild(invokeScript);
    }
  }, [hasConsent]);

  // Show loading state while checking consent
  if (isChecking) {
    return (
      <div className="flex flex-col items-center my-8">
        <div className="w-full max-w-[728px] h-[90px] bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
      </div>
    );
  }

  // Show placeholder if no consent
  if (!hasConsent) {
    return (
      <div className="flex flex-col items-center my-8">
        <div className="w-full max-w-[728px] min-h-[90px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center p-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              📢 Advertising content blocked
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Accept advertising cookies to view sponsored content
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Render ad container with consent
  return (
    <div className="flex flex-col items-center my-8">
      <p className="text-[10px] text-slate-400 mb-2 uppercase tracking-widest">Sponsored</p>
      <div
        ref={containerRef}
        className="w-full max-w-[728px] min-h-[90px] flex justify-center"
      />
    </div>
  );
}
