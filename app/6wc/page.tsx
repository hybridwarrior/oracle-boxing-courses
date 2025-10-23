'use client'

import Image from 'next/image'
import Link from 'next/link'
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
      {/* Custom Header with Logo */}
      <header className="bg-black shadow-lg">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-center h-10 sm:h-14 lg:h-20">
            {/* Logo - Centered */}
            <Link href="/" className="flex-shrink-0 cursor-pointer">
              <Image
                src="https://media.oracleboxing.com/webp/Website/logo_site_white.webp"
                alt="Oracle Boxing"
                width={150}
                height={50}
                className="h-6 sm:h-10 lg:h-14 w-auto"
                priority
              />
            </Link>
          </div>
        </div>
      </header>

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
