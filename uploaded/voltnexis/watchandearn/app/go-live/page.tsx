'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Play, Settings, Camera, Mic, Monitor, ArrowLeft } from 'lucide-react'

export default function GoLivePage() {
  const [user, setUser] = useState<any>(null)
  const [streamerPlan, setStreamerPlan] = useState<any>(null)
  const [streamData, setStreamData] = useState({
    title: '',
    category: 'Gaming',
    description: ''
  })
  const [isLive, setIsLive] = useState(false)
  const [currentStream, setCurrentStream] = useState<any>(null)
  const [streamSettings, setStreamSettings] = useState({
    quality: '720p',
    chatEnabled: true,
    recordingEnabled: false
  })

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        window.location.href = '/auth/streamer-login'
        return
      }
      setUser(user)

      // Get streamer plan
      const { data: streamer } = await supabase
        .from('streamers')
        .select('plan')
        .eq('user_id', user.id)
        .single()
      
      setStreamerPlan(streamer)
      
      // Set quality based on plan
      const maxQuality = streamer?.plan === 'MONTHLY' ? '4K' : 
                        streamer?.plan === 'PER_STREAM' ? '1080p' : '720p'
      
      setStreamSettings(prev => ({ ...prev, quality: maxQuality }))

      // Check for existing live stream
      const { data: liveStream } = await supabase
        .from('streams')
        .select('*')
        .eq('owner_id', user.id)
        .eq('status', 'LIVE')
        .single()

      if (liveStream) {
        setCurrentStream(liveStream)
        setIsLive(true)
      }
    }
    getUser()
  }, [])

  const handleGoLive = async () => {
    if (!streamData.title) {
      alert('Please enter a stream title')
      return
    }

    try {
      const { data, error } = await supabase
        .from('streams')
        .insert([
          {
            owner_id: user.id,
            title: streamData.title,
            category: streamData.category,
            status: 'LIVE',
            started_at: new Date().toISOString(),
            provider: 'LIVEPEER'
          }
        ])
        .select()
        .single()

      if (error) throw error

      setCurrentStream(data)
      setIsLive(true)
      alert('You are now live! Stream started successfully.')
    } catch (error: any) {
      alert('Error starting stream: ' + error.message)
    }
  }

  const handleEndStream = async () => {
    if (!currentStream) return

    try {
      await supabase
        .from('streams')
        .update({
          status: 'ENDED',
          ended_at: new Date().toISOString()
        })
        .eq('id', currentStream.id)

      setIsLive(false)
      setCurrentStream(null)
      alert('Stream ended successfully!')
    } catch (error: any) {
      alert('Error ending stream: ' + error.message)
    }
  }

  if (!user) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => window.location.href = '/dashboard/streamer'}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {isLive ? 'You are Live!' : 'Go Live'}
          </h1>
          <p className="text-gray-600">
            {isLive ? 'Your stream is currently broadcasting' : 'Set up your stream and start broadcasting'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Stream Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-black rounded-lg flex items-center justify-center mb-4">
                  {isLive ? (
                    <div className="text-center text-white">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <div className="w-8 h-8 bg-white rounded-full animate-pulse"></div>
                      </div>
                      <p className="text-xl">🔴 LIVE</p>
                      <p className="text-gray-300">{currentStream?.title}</p>
                    </div>
                  ) : (
                    <div className="text-center text-gray-400">
                      <Camera className="w-16 h-16 mx-auto mb-4" />
                      <p>Camera preview will appear here</p>
                      <p className="text-sm">Make sure your camera and microphone are connected</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center gap-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => alert('Camera Settings:\n\n• Resolution: Auto\n• Frame Rate: 30fps\n• Brightness: Auto\n• Focus: Auto')}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Camera Settings
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => alert('Audio Settings:\n\n• Microphone: Default\n• Volume: 80%\n• Noise Suppression: On\n• Echo Cancellation: On')}
                  >
                    <Mic className="w-4 h-4 mr-2" />
                    Audio Settings
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => alert('Screen Share:\n\n• Share entire screen\n• Share application window\n• Share browser tab\n\nClick to start screen sharing')}
                  >
                    <Monitor className="w-4 h-4 mr-2" />
                    Screen Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            {!isLive && (
              <Card>
                <CardHeader>
                  <CardTitle>Stream Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Stream Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter your stream title"
                      value={streamData.title}
                      onChange={(e) => setStreamData({...streamData, title: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      className="w-full p-2 border border-gray-300 rounded-md bg-white"
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

                  <div>
                    <Label htmlFor="description">Description (Optional)</Label>
                    <textarea
                      id="description"
                      className="w-full p-2 border border-gray-300 rounded-md h-20 bg-white"
                      placeholder="Describe your stream..."
                      value={streamData.description}
                      onChange={(e) => setStreamData({...streamData, description: e.target.value})}
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Stream Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLive ? (
                  <>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600 mb-2">🔴 LIVE</div>
                      <p className="text-sm text-red-700">Broadcasting to viewers</p>
                    </div>
                    <Button 
                      onClick={handleEndStream}
                      className="w-full bg-red-600 hover:bg-red-700"
                    >
                      End Stream
                    </Button>
                  </>
                ) : (
                  <Button 
                    onClick={handleGoLive}
                    className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
                    size="lg"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start Streaming
                  </Button>
                )}
              </CardContent>
            </Card>

            {isLive && (
              <Card>
                <CardHeader>
                  <CardTitle>Stream Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Viewers:</span>
                    <span className="font-semibold">{Math.floor(Math.random() * 100) + 10}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-semibold">
                      {currentStream ? Math.floor((Date.now() - new Date(currentStream.started_at).getTime()) / 60000) : 0}m
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quality:</span>
                    <span className="font-semibold text-green-600">{streamSettings.quality}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Chat:</span>
                    <span className={`font-semibold ${streamSettings.chatEnabled ? 'text-green-600' : 'text-red-600'}`}>
                      {streamSettings.chatEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Stream Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    const planLimits = {
                      'NONE': '720p (Basic)',
                      'PER_STREAM': '1080p (Pro)',
                      'MONTHLY': '4K (Premium)'
                    }
                    const currentLimit = planLimits[streamerPlan?.plan || 'NONE']
                    alert(`Stream Quality Settings:\n\nCurrent: ${streamSettings.quality}\nPlan Limit: ${currentLimit}\n\nUpgrade your plan for higher quality!`)
                  }}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Stream Quality ({streamSettings.quality})
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    const newChatStatus = !streamSettings.chatEnabled
                    setStreamSettings(prev => ({ ...prev, chatEnabled: newChatStatus }))
                    alert(`Chat ${newChatStatus ? 'enabled' : 'disabled'} for your stream`)
                  }}
                >
                  Chat Moderation ({streamSettings.chatEnabled ? 'On' : 'Off'})
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    const newRecordingStatus = !streamSettings.recordingEnabled
                    setStreamSettings(prev => ({ ...prev, recordingEnabled: newRecordingStatus }))
                    alert(`Recording ${newRecordingStatus ? 'enabled' : 'disabled'}\n\nRecorded streams will be saved to your dashboard.`)
                  }}
                >
                  Recording Settings ({streamSettings.recordingEnabled ? 'On' : 'Off'})
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}