'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CreditCard, Shield, Check, ArrowLeft } from 'lucide-react'

export default function StreamerPaymentPage() {
  const searchParams = useSearchParams()
  const [user, setUser] = useState<any>(null)
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const plans = {
    basic: { name: 'Basic Stream', price: 199, duration: 'per session', features: ['Up to 2 hours', '720p quality', 'Basic analytics'] },
    pro: { name: 'Pro Stream', price: 499, duration: 'per session', features: ['Up to 4 hours', '1080p quality', 'Advanced analytics'] },
    monthly: { name: 'Monthly Pro', price: 1999, duration: 'per month', features: ['Unlimited sessions', '4K quality', 'Full analytics'] }
  }

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
    }
    getUser()

    const plan = searchParams.get('plan') || 'basic'
    setSelectedPlan(plans[plan as keyof typeof plans])
  }, [searchParams])

  const handlePayment = async () => {
    setLoading(true)
    try {
      // Create payment record
      const { data, error } = await supabase
        .from('payments')
        .insert([
          {
            user_id: user.id,
            type: selectedPlan.duration === 'per month' ? 'SUBSCRIPTION' : 'PER_STREAM',
            amount_paise: selectedPlan.price * 100,
            status: 'CREATED'
          }
        ])
        .select()
        .single()

      if (error) throw error

      // Simulate Razorpay integration
      alert(`Payment of ₹${selectedPlan.price} initiated!\n\nIn production, this will integrate with Razorpay.\nPayment ID: ${data.id}`)
      
      // Update payment status to PAID (simulate successful payment)
      await supabase
        .from('payments')
        .update({ status: 'PAID' })
        .eq('id', data.id)

      // Update streamer plan
      await supabase
        .from('streamers')
        .upsert([
          {
            user_id: user.id,
            plan: selectedPlan.duration === 'per month' ? 'MONTHLY' : 'PER_STREAM',
            plan_expires_at: selectedPlan.duration === 'per month' ? 
              new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() : null
          }
        ])

      alert('Payment successful! You can now create streams.')
      window.location.href = '/dashboard/streamer'
    } catch (error: any) {
      alert('Payment failed: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  if (!user || !selectedPlan) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-2xl mx-auto p-4 sm:p-6">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Complete Payment
          </h1>
          <p className="text-gray-600">Secure payment powered by Razorpay</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{selectedPlan.name}</h3>
                  <p className="text-gray-600">{selectedPlan.duration}</p>
                </div>
                
                <div className="space-y-2">
                  {selectedPlan.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Amount:</span>
                    <span className="text-2xl font-bold text-blue-600">₹{selectedPlan.price}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-800">Secure Payment</span>
                </div>
                <p className="text-sm text-blue-700">
                  Your payment is processed securely through Razorpay with 256-bit SSL encryption.
                </p>
              </div>

              <div className="space-y-3">
                <div className="text-sm text-gray-600">
                  <p>• Instant activation after payment</p>
                  <p>• 30-day money-back guarantee</p>
                  <p>• 24/7 customer support</p>
                </div>
              </div>

              <Button 
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                size="lg"
              >
                {loading ? 'Processing...' : `Pay ₹${selectedPlan.price}`}
              </Button>

              <div className="text-center">
                <img 
                  src="https://razorpay.com/assets/razorpay-logo.svg" 
                  alt="Razorpay" 
                  className="h-6 mx-auto opacity-60"
                />
                <p className="text-xs text-gray-500 mt-1">Powered by Razorpay</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}