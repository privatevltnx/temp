'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, Heart, Share2, Flag } from 'lucide-react'

export default function LiveStreamPage() {
  const params = useParams()
  const [user, setUser] = useState<any>(null)
  const [stream, setStream] = useState<any>(null)
  const [earnings, setEarnings] = useState(0)
  const [watchTime, setWatchTime] = useState(0)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (!user) {
        setTimeout(() => {
          window.location.href = '/auth/sign-in'
        }, 100)
        return
      }
    }
    checkAuth()

    setStream({
      id: params.id,
      title: 'Live Gaming Session - Valorant Ranked',
      category: 'Gaming',
      viewerCount: 1234,
      isLive: true
    })

    const timer = setInterval(() => {
      setWatchTime(prev => prev + 1)
      if (watchTime % 60 === 0) {
        setEarnings(prev => prev + 0.5)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [params.id, watchTime])

  if (!user) return <div>Redirecting...</div>
  if (!stream) return <div>Loading stream...</div>

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="aspect-video bg-black rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-white rounded-full animate-pulse"></div>
                </div>
                <p className="text-xl">Live Stream Player</p>
                <p className="text-gray-400">Stream ID: {params.id}</p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-bold">{stream.title}</h1>
                <div className="flex items-center gap-2">
                  <span className="bg-red-600 px-2 py-1 rounded text-sm">LIVE</span>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{stream.viewerCount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="bg-purple-600 px-3 py-1 rounded">{stream.category}</span>
                <Button variant="outline" size="sm">
                  <Heart className="w-4 h-4 mr-1" />
                  Like
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Card className="bg-gradient-to-br from-green-600 to-emerald-700 text-white border-0">
              <CardHeader>
                <CardTitle>💰 Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">₹{earnings.toFixed(2)}</div>
                <p className="text-green-100">This session</p>
                <div className="mt-2 text-sm">
                  <p>Watch time: {Math.floor(watchTime / 60)}m {watchTime % 60}s</p>
                  <p>Rate: ₹0.50/min</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-600 text-white border-0">
              <CardHeader>
                <CardTitle>🎯 Stay Active!</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3">Click to verify you're watching</p>
                <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">
                  I'm Watching! ✓
                </Button>
                <p className="text-xs mt-2 text-blue-100">Next check in 4:32</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 text-white border-gray-700">
              <CardHeader>
                <CardTitle>💬 Live Chat</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4 h-64 overflow-y-auto">
                  <div className="text-sm">
                    <span className="text-blue-400">User123:</span> Great stream!
                  </div>
                  <div className="text-sm">
                    <span className="text-green-400">Viewer456:</span> How do I earn more?
                  </div>
                </div>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-700 rounded px-3 py-2 text-sm"
                  />
                  <Button size="sm">Send</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}