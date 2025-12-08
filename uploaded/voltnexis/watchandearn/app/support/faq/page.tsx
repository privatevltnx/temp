'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "How do I start earning money by watching streams?",
          a: "Simply sign up for a free account, browse live streams, and start watching! You'll earn money for verified watch time. Complete engagement challenges to prove you're actively watching."
        },
        {
          q: "What is the minimum age requirement?",
          a: "You must be at least 18 years old to create an account and earn money on our platform."
        },
        {
          q: "Is it really free to watch and earn?",
          a: "Yes! Creating an account and watching streams is completely free. You only pay if you want to become a streamer."
        }
      ]
    },
    {
      category: "Earnings & Payments",
      questions: [
        {
          q: "How much can I earn per hour of watching?",
          a: "Earnings vary based on engagement and stream type, but typically range from ₹15-30 per hour of verified watch time."
        },
        {
          q: "What is the minimum withdrawal amount?",
          a: "The minimum withdrawal amount is ₹100. Withdrawals are processed within 24 hours via UPI."
        },
        {
          q: "Do I need to pay taxes on my earnings?",
          a: "Earnings above ₹2000 per month may require KYC verification. Please consult a tax professional for tax obligations."
        },
        {
          q: "How do engagement challenges work?",
          a: "Every 3-7 minutes, you'll receive a simple challenge (like clicking a button or entering a code) to verify you're actively watching."
        }
      ]
    },
    {
      category: "Streaming",
      questions: [
        {
          q: "How much does it cost to stream?",
          a: "Basic streaming starts at ₹199 per session (2 hours). We also offer monthly plans starting at ₹999."
        },
        {
          q: "What equipment do I need to stream?",
          a: "You need a computer or smartphone with a camera, microphone, and stable internet connection (minimum 5 Mbps upload)."
        },
        {
          q: "Can I stream from my mobile phone?",
          a: "Yes! Our platform supports mobile streaming through web browsers and dedicated apps."
        },
        {
          q: "What content is allowed on the platform?",
          a: "We allow gaming, education, music, lifestyle, and entertainment content. Illegal, harmful, or inappropriate content is prohibited."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          q: "Why is my stream not starting?",
          a: "Check your internet connection, browser permissions, and ensure you have an active streaming plan. Contact support if issues persist."
        },
        {
          q: "I'm not earning money while watching. What's wrong?",
          a: "Ensure you're completing engagement challenges, your tab is active, and you have audio enabled. Earnings pause if you're inactive."
        },
        {
          q: "Can I watch multiple streams simultaneously?",
          a: "No, you can only earn from one stream at a time. Multiple streams will be detected and may result in account suspension."
        }
      ]
    },
    {
      category: "Account & Security",
      questions: [
        {
          q: "How do I verify my account for withdrawals?",
          a: "For withdrawals above ₹2000/month, you'll need to provide PAN card details and complete KYC verification."
        },
        {
          q: "Can I have multiple accounts?",
          a: "No, only one account per person is allowed. Multiple accounts will result in permanent suspension."
        },
        {
          q: "How do you prevent fraud?",
          a: "We use advanced algorithms, device fingerprinting, engagement challenges, and manual reviews to ensure fair earnings."
        },
        {
          q: "What happens if my account is suspended?",
          a: "Suspended accounts lose access to earnings and withdrawals. You can appeal through our support team with valid reasons."
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about Watch & Earn
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                <h2 className="text-2xl font-semibold">{category.category}</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {category.questions.map((faq, faqIndex) => {
                  const globalIndex = categoryIndex * 100 + faqIndex
                  const isOpen = openItems.includes(globalIndex)
                  
                  return (
                    <div key={faqIndex} className="p-6">
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="flex justify-between items-center w-full text-left"
                      >
                        <h3 className="text-lg font-medium text-gray-900 pr-4">
                          {faq.q}
                        </h3>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="mt-4 text-gray-600 leading-relaxed">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Still have questions?</h2>
            <p className="text-gray-600 mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <a
              href="/support/contact"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}