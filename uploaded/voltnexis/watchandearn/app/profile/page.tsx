'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Mail, Phone, MapPin, Bell, CreditCard, Shield } from 'lucide-react'

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [formData, setFormData] = useState({
    display_name: '',
    phone: '',
    country: ''
  })

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        window.location.href = '/auth/sign-in'
        return
      }
      setUser(user)
      
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()
      
      const { data: userData } = await supabase
        .from('users')
        .select('phone, country')
        .eq('id', user.id)
        .single()
      
      setProfile(profileData)
      setFormData({
        display_name: profileData?.display_name || '',
        phone: userData?.phone || '',
        country: userData?.country || ''
      })
    }
    getUser()
  }, [])

  const handleSave = async () => {
    try {
      await supabase
        .from('profiles')
        .update({ display_name: formData.display_name })
        .eq('user_id', user.id)
      
      await supabase
        .from('users')
        .update({ phone: formData.phone, country: formData.country })
        .eq('id', user.id)
      
      alert('Profile updated successfully!')
    } catch (error: any) {
      alert('Error: ' + error.message)
    }
  }

  if (!user) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Account Settings
          </h1>
          <p className="text-gray-600">Manage your profile and account preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={user.email} disabled />
                </div>
                <div>
                  <Label htmlFor="display_name">Display Name</Label>
                  <Input
                    id="display_name"
                    value={formData.display_name}
                    onChange={(e) => setFormData({...formData, display_name: e.target.value})}
                    placeholder="Enter your display name"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <select
                    id="country"
                    className="w-full p-2 border border-gray-300 rounded-md bg-white"
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                  >
                    <option value="">Select Country</option>
                    <option value="IN">India</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                  </select>
                </div>
                <Button onClick={handleSave} className="w-full">
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Email notifications</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span>Stream alerts</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span>Earning updates</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span>Marketing emails</span>
                  <input type="checkbox" className="rounded" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-4">No payment methods added</p>
                  <Button variant="outline" className="w-full">
                    Add Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Privacy & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Two-Factor Authentication
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Privacy Settings
                </Button>
                <Button variant="outline" className="w-full justify-start text-red-600">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}