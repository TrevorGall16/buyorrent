'use client';
import { useEffect, useRef } from 'react';

export default function AdsterraBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  // ✅ This unique ID allows you to use the same ad unit twice on one page
  const uniqueId = useRef(`ad-banner-${Math.random().toString(36).substring(7)}`);

  useEffect(() => {
    if (containerRef.current && !containerRef.current.firstChild) {
      const atOptions = {
        'key' : '4835f066503ccf64dbfccdbf254e2d2c',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };

      const configScript = document.createElement('script');
      configScript.innerHTML = `atOptions = ${JSON.stringify(atOptions)};`;
      
      const invokeScript = document.createElement('script');
      invokeScript.src = `https://www.highperformanceformat.com/${atOptions.key}/invoke.js`;

      // Assign the unique ID to the ad box
      const adBox = document.createElement('div');
      adBox.id = uniqueId.current;
      
      containerRef.current.appendChild(configScript);
      containerRef.current.appendChild(invokeScript);
    }
  }, []);

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