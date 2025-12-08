'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, Star, Zap, Crown } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  const plans = [
    {
      name: 'Basic Stream',
      icon: <Zap className="w-6 h-6" />,
      price: billingCycle === 'monthly' ? 199 : 1990,
      originalPrice: billingCycle === 'yearly' ? 2388 : null,
      duration: billingCycle === 'monthly' ? 'per session' : 'per year',
      description: 'Perfect for getting started',
      features: [
        'Up to 2 hours per session',
        '720p HD quality',
        'Basic analytics',
        'Chat moderation',
        'Mobile streaming',
        'Email support'
      ],
      color: 'from-blue-500 to-cyan-600',
      popular: false
    },
    {
      name: 'Pro Stream',
      icon: <Star className="w-6 h-6" />,
      price: billingCycle === 'monthly' ? 499 : 4990,
      originalPrice: billingCycle === 'yearly' ? 5988 : null,
      duration: billingCycle === 'monthly' ? 'per session' : 'per year',
      description: 'Most popular choice',
      features: [
        'Up to 4 hours per session',
        '1080p Full HD quality',
        'Advanced analytics',
        'Priority support',
        'Custom thumbnails',
        'Stream scheduling',
        'Multi-platform streaming',
        'Monetization tools'
      ],
      color: 'from-purple-500 to-pink-600',
      popular: true
    },
    {
      name: 'Enterprise',
      icon: <Crown className="w-6 h-6" />,
      price: billingCycle === 'monthly' ? 1999 : 19990,
      originalPrice: billingCycle === 'yearly' ? 23988 : null,
      duration: billingCycle === 'monthly' ? 'per month' : 'per year',
      description: 'For professional streamers',
      features: [
        'Unlimited streaming hours',
        '4K Ultra HD quality',
        'Full analytics suite',
        '24/7 priority support',
        'Custom branding',
        'API access',
        'Dedicated account manager',
        'White-label solution',
        'Advanced monetization',
        'Custom integrations'
      ],
      color: 'from-yellow-500 to-orange-600',
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Start streaming and reach your audience with our flexible pricing
          </p>
          
          <div className="inline-flex items-center bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`relative overflow-hidden shadow-xl border-0 ${
                plan.popular ? 'ring-2 ring-purple-500 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-center py-2 text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <CardHeader className={`bg-gradient-to-br ${plan.color} text-white ${plan.popular ? 'pt-12' : 'pt-6'}`}>
                <div className="flex items-center gap-3 mb-2">
                  {plan.icon}
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                </div>
                <p className="text-white/80 text-sm">{plan.description}</p>
                <div className="mt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">₹{plan.price}</span>
                    <span className="text-white/80">{plan.duration}</span>
                  </div>
                  {plan.originalPrice && (
                    <div className="text-white/60 text-sm line-through">
                      ₹{plan.originalPrice}
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 text-white border-0`}
                  size="lg"
                  onClick={async () => {
                    if (plan.name === 'Enterprise') {
                      window.location.href = '/support/contact'
                    } else {
                      const { data: { user } } = await supabase.auth.getUser()
                      if (user) {
                        window.location.href = '/dashboard/streamer'
                      } else {
                        window.location.href = '/auth/sign-in'
                      }
                    }
                  }}
                >
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="text-left">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
                <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
              </CardContent>
            </Card>
            <Card className="text-left">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-600">We accept all major credit cards, debit cards, UPI, and net banking through Razorpay.</p>
              </CardContent>
            </Card>
            <Card className="text-left">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Is there a free trial?</h3>
                <p className="text-gray-600">We offer a 7-day free trial for the Pro Stream plan. No credit card required.</p>
              </CardContent>
            </Card>
            <Card className="text-left">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Can I get a refund?</h3>
                <p className="text-gray-600">Yes, we offer full refunds within 30 days if you're not satisfied with our service.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}