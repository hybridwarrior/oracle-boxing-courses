import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession } from '@/lib/stripe/checkout'
import { CartItem } from '@/lib/types'
import { Currency } from '@/lib/currency'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { items, customerInfo, currency, trackingParams }: {
      items: CartItem[],
      customerInfo?: any,
      currency?: Currency,
      trackingParams?: {
        referrer: string
        utm_source?: string
        utm_medium?: string
        utm_campaign?: string
        utm_term?: string
        utm_content?: string
      }
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

    // Get base URL for redirect
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://shop-alpha-brown.vercel.app'

    console.log('🔍 DEBUG: Base URL:', baseUrl)
    console.log('🔍 DEBUG: Success URL:', `${baseUrl}/success/{CHECKOUT_SESSION_ID}`)

    // Create checkout session
    const session = await createCheckoutSession({
      items,
      hasPhysicalItems,
      successUrl: `${baseUrl}/success/{CHECKOUT_SESSION_ID}`,
      cancelUrl: `${baseUrl}/`, // Changed to home page instead of /checkout
      customerInfo,
      currency: currency || 'USD',
      trackingParams,
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
