'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export function PricingTeaser() {
  const plans = [
    {
      name: 'Basic Stream',
      price: '₹199',
      duration: 'per session',
      features: ['Up to 2 hours', '720p quality', 'Basic analytics', 'Chat moderation']
    },
    {
      name: 'Pro Stream',
      price: '₹499',
      duration: 'per session',
      features: ['Up to 4 hours', '1080p quality', 'Advanced analytics', 'Priority support'],
      popular: true
    },
    {
      name: 'Monthly Pro',
      price: '₹1999',
      duration: 'per month',
      features: ['20 sessions', '1080p quality', 'Full analytics', 'Custom branding']
    }
  ]

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-4"
        >
          Streamer Pricing
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 text-center mb-12"
        >
          Choose the plan that fits your streaming needs
        </motion.p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`relative ${plan.popular ? 'border-blue-500 shadow-lg' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-gray-600 ml-2">{plan.duration}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={async () => {
                      const { data: { user } } = await supabase.auth.getUser()
                      if (user) {
                        window.location.href = '/pricing'
                      } else {
                        window.location.href = '/auth/sign-in'
                      }
                    }}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link href="/pricing">
            <Button variant="outline" size="lg">
              View Full Pricing Details
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}