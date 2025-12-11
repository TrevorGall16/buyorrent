/**
 * AdUnit Component
 * Renders an ad space with CLS-preventing dimensions
 *
 * Format Options:
 * - square: 300x250px (Medium Rectangle)
 * - vertical: 300x600px (Half Page)
 * - banner: 728x90px (Leaderboard)
 */

interface AdUnitProps {
  slotId?: string;
  format: 'square' | 'vertical' | 'banner';
  className?: string;
}

export default function AdUnit({ slotId, format, className = '' }: AdUnitProps) {
  // CLS-preventing dimensions based on format
  const formatStyles = {
    square: 'w-full max-w-[300px] min-h-[250px]',
    vertical: 'w-full max-w-[300px] min-h-[600px]',
    banner: 'w-full max-w-[728px] min-h-[90px]',
  };

  return (
    <div
      className={`flex items-center justify-center bg-gray-100 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 mx-auto ${formatStyles[format]} ${className}`}
      role="complementary"
      aria-label="Advertisement"
      data-ad-slot={slotId}
    >
      <div className="text-center">
        <span className="text-xs text-gray-400 dark:text-gray-500 select-none block">
          Ad Space
        </span>
        {format === 'square' && (
          <span className="text-[10px] text-gray-300 dark:text-gray-600 select-none">
            300x250
          </span>
        )}
        {format === 'vertical' && (
          <span className="text-[10px] text-gray-300 dark:text-gray-600 select-none">
            300x600
          </span>
        )}
        {format === 'banner' && (
          <span className="text-[10px] text-gray-300 dark:text-gray-600 select-none">
            728x90
          </span>
        )}
      </div>
    </div>
  );
}
