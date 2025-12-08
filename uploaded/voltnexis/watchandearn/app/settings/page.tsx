'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Settings, Crown, Zap, Star, CreditCard } from 'lucide-react'

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [streamerData, setStreamerData] = useState<any>(null)

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
      
      // Check streamer subscription
      const { data: streamer } = await supabase
        .from('streamers')
        .select('*')
        .eq('user_id', user.id)
        .single()
      
      setStreamerData(streamer)
    }
    getUser()
  }, [])

  const plans = [
    {
      name: 'Basic Stream',
      price: 199,
      duration: 'per session',
      features: ['Up to 2 hours', '720p quality', 'Basic analytics'],
      icon: <Zap className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      name: 'Pro Stream', 
      price: 499,
      duration: 'per session',
      features: ['Up to 4 hours', '1080p quality', 'Advanced analytics'],
      icon: <Star className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-600'
    },
    {
      name: 'Monthly Pro',
      price: 1999,
      duration: 'per month',
      features: ['Unlimited sessions', '4K quality', 'Full analytics'],
      icon: <Crown className="w-6 h-6" />,
      color: 'from-yellow-500 to-orange-600'
    }
  ]

  if (!user) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Streamer Settings
          </h1>
          <p className="text-gray-600">Manage your streaming subscription and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Current Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              {streamerData?.plan && streamerData.plan !== 'NONE' ? (
                <div>
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    {streamerData.plan === 'PER_STREAM' ? 'Per Session' : 'Monthly Pro'}
                  </div>
                  <p className="text-gray-600 mb-4">
                    {streamerData.plan_expires_at ? 
                      `Expires: ${new Date(streamerData.plan_expires_at).toLocaleDateString()}` :
                      'Active subscription'
                    }
                  </p>
                  <Button variant="outline" className="w-full">
                    Manage Subscription
                  </Button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="text-4xl mb-2">⚠️</div>
                  <h3 className="font-semibold mb-2">No Active Plan</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    You need a subscription to create streams
                  </p>
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    Choose Plan
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Upgrade Your Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className={`bg-gradient-to-br ${plan.color} text-white`}>
                    <div className="flex items-center gap-2 mb-2">
                      {plan.icon}
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                    </div>
                    <div>
                      <span className="text-2xl font-bold">₹{plan.price}</span>
                      <span className="text-white/80 ml-2">{plan.duration}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <ul className="space-y-2 mb-4">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="text-sm text-gray-600">• {feature}</li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full"
                      onClick={() => {
                        const planType = plan.name === 'Basic Stream' ? 'basic' : 
                                       plan.name === 'Pro Stream' ? 'pro' : 'monthly'
                        window.location.href = `/payment/streamer?plan=${planType}`
                      }}
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="justify-start"
                onClick={() => window.location.href = '/profile'}
              >
                Profile Settings
              </Button>
              <Button 
                variant="outline" 
                className="justify-start"
                onClick={() => window.location.href = '/profile'}
              >
                Notification Preferences
              </Button>
              <Button 
                variant="outline" 
                className="justify-start"
                onClick={() => window.location.href = '/profile'}
              >
                Payment Methods
              </Button>
              <Button 
                variant="outline" 
                className="justify-start"
                onClick={() => window.location.href = '/profile'}
              >
                Privacy Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}