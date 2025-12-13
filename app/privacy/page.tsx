import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy - RentOrBuy-Pro',
  description: 'Privacy Policy for RentOrBuy-Pro. Learn about how we use cookies, Google AdSense, and Analytics.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-gray-600">Last Updated: December 5, 2025</p>
          </div>

          {/* Content */}
          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Welcome to RentOrBuy-Pro (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). We are committed to protecting your privacy and being transparent about our data practices. This Privacy Policy explains how we collect, use, and protect information when you use our website and financial calculator tools.
              </p>
              <p className="text-gray-700">
                By using RentOrBuy-Pro, you agree to the collection and use of information in accordance with this policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Anonymous Calculator Inputs</h3>
              <p className="text-gray-700 mb-4">
                When you use our rent vs. buy calculator, all inputs (home prices, rent amounts, interest rates, etc.) are processed <strong>entirely in your browser</strong>. We do not collect, store, or transmit your calculator inputs to our servers. Your financial data remains completely private and anonymous.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Cookies and Tracking Technologies</h3>
              <p className="text-gray-700 mb-4">
                We use cookies and similar tracking technologies to enhance your experience and analyze website traffic. These include:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for basic website functionality (e.g., language preference, cookie consent).</li>
                <li><strong>Analytics Cookies:</strong> Google Analytics tracks anonymous usage statistics to help us understand how visitors use our site.</li>
                <li><strong>Advertising Cookies:</strong> Google AdSense displays relevant advertisements based on your browsing behavior.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.3 Automatically Collected Information</h3>
              <p className="text-gray-700 mb-4">
                We automatically collect certain technical information when you visit our website:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>IP address (anonymized)</li>
                <li>Browser type and version</li>
                <li>Device information (desktop, mobile, tablet)</li>
                <li>Pages visited and time spent on site</li>
                <li>Referring website (how you found us)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>To Provide Our Service:</strong> Enable calculator functionality and display city-specific financial data.</li>
                <li><strong>To Improve User Experience:</strong> Analyze usage patterns to enhance our website and tools.</li>
                <li><strong>To Display Advertisements:</strong> Show relevant ads via Google AdSense to support our free service.</li>
                <li><strong>To Comply with Legal Obligations:</strong> Respond to legal requests and prevent fraud or abuse.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Third-Party Services</h2>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Google Analytics</h3>
              <p className="text-gray-700 mb-4">
                We use Google Analytics to understand how visitors interact with our website. Google Analytics collects information anonymously and reports website trends without identifying individual visitors. You can opt out of Google Analytics by installing the{' '}
                <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  Google Analytics Opt-out Browser Add-on
                </a>.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.2 Google AdSense</h3>
              <p className="text-gray-700 mb-4">
                We use Google AdSense to display advertisements on our website. Google may use cookies to serve ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting{' '}
                <a href="https://www.google.com/settings/ads" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  Google Ad Settings
                </a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We take reasonable measures to protect your information from unauthorized access, alteration, disclosure, or destruction. However, no method of internet transmission or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Privacy Rights</h2>
              <p className="text-gray-700 mb-4">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Right to Access:</strong> Request information about the data we collect.</li>
                <li><strong>Right to Deletion:</strong> Request deletion of your data (note: we do not store calculator inputs).</li>
                <li><strong>Right to Opt-Out:</strong> Disable cookies via your browser settings or opt out of targeted advertising.</li>
                <li><strong>GDPR Rights (EU Residents):</strong> Right to data portability, rectification, and restriction of processing.</li>
                <li><strong>CCPA Rights (California Residents):</strong> Right to know what personal information is collected and right to opt out of sale (we do not sell personal data).</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Children&apos;s Privacy</h2>
              <p className="text-gray-700 mb-4">
                Our service is not directed to children under the age of 13 (or 16 in the EU). We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us, and we will take steps to delete such information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. International Data Transfers</h2>
              <p className="text-gray-700 mb-4">
                Your information may be transferred to and processed in countries other than your own. These countries may have different data protection laws than your jurisdiction. By using our service, you consent to such transfers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &ldquo;Last Updated&rdquo; date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 font-medium">RentOrBuy-Pro Privacy Team</p>
                <p className="text-gray-700">Email: efwfew1611@gmail.com</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Disclaimer</h2>
              <p className="text-gray-700">
                RentOrBuy-Pro provides financial calculators and information for educational purposes only. We are not financial advisors, and our tools should not be considered financial advice. Always consult with a qualified financial professional before making major financial decisions.
              </p>
            </section>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
