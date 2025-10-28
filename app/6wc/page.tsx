'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import dynamic from 'next/dynamic'
import HeroSection from '@/components/HeroSection'
import { PricingPopup } from '@/components/PricingPopup'

// Dynamic imports for below-the-fold components to reduce initial bundle
const TestimonialsWithMediaSection = dynamic(() => import('@/components/TestimonialsWithMediaSection'))

const RefundRequirementsSection = dynamic(() => import('@/components/RefundRequirementsSection'))

const TransformationStory = dynamic(() => import('@/components/TransformationStory'))

const CostOfInactionCTA = dynamic(() => import('@/components/CostOfInactionCTA'))

const FAQSection = dynamic(() => import('@/components/FAQSection'))

const PlatformScreenshotsCarousel = dynamic(() => import('@/components/PlatformScreenshotsCarousel').then(mod => ({ default: mod.PlatformScreenshotsCarousel })))

export default function ChallengePage() {
  const [isPricingPopupOpen, setIsPricingPopupOpen] = useState(false)

  const handleOpenPricing = () => {
    setIsPricingPopupOpen(true)
  }

  return (
    <>
      <Header />

      {/* Hero Section */}
      <HeroSection onOpenPricing={handleOpenPricing} />

      {/* Founder's Transformation Story */}
      <TransformationStory />

      {/* Testimonials with Media Section */}
      <TestimonialsWithMediaSection onOpenPricing={handleOpenPricing} />

      {/* Platform Screenshots Carousel */}
      <PlatformScreenshotsCarousel onOpenPricing={handleOpenPricing} />

      {/* How to Win Your Money Back - Moved before offer stack */}
      <RefundRequirementsSection />

      {/* Cost of Inaction Final CTA */}
      <CostOfInactionCTA onOpenPricing={handleOpenPricing} />

      {/* FAQ Section */}
      <FAQSection onOpenPricing={handleOpenPricing} />

      {/* Pricing Popup */}
      <PricingPopup isOpen={isPricingPopupOpen} onClose={() => setIsPricingPopupOpen(false)} />

      {/* Footer only; header and consultation widget omitted for this page */}
      <Footer />
    </>
  )
}
