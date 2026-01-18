'use client';

import { useEffect, useRef, useState } from 'react';

interface ConsentPreferences {
  essential: boolean;
  advertising: boolean;
}

export default function AdSidebar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasConsent, setHasConsent] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const hasLoadedRef = useRef(false);

  // 1. Check GDPR Consent
  useEffect(() => {
    const checkConsent = () => {
      try {
        const savedConsent = localStorage.getItem('cookieConsent');
        if (savedConsent) {
          const consent: ConsentPreferences = JSON.parse(savedConsent);
          setHasConsent(consent.advertising === true);
        }
      } catch (e) {
        setHasConsent(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkConsent();

    const handleConsentUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<ConsentPreferences>;
      if (customEvent.detail) {
        setHasConsent(customEvent.detail.advertising === true);
        setIsChecking(false);
      }
    };

    window.addEventListener('consentUpdated', handleConsentUpdate);
    return () => window.removeEventListener('consentUpdated', handleConsentUpdate);
  }, []);

  // 2. Load Adsterra Script (Only if Consented)
  useEffect(() => {
    if (hasConsent && containerRef.current && !hasLoadedRef.current) {
      hasLoadedRef.current = true;

      // ✅ NEW 160x300 AD CONFIGURATION
      const atOptions = {
        'key': '421e503eb36aac2e67c749454c80fbad', 
        'format': 'iframe',
        'height': 300, 
        'width': 160,
        'params': {}
      };

      const configScript = document.createElement('script');
      configScript.innerHTML = `atOptions = ${JSON.stringify(atOptions)};`;

      const invokeScript = document.createElement('script');
      // ✅ Correct domain from your snippet
      invokeScript.src = `https://repelaffinityworlds.com/${atOptions.key}/invoke.js`; 
      invokeScript.async = true;

      containerRef.current.appendChild(configScript);
      containerRef.current.appendChild(invokeScript);
    }
  }, [hasConsent]);

  // 3. Render States
  if (isChecking) {
    return (
      <div className="sticky top-24 space-y-4">
        {/* Placeholder sized for 160x300 */}
        <div className="w-[160px] h-[300px] bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse mx-auto" />
      </div>
    );
  }

  if (!hasConsent) {
    return (
      <div className="sticky top-24">
        <div className="w-full h-[300px] bg-gray-50 dark:bg-zinc-800/50 rounded-xl border border-dashed border-gray-200 dark:border-zinc-700 flex flex-col items-center justify-center p-6 text-center">
          <span className="text-3xl mb-3">🔒</span>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Ad Space
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Accept advertising cookies to support us.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="sticky top-24 flex flex-col items-center">
      <div className="text-[10px] text-gray-400 mb-2 uppercase tracking-widest">Sponsored</div>
      {/* Container sized for 160x300 */}
      <div ref={containerRef} className="min-h-[300px] flex justify-center bg-white dark:bg-transparent rounded-lg overflow-hidden shadow-sm" />
    </div>
  );
}