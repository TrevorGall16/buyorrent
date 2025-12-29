'use client';
import { useEffect, useRef } from 'react';

export default function AdsterraNative() {
  const containerRef = useRef<HTMLDivElement>(null);
  // This creates a unique ID for every single ad box on the page
  const uniqueId = useRef(`ad-${Math.random().toString(36).substring(2, 9)}`);

  useEffect(() => {
    // Only run if the container is empty
    if (containerRef.current && !containerRef.current.firstChild) {
      const adId = "2597a491661d74469343b74e567c377a";
      
      const adContainer = document.createElement('div');
      // Adsterra's script looks for this specific ID format
      adContainer.id = `container-${adId}`;
      
      const script = document.createElement('script');
      script.async = true;
      script.dataset.cfasync = "false";
      script.src = `https://pl28359708.effectivegatecpm.com/${adId}/invoke.js`;

      containerRef.current.appendChild(adContainer);
      containerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full flex flex-col items-center justify-center my-8 min-h-[160px] overflow-hidden rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800"
    />
  );
}