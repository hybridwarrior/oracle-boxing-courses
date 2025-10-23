import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/client';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'customer', 'payment_intent'],
    });

    // Extract relevant data
    const customerName = session.customer_details?.name || session.metadata?.customer_first_name || 'Customer';
    const customerEmail = session.customer_details?.email || session.customer_email || '';

    // Get currency from session or payment intent
    const currency = session.currency?.toUpperCase() || 'USD';

    // Currency symbol mapping
    const currencySymbols: Record<string, string> = {
      'USD': '$',
      'GBP': '£',
      'EUR': '€',
      'CAD': 'CA$',
      'AUD': 'A$',
    };
    const currencySymbol = currencySymbols[currency] || '$';

    const amountPaid = session.amount_total
      ? `${currencySymbol}${(session.amount_total / 100).toFixed(2)}`
      : `${currencySymbol}0`;

    // Get product name from line items
    const lineItems = session.line_items?.data || [];
    const productPurchased = lineItems.length > 0
      ? lineItems.map(item => item.description).join(', ')
      : 'Product';

    // Determine funnel type from metadata
    const funnelType = session.metadata?.funnel_type || 'course';

    // Get product metadata to determine if it's a membership
    const productMetadata = {
      funnel: session.metadata?.funnel_type || 'course'
    };

    return NextResponse.json({
      customerName,
      customerEmail,
      amountPaid,
      productPurchased,
      currency,
      funnelType,
      sessionId,
      productMetadata,
    });
  } catch (error: any) {
    console.error('Session retrieval error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to retrieve session' },
      { status: 500 }
    );
  }
}
