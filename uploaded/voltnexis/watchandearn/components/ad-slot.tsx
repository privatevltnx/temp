'use client'

import { useEffect, useState } from 'react'

interface AdSlotProps {
  variant: 'leaderboard' | 'skyscraper' | 'native' | 'preroll' | 'midroll'
  device: 'desktop' | 'mobile'
  className?: string
}

export function AdSlot({ variant, device, className = '' }: AdSlotProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasConsent, setHasConsent] = useState(false)

  useEffect(() => {
    // Check device type and consent
    const isMobile = window.innerWidth < 768
    const deviceMatch = (device === 'mobile' && isMobile) || (device === 'desktop' && !isMobile)
    const consent = localStorage.getItem('ad-consent') === 'true'
    
    setIsVisible(deviceMatch)
    setHasConsent(consent)
  }, [device])

  if (!isVisible || !hasConsent) {
    return null
  }

  const getAdDimensions = () => {
    switch (variant) {
      case 'leaderboard':
        return 'w-full h-24 max-w-4xl mx-auto'
      case 'skyscraper':
        return 'w-40 h-96'
      case 'native':
        return 'w-full h-32'
      case 'preroll':
      case 'midroll':
        return 'w-full aspect-video'
      default:
        return 'w-full h-24'
    }
  }

  return (
    <div className={`${getAdDimensions()} ${className}`}>
      <div className="w-full h-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 text-sm">
        Ad Space - {variant} ({device})
      </div>
    </div>
  )
}