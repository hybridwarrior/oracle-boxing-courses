'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CourseCard } from '@/components/CourseCard'
import { TestimonialSection } from '@/components/TestimonialSection'
import { NotifyMeModal } from '@/components/NotifyMeModal'
import { AdaptivePrice } from '@/components/AdaptivePrice'
import { getCourses } from '@/lib/products'
import { getRandomTestimonials, globalTestimonials } from '@/lib/testimonials'
import Image from 'next/image'
import Link from 'next/link'
import { Users, Video } from 'lucide-react'

export default function HomePage() {
  const courses = getCourses()
  // Use stable testimonials for SSR, then randomize on client
  const [testimonials, setTestimonials] = useState(globalTestimonials.slice(0, 6))
  const [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false)

  // Randomize testimonials after hydration to avoid mismatch
  useEffect(() => {
    setTestimonials(getRandomTestimonials(6))
  }, [])

  const scrollToCourses = (e: React.MouseEvent) => {
    e.preventDefault()
    const element = document.getElementById('courses')
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - offset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-[500px] sm:h-[600px] lg:h-[800px] overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://media.oracleboxing.com/Website/hero-section-frame.webp"
          className="absolute inset-0 w-full h-full object-cover object-[70%] sm:object-center"
        >
          <source src="https://media.oracleboxing.com/Website/optimized/videos/hero-section-desktop.webm" type="video/webm" media="(min-width: 768px)" />
          <source src="https://media.oracleboxing.com/Website/optimized/videos/hero-section-desktop.mp4" type="video/mp4" media="(min-width: 768px)" />
          <source src="https://media.oracleboxing.com/Website/optimized/videos/hero-section-mobile.mp4" type="video/mp4" />
        </video>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-end pb-12 sm:pb-16 lg:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 capitalize drop-shadow-lg leading-tight sm:leading-normal lg:leading-tight">
                Boxing Education For <span className="font-bold text-white">Beginners</span> & <span className="font-bold text-white">Late Starters</span>
              </h1>
              <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-white leading-relaxed drop-shadow-md font-medium">
                Learn the art and science of boxing through a complete system of courses, coaching, and community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Limited 6-Week Challenge Section */}
      <section className="pt-6 sm:pt-8 lg:pt-12 pb-6 sm:pb-8 lg:pb-12 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left Side - Image */}
            <div className="order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://media.oracleboxing.com/Website/skool_art.webp"
                  alt="6-Week Challenge"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-block mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 bg-yellow-200 text-black border border-gray-300 rounded-lg font-black text-xs sm:text-sm uppercase tracking-wider">
                Limited Spots Available
              </div>

              {/* Headline */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4" style={{ fontFamily: 'Satoshi, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
                Join The Exclusive 6-Week Challenge
              </h2>

              {/* Description */}
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                  Commit <AdaptivePrice usdAmount={197} metadata="6wc" className="font-black text-gray-900" showCode={true} /> upfront, do the bare minimum, get way better at boxing...
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  ...and we'll refund all your money at the finish line.
                </p>
                <p className="text-sm sm:text-base text-gray-600 italic">
                  Train with us for 6 weeks. Complete the requirements. Get 100% of your money back. It's that simple.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="/6wc"
                  className="inline-block w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-white text-black border-4 border-black rounded-xl shadow-lg font-black text-base sm:text-lg md:text-xl uppercase tracking-wide hover:bg-black hover:text-white transition-all text-center"
                >
                  Learn More
                </Link>
                <Link
                  href="/checkout?product=6wc"
                  className="inline-block w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-yellow-200 text-black border-4 border-black rounded-xl shadow-lg font-black text-base sm:text-lg md:text-xl uppercase tracking-wide hover:bg-black hover:text-yellow-200 transition-all text-center"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="pt-6 sm:pt-8 lg:pt-12 pb-6 sm:pb-8 lg:pb-12 bg-gray-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              Most popular
            </h2>
          </div>

          {/* 2-Column Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl mx-auto">
            <CourseCard key="bundle" product={{
              id: 'bundle',
              title: 'Oracle Boxing Bundle',
              price: 397,
              type: 'course',
              metadata: 'obm',
              stripe_product_id: 'prod_THsui65fQm9N6o',
              stripe_price_id: 'price_1SLLSAQNEdHwdojXPF01j36I',
              image: 'https://media.oracleboxing.com/Website/optimized/products/obm_tn-large.webp',
              shortDescription: 'Every Course, Every Call, Every System, All in One Bundle.',
              perfectFor: 'Serious boxers who want to master everything, fast',
              moduleCount: 5,
              lessonCount: 225,
              lessonCountPrefix: '+',
              workoutCount: 100,
              description: `**Get everything. Master the complete boxing system from fundamentals to real application.**

**This bundle includes:**
• Boxing Masterclass ($297)
• Boxing Roadmap ($147)

**Total value: $444**
**Bundle price: $397**
**You save: $47**

Complete access to the entire Oracle Boxing system — theory, technique, and tactics.`,
            }} />
            <CourseCard key="membership-6month" product={{
              id: 'membership-6month',
              title: 'Oracle Membership (6-Month)',
              price: 497,
              type: 'membership',
              metadata: 'mem6',
              recurring: true,
              interval: '6 months',
              stripe_product_id: 'prod_THsviAkmOBiKx4',
              stripe_price_id: 'price_1SLMIWQNEdHwdojXMLLS6yhP',
              image: 'https://media.oracleboxing.com/Website/optimized/products/boxing_clinic-large.webp',
              description: `**6 months of access — save vs quarterly**

✓ Everything in Quarterly Membership
✓ Save $98 vs quarterly ($497 vs $595)
✓ Commit to mastery with 6 months of expert guidance
✓ Perfect for serious skill development

Best for dedicated students ready to transform their boxing.`,
              shortDescription: 'Save With 6-Month Commitment',
              perfectFor: 'Dedicated boxers ready for serious transformation',
              hasLiveCoaching: true,
              hasCommunity: true,
              hasVideoFeedback: true,
            }} />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialSection testimonials={testimonials} />

      {/* Newsletter Section */}
      <section id="newsletter" className="py-16 sm:py-20 lg:py-24 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Join Our Newsletter
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Get exclusive deals, training tips, and be the first to know about new courses and products.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-lg bg-transparent border-2 border-white text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-white text-black font-black rounded-lg uppercase tracking-wide hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Subscribe
              </button>
            </form>
            <p className="text-sm text-gray-400 mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      <Footer />

      {/* Notify Me Modal */}
      <NotifyMeModal
        isOpen={isNotifyModalOpen}
        onClose={() => setIsNotifyModalOpen(false)}
      />
    </div>
  )
}
