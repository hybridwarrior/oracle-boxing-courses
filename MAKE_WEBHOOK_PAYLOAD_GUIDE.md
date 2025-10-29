# Make.com Webhook Payload Guide

Complete guide to the purchase data sent to your Make.com webhook: `https://hook.eu2.make.com/rmssfwgpgrbkihnly4ocxd2cf6kmfbo3`

## Overview

When a customer completes a purchase, a comprehensive payload is sent to your Make.com webhook containing:
- ✅ Complete order details (amount, currency, status)
- ✅ All purchased items with prices and descriptions
- ✅ Customer information (name, email, phone)
- ✅ Full Stripe metadata (UTM params, funnel tracking, etc.)
- ✅ Complete cookie tracking data (attribution, session info, location)
- ✅ Payment method and transaction IDs

## Event Types

### 1. Main Purchase (`event_type: "purchase"`)
Triggered by: `checkout.session.completed` Stripe webhook event

### 2. Upsell Purchase (`event_type: "upsell_purchase"`)
Triggered by: `payment_intent.succeeded` Stripe webhook event (when `metadata.source = "upsell"`)

---

## Payload Structure

### Main Purchase Payload

```json
{
  // Event Information
  "event_type": "purchase",
  "event_time": "2025-01-15T10:30:45.123Z",
  "stripe_event_id": "evt_1AbC2dEfGhI3jKlM",

  // Order Summary
  "order": {
    "id": "cs_test_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
    "amount_total": 197.00,
    "amount_subtotal": 197.00,
    "currency": "USD",
    "payment_status": "paid",
    "status": "complete"
  },

  // Customer Information
  "customer": {
    "id": "cus_AbC1234567890",
    "email": "john.doe@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "phone": "+1234567890",
    "name": "John Doe"
  },

  // Line Items (Products Purchased)
  "line_items": [
    {
      "id": "li_1AbC2dEfGhI3jKlM",
      "description": "6-Week Boxing Challenge",
      "quantity": 1,
      "amount_total": 197.00,
      "amount_subtotal": 197.00,
      "price": {
        "id": "price_1AbC2dEfGhI3jKlM",
        "unit_amount": 197.00,
        "currency": "USD",
        "type": "one_time",
        "recurring": null
      },
      "product": {
        "id": "prod_AbC1234567890",
        "name": "6-Week Boxing Challenge",
        "description": "Complete boxing training program"
      }
    }
  ],

  // Stripe Metadata (All Tracking Parameters)
  "metadata": {
    // Customer info
    "customer_first_name": "John",
    "customer_last_name": "Doe",
    "customer_phone": "+1234567890",

    // Funnel tracking
    "funnel_type": "6wc",
    "type": "6wc",
    "entry_product": "6wc",
    "add_ons_included": "recordings-vault,lifetime-access",

    // Cart information
    "cart_items": "[{\"id\":\"6wc\",\"quantity\":1,\"price\":197}]",

    // UTM & Tracking parameters
    "referrer": "https://google.com",
    "utm_source": "facebook",
    "utm_medium": "cpc",
    "utm_campaign": "summer-promo",
    "utm_term": "boxing-training",
    "utm_content": "ad-variant-a",
    "fbclid": "IwAR1234567890abcdefghijk",
    "session_id": "session_1736936445123_abc123",
    "event_id": "1736936445123-abc123def"
  },

  // Full Cookie Data (Complete Tracking Information)
  "cookie_data": {
    "session_id": "session_1736936445123_abc123",
    "event_id": "1736936445123-abc123def",

    // First-touch attribution
    "first_utm_source": "facebook",
    "first_utm_medium": "cpc",
    "first_utm_campaign": "summer-promo",
    "first_utm_content": "ad-variant-a",
    "first_referrer": "https://facebook.com",
    "first_page": "/",
    "first_touch_timestamp": 1736936445123,

    // Last-touch attribution
    "last_utm_source": "email",
    "last_utm_medium": "newsletter",
    "last_utm_campaign": "weekly-update",
    "last_utm_content": "cta-button",
    "last_referrer": "https://email-client.com",
    "last_touch_timestamp": 1736937845123,

    // Location data
    "location": {
      "city": "New York",
      "country": "US",
      "region": "NY",
      "postal": "10001",
      "timezone": "America/New_York",
      "latitude": 40.7128,
      "longitude": -74.0060
    },

    // Consent status
    "consent": true,
    "consent_timestamp": 1736936445123,

    // Device information
    "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)..."
  },

  // Payment Details
  "payment": {
    "payment_intent_id": "pi_1AbC2dEfGhI3jKlM",
    "subscription_id": null,
    "payment_method_types": ["card"]
  },

  // Additional Session Details
  "session_details": {
    "mode": "payment",
    "locale": "en",
    "created": 1736936445,
    "expires_at": 1736940045,
    "success_url": "https://shop.oracleboxing.com/success?session_id={CHECKOUT_SESSION_ID}"
  }
}
```

