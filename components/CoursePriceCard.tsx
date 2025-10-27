'use client'

import { useRouter } from 'next/navigation'
import { Product } from '@/lib/types'
import { Check } from 'lucide-react'
import { useCurrency } from '@/contexts/CurrencyContext'
import { getProductPrice, formatPrice, isMembershipProduct } from '@/lib/currency'

interface CoursePriceCardProps {
  product: Product
  features?: string[]
}

export function CoursePriceCard({ product, features = [] }: CoursePriceCardProps) {
  const router = useRouter()
  const { currency } = useCurrency()

  // Get price in selected currency
  const isMembership = isMembershipProduct(product.metadata)
  const convertedPrice = isMembership
    ? product.price
    : getProductPrice(product.metadata, currency) || product.price
  const displayCurrency = isMembership ? 'USD' : currency

  // Bundle crossed-out price (sum of individual course prices)
  const getBundleCrossedOutPrice = () => {
    if (product.id === 'bundle') {
      const bffpPrice = getProductPrice('bffp', currency) || 297
      const roadmapPrice = getProductPrice('brdmp', currency) || 147
      const clinicPrice = getProductPrice('rcv', currency) || 97
      return bffpPrice + roadmapPrice + clinicPrice // $541 USD or equivalent
    }
    return null
  }

  const bundleCrossedPrice = getBundleCrossedOutPrice()

  const handleEnroll = () => {
    // Direct URL routing - no cart needed
    router.push(`/checkout?product=${product.id}&source=course-price-card`)
  }

  // Dynamic course name heading
  const getCourseHeading = () => {
    const headings: Record<string, string> = {
      'bffp': 'Boxing from First Principles',
      'roadmap': 'The Boxing Roadmap',
      'vault': 'Boxing Clinic Replays',
      'bundle': 'The Oracle Boxing Method'
    }
    return headings[product.id] || product.title
  }

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#26304a] rounded-3xl p-10 sm:p-16 shadow-2xl text-white">
          {/* Logo */}
          <div className="flex justify-center mb-6 sm:mb-10">
            <img
              src="https://media.oracleboxing.com/Website/optimized/logos/long_white-large.webp"
              alt="Oracle Boxing"
              className="h-4 sm:h-6"
              onError={(e) => {
                // Fallback if logo doesn't load
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>

          {/* Heading */}
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-medium text-center mb-6 sm:mb-10 uppercase" style={{ fontFamily: "var(--font-satoshi)" }}>
            {getCourseHeading()}
          </h3>

          {/* Price */}
          <div className="text-center mb-6 sm:mb-10">
            {bundleCrossedPrice && (
              <div className="text-3xl sm:text-4xl font-bold opacity-60 line-through mb-2">
                {formatPrice(bundleCrossedPrice, displayCurrency)}
              </div>
            )}
            <div className="text-6xl sm:text-7xl md:text-8xl font-black mb-3">
              {formatPrice(convertedPrice, displayCurrency)}
            </div>
            {product.recurring && (
              <div className="text-xl sm:text-2xl font-bold opacity-90">per {product.interval}</div>
            )}
            {isMembership && currency !== 'USD' && (
              <div className="text-sm text-white/70 mt-2">USD only</div>
            )}
          </div>

          {/* CTA Button - White with Red Text */}
          <button
            onClick={handleEnroll}
            className="w-full py-5 sm:py-6 px-8 sm:px-12 bg-white text-[#26304a] font-black text-xl sm:text-2xl rounded-xl mb-6 sm:mb-10 uppercase tracking-wide min-h-[44px] shadow-lg hover:bg-gray-50 transition-all duration-200"
            style={{ cursor: 'pointer' }}
          >
            ACCESS NOW
          </button>

          {/* Features */}
          {features.length > 0 && (
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <Check className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0 mt-1" strokeWidth={3} />
                  <span className="text-base sm:text-lg md:text-xl font-semibold leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          )}

          {/* Payment Methods */}
          <div className="payment_icons-group">
            <img
              loading="lazy"
              alt=""
              src="https://media.oracleboxing.com/Website/payment1.svg"
              className="image-55"
            />
            <img
              loading="lazy"
              alt=""
              src="https://media.oracleboxing.com/Website/payment2.svg"
              className="image-55 second"
            />
            <img
              loading="lazy"
              alt=""
              src="https://media.oracleboxing.com/Website/paypal2.svg"
              className="image-55 bigger"
            />
            <img
              loading="lazy"
              src="https://media.oracleboxing.com/Website/klarna.svg"
              alt=""
              className="image-55 bigger-mobile"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
