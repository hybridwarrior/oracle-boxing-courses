'use client'

import { useEffect } from 'react'
import { captureUTMParameters } from '@/lib/tracking-cookies'

/**
 * Client-side UTM parameter tracker
 * Captures UTM parameters from URL and stores them in cookies/session
 * Runs once on initial page load
 */
export function UTMTracker() {
  useEffect(() => {
    // Capture UTM parameters from URL on mount
    captureUTMParameters()
  }, []) // Empty dependency array - run once on mount

  // This component renders nothing
  return null
}
