'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Wallet, ArrowUpRight, ArrowDownLeft, CreditCard, Shield, Clock } from 'lucide-react'

export default function WalletPage() {
  const [user, setUser] = useState<any>(null)
  const [wallet, setWallet] = useState<any>(null)
  const [transactions, setTransactions] = useState<any[]>([])
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [upiId, setUpiId] = useState('')
  const [showWithdrawForm, setShowWithdrawForm] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        window.location.href = '/auth/sign-in'
        return
      }
      setUser(user)
      
      // Fetch wallet data
      const { data: walletData } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', user.id)
        .single()
      
      setWallet(walletData || { balance_paise: 0, pending_paise: 0, lifetime_earned_paise: 0 })
      
      // Fetch transactions
      const { data: sessions } = await supabase
        .from('watch_sessions')
        .select('*, streams(title)')
        .eq('user_id', user.id)
        .order('started_at', { ascending: false })
        .limit(10)
      
      const { data: payouts } = await supabase
        .from('payouts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5)
      
      const allTransactions = [
        ...(sessions?.map(s => ({
          id: s.id,
          type: 'earned',
          amount: s.earned_paise / 100,
          description: `${s.streams?.title || 'Stream'} Watch`,
          date: new Date(s.started_at).toLocaleDateString(),
          status: 'completed'
        })) || []),
        ...(payouts?.map(p => ({
          id: p.id,
          type: 'withdraw',
          amount: -(p.amount_paise / 100),
          description: 'UPI Withdrawal',
          date: new Date(p.created_at).toLocaleDateString(),
          status: p.status.toLowerCase()
        })) || [])
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      
      setTransactions(allTransactions)
    }
    getUser()
  }, [])

  const handleWithdraw = async () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) < 100) {
      alert('Minimum withdrawal amount is ₹100')
      return
    }
    
    if (!upiId) {
      alert('Please enter your UPI ID')
      return
    }

    try {
      const { error } = await supabase
        .from('payouts')
        .insert([
          {
            user_id: user.id,
            amount_paise: parseFloat(withdrawAmount) * 100,
            status: 'PENDING'
          }
        ])
      
      if (error) throw error
      
      alert('Withdrawal request submitted! You will receive the money within 24 hours.')
      setShowWithdrawForm(false)
      setWithdrawAmount('')
      window.location.reload()
    } catch (error: any) {
      alert('Error: ' + error.message)
    }
  }



  if (!user || !wallet) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            My Wallet
          </h1>
          <p className="text-gray-600">Manage your earnings and withdrawals</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                Available Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">₹{(wallet.balance_paise / 100).toFixed(2)}</div>
              <Button 
                className="bg-white text-green-600 hover:bg-gray-100"
                size="sm"
                onClick={() => {
                  if (wallet.balance_paise < 10000) {
                    alert(`Minimum withdrawal amount is ₹100. Your current balance is ₹${(wallet.balance_paise/100).toFixed(2)}`)
                  } else {
                    window.location.href = '/payment/withdrawal'
                  }
                }}
              >
                Withdraw
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">₹{(wallet.pending_paise / 100).toFixed(2)}</div>
              <p className="text-yellow-100 text-sm">Processing withdrawals</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <ArrowUpRight className="w-5 h-5" />
                Total Earned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">₹{(wallet.lifetime_earned_paise / 100).toFixed(2)}</div>
              <p className="text-purple-100 text-sm">All time earnings</p>
            </CardContent>
          </Card>
        </div>

        {showWithdrawForm && (
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Withdraw Funds
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amount">Amount (₹)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Minimum ₹100"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    min="100"
                    max={wallet.balance_paise / 100}
                  />
                </div>
                <div>
                  <Label htmlFor="upi">UPI ID</Label>
                  <Input
                    id="upi"
                    placeholder="yourname@paytm"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="w-4 h-4" />
                <span>Withdrawals are processed within 24 hours. Minimum amount: ₹100</span>
              </div>
              
              <div className="flex gap-3">
                <Button onClick={handleWithdraw} className="bg-green-600 hover:bg-green-700">
                  Confirm Withdrawal
                </Button>
                <Button variant="outline" onClick={() => setShowWithdrawForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'earned' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {transaction.type === 'earned' ? 
                        <ArrowUpRight className="w-4 h-4" /> : 
                        <ArrowDownLeft className="w-4 h-4" />
                      }
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-gray-600">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-blue-600'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toFixed(2)}
                    </p>
                    <p className={`text-xs capitalize ${
                      transaction.status === 'completed' ? 'text-green-600' : 
                      transaction.status === 'processing' ? 'text-yellow-600' : 'text-gray-600'
                    }`}>
                      {transaction.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}