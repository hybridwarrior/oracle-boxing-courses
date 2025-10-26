import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/client'
import {
  CoachingTier,
  CustomerDiscount,
  PaymentPlan,
  Coach,
  calculateCoachingPrice,
  createCoachingMetadata,
  COACHING_PRODUCT_ID,
  TIER_PRICES,
  CUSTOMER_DISCOUNTS,
  getTierDisplayName,
  formatPrice,
} from '@/lib/coaching-pricing'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      email,
      name,
      tier,
      customerDiscount,
      sixMonthCommitment,
      paymentPlan,
      coach,
      trackingParams,
    } = body as {
      email: string
      name: string
      tier: CoachingTier
      customerDiscount: CustomerDiscount
      sixMonthCommitment: boolean
      paymentPlan: PaymentPlan
      coach: Coach
      trackingParams?: {
        referrer?: string
        utm_source?: string
        utm_medium?: string
        utm_campaign?: string
        utm_term?: string
        utm_content?: string
        fbclid?: string
        session_id?: string
        event_id?: string
      }
    }

    console.log('🎯 Creating internal coaching session:', {
      tier,
      customerDiscount,
      sixMonthCommitment,
      paymentPlan,
      coach,
    })

    // Validate required fields
    if (!email || !name || !tier || !paymentPlan || !coach) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Calculate pricing
    const calculation = calculateCoachingPrice(
      tier,
      customerDiscount || 'none',
      sixMonthCommitment || false,
      paymentPlan
    )

    console.log('💰 Price calculation:', calculation)

    // Split name into first and last name for metadata
    const nameParts = name.trim().split(' ')
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || nameParts[0] || ''

    // Create base metadata (pricing details)
    const pricingMetadata = createCoachingMetadata(
      tier,
      customerDiscount || 'none',
      sixMonthCommitment || false,
      paymentPlan,
      coach,
      calculation
    )

    // Create rich metadata matching the 6WC structure
    const fullMetadata = {
      // Customer info
      customer_first_name: firstName,
      customer_last_name: lastName,
      customer_email: email,
      customer_phone: '',

      // Override type to 'closed_coaching'
      type: 'closed_coaching',

      // Pricing metadata from calculation
      ...pricingMetadata,

      // Tracking params (referrer and UTM)
      referrer: trackingParams?.referrer || 'internal_coaching_tool',
      utm_source: trackingParams?.utm_source || 'internal',
      utm_medium: trackingParams?.utm_medium || 'admin_tool',
      utm_campaign: trackingParams?.utm_campaign || 'coaching',
      utm_term: trackingParams?.utm_term || '',
      utm_content: trackingParams?.utm_content || '',
      fbclid: trackingParams?.fbclid || '',
      session_id: trackingParams?.session_id || '',
      event_id: trackingParams?.event_id || '',
    }

    // Get base URL for redirect - use headers for server-side
    const host = req.headers.get('host')
    const protocol = req.headers.get('x-forwarded-proto') || 'https'
    const baseUrl = host ? `${protocol}://${host}` : 'https://shop.oracleboxing.com'

    // Build detailed product description with price breakdown
    const tierName = getTierDisplayName(tier)
    const tierPrice = TIER_PRICES[tier]

    let description = `${tierName} 1-on-1 Coaching\n\n`

    // Base price breakdown
    if (sixMonthCommitment) {
      description += `Base: ${formatPrice(tierPrice)} × 2 months = ${formatPrice(tierPrice * 2)}\n`
    } else {
      description += `Base: ${formatPrice(tierPrice)}\n`
    }

    // Customer discount
    if (customerDiscount !== 'none') {
      const discountName = customerDiscount === 'challenge_winner' ? 'Challenge Winner' : 'Existing Member'
      description += `${discountName} Discount: -${formatPrice(CUSTOMER_DISCOUNTS[customerDiscount])}\n`
      description += `Subtotal: ${formatPrice(calculation.subtotal)}\n`
    }

    // 6-month commitment discount
    if (sixMonthCommitment) {
      description += `6-Month Commitment (10% off): -${formatPrice(calculation.sixMonthDiscount)}\n`
    }

    // Final price
    description += `\nTotal: ${formatPrice(calculation.finalPrice)}`

    // Payment plan details
    if (paymentPlan === 'split_2') {
      description += `\n\nSplit Payment: ${formatPrice(calculation.monthlyAmount!)} × 2 months`
    } else if (paymentPlan === 'monthly') {
      description += `\n\nMonthly Payment: ${formatPrice(calculation.monthlyAmount!)}/month × 3 months`
    }

    // Create Stripe checkout session based on payment plan
    let session

    if (paymentPlan === 'full') {
      // ONE-TIME PAYMENT
      // finalPrice already includes 2x tier price if 6-month commitment is selected
      session = await stripe.checkout.sessions.create({
        mode: 'payment',
        customer_email: email,
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `1-on-1 Coaching - ${tierName}`,
                description: description,
              },
              unit_amount: calculation.finalPrice * 100, // Convert to cents
              tax_behavior: 'exclusive',
            },
            quantity: 1,
          },
        ],
        automatic_tax: {
          enabled: true,
        },
        success_url: `${baseUrl}/success/final?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/admin/coaching-checkout`,
        metadata: fullMetadata,
        payment_intent_data: {
          metadata: fullMetadata, // Also attach to payment intent
        },
      })
    } else if (paymentPlan === 'split_2') {
      // SPLIT BY 2 - Subscription that cancels after 2 payments
      // Note: We'll use webhook to cancel after 2nd payment
      // For now, create regular subscription and handle cancellation logic in webhook

      session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        customer_email: email,
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `1-on-1 Coaching - ${tierName} (Split Pay)`,
                description: description,
              },
              unit_amount: calculation.monthlyAmount! * 100, // Convert to cents
              recurring: {
                interval: 'month',
              },
              tax_behavior: 'exclusive',
            },
            quantity: 1,
          },
        ],
        automatic_tax: {
          enabled: true,
        },
        success_url: `${baseUrl}/success/final?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/admin/coaching-checkout`,
        metadata: {
          ...fullMetadata,
          auto_cancel_after_payments: '2', // Custom flag for webhook handler
        },
        subscription_data: {
          metadata: {
            ...fullMetadata,
            auto_cancel_after_payments: '2', // Custom flag for webhook handler
          },
        },
      })
    } else if (paymentPlan === 'monthly') {
      // MONTHLY - Ongoing subscription

      session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        customer_email: email,
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `1-on-1 Coaching - ${tierName} (Monthly)`,
                description: description,
              },
              unit_amount: calculation.monthlyAmount! * 100, // Convert to cents
              recurring: {
                interval: 'month',
              },
              tax_behavior: 'exclusive',
            },
            quantity: 1,
          },
        ],
        automatic_tax: {
          enabled: true,
        },
        success_url: `${baseUrl}/success/final?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/admin/coaching-checkout`,
        metadata: fullMetadata,
        subscription_data: {
          metadata: fullMetadata, // Also attach to subscription
        },
      })
    } else {
      return NextResponse.json(
        { error: 'Invalid payment plan' },
        { status: 400 }
      )
    }

    console.log('✅ Coaching session created:', session.id)
    console.log('🔗 Checkout URL:', session.url)

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
      calculation,
    })
  } catch (error: any) {
    console.error('❌ Error creating coaching session:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create coaching session' },
      { status: 500 }
    )
  }
}
