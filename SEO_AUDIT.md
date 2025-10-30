# Oracle Boxing Shop - Complete SEO Metadata Audit

**Generated:** 2025-10-30
**Domain:** https://shop.oracleboxing.com

---

## Global Configuration (Root Layout)

**File:** `/app/layout.tsx`

### Meta Tags
- **Title:** `Oracle Boxing Shop | Premium Boxing Courses & Training`
- **Description:** `Shop premium boxing courses, coaching replays, and the complete Boxing Masterclass system. Learn from expert coaches Oliver & Toni.`
- **Keywords:** `boxing courses, boxing training, online boxing, boxing masterclass, boxing coaching, oracle boxing, boxing shop`
- **Authors:** Oracle Boxing
- **Creator:** Oracle Boxing
- **Publisher:** Oracle Boxing
- **Canonical URL:** `https://shop.oracleboxing.com/`

### Open Graph
- **og:title:** `Oracle Boxing Shop | Premium Boxing Courses`
- **og:description:** `Shop premium boxing courses, coaching replays, and the complete Boxing Masterclass system.`
- **og:url:** `https://shop.oracleboxing.com`
- **og:site_name:** Oracle Boxing Shop
- **og:locale:** en_US
- **og:type:** website

### Favicon
- **Icon:** `https://media.oracleboxing.com/Website/favicon.png`

### Third-Party Scripts
- **Google Tag Manager:** GTM-NXKTDCT5
- **Facebook Pixel:** 1474540100541059
- **Google Analytics:** G-QL4S6JCWK7

---

## Public Pages

### 1. Homepage
**Route:** `/`
**File:** `/app/page.tsx`
**Type:** Client component ('use client')

**SEO Metadata:**
- ❌ No page-specific metadata (inherits from root layout)
- Uses root layout metadata

**Content Structure:**
- Hero video section with tagline: "Boxing Education For Beginners & Late Starters"
- 6-Week Challenge promotional section
- Featured courses (Bundle, 6-Month Membership)
- Testimonials section
- Newsletter signup form

**Key Elements:**
- Dynamic video hero (desktop/mobile variants)
- Product cards for Bundle and Membership
- Social proof via testimonials
- Newsletter integration (Make.com webhook)

---

### 2. Boxing Masterclass (BFFP)
**Route:** `/courses/bffp`
**File:** `/app/courses/bffp/page.tsx`
**Type:** Client component ('use client')

**SEO Metadata:**
- ❌ No page-specific metadata (inherits from root layout)

**Content Structure:**
- **Hero:** "The Science of Boxing, Made Simple."
- **Subheadline:** "The deepest truths of the sweet science, boiled down to their simplest form."
- 26 lessons across 5 modules
- Video sales letter placeholder
- Course curriculum with 5 modules:
  - Sentience (Mind)
  - Anatomy (Body)
  - Formis (Movement)
  - Gambit (Tactics)
  - Engine (Conditioning)

**Key Elements:**
- VideoPlayer component
- CourseStats: 26 lessons, #1 purchase label, lifetime access
- Pricing popup
- FAQ section (6 questions)
- 30-day money-back guarantee

---

### 3. Boxing Roadmap
**Route:** `/courses/roadmap`
**File:** `/app/courses/roadmap/page.tsx`
**Type:** Client component ('use client')

**SEO Metadata:**
- ❌ No page-specific metadata (inherits from root layout)

**Content Structure:**
- **Hero:** "Your Step-by-Step Path to Real Boxing Skill"
- **Subheadline:** "Follow a clear 5-phase system that takes you from your first stance to sparring-ready. Every move, every drill, in the right order."
- 75 lessons across 5 structured phases
- 20 weeks training duration
- 100+ workouts

**Phases:**
- Phase I (Fundamentals) - 15 lessons
- Phase II (Defence & Range) - 18 lessons
- Phase III (Footwork) - 14 lessons
- Phase IV (Advanced Defence) - 16 lessons
- Phase V (Integration) - 12 lessons

**Key Elements:**
- CourseStats: 176 lessons, 20 weeks, 100 workouts, lifetime access
- FAQ section (7 questions)
- Pricing popup

