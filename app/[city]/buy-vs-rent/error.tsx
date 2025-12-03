'use client';

/**
 * Error Boundary for city pages
 * Handles calculation-specific errors
 */

export default function CityPageError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Buy vs. Rent Calculator
          </h1>
          <p className="text-gray-600 mt-2">
            Make an informed decision with real market data
          </p>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center space-y-6">
          {/* Error Icon */}
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-10 h-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          {/* Error Message */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Oops! Calculator Error
            </h2>
            <p className="text-gray-600 text-lg mb-2">
              We encountered an issue while calculating your rent vs. buy scenario.
            </p>
            <p className="text-sm text-gray-500">
              Error: {error.message}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={reset}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Retry Calculation
            </button>
            <button
              onClick={() => (window.location.href = '/')}
              className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors"
            >
              Choose Different City
            </button>
          </div>

          {/* Help Text */}
          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              If this problem persists, please try refreshing the page or selecting a different city.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
