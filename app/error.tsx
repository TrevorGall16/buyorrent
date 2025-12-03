'use client';

/**
 * Error Boundary for the entire application
 * Catches calculation errors and prevents full app crashes
 */

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center space-y-6">
        {/* Error Icon */}
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Error Message */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Calculation Error
          </h2>
          <p className="text-gray-600 text-sm">
            {error.message || 'Something went wrong with the calculation.'}
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => (window.location.href = '/')}
            className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors"
          >
            Go to Home Page
          </button>
        </div>

        {/* Technical Details (for debugging) */}
        {process.env.NODE_ENV === 'development' && (
          <details className="text-left">
            <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
              Technical Details
            </summary>
            <pre className="mt-2 text-xs text-red-600 bg-red-50 p-3 rounded overflow-auto max-h-40">
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
