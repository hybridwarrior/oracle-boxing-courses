'use client'

import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import { Product } from '@/lib/types'
import { Check } from 'lucide-react'

interface CoursePriceCardProps {
  product: Product
  features?: string[]
}

export function CoursePriceCard({ product, features = [] }: CoursePriceCardProps) {
  const router = useRouter()
  const { clearCart, addItem } = useCart()

  const handleEnroll = () => {
    clearCart()
    addItem(product)
    router.push('/checkout')
  }

  // Dynamic course name heading
  const getCourseHeading = () => {
    const headings: Record<string, string> = {
      'bffp': 'Boxing from First Principles',
      'roadmap': 'The Boxing Roadmap',
      'vault': 'Boxing Clinic',
      'bundle': 'Ultimate Boxing Bundle'
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
              src="https://media.oracleboxing.com/webp/Website/logo_site_white.webp"
              alt="Oracle Boxing"
              className="h-14 sm:h-20"
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
            <div className="text-6xl sm:text-7xl md:text-8xl font-black mb-3">${product.price}</div>
            {product.recurring && (
              <div className="text-xl sm:text-2xl font-bold opacity-90">per {product.interval}</div>
            )}
          </div>

          {/* CTA Button - White with Red Text */}
          <button
            onClick={handleEnroll}
            className="w-full py-5 sm:py-6 px-8 sm:px-12 bg-white text-[#26304a] font-black text-xl sm:text-2xl rounded-xl mb-6 sm:mb-10 uppercase tracking-wide min-h-[44px] transition-none shadow-lg"
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
