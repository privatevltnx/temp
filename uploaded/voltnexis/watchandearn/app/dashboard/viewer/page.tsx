'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ViewerDashboard() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        window.location.href = '/auth/sign-in'
        return
      }
      setUser(user)
    }
    getUser()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  if (!user) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Viewer Dashboard
            </h1>
            <p className="text-gray-600 mt-1">Welcome back, {user.email?.split('@')[0]}!</p>
          </div>
          <Button onClick={handleSignOut} variant="outline" className="self-end sm:self-auto">
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                💰 Wallet Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">₹0.00</div>
              <p className="text-green-100 text-sm">Available to withdraw</p>
              <Button 
                className="mt-3 bg-white text-green-600 hover:bg-gray-100 text-sm" 
                size="sm"
                onClick={() => window.location.href = '/wallet'}
              >
                Withdraw
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                🔥 Watch Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">0 days</div>
              <p className="text-blue-100 text-sm">Current streak</p>
              <div className="mt-3 bg-blue-400 rounded-full h-2">
                <div className="bg-white h-2 rounded-full w-0"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                💎 Total Earned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">₹0.00</div>
              <p className="text-purple-100 text-sm">Lifetime earnings</p>
              <div className="flex items-center mt-3 text-sm">
                <span className="text-purple-200">Rank: Beginner</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📺 Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => window.location.href = '/browse'}
              >
                Browse Live Streams
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={async () => {
                  const { data: sessions } = await supabase
                    .from('watch_sessions')
                    .select('*, streams(title)')
                    .eq('user_id', user.id)
                    .order('started_at', { ascending: false })
                    .limit(5)
                  
                  if (sessions && sessions.length > 0) {
                    const history = sessions.map(s => 
                      `${s.streams?.title || 'Stream'} - ${s.verified_minutes}min - ₹${(s.earned_paise/100).toFixed(2)}`
                    ).join('\n')
                    alert(`Recent Watch History:\n\n${history}`)
                  } else {
                    alert('No watch history found. Start watching streams to build your history!')
                  }
                }}
              >
                View Watch History
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.location.href = '/wallet'}
              >
                Manage Wallet
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📊 Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">🎬</div>
                <p>No recent activity</p>
                <p className="text-sm">Start watching streams to see your activity here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}