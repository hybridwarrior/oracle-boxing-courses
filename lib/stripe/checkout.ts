import { stripe } from './client'
import { CartItem } from '@/lib/types'
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
}

export async function createCheckoutSession({
  items,
  hasPhysicalItems,
  successUrl,
  cancelUrl,
  customerInfo,
}: CreateCheckoutSessionParams): Promise<Stripe.Checkout.Session> {
  // Convert cart items to Stripe line items
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(item => ({
    price: item.price_id,
    quantity: item.quantity,
  }))

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

  // Store customer info in metadata
  if (customerInfo) {
    sessionParams.metadata = {
      customer_first_name: customerInfo.firstName || '',
      customer_last_name: customerInfo.lastName || '',
      customer_phone: customerInfo.phone || '',
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
        cart_items: JSON.stringify(items.map(i => ({ id: i.product.id, qty: i.quantity }))),
      },
    }
  }

  // Create session
  const session = await stripe.checkout.sessions.create(sessionParams)

  return session
}
