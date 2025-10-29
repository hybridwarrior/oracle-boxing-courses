'use client'

import { useEffect } from 'react'
import { captureUTMParameters } from '@/lib/tracking-cookies'

/**
 * Client-side UTM parameter tracker
 * Captures UTM parameters immediately - cookie storage gated by consent
 */
export function UTMTracker() {
  useEffect(() => {
    // Capture UTM parameters immediately
    captureUTMParameters()

    // Also capture when consent is given (to save to cookies)
    const handleConsentGiven = () => {
      captureUTMParameters()
    }

    window.addEventListener('cookieConsentGiven', handleConsentGiven)

    return () => {
      window.removeEventListener('cookieConsentGiven', handleConsentGiven)
    }
  }, [])

  // This component renders nothing
  return null
}
