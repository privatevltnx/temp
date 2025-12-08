'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, Users, Play, TrendingUp, Eye, Clock, DollarSign } from 'lucide-react'

export default function AnalyticsPage() {
  const [user, setUser] = useState<any>(null)
  const [analytics, setAnalytics] = useState<any>({
    totalStreams: 0,
    totalViews: 0,
    totalWatchTime: 0,
    avgViewers: 0,
    topStream: null,
    recentStreams: []
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
      
      // Fetch analytics data
      const { data: streams } = await supabase
        .from('streams')
        .select('*, watch_sessions(*)')
        .eq('owner_id', user.id)
      
      if (streams) {
        const totalStreams = streams.length
        const totalViews = streams.reduce((sum, s) => sum + (s.watch_sessions?.length || 0), 0)
        const totalWatchTime = streams.reduce((sum, s) => 
          sum + (s.watch_sessions?.reduce((time: number, ws: any) => time + (ws.verified_minutes || 0), 0) || 0), 0
        )
        
        setAnalytics({
          totalStreams,
          totalViews,
          totalWatchTime,
          avgViewers: totalViews / (totalStreams || 1),
          topStream: streams.sort((a, b) => (b.watch_sessions?.length || 0) - (a.watch_sessions?.length || 0))[0],
          recentStreams: streams.slice(0, 5)
        })
      }
    }
    getUser()
  }, [])

  if (!user) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Stream Analytics
          </h1>
          <p className="text-gray-600">Track your streaming performance and audience engagement</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Streams</p>
                  <p className="text-3xl font-bold">{analytics.totalStreams}</p>
                </div>
                <Play className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Total Views</p>
                  <p className="text-3xl font-bold">{analytics.totalViews}</p>
                </div>
                <Eye className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Watch Time</p>
                  <p className="text-3xl font-bold">{Math.round(analytics.totalWatchTime / 60)}h</p>
                </div>
                <Clock className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm">Avg Viewers</p>
                  <p className="text-3xl font-bold">{Math.round(analytics.avgViewers)}</p>
                </div>
                <Users className="w-8 h-8 text-yellow-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Top Performing Stream
              </CardTitle>
            </CardHeader>
            <CardContent>
              {analytics.topStream ? (
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">{analytics.topStream.title}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Category:</span>
                      <p className="font-medium">{analytics.topStream.category}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Views:</span>
                      <p className="font-medium">{analytics.topStream.watch_sessions?.length || 0}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Status:</span>
                      <p className="font-medium capitalize">{analytics.topStream.status.toLowerCase()}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Created:</span>
                      <p className="font-medium">{new Date(analytics.topStream.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <BarChart3 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No streams yet</p>
                  <p className="text-sm">Create your first stream to see analytics</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Streams Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.recentStreams.length > 0 ? analytics.recentStreams.map((stream: any) => (
                  <div key={stream.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">{stream.title}</h4>
                      <p className="text-sm text-gray-600">{stream.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{stream.watch_sessions?.length || 0} views</p>
                      <p className="text-sm text-gray-600 capitalize">{stream.status.toLowerCase()}</p>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8 text-gray-500">
                    <Play className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No recent streams</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}