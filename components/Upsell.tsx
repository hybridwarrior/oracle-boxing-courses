'use client'

import { useState } from 'react'
import { Product } from '@/lib/types'
import { CheckCircle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useCurrency } from '@/contexts/CurrencyContext'
import { getProductPrice, formatPrice, isMembershipProduct } from '@/lib/currency'
import { getCookie, getTrackingParams } from '@/lib/tracking-cookies'
import { useAnalytics } from '@/hooks/useAnalytics'

// Helper function to convert markdown bold to HTML and clean up
function formatDescription(text: string) {
  // Convert **text** to <strong>text</strong>
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
}

interface UpsellProps {
  product: Product
  sessionId: string
}

export function Upsell({ product, sessionId }: UpsellProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const [hasDeclined, setHasDeclined] = useState(false)
  const { currency } = useCurrency()
  const { trackUpsellInteraction } = useAnalytics()

  // Get price in selected currency
  const isMembership = isMembershipProduct(product.metadata)
  const convertedPrice = isMembership
    ? product.price
    : getProductPrice(product.metadata, currency) || product.price
  const displayCurrency = isMembership ? 'USD' : currency

  const handleAccept = async () => {
    setIsAdding(true)

    try {
      // Get cookie data and tracking params
      const cookieData = getCookie('ob_track')
      const trackingParams = getTrackingParams()

      const response = await fetch('/api/upsell/charge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId,
          price_id: product.stripe_price_id,
          product_id: product.id,
          trackingParams: trackingParams,
          cookieData: cookieData,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add upsell')
      }

      // Handle 3DS if required
      if (data.requires_action && data.client_secret) {
        // In production, you'd use Stripe.js to handle 3DS
        toast.info('Additional authentication required')
        // const stripe = await loadStripe(...)
        // await stripe.confirmCardPayment(data.client_secret)
      }

      if (data.success) {
        setIsAdded(true)
        toast.success('Added to your order!')

        // Track upsell acceptance
        trackUpsellInteraction({
          action: 'accept',
          product_id: product.id,
          product_name: product.title,
          value: convertedPrice,
          currency: displayCurrency,
        })
      }
    } catch (error: any) {
      console.error('Upsell error:', error)
      toast.error(error.message || 'Failed to add to order')
    } finally {
      setIsAdding(false)
    }
  }

  const handleDecline = () => {
    if (hasDeclined) return;

    setHasDeclined(true);

    // Track upsell decline
    trackUpsellInteraction({
      action: 'decline',
      product_id: product.id,
      product_name: product.title,
      value: convertedPrice,
      currency: displayCurrency,
    })

    console.log('Upsell declined:', product.title)
  }

  if (isAdded) {
    return (
      <div className="bg-green-50 border-2 border-green-600 rounded-xl p-8 text-center">
        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Added to Your Order!
        </h3>
        <p className="text-gray-600">
          You'll receive access details in your confirmation email.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-red-50 to-white border-2 border-red-600 rounded-xl p-8">
      <div className="text-center mb-6">
        <p className="text-sm font-semibold text-red-600 mb-2">SPECIAL OFFER</p>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Add {product.title}
        </h2>
        <p className="text-lg text-gray-600">
          Complete your boxing journey
        </p>
      </div>

      {/* Product Benefits */}
      <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
        <div className="space-y-3 text-sm text-gray-600">
          {product.description.split('\n').slice(0, 3).map((line, i) => (
            <p key={i} className="flex items-start gap-2">
              <span className="text-red-600">✓</span>
              <span dangerouslySetInnerHTML={{ __html: formatDescription(line) }} />
            </p>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="text-center mb-6">
        <p className="text-4xl font-bold text-gray-900">
          {formatPrice(convertedPrice, displayCurrency)}
          {product.recurring && <span className="text-lg text-gray-600">/{product.interval}</span>}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          One-click add to your order
          {isMembership && currency !== 'USD' && <span className="block text-xs mt-1">USD only</span>}
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleAccept}
          disabled={isAdding}
          className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-colors ${
            isAdding
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700'
          } text-white flex items-center justify-center gap-2`}
        >
          {isAdding ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            `Yes, Add to My Order`
          )}
        </button>

        <button
          onClick={handleDecline}
          disabled={hasDeclined}
          className={`w-full py-3 px-6 font-semibold transition-colors ${
            hasDeclined
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {hasDeclined ? 'Declined' : 'No thanks'}
        </button>
      </div>
    </div>
  )
}
