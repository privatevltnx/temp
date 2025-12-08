'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Eye, Star, CheckCircle, Search } from 'lucide-react'

export default function BrowsePage() {
  const [streams, setStreams] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Gaming', 'Music', 'Technology', 'Education', 'Lifestyle', 'Entertainment']

  useEffect(() => {
    const fetchStreams = async () => {
      const { data } = await supabase
        .from('streams')
        .select('*')
        .eq('status', 'LIVE')
      
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
      }
    }
    fetchStreams()
  }, [])

  const filteredStreams = streams.filter(stream => {
    const matchesSearch = stream.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || stream.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Browse Live Streams
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search streams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStreams.map((stream) => (
            <Card key={stream.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
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
              
              <CardContent className="p-4">
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
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStreams.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-xl font-semibold mb-2">No streams found</h3>
            <p className="text-gray-600">Try adjusting your search or category filter</p>
          </div>
        )}
      </div>
    </div>
  )
}