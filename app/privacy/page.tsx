import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy - RentOrBuyWorld',
  description: 'Privacy Policy for RentOrBuyWorld. Learn about our data practices and Adsterra advertising.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 dark:from-zinc-900 dark:to-zinc-950">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-8 md:p-12 border dark:border-zinc-800">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors font-medium"
            >
              ← Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
            <p className="text-gray-500 dark:text-gray-400">Last Updated: January 1, 2026</p>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="mb-4">
                Welcome to RentOrBuyWorld ("we," "our," or "us"). We are committed to protecting your privacy and providing transparency regarding our data practices while delivering real-time housing market analysis.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold mb-3">2.1 Calculator Inputs</h3>
              <p className="mb-4">
                All calculator inputs are processed <strong>entirely in your local browser</strong>. We do not store or transmit your financial inputs (home prices, rent, etc.) to our servers.
              </p>

              <h3 className="text-xl font-semibold mb-3">2.2 Cookies and Advertising Technologies</h3>
              <p className="mb-4">
                We use cookies to enhance your experience, such as remembering your language preference (e.g., IT, DE, FR). 
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Essential Cookies:</strong> Used for site navigation and language selection.</li>
                <li><strong>Adsterra Advertising:</strong> We use Adsterra to serve advertisements. Adsterra may use cookies or web beacons to collect non-personal data (such as browser type and location) to serve relevant ads.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. Third-Party Advertising (Adsterra)</h2>
              <p className="mb-4">
                This website uses Adsterra, a third-party advertising network. Adsterra utilizes scripts and cookies to analyze traffic and display advertisements that may interest you.
              </p>
              <p className="mb-4">
                For more information on how Adsterra manages data, please visit the{' '}
                <a href="https://adsterra.com/privacy-policy/" className="text-blue-600 hover:underline" target="_blank">
                  Adsterra Privacy Policy
                </a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. GDPR and International Rights</h2>
              <p className="mb-4">
                As a global tool serving over 500 cities, we respect GDPR (Europe) and CCPA (California) regulations. You have the right to access, rectify, or request the deletion of any data, though we maintain a "Privacy by Design" approach by not collecting personal identifiers in our calculators.
              </p>
            </section>

            <section className="mb-8 text-center bg-gray-50 dark:bg-zinc-800 p-6 rounded-xl">
              <h2 className="text-xl font-bold mb-2">Questions?</h2>
              <p>Contact our team at: <strong>efwfew1611@gmail.com</strong></p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}