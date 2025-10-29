import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '1474540100541059';
const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN || '';
const FB_CONVERSIONS_API_URL = `https://graph.facebook.com/v18.0/${FB_PIXEL_ID}/events`;

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  // IMPORTANT: use the raw body for signature verification
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json(
      { error: `Signature verification failed: ${err.message}` },
      { status: 400 }
    );
  }

  // Handle events
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        console.log('Checkout session completed:', {
          id: session.id,
          customer: session.customer,
          amount_total: session.amount_total,
          payment_status: session.payment_status,
        });

        // Retrieve expanded session with line items
        const expandedSession = await stripe.checkout.sessions.retrieve(session.id, {
          expand: ['line_items', 'line_items.data.price.product', 'payment_intent', 'subscription']
        });

        // Parse cookie data from metadata if it exists
        let parsedCookieData = {};
        if (session.metadata?.cookie_data) {
          try {
            parsedCookieData = JSON.parse(session.metadata.cookie_data);
          } catch (e) {
            console.warn('Failed to parse cookie_data from metadata:', e);
          }
        }

        // Build comprehensive order payload
        const orderPayload = {
          // Event Information
          event_type: 'purchase',
          event_time: new Date().toISOString(),
          stripe_event_id: event.id,

          // Order Summary
          order: {
            id: session.id,
            amount_total: session.amount_total ? session.amount_total / 100 : 0,
            amount_subtotal: session.amount_subtotal ? session.amount_subtotal / 100 : 0,
            currency: session.currency?.toUpperCase() || 'USD',
            payment_status: session.payment_status,
            status: session.status,
          },

          // Customer Information
          customer: {
            id: session.customer as string,
            email: session.customer_details?.email || session.metadata?.customer_email || '',
            first_name: session.metadata?.customer_first_name || '',
            last_name: session.metadata?.customer_last_name || '',
            phone: session.customer_details?.phone || session.metadata?.customer_phone || '',
            name: session.customer_details?.name || '',
          },

          // Line Items (Products Purchased)
          line_items: expandedSession.line_items?.data.map(item => {
            const product = item.price?.product;
            const isExpandedProduct = product && typeof product === 'object' && 'name' in product;

            return {
              id: item.id,
              description: item.description,
              quantity: item.quantity,
              amount_total: item.amount_total ? item.amount_total / 100 : 0,
              amount_subtotal: item.amount_subtotal ? item.amount_subtotal / 100 : 0,
              price: {
                id: item.price?.id,
                unit_amount: item.price?.unit_amount ? item.price.unit_amount / 100 : 0,
                currency: item.price?.currency?.toUpperCase() || 'USD',
                type: item.price?.type, // one_time or recurring
                recurring: item.price?.recurring ? {
                  interval: item.price.recurring.interval,
                  interval_count: item.price.recurring.interval_count,
                } : null,
              },
              product: {
                id: typeof product === 'object' ? product.id : product,
                name: isExpandedProduct ? product.name : item.description,
                description: isExpandedProduct ? (product.description || '') : '',
              }
            };
          }) || [],

          // Stripe Metadata (includes all tracking params)
          metadata: {
            // Customer info
            customer_first_name: session.metadata?.customer_first_name || '',
            customer_last_name: session.metadata?.customer_last_name || '',
            customer_phone: session.metadata?.customer_phone || '',

            // Funnel tracking
            funnel_type: session.metadata?.funnel_type || '',
            type: session.metadata?.type || '',
            entry_product: session.metadata?.entry_product || '',
            add_ons_included: session.metadata?.add_ons_included || '',

            // Cart information
            cart_items: session.metadata?.cart_items || '',

            // UTM & Tracking parameters
            referrer: session.metadata?.referrer || '',
            utm_source: session.metadata?.utm_source || '',
            utm_medium: session.metadata?.utm_medium || '',
            utm_campaign: session.metadata?.utm_campaign || '',
            utm_term: session.metadata?.utm_term || '',
            utm_content: session.metadata?.utm_content || '',
            fbclid: session.metadata?.fbclid || '',
            session_id: session.metadata?.session_id || '',
            event_id: session.metadata?.event_id || '',
          },

          // Full Cookie Data (parsed from metadata)
          cookie_data: parsedCookieData,

          // Payment Details
          payment: {
            payment_intent_id: typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id,
            subscription_id: typeof session.subscription === 'string' ? session.subscription : session.subscription?.id,
            payment_method_types: session.payment_method_types || [],
          },

          // Additional Session Details
          session_details: {
            mode: session.mode, // payment or subscription
            locale: session.locale,
            created: session.created,
            expires_at: session.expires_at,
            success_url: session.success_url,
          }
        };

        console.log('📦 Sending comprehensive order data to Make.com webhook');

        // Send to Make.com webhook
        const MAKE_WEBHOOK_URL = 'https://hook.eu2.make.com/rmssfwgpgrbkihnly4ocxd2cf6kmfbo3';

        try {
          const webhookResponse = await fetch(MAKE_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderPayload),
          });

          if (webhookResponse.ok) {
            console.log('✅ Successfully sent order data to Make.com webhook');
          } else {
            console.error('❌ Make.com webhook returned error:', webhookResponse.status);
          }
        } catch (error) {
          console.error('❌ Failed to send to Make.com webhook:', error);
        }

        // Send Purchase event to Facebook Conversions API
        console.log('📊 Sending Purchase event to Facebook Conversions API');

        try {
          const eventTime = Math.floor(Date.now() / 1000);

          // Get client IP from request headers
          const forwarded = req.headers.get('x-forwarded-for');
          const clientIp = forwarded ? forwarded.split(',')[0].trim() : req.headers.get('x-real-ip') || '';

          // Get user agent
          const userAgent = req.headers.get('user-agent') || '';

          // Use event_id from metadata for deduplication with browser-side Purchase event
          const fbEventId = session.metadata?.event_id || `server_${session.id}`;

          // Build custom_data with cookie tracking data
          const customData: Record<string, any> = {
            value: orderPayload.order.amount_total,
            currency: orderPayload.order.currency,
            content_ids: expandedSession.line_items?.data.map(item =>
              typeof item.price?.product === 'object' ? item.price.product.id : item.price?.product
            ).filter(Boolean) || [],
            content_type: 'product',
            num_items: expandedSession.line_items?.data.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0,
            contents: expandedSession.line_items?.data.map(item => ({
              id: typeof item.price?.product === 'object' ? item.price.product.id : item.price?.product,
              quantity: item.quantity,
              item_price: item.price?.unit_amount ? item.price.unit_amount / 100 : 0,
            })) || [],
          };

          // Add cookie data fields to custom_data (max 500 chars each)
          if (parsedCookieData && typeof parsedCookieData === 'object') {
            Object.keys(parsedCookieData).forEach(key => {
              // Skip user_agent - it's already in user_data section
              if (key === 'user_agent') {
                return;
              }

              const value = parsedCookieData[key];
              if (value !== null && value !== undefined) {
                const stringValue = String(value);
                customData[key] = stringValue.length > 500 ? stringValue.substring(0, 500) : stringValue;
              }
            });
          }

          // Build user_data with customer information
          const userData: Record<string, any> = {
            client_ip_address: clientIp,
            client_user_agent: userAgent,
          };

          // Add hashed customer email if available
          if (orderPayload.customer.email) {
            try {
              // Hash email with SHA-256
              const encoder = new TextEncoder();
              const data = encoder.encode(orderPayload.customer.email.toLowerCase().trim());
              const hashBuffer = await crypto.subtle.digest('SHA-256', data);
              const hashArray = Array.from(new Uint8Array(hashBuffer));
              const hashedEmail = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
              userData.em = [hashedEmail];
            } catch (error) {
              console.warn('Failed to hash email for Facebook CAPI:', error);
            }
          }

          // Add hashed customer phone if available
          if (orderPayload.customer.phone) {
            try {
              // Remove non-numeric characters and hash
              const cleanPhone = orderPayload.customer.phone.replace(/[^0-9]/g, '');
              const encoder = new TextEncoder();
              const data = encoder.encode(cleanPhone);
              const hashBuffer = await crypto.subtle.digest('SHA-256', data);
              const hashArray = Array.from(new Uint8Array(hashBuffer));
              const hashedPhone = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
              userData.ph = [hashedPhone];
            } catch (error) {
              console.warn('Failed to hash phone for Facebook CAPI:', error);
            }
          }

          // Add fbclid as fbc parameter if available
          if (session.metadata?.fbclid) {
            userData.fbc = `fb.1.${eventTime * 1000}.${session.metadata.fbclid}`;
          }

          // Build Facebook event
          const fbEventData = {
            event_name: 'Purchase',
            event_time: eventTime,
            event_id: fbEventId,
            event_source_url: session.success_url || 'https://shop.oracleboxing.com/success',
            action_source: 'website',
            user_data: userData,
            custom_data: customData,
          };

          const fbPayload = {
            data: [fbEventData],
            access_token: FB_ACCESS_TOKEN,
            test_event_code: 'TEST85396',
          };

          console.log('📊 Sending Purchase to Facebook CAPI:', {
            event_id: fbEventId,
            value: customData.value,
            currency: customData.currency,
            content_ids: customData.content_ids,
            num_items: customData.num_items,
            custom_data_keys: Object.keys(customData),
            customer_email_hashed: !!userData.em,
            customer_phone_hashed: !!userData.ph,
          });

          const fbResponse = await fetch(FB_CONVERSIONS_API_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(fbPayload),
          });

          const fbResult = await fbResponse.json();

          if (!fbResponse.ok) {
            console.error('❌ Facebook CAPI Purchase error:', fbResult);
          } else {
            console.log('✅ Facebook CAPI Purchase success:', fbResult);
          }
        } catch (error) {
          console.error('❌ Failed to send Purchase to Facebook CAPI:', error);
        }

        // 🔌 Process fulfillment here
        // - Grant digital product access (Skool invites)
        // - Send physical items to Printful
        // - Update database records

        break;
      }

      case "payment_intent.succeeded": {
        const pi = event.data.object as Stripe.PaymentIntent;

        console.log('Payment intent succeeded:', {
          id: pi.id,
          amount: pi.amount,
          metadata: pi.metadata,
        });

        // Handle off-session upsell charges
        if (pi.metadata?.source === "upsell") {
          console.log('Upsell charge succeeded:', {
            original_session: pi.metadata.original_session_id,
            product: pi.metadata.product_id,
          });

          // Parse cookie data from metadata if it exists
          let parsedCookieData = {};
          if (pi.metadata?.cookie_data) {
            try {
              parsedCookieData = JSON.parse(pi.metadata.cookie_data);
            } catch (e) {
              console.warn('Failed to parse cookie_data from payment intent metadata:', e);
            }
          }

          // Build upsell purchase payload
          const upsellPayload = {
            // Event Information
            event_type: 'upsell_purchase',
            event_time: new Date().toISOString(),
            stripe_event_id: event.id,

            // Order Summary
            order: {
              id: pi.id,
              amount_total: pi.amount / 100,
              currency: pi.currency?.toUpperCase() || 'USD',
              status: pi.status,
            },

            // Customer Information (from charges if available)
            customer: {
              id: pi.customer as string || '',
              email: typeof pi.charges?.data?.[0]?.billing_details?.email === 'string' ? pi.charges.data[0].billing_details.email : '',
              name: typeof pi.charges?.data?.[0]?.billing_details?.name === 'string' ? pi.charges.data[0].billing_details.name : '',
            },

            // Upsell-specific information
            upsell: {
              source: pi.metadata?.source || '',
              upsell_type: pi.metadata?.upsell_type || '',
              original_session_id: pi.metadata?.original_session_id || '',
              product_id: pi.metadata?.product_id || '',
              product_name: pi.metadata?.product_name || '',
              is_membership_upsell: pi.metadata?.is_membership_upsell === 'true',
            },

            // Stripe Metadata (includes all tracking params)
            metadata: {
              // Customer info
              customer_first_name: pi.metadata?.customer_first_name || '',
              customer_last_name: pi.metadata?.customer_last_name || '',
              customer_phone: pi.metadata?.customer_phone || '',

              // Funnel tracking
              funnel_type: pi.metadata?.funnel_type || '',
              type: pi.metadata?.type || '',
              entry_product: pi.metadata?.entry_product || '',

              // UTM & Tracking parameters
              referrer: pi.metadata?.referrer || '',
              utm_source: pi.metadata?.utm_source || '',
              utm_medium: pi.metadata?.utm_medium || '',
              utm_campaign: pi.metadata?.utm_campaign || '',
              utm_term: pi.metadata?.utm_term || '',
              utm_content: pi.metadata?.utm_content || '',
              fbclid: pi.metadata?.fbclid || '',
              session_id: pi.metadata?.session_id || '',
              event_id: pi.metadata?.event_id || '',
            },

            // Full Cookie Data (parsed from metadata)
            cookie_data: parsedCookieData,

            // Payment Details
            payment: {
              payment_intent_id: pi.id,
              payment_method: pi.payment_method,
              payment_method_types: pi.payment_method_types || [],
            },
          };

          console.log('📦 Sending upsell purchase data to Make.com webhook');

          // Send to Make.com webhook
          const MAKE_WEBHOOK_URL = 'https://hook.eu2.make.com/rmssfwgpgrbkihnly4ocxd2cf6kmfbo3';

          try {
            const webhookResponse = await fetch(MAKE_WEBHOOK_URL, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(upsellPayload),
            });

            if (webhookResponse.ok) {
              console.log('✅ Successfully sent upsell data to Make.com webhook');
            } else {
              console.error('❌ Make.com webhook returned error:', webhookResponse.status);
            }
          } catch (error) {
            console.error('❌ Failed to send upsell to Make.com webhook:', error);
          }

          // Send Purchase event to Facebook Conversions API for upsell
          console.log('📊 Sending Upsell Purchase event to Facebook Conversions API');

          try {
            const eventTime = Math.floor(Date.now() / 1000);

            // Get client IP from request headers
            const forwarded = req.headers.get('x-forwarded-for');
            const clientIp = forwarded ? forwarded.split(',')[0].trim() : req.headers.get('x-real-ip') || '';

            // Get user agent
            const userAgent = req.headers.get('user-agent') || '';

            // Use event_id from metadata for deduplication
            const fbEventId = pi.metadata?.event_id || `server_upsell_${pi.id}`;

            // Build custom_data with cookie tracking data
            const customData: Record<string, any> = {
              value: upsellPayload.order.amount_total,
              currency: upsellPayload.order.currency,
              content_ids: [pi.metadata?.product_id || 'upsell'],
              content_type: 'product',
              num_items: 1,
              contents: [{
                id: pi.metadata?.product_id || 'upsell',
                quantity: 1,
                item_price: upsellPayload.order.amount_total,
              }],
            };

            // Add cookie data fields to custom_data (max 500 chars each)
            if (parsedCookieData && typeof parsedCookieData === 'object') {
              Object.keys(parsedCookieData).forEach(key => {
                // Skip user_agent - it's already in user_data section
                if (key === 'user_agent') {
                  return;
                }

                const value = parsedCookieData[key];
                if (value !== null && value !== undefined) {
                  const stringValue = String(value);
                  customData[key] = stringValue.length > 500 ? stringValue.substring(0, 500) : stringValue;
                }
              });
            }

            // Build user_data with customer information
            const userData: Record<string, any> = {
              client_ip_address: clientIp,
              client_user_agent: userAgent,
            };

            // Add hashed customer email if available
            if (upsellPayload.customer.email) {
              try {
                // Hash email with SHA-256
                const encoder = new TextEncoder();
                const data = encoder.encode(upsellPayload.customer.email.toLowerCase().trim());
                const hashBuffer = await crypto.subtle.digest('SHA-256', data);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashedEmail = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                userData.em = [hashedEmail];
              } catch (error) {
                console.warn('Failed to hash email for Facebook CAPI:', error);
              }
            }

            // Add fbclid as fbc parameter if available
            if (pi.metadata?.fbclid) {
              userData.fbc = `fb.1.${eventTime * 1000}.${pi.metadata.fbclid}`;
            }

            // Build Facebook event
            const fbEventData = {
              event_name: 'Purchase',
              event_time: eventTime,
              event_id: fbEventId,
              event_source_url: 'https://shop.oracleboxing.com/success',
              action_source: 'website',
              user_data: userData,
              custom_data: customData,
            };

            const fbPayload = {
              data: [fbEventData],
              access_token: FB_ACCESS_TOKEN,
              test_event_code: 'TEST85396',
            };

            console.log('📊 Sending Upsell Purchase to Facebook CAPI:', {
              event_id: fbEventId,
              value: customData.value,
              currency: customData.currency,
              content_ids: customData.content_ids,
              upsell_type: pi.metadata?.upsell_type,
              custom_data_keys: Object.keys(customData),
              customer_email_hashed: !!userData.em,
            });

            const fbResponse = await fetch(FB_CONVERSIONS_API_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(fbPayload),
            });

            const fbResult = await fbResponse.json();

            if (!fbResponse.ok) {
              console.error('❌ Facebook CAPI Upsell Purchase error:', fbResult);
            } else {
              console.log('✅ Facebook CAPI Upsell Purchase success:', fbResult);
            }
          } catch (error) {
            console.error('❌ Failed to send Upsell Purchase to Facebook CAPI:', error);
          }

          // Grant access to upsold product
        }
        break;
      }

      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        console.log('Charge refunded:', charge.id);
        // Handle refund logic
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`Subscription ${event.type}:`, subscription.id);
        // Handle membership changes
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (err) {
    console.error("Webhook handler failed:", err);
    // Still return 200 to prevent retries if we've logged the error
  }

  // Respond fast; Stripe needs a 2xx to stop retrying
  return NextResponse.json({ received: true }, { status: 200 });
}
