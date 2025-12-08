export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">Last updated: January 15, 2024</p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
              <h3 className="text-lg font-medium mb-2">Personal Information</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Email address and username</li>
                <li>Payment information (processed securely by Razorpay)</li>
                <li>UPI details for withdrawals</li>
                <li>KYC documents when required</li>
              </ul>
              
              <h3 className="text-lg font-medium mb-2">Usage Information</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Watch time and engagement data</li>
                <li>Device information and IP address</li>
                <li>Browser type and operating system</li>
                <li>Streaming preferences and history</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide and improve our services</li>
                <li>To calculate and process earnings</li>
                <li>To prevent fraud and ensure security</li>
                <li>To communicate important updates</li>
                <li>To comply with legal requirements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
              <p className="mb-4">We do not sell your personal information. We may share information with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payment processors (Razorpay) for transactions</li>
                <li>Service providers who assist our operations</li>
                <li>Law enforcement when legally required</li>
                <li>Business partners with your consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
              <p className="mb-4">
                We implement industry-standard security measures to protect your information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encryption of sensitive data</li>
                <li>Secure payment processing</li>
                <li>Regular security audits</li>
                <li>Access controls and monitoring</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Cookies and Tracking</h2>
              <p className="mb-4">
                We use cookies and similar technologies to enhance your experience and for analytics purposes. You can control cookie preferences in your browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Delete your account and data</li>
                <li>Opt-out of marketing communications</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Children's Privacy</h2>
              <p className="mb-4">
                Our service is not intended for children under 18. We do not knowingly collect personal information from children.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. International Transfers</h2>
              <p className="mb-4">
                Your information may be transferred to and processed in countries other than your own, with appropriate safeguards in place.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Changes to Privacy Policy</h2>
              <p className="mb-4">
                We may update this privacy policy from time to time. We will notify you of any material changes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
              <p className="mb-4">
                For privacy-related questions, contact us at privacy@watchearn.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}