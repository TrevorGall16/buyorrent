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
            <p className="text-gray-500 dark:text-gray-400">Last Updated: January 8, 2026</p>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="mb-4">
                Welcome to RentOrBuyWorld ("we," "our," or "us"). We are committed to protecting your privacy and providing transparency regarding our data practices while delivering real-time housing market analysis.
              </p>
              <p className="mb-4">
                This Privacy Policy explains how we handle your information when you use our rent vs. buy calculator across 500+ cities worldwide. We follow a <strong>"Privacy by Design"</strong> approach, minimizing data collection to only what's essential for functionality.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold mb-3">2.1 Calculator Inputs (100% Client-Side)</h3>
              <p className="mb-4">
                All calculator inputs are processed <strong>entirely in your local browser</strong>. We do not store or transmit your financial inputs (home prices, rent, down payment, etc.) to our servers. These calculations happen on your device and exist only:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>In your browser's memory during your session</li>
                <li>In the URL if you share a scenario (optional, user-controlled)</li>
                <li>Nowhere else—no databases, no cloud storage, no analytics</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">2.2 Cookies and Local Storage</h3>
              <p className="mb-4">
                We use browser storage technologies for enhanced functionality. Here's exactly what we store:
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-lg mb-3">Essential Cookies (Cannot be Declined)</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Language Preference:</strong> Remembers your selected language (en, fr, de, etc.)</li>
                  <li><strong>Dark Mode Preference:</strong> Stores your theme selection</li>
                  <li><strong>Cookie Consent:</strong> Records your cookie preference choice</li>
                </ul>
                <p className="text-sm mt-3 text-gray-600 dark:text-gray-400">
                  <em>These are necessary for basic site functionality and are stored in your browser's localStorage.</em>
                </p>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-lg mb-3">Advertising Cookies (Requires Your Consent)</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Adsterra Cookies:</strong> Used to serve and track advertising performance</li>
                  <li><strong>Data Collected:</strong> Browser type, device type, approximate location (country-level), anonymized behavior</li>
                  <li><strong>Purpose:</strong> Display relevant ads and measure ad effectiveness</li>
                </ul>
                <p className="text-sm mt-3 text-gray-600 dark:text-gray-400">
                  <em>You can decline these via our cookie banner. Ads will not load if you choose "Essential Only."</em>
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. Third-Party Advertising (Adsterra)</h2>
              <p className="mb-4">
                This website uses <strong>Adsterra</strong>, a third-party advertising network, to monetize our free calculator service. Adsterra utilizes scripts and cookies to analyze traffic and display advertisements.
              </p>

              <h3 className="text-xl font-semibold mb-3">What Adsterra Collects:</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>IP address (anonymized for EU users under GDPR)</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages viewed and time spent on site</li>
                <li>Approximate geographic location (country/city level)</li>
              </ul>

              <p className="mb-4">
                Adsterra does <strong>not</strong> collect personally identifiable information (PII) such as your name, email, or financial data.
              </p>

              <p className="mb-4">
                For detailed information on Adsterra's data practices, please review the{' '}
                <a
                  href="https://adsterra.com/privacy-policy/"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Adsterra Privacy Policy ↗
                </a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Data Retention and Storage</h2>
              <p className="mb-4">
                We follow a <strong>minimal retention policy</strong> because we don't collect server-side data:
              </p>

              <div className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg overflow-hidden mb-4">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 dark:bg-zinc-700">
                    <tr>
                      <th className="text-left p-3 font-semibold">Data Type</th>
                      <th className="text-left p-3 font-semibold">Stored Where</th>
                      <th className="text-left p-3 font-semibold">Retention Period</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-zinc-700">
                    <tr>
                      <td className="p-3">Language Preference</td>
                      <td className="p-3">Your Browser (localStorage)</td>
                      <td className="p-3">Until you clear browser data</td>
                    </tr>
                    <tr>
                      <td className="p-3">Theme Preference</td>
                      <td className="p-3">Your Browser (localStorage)</td>
                      <td className="p-3">Until you clear browser data</td>
                    </tr>
                    <tr>
                      <td className="p-3">Cookie Consent</td>
                      <td className="p-3">Your Browser (localStorage)</td>
                      <td className="p-3">Until you clear browser data</td>
                    </tr>
                    <tr>
                      <td className="p-3">Calculator Inputs</td>
                      <td className="p-3">Your Browser Memory + URL</td>
                      <td className="p-3">Session only (not persistent)</td>
                    </tr>
                    <tr>
                      <td className="p-3">Adsterra Cookies</td>
                      <td className="p-3">Third-Party Servers</td>
                      <td className="p-3">Per Adsterra's policy (typically 30-90 days)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mb-4">
                <strong>Important:</strong> We do not maintain any server-side databases containing user data. All personal preferences are stored exclusively on your device.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Your Rights (GDPR & CCPA Compliance)</h2>
              <p className="mb-4">
                As a global service, we respect data protection regulations worldwide, including GDPR (Europe) and CCPA (California). You have the following rights:
              </p>

              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
                  <h4 className="font-semibold text-lg mb-2">🔍 Right to Access</h4>
                  <p className="text-sm">
                    You can view all data stored about you by opening your browser's Developer Tools (F12) → Application → Local Storage → rentorbuyworld.com
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-l-4 border-green-500 p-4 rounded-r-lg">
                  <h4 className="font-semibold text-lg mb-2">✏️ Right to Rectification</h4>
                  <p className="text-sm">
                    You can modify your language, theme, or consent preferences at any time through the site interface or by clearing localStorage.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border-l-4 border-red-500 p-4 rounded-r-lg">
                  <h4 className="font-semibold text-lg mb-2">🗑️ Right to Deletion ("Right to be Forgotten")</h4>
                  <p className="text-sm mb-2">
                    To delete all data we store about you:
                  </p>
                  <ol className="list-decimal pl-6 text-sm space-y-1">
                    <li>Clear your browser's localStorage for rentorbuyworld.com</li>
                    <li>Clear cookies for rentorbuyworld.com</li>
                    <li>Clear cookies for adsterra.com domains (if you accepted advertising)</li>
                  </ol>
                  <p className="text-sm mt-2">
                    <strong>Quick Method:</strong> In Chrome/Edge, press F12 → Application → Storage → "Clear site data"
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-l-4 border-purple-500 p-4 rounded-r-lg">
                  <h4 className="font-semibold text-lg mb-2">📤 Right to Data Portability</h4>
                  <p className="text-sm">
                    You can export your calculator scenarios by copying the URL parameters. All your inputs are encoded in the URL for easy sharing and backup.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-l-4 border-orange-500 p-4 rounded-r-lg">
                  <h4 className="font-semibold text-lg mb-2">🚫 Right to Object (Advertising)</h4>
                  <p className="text-sm">
                    You can decline advertising cookies by clicking "Essential Only" on our cookie banner. This will prevent Adsterra scripts from loading.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. International Data Transfers</h2>
              <p className="mb-4">
                Our website is hosted on <strong>Netlify</strong> (US-based hosting provider). When you access our site:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Static files (HTML, CSS, JavaScript) are served via Netlify's global CDN (Content Delivery Network)</li>
                <li>No personal data is transmitted to our servers during calculator usage</li>
                <li>If you accept advertising cookies, Adsterra may transfer data internationally per their privacy policy</li>
              </ul>
              <p className="mb-4">
                For EU users: Netlify complies with GDPR through Standard Contractual Clauses (SCCs). Learn more at{' '}
                <a
                  href="https://www.netlify.com/gdpr-ccpa/"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Netlify's GDPR page ↗
                </a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Children's Privacy</h2>
              <p className="mb-4">
                RentOrBuyWorld is not intended for users under the age of 16. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Changes to This Privacy Policy</h2>
              <p className="mb-4">
                We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. Updates will be posted on this page with a revised "Last Updated" date.
              </p>
              <p className="mb-4">
                <strong>Last Updated:</strong> January 8, 2026
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. How to Exercise Your Rights</h2>
              <p className="mb-4">
                Since we don't collect server-side data, most rights can be exercised directly in your browser. However, if you have questions or concerns about:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>How your data is processed</li>
                <li>Adsterra's data collection practices</li>
                <li>Filing a GDPR complaint</li>
                <li>Requesting confirmation of data deletion</li>
              </ul>
              <p className="mb-4">
                Please contact us using the information below.
              </p>
            </section>

            <section className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800 p-8 rounded-xl text-center">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                For privacy-related inquiries, data protection requests, or general questions:
              </p>
              <div className="space-y-2">
                <p className="text-lg">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:privacy@rentorbuyworld.com" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                    privacy@rentorbuyworld.com
                  </a>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                  We aim to respond to all privacy requests within 30 days as required by GDPR.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}