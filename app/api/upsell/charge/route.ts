import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/client'
import { products } from '@/lib/products'

export async function POST(req: NextRequest) {
  console.log('🔍 UPSELL: Request received')
  try {
    const body = await req.json()
    const { session_id, price_id, product_id } = body

    console.log('🔍 UPSELL: Body parsed:', { session_id, price_id, product_id })

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
      expand: ['payment_intent', 'subscription']
    })
    console.log('🔍 UPSELL: Session retrieved successfully')

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

    // Get product details
    const product = products.find(p => p.id === product_id)
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    console.log('🔍 UPSELL: Product details:', {
      id: product.id,
      recurring: product.recurring,
      interval: product.interval,
    })

    // Check if this is a subscription (recurring) product
    if (product.recurring) {
      // Create a subscription for recurring products
      console.log('🔍 UPSELL: Creating subscription')

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
          source: 'upsell',
          original_session_id: session_id,
          product_id: product_id,
        },
      })

      console.log('✅ UPSELL: Subscription created:', subscription.id)

      return NextResponse.json({
        success: true,
        subscription_id: subscription.id,
        status: subscription.status,
      })
    } else {
      // Create a one-time payment for non-recurring products
      console.log('🔍 UPSELL: Creating one-time payment')

      const upsellPaymentIntent = await stripe.paymentIntents.create({
        amount: product.price * 100, // Convert to cents
        currency: 'usd',
        customer: customerId,
        payment_method: paymentMethodId,
        off_session: true,
        confirm: true,
        metadata: {
          source: 'upsell',
          original_session_id: session_id,
          product_id: product_id,
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
