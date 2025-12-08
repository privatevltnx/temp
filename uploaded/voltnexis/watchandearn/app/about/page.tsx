export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            About Watch & Earn
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The world's first platform where viewers earn real money for watching live streams, 
            while streamers pay to reach engaged audiences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We believe that attention has value. Every minute you spend watching content creates value 
              for creators and advertisers, and you should be rewarded for that attention.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Watch & Earn revolutionizes the streaming economy by creating a fair ecosystem where 
              viewers are compensated for their time and engagement, while streamers get access to 
              genuinely interested audiences.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">How It Works</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <h3 className="font-semibold">Streamers Pay to Go Live</h3>
                  <p className="text-gray-600 text-sm">Content creators pay a fee to unlock streaming capabilities</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <h3 className="font-semibold">Viewers Watch & Earn</h3>
                  <p className="text-gray-600 text-sm">Viewers earn money for verified watch time and engagement</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <h3 className="font-semibold">Everyone Benefits</h3>
                  <p className="text-gray-600 text-sm">Streamers get engaged audiences, viewers get paid, platform grows</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Why Choose Watch & Earn?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Real Money</h3>
              <p className="text-gray-600">Earn actual cash that you can withdraw to your bank account via UPI</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Anti-Fraud</h3>
              <p className="text-gray-600">Advanced algorithms ensure fair earnings and prevent fraudulent activities</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Payouts</h3>
              <p className="text-gray-600">Withdraw your earnings within 24 hours directly to your UPI account</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Revolution</h2>
          <p className="text-xl mb-6 text-blue-100">
            Be part of the future where your attention is valued and rewarded
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/auth/sign-up" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Earning Today
            </a>
            <a href="/pricing" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Become a Streamer
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}