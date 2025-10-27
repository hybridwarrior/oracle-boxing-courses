'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import dynamic from 'next/dynamic'
import HeroSection from '@/components/HeroSection'

// Dynamic imports for below-the-fold components to reduce initial bundle
const TestimonialsWithMediaSection = dynamic(() => import('@/components/TestimonialsWithMediaSection'))

const EpicOfferStackSection = dynamic(() => import('@/components/EpicOfferStackSection'))

const RefundRequirementsSection = dynamic(() => import('@/components/RefundRequirementsSection'))

const TransformationStory = dynamic(() => import('@/components/TransformationStory'))

const CostOfInactionCTA = dynamic(() => import('@/components/CostOfInactionCTA'))

const FAQSection = dynamic(() => import('@/components/FAQSection'))

const PlatformScreenshotsCarousel = dynamic(() => import('@/components/PlatformScreenshotsCarousel').then(mod => ({ default: mod.PlatformScreenshotsCarousel })))

export default function ChallengePage() {

  return (
    <>
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Founder's Transformation Story */}
      <TransformationStory />

      {/* Testimonials with Media Section */}
      <TestimonialsWithMediaSection />

      {/* Platform Screenshots Carousel */}
      <PlatformScreenshotsCarousel />

      {/* How to Win Your Money Back - Moved before offer stack */}
      <RefundRequirementsSection />

      {/* Offer Stack - What You Get */}
      <EpicOfferStackSection />

      {/* Cost of Inaction Final CTA */}
      <CostOfInactionCTA />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer only; header and consultation widget omitted for this page */}
      <Footer />
    </>
  )
}
