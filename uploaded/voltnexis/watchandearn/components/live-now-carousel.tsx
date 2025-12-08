'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Eye, Star, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface LiveStream {
  id: string
  title: string
  thumbnail: string
  viewerCount: number
  isVerified: boolean
  isFeatured: boolean
  category: string
}

export function LiveNowCarousel() {
  const [streams, setStreams] = useState<LiveStream[]>([])

  useEffect(() => {
    const fetchStreams = async () => {
      const { data } = await supabase
        .from('streams')
        .select('*')
        .eq('status', 'LIVE')
        .limit(6)
      
      if (data) {
        const formattedStreams = data.map(stream => ({
          id: stream.id,
          title: stream.title,
          thumbnail: '/api/placeholder/320/180',
          viewerCount: Math.floor(Math.random() * 2000) + 100,
          isVerified: Math.random() > 0.5,
          isFeatured: stream.is_featured,
          category: stream.category
        }))
        setStreams(formattedStreams)
      } else {
        // Fallback mock data
        setStreams([
          {
            id: '1',
            title: 'Gaming Session - Valorant Ranked',
            thumbnail: '/api/placeholder/320/180',
            viewerCount: 1234,
            isVerified: true,
            isFeatured: true,
            category: 'Gaming'
          },
          {
            id: '2',
            title: 'Cooking Show - Indian Recipes',
            thumbnail: '/api/placeholder/320/180',
            viewerCount: 567,
            isVerified: false,
            isFeatured: false,
            category: 'Lifestyle'
          }
        ])
      }
    }
    fetchStreams()
  }, [])

  return (
    <section id="live-now-section" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Live Now
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {streams.map((stream, index) => (
            <motion.div
              key={stream.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Stream Thumbnail</span>
                </div>
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                  LIVE
                </div>
                <div className="absolute top-2 right-2 flex gap-1">
                  {stream.isFeatured && (
                    <div className="bg-yellow-500 text-white p-1 rounded">
                      <Star className="w-4 h-4" />
                    </div>
                  )}
                  {stream.isVerified && (
                    <div className="bg-blue-500 text-white p-1 rounded">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold mb-2 line-clamp-2">{stream.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <span className="bg-gray-100 px-2 py-1 rounded">{stream.category}</span>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{stream.viewerCount.toLocaleString()}</span>
                  </div>
                </div>
                <Button 
                  className="w-full"
                  onClick={async () => {
                    const { data: { user } } = await supabase.auth.getUser()
                    if (user) {
                      window.location.href = `/live/${stream.id}`
                    } else {
                      window.location.href = '/auth/sign-in'
                    }
                  }}
                >
                  Watch & Earn
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}