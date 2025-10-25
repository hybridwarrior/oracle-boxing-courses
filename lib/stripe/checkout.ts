import { stripe } from './client'
import { CartItem } from '@/lib/types'
import { Currency, getStripePriceId } from '@/lib/currency'
import Stripe from 'stripe'

interface CustomerInfo {
  firstName: string
  lastName: string
  email: string
  phone?: string
  address?: {
    line1: string
    line2?: string
    city: string
    state: string
    postal_code: string
    country: string
  }
}

interface CreateCheckoutSessionParams {
  items: CartItem[]
  hasPhysicalItems: boolean
  successUrl: string
  cancelUrl: string
  customerInfo?: CustomerInfo
  currency?: Currency
  trackingParams?: {
    referrer: string
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

export async function createCheckoutSession({
  items,
  hasPhysicalItems,
  successUrl,
  cancelUrl,
  customerInfo,
  currency = 'USD',
  trackingParams,
}: CreateCheckoutSessionParams): Promise<Stripe.Checkout.Session> {
  // Convert cart items to Stripe line items, using correct price ID for currency
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(item => {
    // Get the correct Stripe price ID based on currency
    const priceId = getStripePriceId(item.product, currency);

    return {
      price: priceId,
      quantity: item.quantity,
    };
  })

  // Determine if this is a subscription or one-time payment
  const hasSubscription = items.some(item => item.product.recurring)
  const mode: Stripe.Checkout.SessionCreateParams.Mode = hasSubscription ? 'subscription' : 'payment'

  // Create or find customer if customer info provided
  let customerId: string | undefined = undefined

  if (customerInfo) {
    // Create a Stripe Customer for off-session charges (upsells)
    const customer = await stripe.customers.create({
      email: customerInfo.email,
      name: `${customerInfo.firstName} ${customerInfo.lastName}`,
      phone: customerInfo.phone || undefined,
      metadata: {
        first_name: customerInfo.firstName,
        last_name: customerInfo.lastName,
      },
    })

    customerId = customer.id
    console.log('✅ Created Stripe Customer:', customerId)
  }

  // ===================================================================
  // CROSS-SELL LOGIC: Disabled - handled in order-bumps page
  // ===================================================================
  // Bundle upgrades are now handled in the order-bumps page before checkout
  // This prevents duplicate bundle items and gives users clearer upgrade flow
  const recommendedProducts: string[] = []

  // Base session params
  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode,
    line_items,
    success_url: successUrl,
    cancel_url: cancelUrl,
    allow_promotion_codes: true,
    customer: customerId, // Attach customer to session
    customer_creation: customerId ? undefined : 'always', // Create customer if not provided
    billing_address_collection: 'required', // Collect billing address for tax purposes
    // Note: To enable automatic tax, set up your origin address at:
    // https://dashboard.stripe.com/test/settings/tax
    // Then uncomment the lines below:
    // automatic_tax: {
    //   enabled: true,
    // },
    customer_update: {
      address: 'auto', // Save billing address to customer
      shipping: 'auto', // Save shipping address to customer
    },
  }

  // ===================================================================
  // METADATA: Store customer info, funnel tracking, and recommended products
  // ===================================================================
  const mainProduct = items[0]?.product
  const addOns = items.slice(1).map(i => i.product.metadata || i.product.id).join(',')

  // Determine funnel type based on main product
  let funnelType = 'course' // Default
  let successPath = '/success/course'

  if (mainProduct?.id === '6wc' || mainProduct?.metadata === '6wc') {
    funnelType = '6wc'
    successPath = '/success/6wc'
  } else if (mainProduct?.id === 'bundle') {
    funnelType = 'bundle'
    successPath = '/success/course' // Bundle uses course success
  } else if (mainProduct?.type === 'membership') {
    funnelType = 'membership'
    successPath = '/success/membership'
  }

  // Hardcode the success URL to avoid any environment variable issues
  sessionParams.success_url = `https://shop.oracleboxing.com${successPath}?session_id={CHECKOUT_SESSION_ID}`
  sessionParams.cancel_url = 'https://shop.oracleboxing.com/'

  console.log('🔍 DEBUG: Success path:', successPath)
  console.log('🔍 DEBUG: Final success_url:', sessionParams.success_url)
  console.log('🔍 DEBUG: Cancel URL:', sessionParams.cancel_url)

  // Determine the purchase type based on main product
  let purchaseType = 'course' // Default
  if (mainProduct?.id === '6wc') {
    purchaseType = '6wc'
  } else if (mainProduct?.type === 'membership') {
    purchaseType = 'membership'
  } else if (mainProduct?.type === 'course') {
    purchaseType = 'course'
  }

  sessionParams.metadata = {
    // Customer info
    customer_first_name: customerInfo?.firstName || '',
    customer_last_name: customerInfo?.lastName || '',
    customer_phone: customerInfo?.phone || '',

    // Funnel tracking
    funnel_type: funnelType,
    type: purchaseType, // Add type metadata: course, membership, 6wc
    entry_product: mainProduct?.metadata || mainProduct?.id || '',
    add_ons_included: addOns,

    // Cross-sell tracking
    recommended_products: recommendedProducts.join(','),

    // Cart summary
    cart_items: JSON.stringify(items.map(i => ({
      id: i.product.id,
      metadata: i.product.metadata,
      quantity: i.quantity,
      price: i.product.price,
    }))),

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
  }

  // Add cross-sell recommendations using Stripe's adjustable quantity feature
  if (recommendedProducts.length > 0 && mode === 'payment') {
    // Add each recommended product as an adjustable quantity line item
    const crossSellLineItems = recommendedProducts.map(priceId => ({
      price: priceId,
      adjustable_quantity: {
        enabled: true,
        minimum: 0,
        maximum: 2,
      },
      quantity: 1, // Start at 1, customer can adjust (remove or keep)
    }))

    // Append cross-sell items to existing line items
    sessionParams.line_items = [...line_items, ...crossSellLineItems]

    // Add custom text to explain the optional bundle upgrade
    sessionParams.custom_text = {
      submit: {
        message: 'Save $144 by upgrading to the complete system - or remove it to continue with your current selection'
      }
    }
  }

  // Add shipping for physical items (only in payment mode)
  if (hasPhysicalItems && mode === 'payment') {
    sessionParams.shipping_address_collection = {
      allowed_countries: ['GB', 'US', 'CA', 'AU', 'DE', 'FR', 'ES', 'IT', 'NL', 'SE', 'NO', 'DK', 'FI'],
    }
    sessionParams.shipping_options = [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0, // Free shipping
            currency: 'usd',
          },
          display_name: 'Free Shipping',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 5,
            },
            maximum: {
              unit: 'business_day',
              value: 10,
            },
          },
        },
      },
    ]
  }

  // Add payment intent data for off-session charges (upsells)
  if (mode === 'payment') {
    sessionParams.payment_intent_data = {
      setup_future_usage: 'off_session',
      metadata: {
        // Copy all metadata to payment intent for charge.succeeded webhook
        customer_first_name: customerInfo?.firstName || '',
        customer_last_name: customerInfo?.lastName || '',
        customer_email: customerInfo?.email || '',
        customer_phone: customerInfo?.phone || '',

        // Funnel tracking
        funnel_type: funnelType,
        type: purchaseType,
        entry_product: mainProduct?.metadata || mainProduct?.id || '',
        add_ons_included: addOns,

        // Product details
        product_name: mainProduct?.title || '',
        product_id: mainProduct?.id || '',

        // Cart summary
        cart_items: JSON.stringify(items.map(i => ({ id: i.product.id, qty: i.quantity }))),

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
    }
  }

  // Add subscription data for membership purchases
  if (mode === 'subscription') {
    sessionParams.subscription_data = {
      metadata: {
        // Copy all metadata to subscription for invoice.payment_succeeded webhook
        customer_first_name: customerInfo?.firstName || '',
        customer_last_name: customerInfo?.lastName || '',
        customer_email: customerInfo?.email || '',
        customer_phone: customerInfo?.phone || '',

        // Funnel tracking
        funnel_type: funnelType,
        type: purchaseType,
        entry_product: mainProduct?.metadata || mainProduct?.id || '',
        add_ons_included: addOns,

        // Product details
        product_name: mainProduct?.title || '',
        product_id: mainProduct?.id || '',

        // Cart summary
        cart_items: JSON.stringify(items.map(i => ({ id: i.product.id, qty: i.quantity }))),

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
    }
  }

  // Create session
  console.log('🔍 DEBUG: Creating Stripe session with params:', {
    mode: sessionParams.mode,
    success_url: sessionParams.success_url,
    cancel_url: sessionParams.cancel_url,
    line_items_count: sessionParams.line_items?.length,
  })

  try {
    const session = await stripe.checkout.sessions.create(sessionParams)
    console.log('✅ Stripe session created successfully:', session.id)
    return session
  } catch (stripeError: any) {
    console.error('❌ Stripe API Error:', {
      message: stripeError.message,
      type: stripeError.type,
      code: stripeError.code,
      param: stripeError.param,
    })
    throw stripeError
  }
}

// ===================================================================
// POST-PURCHASE UPSELL LOGIC (To be implemented in success page)
// ===================================================================
/*
  After successful checkout, trigger upsells based on purchased products:

  1. 6-WEEK CHALLENGE → No upsells (maintain refund clarity)

  2. MEMBERSHIPS → Upsell: 1-Month 1-on-1 Coaching
     - Use USD-only price: price_1SLLX4QNEdHwdojXfZImwLss
     - Product ID: prod_THuQf0h3DatQUL
     - Reason: Members are typically USD-based

  3. COURSES (BFFP, Roadmap, Clinic) → Upsell: 1-Month 1-on-1 Coaching
     - Use multi-currency price: price_1SLLY7QNEdHwdojXVriclpjV
     - Product ID: prod_THuQf0h3DatQUL
     - Downsell if declined: 6-Week Membership (price_1SLLTqQNEdHwdojXsQKz5qSZ)

  4. BUNDLE → Upsell: 1-Month 1-on-1 Coaching
     - Use multi-currency price: price_1SLLY7QNEdHwdojXVriclpjV
     - Product ID: prod_THuQf0h3DatQUL
     - No downsell (bundle already comprehensive)

  Example implementation:

  ```typescript
  import { getProductByMetadata } from '@/lib/products'

  async function showPostPurchaseUpsell(purchasedItems: CartItem[]) {
    const mainProduct = purchasedItems[0].product
    const coaching = getProductByMetadata('coach1')

    // Determine which price ID to use
    let coachingPriceId: string
    let showDownsell = false

    if (mainProduct.type === 'membership') {
      // Use USD-only for membership upsells
      coachingPriceId = coaching.price_ids.usd_membership_upsell
    } else if (['bffp', 'roadmap', 'vault'].includes(mainProduct.id)) {
      // Use multi-currency for course upsells
      coachingPriceId = coaching.price_ids.multicurrency
      showDownsell = true // Show 6-week membership if declined
    } else if (mainProduct.id === 'bundle') {
      // Use multi-currency for bundle upsells
      coachingPriceId = coaching.price_ids.multicurrency
    } else {
      // 6WC or unknown - no upsell
      return
    }

    // Show upsell modal/page
    const accepted = await showUpsellModal({
      product: coaching,
      priceId: coachingPriceId,
    })

    // If declined and downsell applicable, show 6-week membership
    if (!accepted && showDownsell) {
      const sixWeekMembership = getProductByMetadata('6wm')
      await showDownsellModal({
        product: sixWeekMembership,
        priceId: sixWeekMembership.stripe_price_id,
      })
    }
  }
  ```
*/
