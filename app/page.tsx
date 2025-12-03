export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <h1 className="text-5xl font-bold text-gray-900">
          RentOrBuy-Pro
        </h1>
        <p className="text-xl text-gray-600">
          High-performance financial calculator for 500+ cities
        </p>

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Project Initialized ✓
          </h2>
          <div className="text-left space-y-2 text-gray-700">
            <p>✅ Next.js App Router with TypeScript</p>
            <p>✅ Tailwind CSS configured</p>
            <p>✅ Recharts installed</p>
            <p>✅ SSG optimization enabled</p>
            <p>✅ CLS-protected ad slots ready</p>
          </div>

          <div className="pt-4">
            <p className="text-sm text-gray-500">
              Next: Implement finance calculation logic
            </p>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          <p>Stack: Next.js 15 • TypeScript • Tailwind CSS • Recharts</p>
        </div>
      </div>
    </main>
  );
}
