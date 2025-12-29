'use client';
import { useEffect, useRef } from 'react';

export default function AdsterraNative() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Generate a unique ID for every instance
  const uniqueId = useRef(`ad-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    if (containerRef.current && !containerRef.current.firstChild) {
      const adContainer = document.createElement('div');
      adContainer.id = `container-${uniqueId.current}`; // Use unique ID
      
      const script = document.createElement('script');
      script.async = true;
      script.dataset.cfasync = "false";
      script.src = `https://pl28359708.effectivegatecpm.com/2597a491661d74469343b74e567c377a/invoke.js`;

      containerRef.current.appendChild(adContainer);
      containerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div ref={containerRef} className="w-full flex justify-center my-6 min-h-[160px]" />
  );
}