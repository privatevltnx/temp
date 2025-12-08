'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff, Play } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      let email = formData.emailOrUsername
      
      // If not email format, try to find email by username
      if (!email.includes('@')) {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('email')
          .eq('username', email)
          .single()
        
        if (userError || !userData) {
          alert('Username not found. Please check your username or use email instead.')
          return
        }
        
        email = userData.email
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: formData.password
      })
      
      if (error) throw error
      
      // Ensure user exists in users table
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
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
              role: 'VIEWER'
            }
          ])
      }
      
      window.location.href = '/dashboard/viewer'
    } catch (error: any) {
      alert(error.message)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard/viewer`
        }
      })
      
      if (error) throw error
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Play className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold">Watch & Earn</span>
          </div>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <p className="text-gray-600">Sign in to start earning</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="emailOrUsername">Email or Username</Label>
              <Input
                id="emailOrUsername"
                type="text"
                placeholder="Enter your email or username"
                value={formData.emailOrUsername}
                onChange={(e) => setFormData({...formData, emailOrUsername: e.target.value})}
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

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignIn}
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>

          <div className="text-center text-sm">
            <span className="text-gray-600">Don't have an account? </span>
            <Link href="/auth/sign-up" className="text-blue-600 hover:underline font-medium">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}