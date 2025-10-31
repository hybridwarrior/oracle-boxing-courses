import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession } from '@/lib/stripe/checkout'
import { CartItem } from '@/lib/types'
import { Currency } from '@/lib/currency'
import { sendInitiatedCheckout } from '@/lib/simple-webhook'
import { getProductById } from '@/lib/products'

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

    // CRITICAL FIX: Re-fetch products server-side to get correct env var values
    // Client-side process.env is undefined, so we need to lookup products here
    const serverSideItems = items.map(item => {
      const serverProduct = getProductById(item.product.id);
      if (!serverProduct) {
        console.warn(`⚠️ Product not found: ${item.product.id}, using client product`);
        return item;
      }
      // Replace client product with server product (has correct env vars)
      return {
        ...item,
        product: serverProduct,
        // Update price_id to use server-side value if it was set
        price_id: item.price_id || serverProduct.stripe_price_id,
      };
    });

    // Log each item's price ID
    serverSideItems.forEach((item: CartItem, index: number) => {
      console.log(`🔍 DEBUG Item ${index + 1}:`, {
        product: item.product?.title,
        price_id: item.price_id,
        stripe_price_id: item.product?.stripe_price_id,
        type: item.product?.type,
      })
    })

    // Detect physical items
    const hasPhysicalItems = serverSideItems.some(item => item.product.type === 'merch')

    // Create checkout session with server-side products (correct env vars)
    const session = await createCheckoutSession({
      items: serverSideItems,
      hasPhysicalItems,
      successUrl: 'https://oracleboxing.com/success/{CHECKOUT_SESSION_ID}', // Will be modified by checkout.ts
      cancelUrl: 'https://oracleboxing.com/',
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

    // Send initiated checkout webhook to Make.com for abandoned cart automation
    // This runs asynchronously and won't block the checkout flow
    if (customerInfo?.email) {
      // Calculate total amount from cart items (use server-side items)
      const totalAmount = serverSideItems.reduce((sum, item) => {
        return sum + (item.product.price * item.quantity);
      }, 0);

      // Split full name into first and last name (same logic as checkout.ts)
      const nameParts = customerInfo.firstName?.trim().split(' ') || [];
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || nameParts[0] || '';

      // Send webhook with all data (non-blocking, use server-side items)
      sendInitiatedCheckout({
        sessionId: session.id,
        checkoutUrl: session.url,
        customer: {
          firstName,
          lastName,
          email: customerInfo.email,
          phone: customerInfo.phone,
        },
        location: {
          countryCode: cookieData?.country_code || 'US',
          currency: currency || 'USD',
        },
        cart: {
          items: serverSideItems.map(item => ({
            productName: item.product.title,
            productId: item.product.id,
            metadata: item.product.metadata,
            quantity: item.quantity,
            price: item.product.price,
            currency: currency || 'USD',
          })),
          totalAmount,
          currency: currency || 'USD',
        },
        tracking: trackingParams ? {
          sessionId: trackingParams.session_id,
          eventId: trackingParams.event_id,
          utmSource: trackingParams.last_utm_source,
          utmMedium: trackingParams.last_utm_medium,
          utmCampaign: trackingParams.last_utm_campaign,
          fbclid: trackingParams.fbclid,
        } : undefined,
      }).catch(err => {
        // Log but don't fail checkout if webhook fails
        console.error('Failed to send initiated checkout webhook:', err);
      });
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
