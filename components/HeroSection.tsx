'use client'

import { useState, useEffect } from 'react'
import { WeeklyCountdown } from '@/components/WeeklyCountdown'
import WistiaVideo from '@/components/WistiaVideo'
import { EpicCTAButton } from '@/components/EpicCTAButton'
interface HeroSectionProps {
  onCTAClick?: (location: string) => void
  onOpenPricing?: () => void
}

export default function HeroSection({ onCTAClick, onOpenPricing }: HeroSectionProps) {
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
      main: 'I\'ll pay you to get better at boxing',
      sub: 'Train with us for 6 weeks. Do what we ask. Get your money back when you finish. That\'s it.'
    },
    B: {
      badge: 'FOR BEGINNERS & LATE STARTERS',
      main: 'I\'ll pay you to get better at boxing',
      sub: 'Train with us for 6 weeks. Do what we ask. Get your money back when you finish. That\'s it.'
    }
  }

  const headline = headlines[variant]

  // Handle CTA click
  const handleCTAClick = () => {
    if (onOpenPricing) {
      onOpenPricing()
    }
    if (onCTAClick) {
      onCTAClick('hero')
    }
  }

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-10 pb-12 sm:pb-16 lg:pb-20">
        {/* Centered Text Content */}
        <div className="text-center" style={{ fontFamily: 'Satoshi, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight px-4 max-w-5xl mx-auto mb-4 sm:mb-5"
            style={{
              fontFamily: 'Satoshi, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              fontWeight: '700'
            }}
          >
            {headline.main}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-gray-900 max-w-4xl mx-auto px-4 leading-relaxed">
            {headline.sub}
          </p>
        </div>

        {/* VSL Video */}
        <div className="mt-8 sm:mt-12">
          <WistiaVideo />
        </div>

        {/* CTA Button Below Video */}
        <div className="mt-8 sm:mt-12 flex justify-center px-4">
          <EpicCTAButton
            size="lg"
            className="w-full sm:w-auto max-w-md sm:max-w-none"
            trackingName="hero"
            onClick={handleCTAClick}
          >
            START CHALLENGE
          </EpicCTAButton>
        </div>
      </div>
    </section>
  )
}