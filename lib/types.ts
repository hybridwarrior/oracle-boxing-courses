export type ProductType = 'course' | 'membership' | 'merch'

export interface MerchVariant {
  size: string
  color: string
  stripe_price_id: string
  stripe_product_id: string
  sku: string
}

export interface Product {
  id: string
  title: string
  description: string
  price: number
  type: ProductType
  stripe_price_id: string
  stripe_product_id: string
  image: string
  recurring?: boolean
  interval?: 'month' | 'year' | '6 months'
  variants?: MerchVariant[]
  // Metadata for tracking and funnel logic
  metadata?: string // Short identifier (e.g., 'bffp', '6wc', 'obm')
  // Multi-currency price IDs (optional - for products with multiple currencies)
  price_ids?: {
    usd?: string
    gbp?: string
    eur?: string
    aud?: string
    cad?: string
    aed?: string
  }
  // Multi-currency prices (optional - for display purposes)
  prices?: {
    usd?: number
    gbp?: number
    eur?: number
    aud?: number
    cad?: number
    aed?: number
  }
  // Course-specific metadata
  shortDescription?: string
  perfectFor?: string
  moduleCount?: number
  lessonCount?: number
  workoutCount?: number
  resourceCount?: number
  hours?: number
  weeks?: number
  hasStructuredProgression?: boolean
  workoutPlans?: number
  updatedMonthly?: boolean
  lessonCountPrefix?: string
}

export interface CartItem {
  product: Product
  quantity: number
  variant?: MerchVariant
  price_id: string
}

export interface Cart {
  items: CartItem[]
  hasPhysicalItems: boolean
  total: number
}
