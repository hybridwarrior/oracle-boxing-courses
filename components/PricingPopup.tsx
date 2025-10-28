'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'
import { ChallengePrice, ValuePrice } from '@/components/AdaptivePrice'
import { useCurrency } from '@/contexts/CurrencyContext'
import { getProductPrice } from '@/lib/currency'

interface PricingPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function PricingPopup({ isOpen, onClose }: PricingPopupProps) {
  const { currency } = useCurrency()

  // Benefits to display with checkmarks
  const benefits = [
    "Learn step-by-step with live coaching and feedback.",
    "Structured 6-week system with progress tracking and community support.",
    "Finish the challenge, prove your commitment, and get a full refund.",
  ]

  // Calculate total value in current currency
  const bffpPrice = getProductPrice('bffp', currency) || 297
  const rcvPrice = getProductPrice('rcv', currency) || 97
  const brdmpPrice = getProductPrice('brdmp', currency) || 147
  const totalValue = bffpPrice + rcvPrice + rcvPrice + brdmpPrice

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Price Card Content */}
        <div className="bg-[#000000] rounded-3xl p-6 sm:p-8 lg:p-10 text-white">
          {/* Logo */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <img
              src="https://media.oracleboxing.com/Website/infinity_squared_white.svg"
              alt="Oracle Boxing"
              className="h-4 sm:h-5"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>

          {/* Heading */}
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 sm:mb-8 uppercase px-4" style={{ fontFamily: "var(--font-satoshi)" }}>
            6-WEEK CHALLENGE
          </h3>

          {/* Price Section */}
          <div className="text-center mb-6 sm:mb-8">
            <ValuePrice usdAmount={totalValue} className="text-xl sm:text-2xl md:text-3xl font-bold opacity-60 line-through mb-2" />
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-3"><ChallengePrice /></div>
          </div>

          {/* CTA Button */}
          <a
            href="/checkout?product=6wc"
            className="w-full py-4 sm:py-5 lg:py-6 px-6 sm:px-8 lg:px-12 bg-yellow-200 text-[#000000] font-black text-base sm:text-lg md:text-xl rounded-xl mb-6 sm:mb-8 uppercase tracking-wide min-h-[60px] sm:min-h-[64px] lg:min-h-[72px] shadow-lg hover:bg-white transition-all duration-200 flex items-center justify-center gap-2"
            style={{ cursor: 'pointer' }}
          >
            CONTINUE TO CHECKOUT
            <span className="text-xl sm:text-2xl">→</span>
          </a>

          {/* Benefits List with Checkmarks */}
          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-white mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm sm:text-base md:text-lg font-medium leading-relaxed">{benefit}</span>
              </div>
            ))}
          </div>

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
    </div>
  )
}
