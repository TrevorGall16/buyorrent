'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

interface AdUnitProps {
  format: 'banner' | 'vertical' | 'square';
  className?: string;
  slotId?: string; // Optional override
}

export default function AdUnit({ format, className = '' }: AdUnitProps) {
  const pathname = usePathname();
  const adRef = useRef<HTMLModElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);

  // --- CONFIGURATION: YOUR ADSENSE IDS ---
  const PUBLISHER_ID = 'ca-pub-8732422930809097';
  
  const SLOTS = {
    banner: '6755484109',   // Desktop Banner (Fixed 728x90)
    vertical: '3051224574', // Sidebar (Responsive)
    square: '1442629436',   // Mobile (Responsive)
  };

  const currentSlotId = SLOTS[format];

  // --- LOGIC: TRIGGER AD LOAD ---
  useEffect(() => {
    // Prevent double-loading or loading during hydration
    if (adRef.current && !adRef.current.innerHTML) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setAdLoaded(true);
      } catch (err) {
        console.error('AdSense failed to load', err);
      }
    }
  }, [pathname]); // Reload ads on route change

  // --- VISUAL: LAYOUT SHIFT PROTECTION ---
  // We force a min-height so the page doesn't "jump" when the ad loads.
  const containerStyles = {
    banner: 'min-h-[90px] w-[728px] max-w-full mx-auto',
    vertical: 'min-h-[600px] w-full',
    square: 'min-h-[250px] w-full',
  };

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
      {/* 1. THE ADSENSE TAG */}
      {format === 'banner' ? (
        /* FIXED SIZE BANNER (728x90) */
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'inline-block', width: '728px', height: '90px' }}
          data-ad-client={PUBLISHER_ID}
          data-ad-slot={currentSlotId}
        />
      ) : (
        /* RESPONSIVE UNITS (Sidebar & Mobile) */
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

      {/* 2. DEVELOPMENT PLACEHOLDER (Only visible if AdBlock is on or Localhost) */}
      {!adLoaded && process.env.NODE_ENV === 'development' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-800">
          <span className="text-xs font-mono">AdSense: {format.toUpperCase()}</span>
          <span className="text-[10px] opacity-50">{currentSlotId}</span>
        </div>
      )}
    </div>
  );
}