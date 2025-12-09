/**
 * Global Disclaimer Component
 * Reusable disclaimer banner with three variants
 * Used across all pages to display educational disclaimers
 */

interface GlobalDisclaimerProps {
  variant?: 'inline' | 'warning' | 'sticky';
}

export default function GlobalDisclaimer({ variant = 'inline' }: GlobalDisclaimerProps) {
  const isWarning = variant === 'warning';
  const isSticky = variant === 'sticky';

  const bgColor = isWarning ? 'bg-yellow-50' : 'bg-blue-50';
  const borderColor = isWarning ? 'border-yellow-400' : 'border-blue-400';
  const textColor = isWarning ? 'text-yellow-800' : 'text-blue-800';
  const iconColor = isWarning ? 'text-yellow-600' : 'text-blue-600';
  const stickyClasses = isSticky ? 'sticky top-0 z-40' : '';

  return (
    <div className={`${bgColor} border-l-4 ${borderColor} p-4 mb-6 rounded-r-lg ${stickyClasses}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg
            className={`w-5 h-5 ${iconColor}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <p className={`text-sm ${textColor}`}>
            <strong className="font-semibold">Disclaimer:</strong> This tool is for educational purposes only.
            We provide financial analysis, not financial advice. Always consult a qualified financial advisor
            before making major financial decisions. Data may not reflect current market conditions.
            Verify all information with local sources.
          </p>
        </div>
      </div>
    </div>
  );
}
