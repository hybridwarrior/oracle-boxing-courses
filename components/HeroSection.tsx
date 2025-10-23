'use client'

import { useState, useEffect } from 'react'
import { WeeklyCountdown } from '@/components/WeeklyCountdown'
import WistiaVideo from '@/components/WistiaVideo'
import { EpicCTAButton } from '@/components/EpicCTAButton'

interface HeroSectionProps {
  onCTAClick?: (location: string) => void
}

export default function HeroSection({ onCTAClick }: HeroSectionProps) {
  const [variant, setVariant] = useState<'A' | 'B'>('A')

  useEffect(() => {
    // Split test between two headlines
    const storedVariant = localStorage.getItem('hero-headline-variant')
    if (storedVariant === 'A' || storedVariant === 'B') {
      setVariant(storedVariant)
    } else {
      const randomVariant = Math.random() < 0.5 ? 'A' : 'B'
      setVariant(randomVariant)
      localStorage.setItem('hero-headline-variant', randomVariant)
    }
  }, [])

  // A/B Test Headlines
  const headlines = {
    A: {
      badge: 'FOR BEGINNERS & LATE STARTERS',
      main: 'Join Our 6-Week Boxing Challenge Now!',
      sub: 'Train with us for 6 weeks. Do the work we ask. Get all your money back when you finish. It\'s that simple.'
    },
    B: {
      badge: 'FOR BEGINNERS & LATE STARTERS',
      main: 'Join Our 6-Week Boxing Challenge Now!',
      sub: 'Train with us for 6 weeks. Do the work we ask. Get all your money back when you finish. It\'s that simple.'
    }
  }

  const headline = headlines[variant]

  // Handle CTA click
  const handleCTAClick = () => {
    if (onCTAClick) {
      onCTAClick('hero')
    }
  }

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-10">
        {/* Centered Text Content */}
        <div className="text-center" style={{ fontFamily: 'Satoshi, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
          <div className="mb-3 sm:mb-4 inline-block px-2.5 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 bg-gradient-to-r from-orange-50 to-red-50 text-orange-600 border border-orange-200 rounded-lg font-bold text-xs sm:text-sm lg:text-base uppercase tracking-wider">
            {headline.badge}
          </div>

          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-[1.2] px-2 sm:px-3 lg:px-4 max-w-5xl mx-auto"
            style={{
              fontFamily: variant === 'B' ? 'ClashDisplay, system-ui, sans-serif' : 'Satoshi, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              fontWeight: '700'
            }}
          >
            {headline.main}
          </h1>

          <p className="mt-2 sm:mt-3 lg:mt-4 text-base sm:text-lg md:text-xl lg:text-3xl text-gray-900 max-w-4xl mx-auto px-2 leading-relaxed">
            {headline.sub}
          </p>
        </div>

        {/* VSL Video */}
        <div className="mt-5 sm:mt-6 lg:mt-10">
          <WistiaVideo />
        </div>

        {/* CTA Button Below Video */}
        <div className="mt-4 sm:mt-6 lg:mt-8 flex justify-center px-2 sm:px-3 lg:px-4">
          <EpicCTAButton
            size="lg"
            className="w-full sm:w-auto max-w-md sm:max-w-none min-h-[72px]"
            trackingName="hero"
            onClick={handleCTAClick}
          >
            <span className="text-lg sm:text-xl font-bold">Start the 6-Week Challenge →</span>
          </EpicCTAButton>
        </div>
      </div>
    </section>
  )
}