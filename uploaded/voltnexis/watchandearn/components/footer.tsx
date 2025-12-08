import Link from 'next/link'
import { Play } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Play className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold">Watch & Earn</span>
            </Link>
            <p className="text-gray-400">
              The first platform where viewers earn real money for watching live streams.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
              <li><Link href="/support/faq" className="hover:text-white">FAQ</Link></li>
              <li><Link href="/support/contact" className="hover:text-white">Support</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/legal/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/legal/refund" className="hover:text-white">Refund Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
              <li><Link href="/press" className="hover:text-white">Press</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Watch & Earn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}