export default function RefundPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-8">Refund Policy</h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">Last updated: January 15, 2024</p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Refund Eligibility</h2>
              <p className="mb-4">
                We offer refunds for streaming fees under the following conditions:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Technical issues preventing stream from starting</li>
                <li>Platform downtime during scheduled stream</li>
                <li>Stream duration less than 10 minutes due to platform issues</li>
                <li>Unauthorized charges on your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Refund Timeline</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Refund requests must be made within 30 days of payment</li>
                <li>Automatic refunds for technical issues within 24 hours</li>
                <li>Manual review refunds processed within 5-7 business days</li>
                <li>Refund amount credited to original payment method</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Non-Refundable Situations</h2>
              <p className="mb-4">Refunds will not be provided for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Completed streams with normal functionality</li>
                <li>Low viewer count or engagement</li>
                <li>Content policy violations</li>
                <li>User error or technical issues on user's end</li>
                <li>Change of mind after stream completion</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Refund Process</h2>
              <h3 className="text-lg font-medium mb-2">How to Request a Refund</h3>
              <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li>Contact our support team at support@watchearn.com</li>
                <li>Provide your transaction ID and reason for refund</li>
                <li>Include any relevant screenshots or evidence</li>
                <li>Wait for our team to review your request</li>
              </ol>
              
              <h3 className="text-lg font-medium mb-2">Required Information</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Account email address</li>
                <li>Transaction/Payment ID</li>
                <li>Date and time of the issue</li>
                <li>Detailed description of the problem</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Partial Refunds</h2>
              <p className="mb-4">
                In some cases, we may offer partial refunds based on:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Actual stream duration vs. paid duration</li>
                <li>Severity of technical issues</li>
                <li>Impact on viewer experience</li>
                <li>Platform downtime duration</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Subscription Refunds</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Monthly subscriptions: Pro-rated refund for unused days</li>
                <li>Annual subscriptions: Full refund within 7 days of purchase</li>
                <li>Cancellation takes effect at the end of current billing period</li>
                <li>No refund for partially used subscription periods</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Processing Time</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Credit/Debit Cards: 5-10 business days</li>
                <li>UPI/Net Banking: 3-5 business days</li>
                <li>Digital Wallets: 1-3 business days</li>
                <li>Bank transfers may take additional time</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Dispute Resolution</h2>
              <p className="mb-4">
                If you're not satisfied with our refund decision, you can:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Escalate to our senior support team</li>
                <li>Request a detailed explanation</li>
                <li>Provide additional evidence</li>
                <li>Contact your payment provider for chargeback</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
              <p className="mb-4">
                For refund requests and questions:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email: support@watchearn.com</li>
                <li>Response time: Within 24 hours</li>
                <li>Phone support: Available for premium users</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Policy Updates</h2>
              <p className="mb-4">
                This refund policy may be updated from time to time. Users will be notified of significant changes via email or platform notifications.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}