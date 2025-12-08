'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff, Play } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function StreamerSignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: undefined,
          data: {
            role: 'STREAMER'
          }
        }
      })
      
      if (error) throw error
      
      if (data.user) {
        // Create user record with STREAMER role
        await supabase
          .from('users')
          .insert([
            {
              id: data.user.id,
              email: formData.email,
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
            <span className="text-2xl font-bold">Streamer Sign Up</span>
          </div>
          <CardTitle className="text-2xl">Become a Creator</CardTitle>
          <p className="text-gray-600">Create your streamer account</p>
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
                  placeholder="Create a password"
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  className="mt-1 rounded"
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData({...formData, agreeToTerms: e.target.checked})}
                  required
                />
                <span className="text-sm text-gray-600">
                  I agree to the{' '}
                  <Link href="/legal/terms" className="text-purple-600 hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and understand that I need to pay for streaming plans
                </span>
              </label>
            </div>

            <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Create Streamer Account
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-gray-600">Already have a streamer account? </span>
            <Link href="/auth/streamer-login" className="text-purple-600 hover:underline font-medium">
              Sign in
            </Link>
          </div>
          
          <div className="text-center text-sm">
            <Link href="/auth/sign-up" className="text-gray-600 hover:underline">
              Sign up as viewer instead
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}