---

### 4. Oracle Boxing Bundle
**Route:** `/courses/bundle`
**File:** `/app/courses/bundle/page.tsx`
**Type:** Client component ('use client')

**SEO Metadata:**
- ❌ No page-specific metadata (inherits from root layout)

**Content Structure:**
- **Hero:** "The Complete Methodology for Learning Old School Boxing, Anytime, Anywhere"
- Includes all three courses:
  - Boxing Masterclass ($297)
  - Boxing Roadmap ($147)
  - Coaching Call Replays ($97)
- Total value: $541 → Bundle price: $397 (saves $144)

**Key Elements:**
- CourseStats: 225 lessons, 220+ coaching calls, lifetime access
- BundleCourseCarousel component
- PlatformScreenshotsCarousel
- BundleTimelineProcess
- FAQ section (7 questions)

---

### 5. 6-Week Challenge
**Route:** `/6wc`
**File:** `/app/6wc/page.tsx`
**Type:** Client component ('use client')

**SEO Metadata:**
- ❌ No page-specific metadata (inherits from root layout)

**Content Structure:**
- **Headline:** 6-Week Challenge with $197 commitment
- **Promise:** "Do the bare minimum, get way better at boxing, and we'll refund all your money at the finish line."
- Limited spots available badge
- Includes:
  - Full Boxing Masterclass access
  - Lifetime Boxing Roadmap access
  - 6 weeks of live coaching
  - Personal video feedback
  - Private Skool community access

