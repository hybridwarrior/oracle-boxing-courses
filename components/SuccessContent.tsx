'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, Mail, ArrowRight } from 'lucide-react'
import { Upsell } from './Upsell'
import { Product } from '@/lib/types'
import { products } from '@/lib/products'
import { useAnalytics } from '@/hooks/useAnalytics'

interface SuccessContentProps {
  sessionId: string
}

/**
 * Get tracking cookie data (returns empty object if no consent/cookie)
 */
function getTrackingCookie(): any {
  if (typeof document === 'undefined') return {};

  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  const obTrackCookie = cookies['ob_track'];
  if (!obTrackCookie) return {};

  try {
    return JSON.parse(decodeURIComponent(obTrackCookie));
  } catch {
    return {};
  }
}

/**
 * Generate a unique event ID for deduplication
 */
function generateEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get Facebook Click ID (fbclid) from cookies
 */
function getFbclid(): string | null {
  if (typeof document === 'undefined') return null;

  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = decodeURIComponent(value);
    return acc;
  }, {} as Record<string, string>);

  return cookies['fbclid'] || null;
}

export function SuccessContent({ sessionId }: SuccessContentProps) {
  const [session, setSession] = useState<any>(null)
  const [upsellProduct, setUpsellProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { trackPurchase } = useAnalytics()

  useEffect(() => {
    async function fetchSession() {
      try {
        // Fetch session data from Stripe
        const response = await fetch(`/api/session?session_id=${sessionId}`);
        const sessionData = await response.json();

        console.log('Session data:', sessionData);
        setSession(sessionData);

        // Send Purchase event to Facebook (browser + CAPI)
        await sendPurchaseEvent(sessionData);

        // Determine upsell based on purchase
        // Course → Membership Monthly
        // Membership → Membership Annual upgrade
        // Merch → BFFP course

        // For demo, show membership upsell
        const membershipMonthly = products.find(p => p.id === 'membership-monthly')
        setUpsellProduct(membershipMonthly || null)

        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching session:', error)
        setIsLoading(false)
      }
    }

    async function sendPurchaseEvent(sessionData: any) {
      try {
        console.log('🔍 Session data received for Purchase tracking:', {
          has_amount_total: !!sessionData.amount_total,
          has_line_items: !!sessionData.line_items,
          line_items_count: sessionData.line_items?.data?.length || 0,
          has_customer_details: !!sessionData.customer_details,
          sessionData_keys: Object.keys(sessionData),
        });

        // Get cookie data (empty if no consent)
        const cookieData = getTrackingCookie();

        // Use cookie event_id or generate new one
        const eventId = cookieData.event_id || generateEventId();

        // Get fbclid from cookies
        const fbclid = getFbclid();

        // Extract purchase data from session
        const amountTotal = sessionData.amount_total ? sessionData.amount_total / 100 : 0;
        const currency = sessionData.currency?.toUpperCase() || 'USD';

        // Extract product IDs from line items
        const contentIds = sessionData.line_items?.data?.map((item: any) => {
          const product = item.price?.product;
          return typeof product === 'object' ? product.id : product;
        }).filter(Boolean) || [];

        // Build contents array with quantities and prices
        const contents = sessionData.line_items?.data?.map((item: any) => ({
          id: typeof item.price?.product === 'object' ? item.price.product.id : item.price?.product,
          quantity: item.quantity || 1,
          item_price: item.price?.unit_amount ? item.price.unit_amount / 100 : 0,
        })) || [];

        // Extract metadata for Vercel Analytics
        const metadata = sessionData.metadata || {};
        const products = contentIds; // Use Stripe product IDs as product identifiers
        const funnelType = metadata.funnel_type || 'unknown';
        const orderBumps = metadata.add_ons_included ? metadata.add_ons_included.split(',') : [];
        const hasOrderBumps = orderBumps.length > 0;

        console.log('📊 Sending Purchase event:', {
          event_id: eventId,
          value: amountTotal,
          currency,
          content_ids: contentIds,
          contents_count: contents.length,
          products,
          funnel_type: funnelType,
          has_order_bumps: hasOrderBumps,
          order_bumps: orderBumps,
          has_customer_email: !!(sessionData.customer_details?.email || sessionData.customer_email || sessionData.customerEmail),
        });

        // 1. Send browser-side Facebook Pixel Purchase event
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'Purchase', {
            value: amountTotal,
            currency,
            content_ids: contentIds,
            content_type: 'product',
            num_items: contents.length,
          }, {
            eventID: eventId
          });
          console.log('📱 Browser Purchase event sent with event_id:', eventId);
        } else {
          console.warn('⚠️ Facebook Pixel not loaded - browser Purchase event not sent');
        }

        // 2. Send server-side CAPI Purchase event
        fetch('/api/facebook-purchase', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            event_id: eventId,
            value: amountTotal,
            currency,
            content_ids: contentIds,
            contents,
            customer_email: sessionData.customer_details?.email || sessionData.customer_email || sessionData.customerEmail,
            customer_phone: sessionData.customer_details?.phone,
            cookie_data: cookieData,
            fbclid,
            session_url: `https://oracleboxing.com/success/${sessionId}`,
          }),
          keepalive: true,
        }).then(async response => {
          if (response.ok) {
            const result = await response.json();
            console.log('✅ CAPI Purchase event sent successfully:', result);
          } else {
            const error = await response.json();
            console.error('❌ CAPI Purchase event failed:', response.status, error);
          }
        }).catch((error) => {
          console.error('❌ Failed to send CAPI Purchase event:', error);
        });

        // 3. Send Vercel Analytics Purchase event
        trackPurchase({
          value: amountTotal,
          currency,
          transaction_id: sessionId,
          products,
          product_count: products.length,
          funnel_type: funnelType as any,
          has_order_bumps: hasOrderBumps,
          order_bumps: orderBumps,
        });
        console.log('✅ Vercel Analytics Purchase event sent');

      } catch (error) {
        console.error('Error sending Purchase event:', error);
      }
    }

    fetchSession()
  }, [sessionId])

  if (isLoading) {
    return (
      <section className="py-20 text-center">
        <div className="animate-pulse">Loading...</div>
      </section>
    )
  }

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        <div className="text-center space-y-8 mb-12">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-xl">
                <CheckCircle className="w-14 h-14 text-white" />
              </div>
              <div className="absolute inset-0 w-24 h-24 bg-green-400 rounded-full animate-ping opacity-20" />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
              Order Confirmed!
            </h1>
            <p className="text-xl text-gray-600">
              Thank you for your purchase
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-gray-50 rounded-xl p-8 space-y-4 text-left border border-gray-200">
            <div className="flex items-start gap-3">
              <Mail className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>Check your email for order confirmation and access details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>Digital products: Access granted within 10 minutes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>Physical items: Ships within 1-2 business days</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Upsell */}
        {upsellProduct && (
          <Upsell
            product={upsellProduct}
            sessionId={sessionId}
          />
        )}

        {/* Support */}
        <div className="mt-12 text-center space-y-4">
          <p className="text-sm text-gray-600">
            Questions?{' '}
            <a
              href="mailto:team@oracleboxing.com"
              className="text-red-600 hover:text-red-700 font-semibold transition-colors"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
