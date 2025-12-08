'use client'

import { useEffect } from 'react'

export function AdProvider() {
  useEffect(() => {
    const loadAdScript = () => {
      const consent = localStorage.getItem('ad-consent')
      if (consent === 'true') {
        // Load Google AdSense or other ad provider scripts
        const script = document.createElement('script')
        script.async = true
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
        script.setAttribute('data-ad-client', 'ca-pub-xxxxxxxxxxxxxxxx') // Replace with actual client ID
        document.head.appendChild(script)
      }
    }

    loadAdScript()
  }, [])

  return null
}