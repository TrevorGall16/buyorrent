'use client';

import { useState } from 'react';

export default function TextExpander({ 
  title, 
  children 
}: { 
  title: string; 
  children: React.ReactNode; 
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto mb-12 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-slate-750 transition-colors"
      >
        <span className="text-xl font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
          ℹ️ {title}
        </span>
        <span className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      
      <div 
        className={`
          overflow-hidden transition-all duration-500 ease-in-out
          ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="p-8 pt-0 prose prose-lg max-w-none text-gray-600 dark:text-gray-300">
          {children}
        </div>
      </div>
      
      {/* Sneak peek / Fade effect when closed */}
      {!isOpen && (
        <div className="px-6 pb-4">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Learn about methodology, break-even analysis, and key factors...
          </p>
        </div>
      )}
    </div>
  );
}