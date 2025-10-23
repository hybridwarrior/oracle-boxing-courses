import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/client';
import { getProductByMetadata } from '@/lib/products';
import { Currency, getStripePriceId } from '@/lib/currency';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerEmail, customerName, originalSessionId, isMembership = false, currency = 'USD' } = body;

    console.log('🎯 Creating coaching upsell:', { customerEmail, isMembership, currency });

    // Use the specific price IDs requested by the user
    // Both prices use the same product: prod_THuQf0h3DatQUL
    let priceId: string;

    if (isMembership) {
      // Membership buyers use USD-only price
      priceId = 'price_1SLLX4QNEdHwdojXfZImwLss';
    } else {
      // Non-membership buyers use multi-currency price
      priceId = 'price_1SLLY7QNEdHwdojXVriclpjV';
    }

    console.log('💰 Using price ID:', priceId, 'for isMembership:', isMembership);

    // Get base URL for redirect
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3002';

    // Create Stripe checkout session for the upsell
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: customerEmail,
      success_url: `${baseUrl}/success/final?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/`,
      metadata: {
        customer_name: customerName,
        original_session_id: originalSessionId || '',
        upsell_type: 'coaching',
        is_membership_upsell: isMembership.toString(),
      },
      payment_intent_data: {
        metadata: {
          upsell_type: 'coaching',
          original_session_id: originalSessionId || '',
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Coaching upsell error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create upsell session' },
      { status: 500 }
    );
  }
}
