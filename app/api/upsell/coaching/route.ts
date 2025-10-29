import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/client';
import { getProductByMetadata } from '@/lib/products';
import { Currency, getStripePriceId } from '@/lib/currency';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerEmail, customerName, originalSessionId, isMembership = false, currency = 'USD', trackingParams, cookieData } = body;

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

    // Split customer name into first and last name for metadata
    const nameParts = customerName?.trim().split(' ') || [];
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || nameParts[0] || '';

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
        // Customer info
        customer_first_name: firstName,
        customer_last_name: lastName,
        customer_email: customerEmail,
        customer_phone: '',

        // Funnel tracking
        funnel_type: 'upsell',
        type: 'coaching',
        entry_product: 'coach1',

        // Upsell tracking
        upsell_type: 'coaching',
        original_session_id: originalSessionId || '',
        is_membership_upsell: isMembership.toString(),

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

        // Full cookie data (JSON stringified)
        cookie_data: cookieData ? JSON.stringify(cookieData) : '',
      },
      payment_intent_data: {
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
          product_id: 'prod_THuQf0h3DatQUL',

          // Upsell tracking
          upsell_type: 'coaching',
          original_session_id: originalSessionId || '',
          is_membership_upsell: isMembership.toString(),

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

          // Full cookie data (JSON stringified)
          cookie_data: cookieData ? JSON.stringify(cookieData) : '',
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
