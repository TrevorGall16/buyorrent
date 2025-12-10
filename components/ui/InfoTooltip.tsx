'use client';

import { useState } from 'react';

interface InfoTooltipProps {
  text: string;
}

export default function InfoTooltip({ text }: InfoTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="ml-1 inline-flex items-center justify-center w-4 h-4 text-xs text-slate-500 border border-slate-300 rounded-full hover:bg-slate-100 hover:border-slate-400 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        aria-label="More information"
        tabIndex={0}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        onBlur={() => setIsVisible(false)}
      >
        <span className="font-semibold">?</span>
      </button>

      {isVisible && (
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 text-xs text-white bg-slate-900 rounded shadow-lg z-50 pointer-events-none"
          role="tooltip"
        >
          {text}
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-slate-900" />
        </div>
      )}
    </div>
  );
}
