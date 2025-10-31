# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Start development server:**
```bash
npm run dev
```
Runs Next.js 15 with Turbopack on http://localhost:3000

**Build for production:**
```bash
npm run build
```
Creates production build with Turbopack

**Deploy to Vercel:**
```bash
vercel --prod
```
Deploys to production on oracleboxing.com

**Type checking:**
```bash
npx tsc --noEmit
```
No dedicated npm script - run TypeScript compiler directly for type checking

## Architecture Overview

### Tech Stack
- **Next.js 15** with App Router and Turbopack
- **TypeScript** with strict mode
- **Tailwind CSS v4** for styling
- **Stripe** for payments with complex multi-currency support
- **Facebook Pixel** for conversion tracking
- **Make.com** webhooks for course delivery

### Critical Architectural Patterns

#### 1. Checkout Funnel System

The checkout flow has **4 distinct funnels** with different routing logic:

**Funnel Detection Logic** (`/app/checkout/page.tsx`):
- **6WC Funnel**: Empty cart OR `product.id === '6wc'` → `/checkout/order-bumps?funnel=6wc`
  - Shows: Recordings Vault ($97) + Lifetime BFFP ($147)
- **Course Funnel**: `product.id` in `['bffp', 'roadmap', 'vault']` → `/checkout/order-bumps?funnel=course`
  - Shows: 6-Week Membership ($47)
- **Bundle/Membership**: Direct to Stripe (no order bumps)
  - Immediately creates Stripe session

**Critical**: Funnel type is passed via URL params and determines which order bumps appear.

#### 2. Product Metadata System

Every product has a `metadata` field used for tracking:
- `bffp` → Boxing Masterclass
- `obm` → Oracle Boxing Bundle
- `6wc` → 6-Week Challenge
- `mem1`, `mem6`, `mem12` → Membership tiers
- `coach1`, `coachv` → Coaching products

**Usage**: Metadata flows through Stripe checkout sessions and webhooks to Make.com for course delivery automation.

#### 3. Multi-Currency Support

Currency detection and price ID selection in `/lib/currency.ts`:
- Detects user location via `/api/detect-location` (CloudFlare IP geolocation)
- Maps currency to appropriate Stripe Price ID
- Some products have multi-currency support, others USD-only
- **Coaching products**: Different price IDs for USD vs multi-currency

**Implementation**:
```typescript
getStripePriceId(product: Product, currency: Currency): string
```

#### 4. Tracking & Attribution System

**Cookie-based tracking** (`/lib/tracking-cookies.ts`):
- First-touch attribution (UTM params, referrer, timestamp)
- Last-touch attribution (updated on new sessions)
- Session ID, event ID, location data
- Facebook click ID (`fbclid`)
- All cookies embedded in Stripe metadata

**Facebook Pixel integration** (`/lib/fbpixel.ts`):
- Server-side events via Conversions API
- Client-side pixel for browser tracking
- Events: PageView, AddToCart, InitiateCheckout, Purchase
- Uses both cookie data and Stripe metadata

#### 5. Stripe Webhook → Make.com Pipeline

**Webhook handler** (`/app/api/stripe-webhook/route.ts`):
1. Receives `checkout.session.completed` or `payment_intent.succeeded`
2. Enriches with customer, line items, metadata
3. Adds complete cookie tracking data
4. Sends comprehensive payload to Make.com webhook
5. Make.com automates course delivery via email

**Payload structure** (documented in `MAKE_WEBHOOK_PAYLOAD_GUIDE.md`):
- Event type, order summary, customer info
- All purchased items with descriptions
- Full Stripe metadata (UTM, funnel, add-ons)
- Complete cookie tracking data (prefixed with `cookie_`)

#### 6. Cart Context Architecture

**Cart persistence** (`/contexts/CartContext.tsx`):
- LocalStorage-based cart with hydration handling
- Auto-swap logic for membership tiers (higher tier removes lower)
- Price ID selection based on variants or main product
- Physical item detection for shipping requirements

**Critical pattern**:
```typescript
const price_id = variant ? variant.stripe_price_id : product.stripe_price_id
```

#### 7. Cross-Sell & Upsell Matrix

**In-checkout cross-sell** (`/lib/stripe/checkout.ts`):
- If individual course in cart → recommend Bundle upgrade
- Uses `adjustable_quantity` to allow removal

**Post-purchase upsells** (defined in checkout.ts):
- Memberships → 1-on-1 Coaching (USD only price)
- Courses/Bundle → 1-on-1 Coaching (multi-currency price)
- Courses → downsell to 6-Week Membership
- 6WC → no upsells

### Key Files Reference

**Product & Pricing**:
- `/lib/products.ts` - Master product catalog with all Stripe IDs
- `/lib/currency.ts` - Multi-currency price mapping
- `/lib/coaching-pricing.ts` - Coaching product configurations

**Checkout Flow**:
- `/app/checkout/page.tsx` - Funnel detection and routing
- `/app/checkout/order-bumps/page.tsx` - Dynamic order bump display
- `/lib/stripe/checkout.ts` - Stripe session creation with cross-sell logic
- `/app/api/checkout/session/route.ts` - Session creation API endpoint

**Tracking**:
- `/lib/tracking-cookies.ts` - Cookie management and attribution
- `/lib/fbpixel.ts` - Facebook Pixel client-side tracking
- `/lib/purchase-tracking.ts` - Server-side Facebook Conversions API
- `/lib/webhook-tracking.ts` - Stripe webhook payload enrichment

**State Management**:
- `/contexts/CartContext.tsx` - Cart with localStorage persistence

**Webhooks**:
- `/app/api/stripe-webhook/route.ts` - Main Stripe webhook handler
- `/lib/simple-webhook.ts` - Make.com webhook sender

### Environment Variables

Required variables in `.env.local`:
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe public key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `NEXT_PUBLIC_FB_PIXEL_ID` - Facebook Pixel ID
- `FB_ACCESS_TOKEN` - Facebook Conversions API token

### Documentation Files

Reference docs (not code):
- `CHECKOUT_ROUTING_GUIDE.md` - Complete funnel routing logic
- `MAKE_WEBHOOK_PAYLOAD_GUIDE.md` - Webhook payload structure
- `FACEBOOK_PURCHASE_TRACKING.md` - FB Pixel implementation
- `DEPLOYMENT_GUIDE.md` - Vercel deployment instructions
- `complete_product_inventory.txt` - All Stripe product/price IDs

### Important Conventions

**Product Types**:
- `course` - Digital courses (BFFP, Roadmap, Bundle, Vault)
- `membership` - Recurring memberships (monthly, 6-month, annual)
- `coaching` - 1-on-1 coaching products
- `challenge` - 6-Week Challenge (special internal product)

**Metadata Naming**:
- Always use abbreviated metadata field for tracking
- Keep metadata short for Stripe limits
- Embed metadata in checkout sessions, payment intents, subscriptions

**Stripe Price IDs**:
- Multi-currency products have multiple price IDs
- Currency detection determines which price ID to use
- Always use `getStripePriceId()` helper for correct price selection

**Cookie Tracking**:
- All tracking cookies prefixed with `cookie_` in Stripe metadata
- First-touch attribution never changes after initial capture
- Last-touch attribution updates on new sessions
- Session tracking enables multi-touch attribution analysis
