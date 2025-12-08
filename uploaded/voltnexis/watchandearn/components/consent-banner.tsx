'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

export function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true')
    localStorage.setItem('ad-consent', 'true')
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'false')
    localStorage.setItem('ad-consent', 'false')
    setIsVisible(false)
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm">
            We use cookies and show ads to improve your experience and fund viewer earnings. 
            By continuing, you agree to our use of cookies and personalized ads.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleDecline}>
            Decline
          </Button>
          <Button size="sm" onClick={handleAccept}>
            Accept All
          </Button>
          <button
            onClick={handleDecline}
            className="ml-2 p-1 hover:bg-gray-800 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}