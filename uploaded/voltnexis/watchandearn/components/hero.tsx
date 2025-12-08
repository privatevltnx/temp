'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export function Hero() {
  return (
    <section className="relative py-20 px-4 text-center bg-gradient-to-br from-blue-600 to-purple-700 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Watch & Earn
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          The first platform where viewers earn real money for watching live streams
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100"
            onClick={() => {
              const liveSection = document.getElementById('live-now-section')
              if (liveSection) {
                liveSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
          >
            Start Watching & Earning
          </Button>
          <Link href="/pricing">
            <Button size="lg" className="bg-white/20 text-white border border-white/30 hover:bg-white hover:text-blue-600">
              Go Live (Paid)
            </Button>
          </Link>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
            onClick={async () => {
              const { data: { user } } = await supabase.auth.getUser()
              if (user) {
                // Check if user is a streamer
                const { data: userData } = await supabase
                  .from('users')
                  .select('role')
                  .eq('id', user.id)
                  .single()
                
                if (userData?.role === 'STREAMER') {
                  window.location.href = '/dashboard/streamer'
                } else {
                  window.location.href = '/auth/streamer-login'
                }
              } else {
                window.location.href = '/auth/streamer-signup'
              }
            }}
          >
            Streamer Dashboard
          </Button>
        </div>
      </motion.div>
    </section>
  )
}