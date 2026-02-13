'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

interface ConsentPreferences {
  essential: boolean;
  advertising: boolean;
}

interface AdUnitProps {
  format: 'banner' | 'vertical' | 'square';
  className?: string;
}

export default function AdUnit({ format, className = '' }: AdUnitProps) {
  const pathname = usePathname();
  const adRef = useRef<HTMLModElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  // --- CONFIGURATION: YOUR ADSENSE IDS ---
  const PUBLISHER_ID = 'ca-pub-8732422930809097';

  const SLOTS = {
    banner: '6755484109',
    vertical: '3051224574',
    square: '1442629436',
  };

  const currentSlotId = SLOTS[format];

  // --- GDPR: CHECK CONSENT BEFORE LOADING ---
  useEffect(() => {
    const checkConsent = () => {
      try {
        const savedConsent = localStorage.getItem('cookieConsent');
        if (savedConsent) {
          const consent: ConsentPreferences = JSON.parse(savedConsent);
          setHasConsent(consent.advertising === true);
        }
      } catch {
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

  // --- LOGIC: TRIGGER AD LOAD (only with consent) ---
  useEffect(() => {
    if (!hasConsent) return;
    if (adRef.current && !adRef.current.innerHTML) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setAdLoaded(true);
      } catch (err) {
        console.error('AdSense failed to load', err);
      }
    }
  }, [pathname, hasConsent]);

  // --- VISUAL: LAYOUT SHIFT PROTECTION ---
  const containerStyles = {
    banner: 'min-h-[90px] w-[728px] max-w-full mx-auto',
    vertical: 'min-h-[600px] w-full',
    square: 'min-h-[250px] w-full',
  };

  if (isChecking) {
    return (
      <div className={`${containerStyles[format]} bg-gray-50 dark:bg-[#111] animate-pulse ${className}`} />
    );
  }

  if (!hasConsent) {
    return (
      <div className={`${containerStyles[format]} bg-gray-50 dark:bg-zinc-800/50 border border-dashed border-gray-200 dark:border-zinc-700 flex flex-col items-center justify-center ${className}`}>
        <span className="text-2xl mb-2">🔒</span>
        <p className="text-xs text-gray-400">Accept advertising cookies to support us.</p>
      </div>
    );
  }

  return (
    <div
      className={`
        ${containerStyles[format]}
        bg-gray-50 dark:bg-[#111]
        flex items-center justify-center
        overflow-hidden
        ${className}
      `}
    >
      {format === 'banner' ? (
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'inline-block', width: '728px', height: '90px' }}
          data-ad-client={PUBLISHER_ID}
          data-ad-slot={currentSlotId}
        />
      ) : (
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client={PUBLISHER_ID}
          data-ad-slot={currentSlotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      )}

      {!adLoaded && process.env.NODE_ENV === 'development' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-800">
          <span className="text-xs font-mono">AdSense: {format.toUpperCase()}</span>
          <span className="text-[10px] opacity-50">{currentSlotId}</span>
        </div>
      )}
    </div>
  );
}
