import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/client'

export async function GET(req: NextRequest) {
  try {
    console.log('🔍 Testing Stripe API connection...')
    console.log('🔍 Secret key loaded:', !!process.env.STRIPE_SECRET_KEY)
    console.log('🔍 Secret key starts with:', process.env.STRIPE_SECRET_KEY?.substring(0, 20) + '...')

    // Try to retrieve the first price from the user's products.ts
    const testPriceId = 'price_1QxkZc2eZvKYlo2C1O6Bd6tR' // BFFP course price

    console.log('🔍 Attempting to retrieve price:', testPriceId)

    const price = await stripe.prices.retrieve(testPriceId)

    console.log('✅ Successfully retrieved price:', {
      id: price.id,
      product: price.product,
      amount: price.unit_amount,
      currency: price.currency,
    })

    return NextResponse.json({
      success: true,
      message: 'Stripe API connection working',
      price: {
        id: price.id,
        product: price.product,
        amount: price.unit_amount,
        currency: price.currency,
      }
    })
  } catch (error: any) {
    console.error('❌ Stripe API test failed:', error)
    return NextResponse.json(
      {
        error: error.message,
        type: error.type,
        code: error.code,
      },
      { status: 500 }
    )
  }
}
