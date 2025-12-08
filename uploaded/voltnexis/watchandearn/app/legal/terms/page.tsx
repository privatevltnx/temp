export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">Last updated: January 15, 2024</p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing and using Watch & Earn platform, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. User Accounts</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>You must be at least 18 years old to create an account</li>
                <li>You are responsible for maintaining the confidentiality of your account</li>
                <li>You agree to provide accurate and complete information</li>
                <li>One account per person is allowed</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Viewer Terms</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Earnings are based on verified watch time and engagement</li>
                <li>Fraudulent activities will result in account suspension</li>
                <li>Minimum withdrawal amount is ₹100</li>
                <li>KYC verification required for withdrawals above ₹2000/month</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Streamer Terms</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payment required before streaming</li>
                <li>Content must comply with community guidelines</li>
                <li>No illegal, harmful, or inappropriate content</li>
                <li>Refunds available within 30 days under specific conditions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Prohibited Activities</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Creating multiple accounts</li>
                <li>Using bots or automated systems</li>
                <li>Sharing account credentials</li>
                <li>Attempting to manipulate earnings</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Privacy and Data</h2>
              <p className="mb-4">
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
              <p className="mb-4">
                Watch & Earn shall not be liable for any indirect, incidental, special, consequential, or punitive damages.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right to modify these terms at any time. Users will be notified of significant changes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
              <p className="mb-4">
                For questions about these Terms of Service, please contact us at legal@watchearn.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}