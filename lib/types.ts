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
  interval?: 'month' | 'year'
  variants?: MerchVariant[]
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
