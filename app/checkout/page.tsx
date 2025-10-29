'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { getProductById } from '@/lib/products'
import { useCurrency } from '@/contexts/CurrencyContext'
import { Currency, getProductPrice } from '@/lib/currency'
import { getTrackingParams, getCookie } from '@/lib/tracking-cookies'
import { trackInitiateCheckout } from '@/lib/webhook-tracking'

export const dynamic = 'force-dynamic'

export default function CheckoutPage() {
  const router = useRouter()
  const { currency, isLoading: currencyLoading } = useCurrency()
  const [isLoading, setIsLoading] = useState(false)
  const [productParam, setProductParam] = useState<string | null>(null)
  const [sourceParam, setSourceParam] = useState<string | null>(null)
  const [trackingParams, setTrackingParams] = useState<{
    referrer: string
    utm_source?: string
    utm_medium?: string
    utm_campaign?: string
    utm_term?: string
    utm_content?: string
  }>({
    referrer: ''
  })

  // Customer info form state
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    email: '',
  })

  // Detect product parameter from URL and capture tracking params
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const product = params.get('product')
      const source = params.get('source')

      setProductParam(product)
      setSourceParam(source)

      // Get tracking params from cookies (already captured by UTMTracker)
      const cookieTracking = getTrackingParams()

      setTrackingParams({
        referrer: cookieTracking.referrer,
        utm_source: cookieTracking.utm_source,
        utm_medium: cookieTracking.utm_medium,
        utm_campaign: cookieTracking.utm_campaign,
        utm_term: cookieTracking.utm_term,
        utm_content: cookieTracking.utm_content,
      })

      console.log('🏷️ Checkout page loaded')
      console.log('🏷️ Product:', product, '| Source:', source)
      console.log('📊 Tracking params from cookies:', cookieTracking)

      // Redirect if no product specified
      if (!product) {
        console.log('⚠️ No product parameter - redirecting to home')
        router.push('/')
      }
    }
  }, [router])

  // Handle contact form submission and checkout
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    const fullName = customerInfo.firstName.trim()
    const email = customerInfo.email.trim()

    if (!fullName || !email) {
      toast.error('Please fill in all required fields')
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address')
      return
    }

    // Proceed to checkout
    setIsLoading(true)

    try {
      // ROUTING LOGIC - 100% URL-DRIVEN
      // ===================================================================
      // All products must have ?product=X parameter in URL
      //
      // Routing rules:
      //    - 6WC → Order bumps (Recordings Vault + Lifetime BFFP)
      //    - Course (BFFP, Roadmap, Vault) → Order bumps (6-Week Membership)
      //    - Membership (monthly, 6month, annual) → Direct to Stripe
      //    - Bundle → Direct to Stripe
      // ===================================================================

      if (!productParam) {
        toast.error('No product specified')
        setIsLoading(false)
        return
      }

      console.log('🏷️ Processing checkout for:', productParam)

      // Get product price in USD for tracking
      const priceUSD = getProductPrice(productParam, 'USD') || 0

      // Track initiate checkout event
      const currentPage = typeof window !== 'undefined' ? window.location.pathname : '/checkout'
      const initialReferrer = trackingParams.referrer || 'direct'

      trackInitiateCheckout(
        fullName,
        email,
        priceUSD,
        [productParam],
        currentPage,
        initialReferrer,
        {
          funnel: null, // Not applicable on main checkout page
          course: null, // Not applicable on main checkout page
          currency: currency,
          source: sourceParam,
        }
      )

      // 6WC → Order bumps
      if (productParam === '6wc') {
        console.log('→ Routing to 6WC order-bumps')
        const orderBumpsUrl = new URL('/checkout/order-bumps', window.location.origin)
        orderBumpsUrl.searchParams.set('email', email)
        orderBumpsUrl.searchParams.set('name', fullName)
        orderBumpsUrl.searchParams.set('funnel', '6wc')
        orderBumpsUrl.searchParams.set('currency', currency)
        if (sourceParam) orderBumpsUrl.searchParams.set('source', sourceParam)

        // Pass tracking params
        orderBumpsUrl.searchParams.set('referrer', trackingParams.referrer)
        if (trackingParams.utm_source) orderBumpsUrl.searchParams.set('utm_source', trackingParams.utm_source)
        if (trackingParams.utm_medium) orderBumpsUrl.searchParams.set('utm_medium', trackingParams.utm_medium)
        if (trackingParams.utm_campaign) orderBumpsUrl.searchParams.set('utm_campaign', trackingParams.utm_campaign)
        if (trackingParams.utm_term) orderBumpsUrl.searchParams.set('utm_term', trackingParams.utm_term)
        if (trackingParams.utm_content) orderBumpsUrl.searchParams.set('utm_content', trackingParams.utm_content)

        router.push(orderBumpsUrl.pathname + orderBumpsUrl.search)
        return
      }

      // Individual Course → Order bumps
      if (['bffp', 'roadmap'].includes(productParam)) {
        console.log('→ Routing to course order-bumps')
        const orderBumpsUrl = new URL('/checkout/order-bumps', window.location.origin)
        orderBumpsUrl.searchParams.set('email', email)
        orderBumpsUrl.searchParams.set('name', fullName)
        orderBumpsUrl.searchParams.set('funnel', 'course')
        orderBumpsUrl.searchParams.set('course', productParam)
        orderBumpsUrl.searchParams.set('currency', currency)
        if (sourceParam) orderBumpsUrl.searchParams.set('source', sourceParam)

        // Pass tracking params
        orderBumpsUrl.searchParams.set('referrer', trackingParams.referrer)
        if (trackingParams.utm_source) orderBumpsUrl.searchParams.set('utm_source', trackingParams.utm_source)
        if (trackingParams.utm_medium) orderBumpsUrl.searchParams.set('utm_medium', trackingParams.utm_medium)
        if (trackingParams.utm_campaign) orderBumpsUrl.searchParams.set('utm_campaign', trackingParams.utm_campaign)
        if (trackingParams.utm_term) orderBumpsUrl.searchParams.set('utm_term', trackingParams.utm_term)
        if (trackingParams.utm_content) orderBumpsUrl.searchParams.set('utm_content', trackingParams.utm_content)

        router.push(orderBumpsUrl.pathname + orderBumpsUrl.search)
        return
      }

      // Bundle or Membership → Direct to Stripe
      if (['bundle', 'membership-monthly', 'membership-6month', 'membership-annual'].includes(productParam)) {
        console.log('→ Routing direct to Stripe')

        // Get product from products.ts
        const product = getProductById(productParam)
        if (!product) {
          throw new Error(`Product not found: ${productParam}`)
        }

        // Get full cookie data
        const cookieData = getCookie('ob_track')

        // Create checkout session with single product
        const response = await fetch('/api/checkout/session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: [{
              product: product,
              quantity: 1,
              price_id: product.stripe_price_id,
            }],
            currency: currency,
            customerInfo: {
              firstName: fullName,
              lastName: fullName,
              email: email,
              phone: '',
              address: {
                line1: '',
                line2: '',
                city: '',
                state: '',
                postal_code: '',
                country: 'US',
              },
            },
            trackingParams: trackingParams,
            cookieData: cookieData,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to create checkout session')
        }

        if (!data.url) {
          throw new Error('No checkout URL returned')
        }

        // Redirect to Stripe
        window.location.href = data.url
        return
      }

      // Unknown product
      toast.error(`Unknown product: ${productParam}`)
      setIsLoading(false)
    } catch (error: any) {
      console.error('Checkout error:', error)
      toast.error(error.message || "Couldn't start checkout, try again")
      setIsLoading(false)
    }
  }

  // Allow rendering even if cart is empty (for 6WC direct flow)
  // if (items.length === 0) {
  //   return null
  // }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <form onSubmit={handleContactSubmit}>
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img
              src="https://media.oracleboxing.com/Website/optimized/logos/long_black-large.webp"
              alt="Oracle Boxing"
              className="h-4"
            />
          </div>

          {/* Heading */}
          <p className="text-center text-gray-900 text-sm font-medium mb-8">
            Just a few details to get started
          </p>

          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              value={customerInfo.email}
              onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
              className="w-full px-5 py-3 bg-white border border-gray-300 rounded-full focus:ring-2 focus:ring-[#000000] focus:border-transparent transition-all"
              placeholder="your@email.com"
              required
              style={{ cursor: 'text' }}
            />
          </div>

          {/* Full Name Input */}
          <div className="mb-6">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              value={customerInfo.firstName}
              onChange={(e) => setCustomerInfo({ ...customerInfo, firstName: e.target.value })}
              className="w-full px-5 py-3 bg-white border border-gray-300 rounded-full focus:ring-2 focus:ring-[#000000] focus:border-transparent transition-all"
              placeholder="John Doe"
              required
              style={{ cursor: 'text' }}
            />
          </div>

          {/* Next Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-6 font-bold text-base rounded-full shadow-lg transition-all duration-200 flex items-center justify-center gap-2 ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#000000] hover:bg-[#1a1a1a] cursor-pointer'
            } text-white`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              'Next'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