### Upsell Purchase Payload

```json
{
  // Event Information
  "event_type": "upsell_purchase",
  "event_time": "2025-01-15T10:35:22.456Z",
  "stripe_event_id": "evt_2XyZ3wVuTsR4qPoN",

  // Order Summary
  "order": {
    "id": "pi_1AbC2dEfGhI3jKlM",
    "amount_total": 97.00,
    "currency": "USD",
    "status": "succeeded"
  },

  // Customer Information
  "customer": {
    "id": "cus_AbC1234567890",
    "email": "john.doe@example.com",
    "name": "John Doe"
  },

  // Upsell-specific Information
  "upsell": {
    "source": "upsell",
    "upsell_type": "membership",
    "original_session_id": "cs_test_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
    "product_id": "prod_MembershipMonthly",
    "product_name": "Oracle Boxing Membership - Monthly",
    "is_membership_upsell": true
  },

  // Stripe Metadata (Same as main purchase)
  "metadata": {
    "customer_first_name": "John",
    "customer_last_name": "Doe",
    "funnel_type": "6wc",
    "utm_source": "facebook",
    // ... (all tracking params)
  },

  // Full Cookie Data (Same structure as main purchase)
  "cookie_data": {
    "session_id": "session_1736936445123_abc123",
    "event_id": "1736936445123-abc123def",
    // ... (complete tracking data)
  },

  // Payment Details
  "payment": {
    "payment_intent_id": "pi_1AbC2dEfGhI3jKlM",
    "payment_method": "pm_1AbC2dEfGhI3jKlM",
    "payment_method_types": ["card"]
  }
}
```

---

## Field Descriptions

### Event Information
- **event_type**: Type of purchase event (`"purchase"` or `"upsell_purchase"`)
- **event_time**: ISO 8601 timestamp of when the webhook was sent
- **stripe_event_id**: Unique Stripe event identifier for idempotency

### Order Summary
- **id**: Stripe checkout session ID or payment intent ID
- **amount_total**: Total amount in dollars (already divided by 100)
- **amount_subtotal**: Subtotal before taxes/fees
- **currency**: Three-letter ISO currency code (e.g., "USD")
- **payment_status**: Payment status from Stripe (`"paid"`, `"unpaid"`, etc.)
- **status**: Overall session status (`"complete"`, `"open"`, etc.)

### Customer Information
- **id**: Stripe customer ID
- **email**: Customer email address
- **first_name**: Customer first name (from metadata)
- **last_name**: Customer last name (from metadata)
- **phone**: Customer phone number (if provided)
- **name**: Full name from Stripe customer details

### Line Items
Array of purchased products with:
- **id**: Line item ID
- **description**: Product description
- **quantity**: Number of items purchased
- **amount_total**: Total for this line item
- **amount_subtotal**: Subtotal for this line item
- **price**: Price object with unit amount, currency, type (one_time/recurring)
- **product**: Product object with ID, name, description

### Metadata Fields

#### Customer Information
- **customer_first_name**: First name
- **customer_last_name**: Last name
- **customer_phone**: Phone number

#### Funnel Tracking
- **funnel_type**: Funnel identifier (`"6wc"`, `"membership"`, `"course"`, etc.)
- **type**: Purchase type (`"6wc"`, `"membership"`, `"course"`, `"coaching"`)
- **entry_product**: Initial product that started the funnel
- **add_ons_included**: Comma-separated list of add-on products

#### Cart Information
- **cart_items**: JSON string containing array of cart items with IDs, quantities, prices

#### UTM & Tracking Parameters
- **referrer**: Referring URL or `"direct"`
- **utm_source**: UTM source parameter (e.g., `"facebook"`, `"google"`)
- **utm_medium**: UTM medium parameter (e.g., `"cpc"`, `"email"`)
- **utm_campaign**: UTM campaign parameter
- **utm_term**: UTM term parameter (keywords)
- **utm_content**: UTM content parameter (ad variant)
- **fbclid**: Facebook Click ID for ad attribution
- **session_id**: Analytics session identifier
- **event_id**: Event tracking ID for deduplication

### Cookie Data Fields

#### Session & Event Tracking
- **session_id**: Unique session identifier
- **event_id**: Unique event identifier for deduplication

#### First-Touch Attribution
- **first_utm_source**: First UTM source in customer journey
- **first_utm_medium**: First UTM medium
- **first_utm_campaign**: First UTM campaign
- **first_utm_content**: First UTM content
- **first_referrer**: First referring URL
- **first_page**: First page visited on site
- **first_touch_timestamp**: Unix timestamp of first touch

