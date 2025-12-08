'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Wallet, Shield, ArrowLeft, CheckCircle } from 'lucide-react'

export default function WithdrawalPaymentPage() {
  const searchParams = useSearchParams()
  const [user, setUser] = useState<any>(null)
  const [wallet, setWallet] = useState<any>(null)
  const [amount, setAmount] = useState('')
  const [upiId, setUpiId] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        window.location.href = '/auth/sign-in'
        return
      }
      setUser(user)
      
      const { data: walletData } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', user.id)
        .single()
      
      setWallet(walletData)
    }
    getUser()

    const withdrawAmount = searchParams.get('amount')
    if (withdrawAmount) {
      setAmount(withdrawAmount)
    }
  }, [searchParams])

  const handleWithdrawal = async () => {
    if (!amount || parseFloat(amount) < 100) {
      alert('Minimum withdrawal amount is ₹100')
      return
    }
    
    if (!upiId) {
      alert('Please enter your UPI ID')
      return
    }

    if (parseFloat(amount) * 100 > wallet.balance_paise) {
      alert('Insufficient balance')
      return
    }

    setLoading(true)
    try {
      // Create payout record
      const { data, error } = await supabase
        .from('payouts')
        .insert([
          {
            user_id: user.id,
            amount_paise: parseFloat(amount) * 100,
            status: 'PENDING'
          }
        ])
        .select()
        .single()

      if (error) throw error

      // Update wallet balance
      await supabase
        .from('wallets')
        .update({ 
          balance_paise: wallet.balance_paise - (parseFloat(amount) * 100),
          pending_paise: wallet.pending_paise + (parseFloat(amount) * 100)
        })
        .eq('user_id', user.id)

      // Simulate Razorpay X payout integration
      alert(`Withdrawal of ₹${amount} initiated!\n\nIn production, this will integrate with RazorpayX for instant payouts.\nPayout ID: ${data.id}`)
      
      // Simulate successful payout after delay
      setTimeout(async () => {
        await supabase
          .from('payouts')
          .update({ status: 'SUCCESS' })
          .eq('id', data.id)
        
        await supabase
          .from('wallets')
          .update({ 
            pending_paise: wallet.pending_paise - (parseFloat(amount) * 100)
          })
          .eq('user_id', user.id)
      }, 2000)

      alert('Withdrawal request submitted successfully! You will receive the money within 24 hours.')
      window.location.href = '/wallet'
    } catch (error: any) {
      alert('Withdrawal failed: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  if (!user || !wallet) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-2xl mx-auto p-4 sm:p-6">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => window.location.href = '/wallet'}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Wallet
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Withdraw Funds
          </h1>
          <p className="text-gray-600">Secure withdrawal powered by RazorpayX</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                Withdrawal Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="amount">Withdrawal Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Minimum ₹100"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="100"
                  max={wallet.balance_paise / 100}
                />
                <p className="text-sm text-gray-600 mt-1">
                  Available balance: ₹{(wallet.balance_paise / 100).toFixed(2)}
                </p>
              </div>

              <div>
                <Label htmlFor="upi">UPI ID</Label>
                <Input
                  id="upi"
                  placeholder="yourname@paytm"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
                <p className="text-sm text-gray-600 mt-1">
                  Enter your UPI ID for instant transfer
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">Instant Transfer</span>
                </div>
                <p className="text-sm text-green-700">
                  Funds will be transferred to your UPI account within 24 hours.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Withdrawal Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Withdrawal Amount:</span>
                  <span className="font-semibold">₹{amount || '0.00'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Fee:</span>
                  <span className="font-semibold">₹0.00</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">You will receive:</span>
                    <span className="text-2xl font-bold text-green-600">₹{amount || '0.00'}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-800">Secure Transfer</span>
                </div>
                <p className="text-sm text-blue-700">
                  Your withdrawal is processed securely through RazorpayX with bank-grade security.
                </p>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <p>• No processing fees</p>
                <p>• Instant UPI transfers</p>
                <p>• 24/7 support available</p>
                <p>• Transaction tracking</p>
              </div>

              <Button 
                onClick={handleWithdrawal}
                disabled={loading || !amount || !upiId}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                size="lg"
              >
                {loading ? 'Processing...' : `Withdraw ₹${amount || '0.00'}`}
              </Button>

              <div className="text-center">
                <img 
                  src="https://razorpay.com/assets/razorpay-logo.svg" 
                  alt="RazorpayX" 
                  className="h-6 mx-auto opacity-60"
                />
                <p className="text-xs text-gray-500 mt-1">Powered by RazorpayX</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}