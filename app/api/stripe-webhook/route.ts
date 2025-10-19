import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

        // 🔌 Option A: Send to Make.com webhook
        if (process.env.MAKE_WEBHOOK_URL) {
          await fetch(process.env.MAKE_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: event.type,
              data: session,
            }),
          });
        }

        // 🔌 Option B: Process fulfillment here
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
