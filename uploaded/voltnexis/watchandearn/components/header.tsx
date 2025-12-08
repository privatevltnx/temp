'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, Play, Wallet } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <Play className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold">Watch & Earn</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/pricing" className="text-gray-700 hover:text-blue-600">
              Pricing
            </Link>
            <Link href="/support/faq" className="text-gray-700 hover:text-blue-600">
              FAQ
            </Link>
            <Link href="/support/contact" className="text-gray-700 hover:text-blue-600">
              Support
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link href="/dashboard/viewer">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
              </>
            ) : (
              <>
                <Link href="/auth/sign-in">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/auth/sign-up">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-4">
              <Link href="/pricing" className="text-gray-700 hover:text-blue-600">
                Pricing
              </Link>
              <Link href="/support/faq" className="text-gray-700 hover:text-blue-600">
                FAQ
              </Link>
              <Link href="/support/contact" className="text-gray-700 hover:text-blue-600">
                Support
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t">
                {user ? (
                  <>
                    <Link href="/dashboard/viewer">
                      <Button variant="ghost" className="w-full">Dashboard</Button>
                    </Link>
                    <Button variant="outline" className="w-full" onClick={handleSignOut}>Sign Out</Button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/sign-in">
                      <Button variant="ghost" className="w-full">Sign In</Button>
                    </Link>
                    <Link href="/auth/sign-up">
                      <Button className="w-full">Get Started</Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}