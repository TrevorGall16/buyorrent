'use client';
import { useEffect, useRef } from 'react';

export default function AdsterraNative() {
  const containerRef = useRef<HTMLDivElement>(null);
  // We keep this to satisfy TypeScript 'unused variable' rules
  const debugId = useRef(Math.random().toString(36).substring(7));

  useEffect(() => {
    if (containerRef.current && !containerRef.current.firstChild) {
      // ✅ This MUST match your Adsterra dashboard ID exactly
      const adId = "2597a491661d74469343b74e567c377a";
      
      const adContainer = document.createElement('div');
      adContainer.id = `container-${adId}`; // Fixed ID
      
      const script = document.createElement('script');
      script.async = true;
      script.dataset.cfasync = "false";
      script.src = `https://pl28359708.effectivegatecpm.com/${adId}/invoke.js`;

      // Use the variable so the build doesn't fail
      console.log(`Adsterra initializing instance: ${debugId.current}`);

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