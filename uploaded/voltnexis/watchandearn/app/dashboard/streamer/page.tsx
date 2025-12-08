'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Play, Users, DollarSign, BarChart3, Plus, Settings, Eye } from 'lucide-react'

export default function StreamerDashboard() {
  const [user, setUser] = useState<any>(null)
  const [showCreateStream, setShowCreateStream] = useState(false)
  const [stats, setStats] = useState({ totalStreams: 0, totalViewers: 0, revenue: 0, avgWatchTime: 0 })
  const [recentStreams, setRecentStreams] = useState<any[]>([])
  const [streamData, setStreamData] = useState({
    title: '',
    category: 'Gaming',
    description: ''
  })

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        window.location.href = '/auth/streamer-login'
        return
      }
      
      // Check if user is a streamer
      const { data: userData } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()
      
      if (userData?.role !== 'STREAMER') {
        window.location.href = '/auth/streamer-login'
        return
      }
      
      setUser(user)
      
      // Fetch real stats
      const { data: streams } = await supabase
        .from('streams')
        .select('*')
        .eq('owner_id', user.id)
      
      const { data: sessions } = await supabase
        .from('watch_sessions')
        .select('*')
        .in('stream_id', streams?.map(s => s.id) || [])
      
      setStats({
        totalStreams: streams?.length || 0,
        totalViewers: sessions?.length || 0,
        avgWatchTime: sessions?.reduce((sum, s) => sum + s.verified_minutes, 0) / (sessions?.length || 1) || 0
      })
      
      setRecentStreams(streams?.slice(0, 3) || [])
    }
    getUser()
  }, [])

  const handleCreateStream = async () => {
    if (!streamData.title) {
      alert('Please enter a stream title')
      return
    }

    try {
      // Check if user has active plan
      const { data: streamer } = await supabase
        .from('streamers')
        .select('plan, plan_expires_at')
        .eq('user_id', user.id)
        .single()
      
      if (!streamer || streamer.plan === 'NONE') {
        alert('Please subscribe to a streaming plan first!')
        window.location.href = '/settings'
        return
      }
      
      // Check if plan is expired
      if (streamer.plan_expires_at && new Date(streamer.plan_expires_at) < new Date()) {
        alert('Your streaming plan has expired. Please renew your subscription.')
        window.location.href = '/settings'
        return
      }

      // First ensure user exists in users table
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('id', user.id)
        .single()
      
      if (!existingUser) {
        // Create user record if doesn't exist
        await supabase
          .from('users')
          .insert([
            {
              id: user.id,
              email: user.email,
              role: 'STREAMER'
            }
          ])
      }

      const { data, error } = await supabase
        .from('streams')
        .insert([
          {
            owner_id: user.id,
            title: streamData.title,
            category: streamData.category,
            status: 'SCHEDULED',
            provider: 'LIVEPEER'
          }
        ])
        .select()

      if (error) throw error

      alert('Stream created successfully!')
      setShowCreateStream(false)
      setStreamData({ title: '', category: 'Gaming', description: '' })
      window.location.reload()
    } catch (error: any) {
      alert('Error: ' + error.message)
    }
  }

  const statsDisplay = [
    { label: 'Total Streams', value: stats.totalStreams.toString(), icon: Play, color: 'from-blue-500 to-cyan-600' },
    { label: 'Total Viewers', value: stats.totalViewers.toLocaleString(), icon: Users, color: 'from-green-500 to-emerald-600' },
    { label: 'Avg. Watch Time', value: `${Math.round(stats.avgWatchTime)}m`, icon: BarChart3, color: 'from-yellow-500 to-orange-600' }
  ]



  if (!user) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Streamer Dashboard
            </h1>
            <p className="text-gray-600 mt-1">Welcome back, {user.email?.split('@')[0]}!</p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={() => setShowCreateStream(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Stream
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {statsDisplay.map((stat, index) => (
            <Card key={index} className={`bg-gradient-to-br ${stat.color} text-white border-0 shadow-lg`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className="w-8 h-8 text-white/80" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {showCreateStream && (
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Create New Stream
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Stream Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter stream title"
                    value={streamData.title}
                    onChange={(e) => setStreamData({...streamData, title: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={streamData.category}
                    onChange={(e) => setStreamData({...streamData, category: e.target.value})}
                  >
                    <option value="Gaming">Gaming</option>
                    <option value="Music">Music</option>
                    <option value="Technology">Technology</option>
                    <option value="Education">Education</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Entertainment">Entertainment</option>
                  </select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <textarea
                  id="description"
                  className="w-full p-2 border border-gray-300 rounded-md h-20 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe your stream..."
                  value={streamData.description}
                  onChange={(e) => setStreamData({...streamData, description: e.target.value})}
                />
              </div>
              
              <div className="flex gap-3">
                <Button onClick={handleCreateStream} className="bg-green-600 hover:bg-green-700">
                  Create Stream
                </Button>
                <Button variant="outline" onClick={() => setShowCreateStream(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                Recent Streams
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentStreams.length > 0 ? recentStreams.map((stream) => (
                  <div key={stream.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium">{stream.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {Math.floor(Math.random() * 500)}
                        </span>
                        <span>{stream.category}</span>
                        <span>{new Date(stream.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      stream.status === 'ENDED' ? 'bg-gray-200 text-gray-700' :
                      stream.status === 'LIVE' ? 'bg-red-200 text-red-700' :
                      'bg-blue-200 text-blue-700'
                    }`}>
                      {stream.status.toLowerCase()}
                    </span>
                  </div>
                )) : (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-2">🎥</div>
                    <p>No streams yet</p>
                    <p className="text-sm">Create your first stream to get started</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={async () => {
                  const { data: streamer } = await supabase
                    .from('streamers')
                    .select('plan')
                    .eq('user_id', user.id)
                    .single()
                  
                  if (!streamer || streamer.plan === 'NONE') {
                    alert('Please subscribe to a plan first to go live!')
                    window.location.href = '/settings'
                  } else {
                    window.location.href = '/go-live'
                  }
                }}
              >
                <Play className="w-4 h-4 mr-2" />
                Go Live Now
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => window.location.href = '/analytics'}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => window.location.href = '/settings'}
              >
                <Settings className="w-4 h-4 mr-2" />
                Stream Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}