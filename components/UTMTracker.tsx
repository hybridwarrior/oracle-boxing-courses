'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { captureUTMParameters } from '@/lib/tracking-cookies'

/**
 * Client-side UTM parameter tracker
 * Captures UTM parameters immediately - cookie storage gated by consent
 * Re-captures on every navigation to track referrer changes
 */
export function UTMTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Capture UTM parameters on every page navigation
    // This ensures document.referrer is captured correctly
    captureUTMParameters()

    // Also capture when consent is given (to save to cookies)
    const handleConsentGiven = () => {
      captureUTMParameters()
    }

    window.addEventListener('cookieConsentGiven', handleConsentGiven)

    return () => {
      window.removeEventListener('cookieConsentGiven', handleConsentGiven)
    }
  }, [pathname]) // Re-run on navigation

  // This component renders nothing
  return null
}
