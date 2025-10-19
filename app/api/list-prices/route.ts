import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/client'

export async function GET(req: NextRequest) {
  try {
    console.log('📋 Listing all prices in Stripe account...')

    // List all prices
    const prices = await stripe.prices.list({
      limit: 100,
      expand: ['data.product'],
    })

    console.log(`✅ Found ${prices.data.length} prices`)

    const pricesList = prices.data.map(price => ({
      price_id: price.id,
      product_id: typeof price.product === 'string' ? price.product : price.product.id,
      product_name: typeof price.product === 'string' ? 'Unknown' : (price.product.deleted ? 'Deleted Product' : price.product.name),
      amount: price.unit_amount,
      currency: price.currency,
      type: price.type,
      active: price.active,
    }))

    return NextResponse.json({
      success: true,
      count: prices.data.length,
      prices: pricesList,
    })
  } catch (error: any) {
    console.error('❌ Failed to list prices:', error)
    return NextResponse.json(
      {
        error: error.message,
        type: error.type,
      },
      { status: 500 }
    )
  }
}
