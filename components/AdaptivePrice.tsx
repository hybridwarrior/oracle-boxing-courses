'use client'

import { useCurrency } from '@/contexts/CurrencyContext'
import { getProductPrice, formatPrice as formatCurrency } from '@/lib/currency'

interface AdaptivePriceProps {
  usdAmount: number
  className?: string
  showCode?: boolean
  metadata?: string // Product metadata for price lookup
  fallback?: string
}

export function AdaptivePrice({
  usdAmount,
  className = '',
  showCode = false,
  metadata,
  fallback = `$${usdAmount}`
}: AdaptivePriceProps) {
  const { currency, isLoading } = useCurrency()

  if (isLoading) {
    return <span className={className}>{fallback}</span>
  }

  // If metadata provided, use fixed price matrix
  const price = metadata
    ? getProductPrice(metadata, currency) || usdAmount
    : usdAmount

  // Format with System 1
  const formattedPrice = formatCurrency(price, currency)

  return (
    <span className={className}>
      {formattedPrice}
      {showCode && currency !== 'USD' && <span className="text-xs ml-1">{currency}</span>}
    </span>
  )
}

// Specialized component for the main $197 price (6wc product)
export function ChallengePrice({ className = '' }: { className?: string }) {
  return (
    <AdaptivePrice
      usdAmount={197}
      metadata="6wc"
      className={className}
      fallback="$197"
    />
  )
}

// Component for value prices in the offer stack
export function ValuePrice({
  usdAmount,
  className = '',
  metadata
}: {
  usdAmount: number
  className?: string
  metadata?: string
}) {
  return (
    <AdaptivePrice
      usdAmount={usdAmount}
      metadata={metadata}
      className={className}
      fallback={`$${usdAmount}`}
    />
  )
}