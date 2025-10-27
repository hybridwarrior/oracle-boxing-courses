'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { VideoPlayer } from '@/components/VideoPlayer'
import { CourseStats } from '@/components/CourseStats'
import { WhoThisIsFor } from '@/components/WhoThisIsFor'
import { TestimonialSection } from '@/components/TestimonialSection'
import { CoursePriceCard } from '@/components/CoursePriceCard'
import { CourseFAQ } from '@/components/CourseFAQ'
import { CourseNavigation } from '@/components/CourseNavigation'
import { BundleCourseCarousel } from '@/components/BundleCourseCarousel'
import { BundleTimelineProcess } from '@/components/BundleTimelineProcess'
import { PlatformScreenshotsCarousel } from '@/components/PlatformScreenshotsCarousel'
import { getProductById } from '@/lib/products'
import { getRandomTestimonials, globalTestimonials } from '@/lib/testimonials'
import { useCurrency } from '@/contexts/CurrencyContext'
import { getProductPrice, formatPrice } from '@/lib/currency'

export default function BundlePage() {
  const { currency } = useCurrency()
  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault()
    const element = document.getElementById('pricing')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }
  const product = getProductById('bundle')!

  const personas = [
    {
      emoji: '⚡',
      title: 'If you\'re going to do something, you might as well be the best.',
      subtitle: 'You push past good enough and chase mastery in every detail.'
    },
    {
      emoji: '🥇',
      title: 'You\'re preparing for sparring and want your foundation solid.',
      subtitle: 'Your technique clean, confident, and fight-ready.'
    },
    {
      emoji: '💼',
      title: 'You are busy and often work from home, so your training time has to count.',
      subtitle: 'You need efficient, effective ways to keep improving your boxing skills and staying connected to real coaching without leaving your space.'
    }
  ]

  // Use stable testimonials for SSR, then randomize on client
  const [testimonials, setTestimonials] = useState(globalTestimonials.slice(0, 6))

  // Randomize testimonials after hydration to avoid mismatch
  useEffect(() => {
    setTestimonials(getRandomTestimonials(6))
  }, [])

  const faqs = [
    {
      question: "What exactly is included in the bundle?",
      answer: "You get complete lifetime access to all three courses: Boxing from First Principles (150 lessons, $297 value), Boxing Roadmap (75 lessons, $147 value), and Coaching Call Replays (140+ sessions, $97 value). Total value $541 for just $397,you save $144."
    },
    {
      question: "Can I access all courses immediately?",
      answer: "Yes! As soon as you purchase, you get instant access to all three courses. You can start with any course and work through them at your own pace."
    },
    {
      question: "Which course should I start with?",
      answer: "Most students start with BFFP to build the conceptual foundation, then move to Roadmap for practical drills, while using the Vault to supplement both. But you can start anywhere,they all work together."
    },
    {
      question: "Is this better value than buying individually?",
      answer: "Absolutely. Buying all three separately costs $541. The bundle is $397,saving you $144. Plus, you get everything integrated from the start instead of piecing it together later."
    },
    {
      question: "Do I still get updates to all courses?",
      answer: "Yes! You get lifetime access to all current content plus any future updates to BFFP, Roadmap, and the Vault. New coaching call replays are added monthly to the Vault."
    },
    {
      question: "What if I already own one of the courses?",
      answer: "If you already own one course and want to upgrade to the bundle, contact us at support@oracleboxing.com and we'll work out a fair upgrade price based on what you've already purchased."
    },
    {
      question: "Is there a payment plan available?",
      answer: "Currently, the bundle is a one-time payment. However, we do offer a 30-day money-back guarantee if you're not satisfied for any reason."
    }
  ]

  // Calculate prices in current currency
  const bffpPrice = getProductPrice('bffp', currency) || 297
  const roadmapPrice = getProductPrice('brdmp', currency) || 147
  const replaysPrice = getProductPrice('rcv', currency) || 97
  const totalIndividualPrice = bffpPrice + roadmapPrice + replaysPrice
  const bundlePrice = getProductPrice('obm', currency) || 397
  const savings = totalIndividualPrice - bundlePrice

  const priceFeatures = [
    `Boxing from First Principles (${formatPrice(bffpPrice, currency)})`,
    `Boxing Roadmap (${formatPrice(roadmapPrice, currency)})`,
    `Coaching Call Replays (${formatPrice(replaysPrice, currency)})`,
    "Lifetime access to all courses",
    "All future updates included free",
    `Save ${formatPrice(savings, currency)} vs buying separately`,
    "30-day money-back guarantee"
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <CourseNavigation />

      {/* Hero Section */}
      <section className="pt-8 sm:pt-16 pb-4 sm:pb-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Course Title with Pill Border - Smaller */}
          <div className="inline-block mx-auto mb-4 sm:mb-8 w-full text-center">
            <div className="inline-block border-2 border-black rounded-full px-3 sm:px-6 py-1 sm:py-2">
              <h1 className="text-xs sm:text-base md:text-lg text-gray-900 uppercase tracking-wide font-medium" style={{ fontFamily: "var(--font-satoshi)" }}>
                The Oracle Boxing Method
              </h1>
            </div>
          </div>

          {/* Headline */}
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-center mb-6 sm:mb-12 px-2">
            The Complete Methodology for Learning Old School Boxing, Anytime, Anywhere
          </h2>

          {/* Video Sales Letter */}
          <div className="mb-4 sm:mb-8">
            <VideoPlayer
              thumbnail={product.image}
              title="The Oracle Boxing Method Overview"
            />
          </div>

          {/* Primary CTA - No Hover Effects */}
          <div className="text-center mb-4 sm:mb-8">
            <a
              href="#pricing"
              onClick={scrollToPricing}
              className="inline-block py-2.5 sm:py-4 px-6 sm:px-12 bg-[#000000] text-white font-black text-base sm:text-xl rounded-lg shadow-lg uppercase tracking-wide transition-none min-h-[44px]"
            >
              I WANT ACCESS
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="pt-4 sm:pt-6 pb-8 sm:pb-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <CourseStats
            lessonCount={225}
            purchaseLabel="220+"
            purchaseLabelText="Coaching Calls"
            hasLifetimeAccess={true}
          />
        </div>
      </section>

      {/* Who This Is For */}
      <WhoThisIsFor courseName="The Oracle Boxing Method" personas={personas} />

      {/* Platform Screenshots Carousel */}
      <PlatformScreenshotsCarousel />

      {/* Course Cards Carousel */}
      <section id="lessons">
        <BundleCourseCarousel />
      </section>

      {/* CTA After Course Cards */}
      <section className="py-3 sm:py-8 bg-white">
        <div className="text-center">
          <a
            href="#pricing"
            onClick={scrollToPricing}
            className="inline-block py-2.5 sm:py-4 px-6 sm:px-12 bg-[#000000] text-white font-black text-base sm:text-xl rounded-lg shadow-lg uppercase tracking-wide transition-none min-h-[44px]"
          >
            I WANT ACCESS
          </a>
        </div>
      </section>

      {/* Timeline Process */}
      <section id="overview">
        <BundleTimelineProcess
          cta={
            <a
              href="#pricing"
              onClick={scrollToPricing}
              className="inline-flex items-center justify-center py-2 sm:py-4 px-5 sm:px-12 bg-[#000000] text-white font-black text-sm sm:text-xl rounded-lg shadow-lg uppercase tracking-wide transition-none min-h-[44px]"
            >
              I WANT ACCESS
            </a>
          }
        />
      </section>

      {/* Price Card */}
      <div id="pricing">
        <CoursePriceCard product={product} features={priceFeatures} />
      </div>

      {/* Testimonials */}
      <section id="testimonials">
        <TestimonialSection testimonials={testimonials} />
      </section>

      {/* FAQ */}
      <CourseFAQ courseType="bundle" />

      <Footer />
    </div>
  )
}
