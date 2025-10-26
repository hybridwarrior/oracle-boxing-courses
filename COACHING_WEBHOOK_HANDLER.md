# Coaching Subscription Auto-Cancel Webhook Handler

## Overview
For "Split by 2" payment plans, subscriptions need to automatically cancel after the 2nd payment. This requires webhook handling.

## Implementation Needed

### Webhook Event: `invoice.payment_succeeded`

When a subscription invoice is paid, check if it should auto-cancel:

```typescript
// In app/api/stripe-webhook/route.ts

case 'invoice.payment_succeeded': {
  const invoice = event.data.object as Stripe.Invoice

  // Check if this is a coaching subscription with auto-cancel
  if (invoice.subscription) {
    const subscription = await stripe.subscriptions.retrieve(
      invoice.subscription as string
    )

    const autoCancelAfter = subscription.metadata.auto_cancel_after_payments

    if (autoCancelAfter) {
      // Count how many invoices have been paid
      const invoices = await stripe.invoices.list({
        subscription: subscription.id,
        status: 'paid',
        limit: 100,
      })

      const paidCount = invoices.data.length
      const cancelAfterCount = parseInt(autoCancelAfter)

      console.log(`🔍 Coaching subscription ${subscription.id}: ${paidCount}/${cancelAfterCount} payments`)

      if (paidCount >= cancelAfterCount) {
        // Cancel the subscription at period end
        await stripe.subscriptions.update(subscription.id, {
          cancel_at_period_end: true,
        })

        console.log(`✅ Auto-canceled coaching subscription ${subscription.id} after ${paidCount} payments`)
      }
    }
  }
  break
}
```

## Metadata Flag

The subscription metadata will contain:
- `auto_cancel_after_payments`: "2" (for split by 2 plans)
- `payment_plan`: "split_2"

## Testing

1. Create a test "Split by 2" checkout link
2. Complete the checkout (use Stripe test mode)
3. Manually trigger the 2nd invoice payment
4. Verify subscription is set to cancel at period end

## Alternative: Subscription Schedules

If you prefer more control, you can use Stripe Subscription Schedules:

```typescript
// When creating split_2 subscription
const schedule = await stripe.subscriptionSchedules.create({
  customer: customerId,
  start_date: 'now',
  end_behavior: 'cancel',
  phases: [
    {
      items: [{ price: priceId, quantity: 1 }],
      iterations: 2, // Only 2 billing cycles
    },
  ],
})
```

This approach automatically limits the subscription to exactly 2 payments without webhook handling.