#### Last-Touch Attribution
- **last_utm_source**: Most recent UTM source
- **last_utm_medium**: Most recent UTM medium
- **last_utm_campaign**: Most recent UTM campaign
- **last_utm_content**: Most recent UTM content
- **last_referrer**: Most recent referring URL
- **last_touch_timestamp**: Unix timestamp of last touch

#### Location Data
- **location.city**: City name
- **location.country**: Two-letter country code
- **location.region**: State/province code
- **location.postal**: Postal/ZIP code
- **location.timezone**: IANA timezone identifier
- **location.latitude**: Latitude coordinate
- **location.longitude**: Longitude coordinate

#### Consent & Device
- **consent**: Boolean indicating cookie consent status
- **consent_timestamp**: Unix timestamp when consent was given
- **user_agent**: Browser user agent string

### Payment Details
- **payment_intent_id**: Stripe Payment Intent ID
- **subscription_id**: Stripe Subscription ID (if applicable)
- **payment_method**: Stripe Payment Method ID (for upsells)
- **payment_method_types**: Array of payment methods used

### Session Details
- **mode**: Checkout mode (`"payment"` or `"subscription"`)
- **locale**: Customer locale (e.g., `"en"`)
- **created**: Unix timestamp of session creation
- **expires_at**: Unix timestamp of session expiration
- **success_url**: Success page URL

### Upsell-Specific Fields
- **source**: Always `"upsell"` for upsell purchases
- **upsell_type**: Type of upsell (`"coaching"`, `"membership"`)
- **original_session_id**: Reference to original checkout session
- **product_id**: Upsold product identifier
- **product_name**: Human-readable product name
- **is_membership_upsell**: Boolean indicating membership upsell

---

## Usage in Make.com

### Accessing Data in Make.com

All fields can be accessed using Make.com's variable syntax:

```
Order ID: {{order.id}}
Customer Email: {{customer.email}}
Total Amount: {{order.amount_total}}
UTM Source: {{metadata.utm_source}}
First Touch UTM: {{cookie_data.first_utm_source}}
Customer City: {{cookie_data.location.city}}
```

### Common Use Cases

#### 1. Customer Attribution Analysis
```
First Touch: {{cookie_data.first_utm_source}} / {{cookie_data.first_utm_medium}}
Last Touch: {{cookie_data.last_utm_source}} / {{cookie_data.last_utm_medium}}
Revenue: ${{order.amount_total}}
```

#### 2. Geo-Targeting
```
Location: {{cookie_data.location.city}}, {{cookie_data.location.region}}, {{cookie_data.location.country}}
Timezone: {{cookie_data.location.timezone}}
```

#### 3. Funnel Analysis
```
Entry Product: {{metadata.entry_product}}
Funnel Type: {{metadata.funnel_type}}
Add-ons: {{metadata.add_ons_included}}
```

#### 4. Email Personalization
```
Hi {{customer.first_name}},

Thank you for your purchase of {{line_items[].product.name}}!
Order Total: ${{order.amount_total}} {{order.currency}}
```

---

## Testing

### Test the Webhook
You can test the webhook by making a test purchase in Stripe's test mode. Make sure to:

1. Use test card: `4242 4242 4242 4242`
2. Check Stripe Dashboard → Developers → Webhooks for delivery logs
3. Check Make.com scenario execution history

### Sample Test Payload
Use Stripe CLI to send test events:
```bash
stripe trigger checkout.session.completed
```

---

## Troubleshooting

### No Data Received
- ✅ Check Stripe webhook endpoint is configured correctly
- ✅ Verify webhook secret in environment variables
- ✅ Check Make.com scenario is active
- ✅ Review Stripe webhook delivery logs

### Missing Cookie Data
- ✅ Ensure user accepted cookies before checkout
- ✅ Verify `ob_track` cookie is being set
- ✅ Check browser console for cookie-related errors

### Parsing Errors
- ✅ Check Make.com error logs for JSON parsing issues
- ✅ Verify cookie_data is valid JSON in Stripe metadata
- ✅ Check for special characters in metadata fields

---

## Implementation Details

**File**: `/opt/shop/app/api/stripe-webhook/route.ts`

The webhook handler:
1. Receives Stripe webhook events
2. Verifies webhook signature for security
3. Retrieves expanded session data with line items
4. Parses cookie data from Stripe metadata
5. Builds comprehensive payload
6. Sends to Make.com webhook
7. Returns 200 OK to Stripe

**Security**: Webhook signature verification ensures requests come from Stripe.

**Reliability**: Handler returns 200 OK after processing to prevent Stripe retries.

---

## Related Documentation

- [Metadata Tracking Summary](./METADATA_TRACKING_SUMMARY.md)
- [UTM Tracking Implementation](./UTM_TRACKING_IMPLEMENTATION.md)
- [Stripe Webhooks Documentation](https://stripe.com/docs/webhooks)
