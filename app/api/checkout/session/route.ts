import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession } from '@/lib/stripe/checkout'
import { CartItem } from '@/lib/types'
import { Currency } from '@/lib/currency'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { items, customerInfo, currency, trackingParams, cookieData }: {
      items: CartItem[],
      customerInfo?: any,
      currency?: Currency,
      trackingParams?: {
        referrer: string
        // First Touch Attribution
        first_utm_source?: string
        first_utm_medium?: string
        first_utm_campaign?: string
        first_utm_term?: string
        first_utm_content?: string
        first_referrer_time?: string
        // Last Touch Attribution
        last_utm_source?: string
        last_utm_medium?: string
        last_utm_campaign?: string
        last_utm_term?: string
        last_utm_content?: string
        last_referrer_time?: string
        // Additional tracking
        fbclid?: string
        session_id?: string
        event_id?: string
      },
      cookieData?: any
    } = body

    // Debug logging
    console.log('🔍 DEBUG: Stripe Secret Key loaded:', !!process.env.STRIPE_SECRET_KEY)
    console.log('🔍 DEBUG: Number of items in cart:', items?.length)
    console.log('🔍 DEBUG: Customer info provided:', !!customerInfo)
    console.log('🔍 DEBUG: Currency:', currency || 'USD (default)')

    // Validate cart
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      )
    }

    // Log each item's price ID
    items.forEach((item: CartItem, index: number) => {
      console.log(`🔍 DEBUG Item ${index + 1}:`, {
        product: item.product?.title,
        price_id: item.price_id,
        type: item.product?.type,
      })
    })

    // Detect physical items
    const hasPhysicalItems = items.some(item => item.product.type === 'merch')

    // Create checkout session (URLs are hardcoded in checkout.ts to avoid env var issues)
    const session = await createCheckoutSession({
      items,
      hasPhysicalItems,
      successUrl: 'https://shop.oracleboxing.com/success/{CHECKOUT_SESSION_ID}', // Will be modified by checkout.ts
      cancelUrl: 'https://shop.oracleboxing.com/',
      customerInfo,
      currency: currency || 'USD',
      trackingParams,
      cookieData,
    })

    console.log('🔍 DEBUG: Session created:', {
      id: session.id,
      url: session.url,
      status: session.status
    })

    if (!session.url) {
      throw new Error('Stripe session created but URL is missing')
    }

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Checkout session creation failed:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
