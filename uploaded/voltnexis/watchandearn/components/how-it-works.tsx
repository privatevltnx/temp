'use client'

import { motion } from 'framer-motion'
import { Play, Eye, Wallet, DollarSign, Users, Zap } from 'lucide-react'

export function HowItWorks() {
  const viewerSteps = [
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Sign In",
      description: "Create your account and verify your identity"
    },
    {
      icon: <Play className="w-8 h-8" />,
      title: "Watch Streams",
      description: "Watch live content and complete engagement checks"
    },
    {
      icon: <Wallet className="w-8 h-8" />,
      title: "Withdraw via UPI",
      description: "Cash out your earnings directly to your bank account"
    }
  ]

  const streamerSteps = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Pay Fee",
      description: "Choose your streaming plan and pay to unlock live streaming"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Go Live",
      description: "Start broadcasting to your audience with professional tools"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Reach Audience",
      description: "Engage with viewers and grow your community"
    }
  ]

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12"
        >
          How It Works
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-center text-blue-600">For Viewers</h3>
            <div className="space-y-6">
              {viewerSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{step.title}</h4>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-8 text-center text-purple-600">For Streamers</h3>
            <div className="space-y-6">
              {streamerSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{step.title}</h4>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}