import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/client'
import { products } from '@/lib/products'

export async function POST(req: NextRequest) {
  console.log('🔍 UPSELL: Request received')
  try {
    const body = await req.json()
    const { session_id, price_id, product_id, trackingParams } = body

    console.log('🔍 UPSELL: Body parsed:', { session_id, price_id, product_id, trackingParams })

    // Validate inputs
    if (!session_id || !price_id || !product_id) {
      console.error('❌ UPSELL: Missing parameters')
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    // Get the original checkout session
    console.log('🔍 UPSELL: Retrieving session:', session_id)
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['payment_intent', 'subscription', 'payment_intent.latest_charge']
    })
    console.log('🔍 UPSELL: Session retrieved successfully')

    // Get the original currency from the session
    const originalCurrency = session.currency || 'usd'
    console.log('🔍 UPSELL: Original purchase currency:', originalCurrency)

    console.log('🔍 Session retrieved:', {
      id: session.id,
      customer: session.customer,
      payment_intent: session.payment_intent,
      subscription: session.subscription,
      payment_status: session.payment_status,
    })

    // Get customer and payment method
    let customerId: string | null = null
    let paymentMethodId: string | null = null

    if (session.payment_intent) {
      // One-time payment
      const paymentIntent = typeof session.payment_intent === 'string'
        ? await stripe.paymentIntents.retrieve(session.payment_intent)
        : session.payment_intent

      paymentMethodId = paymentIntent.payment_method as string

      // If no customer on session, try to get from payment intent's latest charge
      if (!session.customer && paymentIntent.latest_charge) {
        console.log('🔍 UPSELL: No customer on session, retrieving from charge')
        const charge = await stripe.charges.retrieve(paymentIntent.latest_charge as string)
        customerId = charge.customer as string
      } else {
        customerId = session.customer as string
      }
    } else if (session.subscription) {
      // Subscription payment
      const subscription = typeof session.subscription === 'string'
        ? await stripe.subscriptions.retrieve(session.subscription)
        : session.subscription

      customerId = subscription.customer as string
      paymentMethodId = subscription.default_payment_method as string
    } else {
      customerId = session.customer as string
    }

    console.log('🔍 UPSELL: Customer ID:', customerId)
    console.log('🔍 UPSELL: Payment Method ID:', paymentMethodId)

    if (!customerId) {
      console.error('❌ UPSELL: No customer found')
      return NextResponse.json(
        { error: 'Invalid session - no customer found' },
        { status: 400 }
      )
    }

    if (!paymentMethodId) {
      console.error('❌ UPSELL: No payment method found')
      return NextResponse.json(
        { error: 'No payment method found' },
        { status: 400 }
      )
    }

    // Get the price from Stripe to determine if it's recurring
    console.log('🔍 UPSELL: Retrieving price from Stripe:', price_id)
    const priceObj = await stripe.prices.retrieve(price_id)
    const isRecurring = priceObj.type === 'recurring'

    console.log('🔍 UPSELL: Price details:', {
      price_id,
      priceCurrency: priceObj.currency,
      originalCurrency,
      isRecurring,
      type: priceObj.type,
      currency_options: priceObj.currency_options ? Object.keys(priceObj.currency_options) : []
    })

    // Check if this is a subscription (recurring) product
    if (isRecurring) {
      // Create a subscription for recurring products
      console.log('🔍 UPSELL: Creating subscription')

      // Get customer details for metadata
      const customer = await stripe.customers.retrieve(customerId);
      const customerEmail = customer.deleted ? '' : customer.email || '';
      const customerName = customer.deleted ? '' : customer.name || '';

      // Split customer name into first and last name for metadata
      const nameParts = customerName?.trim().split(' ') || [];
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || nameParts[0] || '';

      // Attach payment method to customer first
      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customerId,
      })

      // Set as default payment method
      await stripe.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      })

      // Create subscription
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: price_id }],
        default_payment_method: paymentMethodId,
        metadata: {
          // Customer info
          customer_first_name: firstName,
          customer_last_name: lastName,
          customer_email: customerEmail,
          customer_phone: '',

          // Funnel tracking
          funnel_type: 'upsell',
          type: 'membership',
          entry_product: product_id,

          // Product details
          product_name: '6-Week Membership',
          product_id: product_id,

          // Upsell tracking
          source: 'upsell',
          original_session_id: session_id,

          // Tracking params (referrer and UTM)
          referrer: trackingParams?.referrer || 'direct',
          utm_source: trackingParams?.utm_source || '',
          utm_medium: trackingParams?.utm_medium || '',
          utm_campaign: trackingParams?.utm_campaign || '',
          utm_term: trackingParams?.utm_term || '',
          utm_content: trackingParams?.utm_content || '',
          fbclid: trackingParams?.fbclid || '',
          session_id: trackingParams?.session_id || '',
          event_id: trackingParams?.event_id || '',
        },
      })

      console.log('✅ UPSELL: Subscription created:', subscription.id)

      return NextResponse.json({
        success: true,
        subscription_id: subscription.id,
        status: subscription.status,
      })
    } else {
      // Create a one-time payment for non-recurring products using multi-currency price
      console.log('🔍 UPSELL: Creating one-time payment with multi-currency price')

      // Currency-specific pricing (in cents)
      const currencyPricing: Record<string, number> = {
        'usd': 39700,  // $397.00
        'gbp': 31700,  // £317.00
        'eur': 36500,  // €365.00
        'cad': 53800,  // CA$538.00
        'aud': 59500,  // A$595.00
        'aed': 146500, // AED 1,465.00
      };

      const lowerCurrency = originalCurrency.toLowerCase();
      const amount = currencyPricing[lowerCurrency] || 39700; // Default to USD if currency not found

      console.log('🔍 UPSELL: Final charge details:', {
        amount,
        currency: originalCurrency,
        customer: customerId,
        amountInMajorUnit: (amount / 100).toFixed(2)
      });

      // Get customer details for metadata
      const customer = await stripe.customers.retrieve(customerId);
      const customerEmail = customer.deleted ? '' : customer.email || '';
      const customerName = customer.deleted ? '' : customer.name || '';

      // Split customer name into first and last name for metadata
      const nameParts = customerName?.trim().split(' ') || [];
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || nameParts[0] || '';

      const upsellPaymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: originalCurrency,
        customer: customerId,
        payment_method: paymentMethodId,
        off_session: true,
        confirm: true,
        metadata: {
          // Customer info
          customer_first_name: firstName,
          customer_last_name: lastName,
          customer_email: customerEmail,
          customer_phone: '',

          // Funnel tracking
          funnel_type: 'upsell',
          type: 'coaching',
          entry_product: 'coach1',

          // Product details
          product_name: '1-Month 1-on-1 Coaching',
          product_id: product_id,
          price_id: price_id,

          // Upsell tracking
          source: 'upsell',
          original_session_id: session_id,

          // Tracking params (referrer and UTM)
          referrer: trackingParams?.referrer || 'direct',
          utm_source: trackingParams?.utm_source || '',
          utm_medium: trackingParams?.utm_medium || '',
          utm_campaign: trackingParams?.utm_campaign || '',
          utm_term: trackingParams?.utm_term || '',
          utm_content: trackingParams?.utm_content || '',
          fbclid: trackingParams?.fbclid || '',
          session_id: trackingParams?.session_id || '',
          event_id: trackingParams?.event_id || '',
        },
      })

      // Check if requires action (3DS)
      if (upsellPaymentIntent.status === 'requires_action') {
        return NextResponse.json({
          requires_action: true,
          client_secret: upsellPaymentIntent.client_secret,
        })
      }

      // Check if succeeded
      if (upsellPaymentIntent.status === 'succeeded') {
        console.log('✅ UPSELL: Payment succeeded:', upsellPaymentIntent.id)
        return NextResponse.json({
          success: true,
          payment_intent_id: upsellPaymentIntent.id,
        })
      }

      // Handle other statuses
      return NextResponse.json(
        { error: `Payment ${upsellPaymentIntent.status}` },
        { status: 400 }
      )
    }
  } catch (error: any) {
    console.error('❌ UPSELL: Error occurred:', error.message)
    console.error('❌ UPSELL: Error type:', error.type)
    console.error('❌ UPSELL: Full error:', error)

    // Handle specific Stripe errors
    if (error.type === 'StripeCardError') {
      return NextResponse.json(
        { error: 'Your card was declined' },
        { status: 402 }
      )
    }

    if (error.type === 'StripeInvalidRequestError') {
      console.error('❌ UPSELL: Invalid request - check session ID format')
    }

    return NextResponse.json(
      { error: error.message || 'Failed to process upsell' },
      { status: 500 }
    )
  }
}
