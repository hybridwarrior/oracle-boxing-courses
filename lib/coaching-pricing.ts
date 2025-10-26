// ===================================================================
// COACHING PRICING LOGIC UTILITIES
// ===================================================================
// Internal tool for creating custom 1-on-1 coaching checkout sessions
// with flexible pricing, discounts, and payment plans

export type CoachingTier = 'tier_1' | 'tier_2' | 'tier_3'
export type CustomerDiscount = 'none' | 'challenge_winner' | 'existing_member'
export type PaymentPlan = 'full' | 'split_2' | 'monthly'
export type Coach = 'Toni' | 'Charlie' | 'Oliver'

// Base pricing structure
export const TIER_PRICES = {
  tier_1: 1500,
  tier_2: 2000,
  tier_3: 2500,
} as const

// Customer discount amounts
export const CUSTOMER_DISCOUNTS = {
  none: 0,
  challenge_winner: 197,
  existing_member: 297,
} as const

// Monthly subscription rates (not affected by discounts)
export const MONTHLY_RATES = {
  tier_1: 500,
  tier_2: 700,
  tier_3: 900,
} as const

// 6-month commitment discount percentage
export const SIX_MONTH_DISCOUNT_PERCENTAGE = 0.10 // 10%

// Stripe product ID for 1-on-1 coaching
export const COACHING_PRODUCT_ID = 'prod_TJ3JW1RJaNaBMu'

// ===================================================================
// PRICING CALCULATION FUNCTIONS
// ===================================================================

interface PricingCalculation {
  basePrice: number
  customerDiscount: number
  subtotal: number
  sixMonthDiscount: number
  finalPrice: number
  monthlyAmount?: number // For split_2 or monthly plans
}

/**
 * Calculate final pricing based on selections
 */
export function calculateCoachingPrice(
  tier: CoachingTier,
  customerDiscount: CustomerDiscount,
  sixMonthCommitment: boolean,
  paymentPlan: PaymentPlan
): PricingCalculation {
  // Base price for selected tier
  const basePrice = TIER_PRICES[tier]

  // Apply customer discount
  const discountAmount = CUSTOMER_DISCOUNTS[customerDiscount]
  const subtotal = basePrice - discountAmount

  // Calculate 6-month discount if applicable
  const sixMonthDiscount = sixMonthCommitment
    ? Math.round(subtotal * SIX_MONTH_DISCOUNT_PERCENTAGE)
    : 0

  // Final price after all discounts
  const finalPrice = subtotal - sixMonthDiscount

  // Calculate monthly amount for payment plans
  let monthlyAmount: number | undefined = undefined

  if (paymentPlan === 'split_2') {
    // Split by 2: Final price divided by 2
    monthlyAmount = Math.round(finalPrice / 2)
  } else if (paymentPlan === 'monthly') {
    // Monthly: Use tier-specific monthly rate (no discounts)
    monthlyAmount = MONTHLY_RATES[tier]
  }

  return {
    basePrice,
    customerDiscount: discountAmount,
    subtotal,
    sixMonthDiscount,
    finalPrice,
    monthlyAmount,
  }
}

/**
 * Format price for display
 */
export function formatPrice(amount: number): string {
  return `$${amount.toLocaleString()}`
}

/**
 * Get tier display name
 */
export function getTierDisplayName(tier: CoachingTier): string {
  return `Tier ${tier.split('_')[1]}`
}

/**
 * Get customer discount display name
 */
export function getCustomerDiscountDisplayName(discount: CustomerDiscount): string {
  switch (discount) {
    case 'none':
      return 'No Discount'
    case 'challenge_winner':
      return 'Challenge Winner'
    case 'existing_member':
      return 'Existing Member'
  }
}

/**
 * Get payment plan display name
 */
export function getPaymentPlanDisplayName(plan: PaymentPlan): string {
  switch (plan) {
    case 'full':
      return 'Pay in Full'
    case 'split_2':
      return 'Split by 2'
    case 'monthly':
      return 'Monthly'
  }
}

/**
 * Create metadata object for Stripe session
 */
export function createCoachingMetadata(
  tier: CoachingTier,
  customerDiscount: CustomerDiscount,
  sixMonthCommitment: boolean,
  paymentPlan: PaymentPlan,
  coach: Coach,
  calculation: PricingCalculation
) {
  return {
    // Product identification
    product_id: COACHING_PRODUCT_ID,
    product_name: '1-on-1 Coaching',
    type: 'coaching',
    funnel_type: 'internal_coaching_tool',
    created_by: 'internal_coaching_tool',

    // Pricing details
    tier,
    base_price: calculation.basePrice.toString(),
    customer_discount_type: customerDiscount,
    customer_discount_amount: calculation.customerDiscount.toString(),
    six_month_commitment: sixMonthCommitment.toString(),
    six_month_discount_amount: calculation.sixMonthDiscount.toString(),
    final_price: calculation.finalPrice.toString(),

    // Payment plan
    payment_plan: paymentPlan,
    monthly_amount: calculation.monthlyAmount?.toString() || '',

    // Coach assignment
    coach,
  }
}
