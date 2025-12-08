'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Slider } from '@/components/ui/slider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function EarningsCalculator() {
  const [minutesPerDay, setMinutesPerDay] = useState([30])
  
  const calculateEarnings = (minutes: number) => {
    const ratePerMinute = 0.5 // ₹0.5 per minute
    const dailyEarnings = minutes * ratePerMinute
    const monthlyEarnings = dailyEarnings * 30
    return { daily: dailyEarnings, monthly: monthlyEarnings }
  }

  const earnings = calculateEarnings(minutesPerDay[0])

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Earnings Calculator
        </motion.h2>
        
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center">How much can you earn?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Minutes per day: {minutesPerDay[0]}
              </label>
              <Slider
                value={minutesPerDay}
                onValueChange={setMinutesPerDay}
                max={240}
                min={5}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>5 min</span>
                <span>4 hours</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="text-center p-4 bg-green-100 rounded-lg"
              >
                <div className="text-2xl font-bold text-green-600">
                  ₹{earnings.daily.toFixed(0)}
                </div>
                <div className="text-sm text-green-700">Daily</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="text-center p-4 bg-blue-100 rounded-lg"
              >
                <div className="text-2xl font-bold text-blue-600">
                  ₹{earnings.monthly.toFixed(0)}
                </div>
                <div className="text-sm text-blue-700">Monthly</div>
              </motion.div>
            </div>
            
            <div className="text-xs text-gray-500 text-center">
              * Earnings are estimates based on current rates and may vary based on engagement and availability
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}