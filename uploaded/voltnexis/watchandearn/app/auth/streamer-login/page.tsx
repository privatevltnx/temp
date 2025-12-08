'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff, Play } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function StreamerLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      })
      
      if (error) throw error
      
      // Ensure user exists in users table
      const { data: existingUser } = await supabase
        .from('users')
        .select('id, role')
        .eq('id', data.user.id)
        .single()
      
      if (!existingUser) {
        // Create user record if doesn't exist
        await supabase
          .from('users')
          .insert([
            {
              id: data.user.id,
              email: data.user.email,
              role: 'STREAMER'
            }
          ])
        
        // Create streamer record
        await supabase
          .from('streamers')
          .insert([
            {
              user_id: data.user.id,
              plan: 'NONE'
            }
          ])
      } else if (existingUser.role !== 'STREAMER') {
        // Update user role to streamer
        await supabase
          .from('users')
          .update({ role: 'STREAMER' })
          .eq('id', data.user.id)
        
        // Create streamer record if doesn't exist
        const { data: streamerExists } = await supabase
          .from('streamers')
          .select('user_id')
          .eq('user_id', data.user.id)
          .single()
        
        if (!streamerExists) {
          await supabase
            .from('streamers')
            .insert([
              {
                user_id: data.user.id,
                plan: 'NONE'
              }
            ])
        }
      }
      
      window.location.href = '/dashboard/streamer'
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Play className="w-8 h-8 text-purple-600" />
            <span className="text-2xl font-bold">Streamer Login</span>
          </div>
          <CardTitle className="text-2xl">Welcome Back, Creator</CardTitle>
          <p className="text-gray-600">Sign in to your streamer account</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Sign In as Streamer
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-gray-600">Don't have a streamer account? </span>
            <Link href="/auth/streamer-signup" className="text-purple-600 hover:underline font-medium">
              Create streamer account
            </Link>
          </div>
          
          <div className="text-center text-sm">
            <Link href="/auth/sign-in" className="text-gray-600 hover:underline">
              Sign in as viewer instead
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}