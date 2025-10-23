'use client'

import { useCurrency } from '@/hooks/useCurrency'

interface AdaptivePriceProps {
  usdAmount: number
  className?: string
  showCode?: boolean
  roundTo?: number
  showCents?: boolean
  fallback?: string
}

export function AdaptivePrice({ 
  usdAmount, 
  className = '', 
  showCode = false, 
  roundTo,
  showCents = false,
  fallback = `$${usdAmount}`
}: AdaptivePriceProps) {
  const { formatPrice, isLoading } = useCurrency()

  if (isLoading) {
    return <span className={className}>{fallback}</span>
  }

  return (
    <span className={className}>
      {formatPrice(usdAmount, { showCode, roundTo, showCents })}
    </span>
  )
}

// Specialized component for the main $197 price
export function ChallengePrice({ className = '' }: { className?: string }) {
  return (
    <AdaptivePrice 
      usdAmount={197} 
      className={className}
      showCents={false}
      fallback="$197"
    />
  )
}

// Component for value prices in the offer stack
export function ValuePrice({ usdAmount, className = '' }: { usdAmount: number, className?: string }) {
  return (
    <AdaptivePrice 
      usdAmount={usdAmount} 
      className={className}
      showCents={false}
      fallback={`$${usdAmount}`}
    />
  )
}