/**
 * GDPR-Compliant Adsterra Native Ad Component
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

interface AdsterraNativeProps {
  id?: string;
}

export default function AdsterraNative({ id }: AdsterraNativeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const adId = id || "2597a491661d74469343b74e567c377a";
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

      const adContainer = document.createElement('div');
      adContainer.id = `container-${adId}`;

      const script = document.createElement('script');
      script.async = true;
      script.dataset.cfasync = "false";
      script.src = `https://pl28359708.effectivegatecpm.com/${adId}/invoke.js`;

      containerRef.current.appendChild(adContainer);
      containerRef.current.appendChild(script);
    }
  }, [hasConsent, adId]);

  // Show loading state while checking consent
  if (isChecking) {
    return (
      <div className="w-full flex flex-col items-center justify-center my-8 min-h-[160px] overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
    );
  }

  // Show placeholder if no consent
  if (!hasConsent) {
    return (
      <div className="w-full flex flex-col items-center justify-center my-8 min-h-[280px] overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 p-8">
        <div className="text-center space-y-4 max-w-md">
          <div className="text-5xl mb-4">🔒</div>
          <p className="text-base font-semibold text-gray-700 dark:text-gray-300">
            Sponsored Content Blocked
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            To view native advertising content, please accept advertising cookies.
            We respect your privacy choices.
          </p>
          <div className="pt-2">
            <p className="text-xs text-gray-500 dark:text-gray-500">
              You can change your preferences at any time by clearing your browser's local storage.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Render ad container with consent
  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col items-center justify-center my-8 min-h-[280px] overflow-hidden rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800"
    />
  );
}
