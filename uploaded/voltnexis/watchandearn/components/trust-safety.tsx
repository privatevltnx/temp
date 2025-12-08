'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, UserCheck, AlertTriangle } from 'lucide-react'

export function TrustSafety() {
  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Anti-Fraud Protection',
      description: 'Advanced algorithms detect and prevent fraudulent activities'
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: 'Secure Payments',
      description: 'All transactions are secured with bank-grade encryption'
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: 'Identity Verification',
      description: 'KYC verification ensures legitimate users and payouts'
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: 'Content Moderation',
      description: '24/7 monitoring ensures safe and appropriate content'
    }
  ]

  return (
    <section className="py-16 px-4 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-4"
        >
          Trust & Safety
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-300 text-center mb-12"
        >
          Your security and fair earnings are our top priority
        </motion.p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400">
            By using our platform, you agree to our{' '}
            <a href="/legal/terms" className="text-blue-400 hover:underline">Terms of Service</a>{' '}
            and{' '}
            <a href="/legal/privacy" className="text-blue-400 hover:underline">Privacy Policy</a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}