**Key Elements:**
- HeroSection component
- TransformationStory (founder's journey)
- TestimonialsWithMediaSection
- PlatformScreenshotsCarousel
- RefundRequirementsSection
- FAQSection
- PricingPopup
- No header on this page (only footer)

---

### 6. Membership
**Route:** `/membership`
**File:** `/app/membership/page.tsx`
**Type:** Client component ('use client')

**SEO Metadata:**
- ❌ No page-specific metadata (inherits from root layout)

**Content Structure:**
- **Hero:** "Old School Boxing, New School System"
- **Subheadline:** "Master the timeless fundamentals of boxing through modern coaching methods, cutting-edge movement science, and a supportive global community."
- **Pricing:** Starting from variable price per month

**Membership Tiers:**
- Annual: $897/year (best value)
- Bi-Annual: $497/6 months
- Quarterly: $297/3 months
- Monthly option: $97/month (available after purchase)

**Benefits:**
- Daily coaching calls with Oliver & Toni
- 300+ member community
- All courses included (BFFP, Roadmap, Replays)
- Train anytime, 24/7 access
- Personal video feedback
- Private Skool community
- Leaderboards and accountability
- Exclusive workshops and mentorship

**Key Elements:**
- Hero video (vertical format)
- Results section (4 transformation videos)
- Platform screenshots carousel
- Testimonials (8 members)
- Inline pricing cards with radio selection
- FAQ section (14 questions)
- Comparison: Commercial Boxing Gyms vs Online Coaching

---

### 7. Checkout
**Route:** `/checkout`
**File:** `/app/checkout/page.tsx`
**Type:** Client component ('use client')

**SEO Metadata:**
- ❌ No page-specific metadata (inherits from root layout)

**Content Structure:**
- Minimal contact form (email + full name)
- Logo display
- "Just a few details to get started"

**Routing Logic:**
- 6WC → Order bumps page
- Course (BFFP, Roadmap) → Order bumps page
- Bundle/Membership → Direct to Stripe

**Key Elements:**
- UTM tracking integration
- Cookie tracking capture
- Client-side form validation
- Loading states

---

### 8. Order Bumps
**Route:** `/checkout/order-bumps`
**File:** `/app/checkout/order-bumps/page.tsx`
**Type:** Client component ('use client')

**SEO Metadata:**
- ❌ No page-specific metadata (inherits from root layout)

**Content Structure:**
- Dynamic order bumps based on funnel type:
  - **6WC Funnel:** Recordings Vault ($97) + Lifetime BFFP ($147)
  - **Course Funnel:** 6-Week Membership ($47)

---

### 9. Terms of Service
**Route:** `/terms`
**File:** `/app/terms/page.tsx`
**Type:** Server component

**SEO Metadata:**
- ❌ No page-specific metadata (inherits from root layout)

**Content Structure:**
- Last Updated: November 2025
- 17 sections covering:
  1. Acceptance of Terms
  2. Service Description
  3. Digital Content License
  4. Skool Community Content Rights
  5. User Responsibilities
  6. Membership Terms
  7. Health and Safety Disclaimer
  8. Intellectual Property
  9. Refund and Guarantee Policy
  10. Account Termination
  11. Limitation of Liability
  12. Disclaimer of Warranties
  13. Governing Law (England and Wales, UK)
  14. Modifications to Terms
  15. Severability
  16. Entire Agreement
  17. Contact Information

**Company Details:**
- Oracle Boxing Ltd
- Unit 5 Artillery 88, Artillery Road, BA22 8RP, United Kingdom
- Email: team@oracleboxing.com

---

### 10. Privacy Policy
**Route:** `/privacy`
**File:** `/app/privacy/page.tsx`
**Type:** Server component

**SEO Metadata:**
- ❌ No page-specific metadata (inherits from root layout)

**Content Structure:**
- Last Updated: November 2025
- 13 sections covering:
  1. Introduction
  2. Information We Collect
  3. How We Use Your Information
  4. Third-Party Services and Data Sharing
  5. Skool Community Content Rights
  6. Data Security
  7. Data Retention
  8. Your Rights (GDPR and UK Data Protection)
  9. Marketing Communications
  10. International Data Transfers
  11. Children's Privacy
  12. Changes to This Privacy Policy
  13. Contact Us

**Third-Party Services Listed:**
- Stripe (payment processing)
- Make.com (course delivery automation)
- Facebook Pixel & Conversions API (advertising)
- CloudFlare (geolocation)

---

### 11. Guarantee
**Route:** `/guarantee`
**File:** `/app/guarantee/page.tsx`
**Type:** Server component

**SEO Metadata:**
- ❌ No page-specific metadata (inherits from root layout)

**Content Structure:**
- Last Updated: November 2025
- Two main sections:

**30-Day Money-Back Guarantee:**
- Applies to standalone digital courses only
- NOT covered: Lifetime upgrades, order bumps, add-ons
- Excluded: Memberships, 1-on-1 Coaching, 6-Week Challenge

**6-Week Challenge Guarantee:**
- Discretionary refund based on completion
- Requirements:
  - Attend 2 calls/week (or replays)
  - Post 1 training video/week
  - Complete 5 core lessons
  - Join 2 check-in calls
- Final approval at Oracle Boxing's discretion

---

### 12. Refund Policy
**Route:** `/refund`
**File:** `/app/refund/page.tsx`
**Type:** Server component

**SEO Metadata:**
- ❌ No page-specific metadata (inherits from root layout)

**Content Structure:**
- Last Updated: November 2025
- Detailed breakdown:

**YES - 30-Day Refunds:**
- Boxing Masterclass (standalone)
- Boxing Roadmap (standalone)
- Oracle Boxing Bundle (standalone)

**NO REFUNDS:**
- Memberships (all tiers) - clearly emphasized
- 1-on-1 Coaching
- Lifetime upgrades
- Order bumps/add-ons

**6-Week Challenge:**
- Discretionary refund approval only

**Special Circumstances:**
- Technical issues
- Duplicate charges
- Unauthorized charges
- Reviewed case-by-case

**Chargeback Warning:**
- Contact support first
- Chargebacks may result in permanent account suspension

---

### 13. Unlock Course
**Route:** `/unlock-course`
**File:** `/app/unlock-course/page.tsx`
**Type:** Client component ('use client')

**SEO Metadata:**
- ❌ No page-specific metadata (inherits from root layout)

**Content Structure:**
- **Headline:** "Claim your course access"
- **Subheadline:** "Submit your email to receive access to the course you've already purchased."
- Simple email form
- Success message with checkmark icon

---

## Success Pages (Typically No-Index)

These pages are shown after purchase completion:

### `/success/[session_id]` - Dynamic Stripe session ID
### `/success/thankyou` - Generic thank you
### `/success/course` - Course purchase success
### `/success/course-only` - Course only (no upsell)
### `/success/challenge` - 6WC success
### `/success/membership` - Membership success
### `/success/6wc` - 6WC specific success
### `/success/final` - Final success page
### `/success/call-booked` - Coaching call booked

**Note:** Success pages should typically have `noindex, nofollow` meta tags (not currently implemented).

---

## Admin Pages (Should Be Protected)

### `/admin/coaching-checkout` - Admin-only coaching checkout page

**Note:** Should be protected with authentication and have `noindex, nofollow` meta tags.

---

## Missing SEO Elements

### ❌ Page-Specific Metadata
- No individual course pages have unique titles/descriptions
- All pages inherit generic root layout metadata
- Missing product-specific Open Graph images
- No structured data (JSON-LD)

### ❌ Social Sharing Optimization
- No Twitter Card metadata
- No custom Open Graph images per page
- No og:image tags for individual products
- Missing product-specific social previews

### ❌ Technical SEO
- No XML sitemap
- No robots.txt visible
- Success pages missing noindex tags
- No canonical tags on individual pages
- No alternate language tags (hreflang)

### ❌ Structured Data (Schema.org)
- No Product schema for courses
- No Organization schema
- No Course schema markup
- No Review/Rating schema
- No FAQ schema (despite having FAQ sections)
- No Breadcrumb schema

### ❌ Image Optimization
- No alt text audit performed
- Many images loaded from external CDN (media.oracleboxing.com)
- No favicon.ico in /public (only PNG referenced in layout)

---

## Recommendations

### High Priority

1. **Add Page-Specific Metadata** for each product page:
   - Unique titles optimized for target keywords
   - Unique meta descriptions (155-160 characters)
   - Custom Open Graph images for each course
   - Product-specific keywords

2. **Implement Structured Data:**
   - Product schema for courses with price, availability, reviews
   - Course schema for educational content
   - Organization schema for Oracle Boxing
   - FAQ schema for pages with Q&A sections
   - Breadcrumb schema for navigation

3. **Add Social Media Meta Tags:**
   - Twitter Card tags (summary_large_image)
   - Custom og:image for each product (1200x630px)
   - og:image:alt tags
   - Product-specific og:description

4. **Technical SEO Fixes:**
   - Add noindex,nofollow to success pages
   - Add noindex to admin pages
   - Create XML sitemap
   - Add robots.txt
   - Implement canonical tags on all pages

### Medium Priority

5. **Image Optimization:**
   - Add descriptive alt text to all images
   - Consider serving images from same domain
   - Add favicon.ico to /public folder
   - Add apple-touch-icon for iOS

6. **Content Enhancement:**
   - Add more descriptive H1 tags
   - Optimize heading hierarchy
   - Add internal linking structure
   - Create blog/content marketing pages

### Low Priority

7. **Advanced SEO:**
   - Add hreflang tags for multi-currency support
   - Implement video schema for video content
   - Add AggregateRating schema from testimonials
   - Create separate landing pages for paid traffic

---

## Current Favicon Setup

**Location:** External CDN
**URL:** `https://media.oracleboxing.com/Website/favicon.png`
**Format:** PNG

**Recommended Additions:**
- `/public/favicon.ico` (multi-size ICO file)
- `/public/apple-touch-icon.png` (180x180px)
- `/public/favicon-16x16.png`
- `/public/favicon-32x32.png`
- `/public/android-chrome-192x192.png`
- `/public/android-chrome-512x512.png`

---

## Summary Statistics

- **Total Public Pages:** 13
- **Total Success Pages:** 8
- **Total Admin Pages:** 1
- **Pages with Custom Metadata:** 0 (all use root layout)
- **Pages with Structured Data:** 0
- **Pages with Open Graph Images:** 0
- **Pages with Proper Noindex:** 0

**Overall SEO Health:** ⚠️ **Needs Improvement**

The site has a solid technical foundation with Next.js 15 and proper tracking, but is missing critical page-specific SEO elements, structured data, and social sharing optimization.
