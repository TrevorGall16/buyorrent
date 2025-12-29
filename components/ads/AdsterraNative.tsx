'use client';
import { useEffect, useRef } from 'react';

// ✅ This interface tells TypeScript that "id" is a valid prop
interface AdsterraNativeProps {
  id?: string; // The "?" makes it optional so your old code doesn't break
}

export default function AdsterraNative({ id }: AdsterraNativeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Default to your original ID if no ID is passed
  const adId = id || "2597a491661d74469343b74e567c377a";

  useEffect(() => {
    if (containerRef.current && !containerRef.current.firstChild) {
      const adContainer = document.createElement('div');
      adContainer.id = `container-${adId}`;
      
      const script = document.createElement('script');
      script.async = true;
      script.dataset.cfasync = "false";
      script.src = `https://pl28359708.effectivegatecpm.com/${adId}/invoke.js`;

      containerRef.current.appendChild(adContainer);
      containerRef.current.appendChild(script);
    }
  }, [adId]); // ✅ Re-run if the ID changes

  return (
    <div 
      ref={containerRef} 
      className="w-full flex flex-col items-center justify-center my-8 min-h-[160px] overflow-hidden rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800"
    />
  );
}