'use client';
import { useEffect, useRef } from 'react';

export default function AdsterraBanner() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && !containerRef.current.firstChild) {
      // Configuration from your Adsterra snippet
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
      invokeScript.src = "https://www.highperformanceformat.com/4835f066503ccf64dbfccdbf254e2d2c/invoke.js";

      containerRef.current.appendChild(configScript);
      containerRef.current.appendChild(invokeScript);
    }
  }, []);

  return (
    <div className="flex flex-col items-center my-8">
      <p className="text-[10px] text-slate-400 mb-2 uppercase tracking-widest">Sponsored</p>
      <div 
        ref={containerRef} 
        className="w-full max-w-[728px] min-h-[90px] overflow-hidden rounded bg-gray-50 flex justify-center"
      />
    </div>
  );
}