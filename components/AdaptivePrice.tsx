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

// Component for per-month prices (divides total by months)
export function AdaptivePricePerMonth({
  usdAmount,
  months,
  className = '',
  metadata
}: {
  usdAmount: number
  months: number
  className?: string
  metadata?: string
}) {
  const { currency, isLoading } = useCurrency()

  if (isLoading) {
    const perMonthUSD = usdAmount / months
    return <span className={className}>${perMonthUSD.toFixed(2)}</span>
  }

  // Get the total price in the user's currency
  const totalPrice = metadata
    ? getProductPrice(metadata, currency) || usdAmount
    : usdAmount

  // Divide by months to get per-month price
  const perMonthPrice = totalPrice / months

  // Format with proper currency
  const formattedPrice = formatCurrency(Math.round(perMonthPrice * 100) / 100, currency)

  return <span className={className}>{formattedPrice}</span>
}