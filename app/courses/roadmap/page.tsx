'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { VideoPlayer } from '@/components/VideoPlayer'
import { CourseStats } from '@/components/CourseStats'
import { WhoThisIsFor } from '@/components/WhoThisIsFor'
import { CourseCurriculum } from '@/components/CourseCurriculum'
import { CourseModules } from '@/components/CourseModules'
import { TestimonialSection } from '@/components/TestimonialSection'
import { CoursePriceCard } from '@/components/CoursePriceCard'
import { CourseFAQ } from '@/components/CourseFAQ'
import { CoursePricingPopup } from '@/components/CoursePricingPopup'
import { getProductById } from '@/lib/products'
import { getRandomTestimonials, globalTestimonials } from '@/lib/testimonials'

export default function RoadmapPage() {
  const [isPricingPopupOpen, setIsPricingPopupOpen] = useState(false)

  const openPricingPopup = (e?: React.MouseEvent) => {
    if (e) e.preventDefault()
    setIsPricingPopupOpen(true)
  }

  const product = getProductById('roadmap')!

  const personas = [
    {
      emoji: '🎓',
      title: 'You want to train the right way from day one.',
      subtitle: 'You value order, progress, and doing things properly.'
    },
    {
      emoji: '🏠',
      title: 'You train alone, but you don\'t want to guess.',
      subtitle: 'You need structure, direction, and drills that build real skill without a coach over your shoulder.'
    },
    {
      emoji: '🥇',
      title: 'You\'re preparing for sparring and want your foundation solid.',
      subtitle: 'Your technique clean, confident, and fight-ready.'
    }
  ]

  const learningCards = [
    {
      emoji: '📐',
      text: 'Build technical form, clean mechanics, and control from the ground up.',
      imageUrl: 'https://media.oracleboxing.com/Website/optimized/course-content/tbr_course1.webp'
    },
    {
      emoji: '🛡️',
      text: 'Master defence and movement that keep you safe while staying sharp.',
      imageUrl: 'https://media.oracleboxing.com/Website/optimized/course-content/tbr_course2.webp'
    },
    {
      emoji: '👟',
      text: 'Develop explosive footwork that connects balance with power.',
      imageUrl: 'https://media.oracleboxing.com/Website/optimized/course-content/tbr_course22.webp'
    },
    {
      emoji: '🎭',
      text: 'Blend attack, defence, and rhythm into one flowing style.',
      imageUrl: 'https://media.oracleboxing.com/Website/optimized/course-content/tbr_course4.webp'
    }
  ]

  const modules = [
    {
      title: "Phase I (Fundamentals)",
      description: "Learn your stance, balance, and the true mechanics of each punch. Build relaxation and flow before speed or power.\n\nFocus: Shape · Rotation · Relaxation · Linking punches\nOutcome: Clean, efficient movement that feels natural and powerful.",
      lessons: 15
    },
    {
      title: "Phase II (Defence & Range)",
      description: "Add movement, defence, and awareness. Learn to slip, roll, control range, and integrate punches with footwork.\n\nFocus: Range · Defence · Pendulum Steps · Flow\nOutcome: Confidence in distance, rhythm, and reactive defence.",
      lessons: 18
    },
    {
      title: "Phase III (Footwork)",
      description: "Learn how to shift, pivot, and move with balance and intent. Connect the power of your legs to every punch.\n\nFocus: Shifting · Drop Steps · Balance · Rotation\nOutcome: Dynamic footwork that drives both speed and control.",
      lessons: 14
    },
    {
      title: "Phase IV (Advanced Defence)",
      description: "Combine head, hand, and foot defences seamlessly. Learn to use feints to control reactions and create openings.\n\nFocus: Pulls · Weaves · Lay Back · Feints\nOutcome: Fluid defensive reactions and deceptive offence.",
      lessons: 16
    },
    {
      title: "Phase V (Integration)",
      description: "Perfect your technique under motion. Master the mechanics of each punch, then add steps, slips, and rolls to make it ring-ready.\n\nFocus: Punch Mastery · Stepping · Slipping · Rolling\nOutcome: Complete, integrated skill that holds up in sparring.",
      lessons: 12
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
      question: "How is the Roadmap different from BFFP?",
      answer: "BFFP explains the why—the system behind boxing. The Roadmap gives you the how—the drills, structure, and daily progression that make it real."
    },
    {
      question: "Do I need to complete the phases in order?",
      answer: "Yes. Each phase builds on the last to form a full skill set. You can revisit earlier phases anytime."
    },
    {
      question: "How long should I spend on each phase?",
      answer: "Most students spend 2–4 weeks per phase, depending on how often they train. Take your time—progress beats rushing."
    },
    {
      question: "Can I use this if I train at a gym?",
      answer: "Definitely. The Roadmap gives you structure and homework to complement your gym sessions."
    },
    {
      question: "What equipment do I need?",
      answer: "Gloves, hand wraps, and a heavy bag are ideal. But many drills can be done shadowboxing if needed."
    },
    {
      question: "Is it good prep for sparring?",
      answer: "Yes. By Phase V, you'll be technically sharp, defensively sound, and confident under pressure."
    },
    {
      question: "Will I get updates?",
      answer: "Yes. All future updates and improvements are free. Lifetime access means you always have the latest version."
    }
  ]

  const priceFeatures = [
    "75 lessons across 5 structured phases",
    "Lifetime access to all course materials",
    "Step-by-step progression from beginner to advanced",
    "Drills and techniques for every stage of development",
    "30-day money-back guarantee"
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="pt-8 sm:pt-16 pb-4 sm:pb-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Course Title with Pill Border - Smaller */}
          <div className="inline-block mx-auto mb-4 sm:mb-8 w-full text-center">
            <div className="inline-block border-2 border-black rounded-full px-3 sm:px-6 py-1 sm:py-2">
              <h1 className="text-xs sm:text-base md:text-lg text-gray-900 uppercase tracking-wide font-medium" style={{ fontFamily: "var(--font-satoshi)" }}>
                Boxing Roadmap
              </h1>
            </div>
          </div>

          {/* Headline */}
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-center mb-2 sm:mb-4 px-2">
            Your Step-by-Step Path to Real Boxing Skill
          </h2>

          {/* Subheadline */}
          <p className="text-base sm:text-xl text-gray-600 text-center max-w-3xl mx-auto mb-6 sm:mb-12 px-2 leading-relaxed">
            Follow a clear 5-phase system that takes you from your first stance to sparring-ready. Every move, every drill, in the right order.
          </p>

          {/* Video Sales Letter */}
          <div className="mb-4 sm:mb-8">
            <VideoPlayer
              thumbnail={product.image}
              title="Boxing Roadmap Overview"
            />
          </div>

          {/* Primary CTA */}
          <div className="text-center mb-4 sm:mb-8">
            <a
              href="#pricing"
              onClick={openPricingPopup}
              className="inline-block py-3 sm:py-4 lg:py-5 px-8 sm:px-10 lg:px-12 bg-yellow-200 text-black border-4 border-black font-black text-base sm:text-lg lg:text-xl rounded-xl uppercase tracking-wide cursor-pointer animate-bounce-subtle hover:bg-black hover:text-white transition-colors duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              SEE PRICING
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="overview" className="pt-4 sm:pt-6 pb-8 sm:pb-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <CourseStats
            lessonCount={176}
            weeksCount={20}
            workoutsCount={100}
            hasLifetimeAccess={true}
          />
        </div>
      </section>

      {/* Who This Is For */}
      <WhoThisIsFor courseName="Boxing Roadmap" personas={personas} />

      {/* Learning Outcomes */}
      <CourseCurriculum
        learningCards={learningCards}
        showButton={false}
      />

      {/* Course Modules */}
      <div id="lessons">
        <CourseModules
          modules={modules}
          headerImage={product.image}
          showButton={false}
        />
      </div>

      {/* Pricing Popup */}
      <CoursePricingPopup
        isOpen={isPricingPopupOpen}
        onClose={() => setIsPricingPopupOpen(false)}
        product={product}
        features={priceFeatures}
      />

      {/* Testimonials */}
      <div id="testimonials">
        <TestimonialSection testimonials={testimonials} />
      </div>

      {/* Inline Pricing Card */}
      <CoursePriceCard
        product={product}
        features={priceFeatures}
      />

      {/* FAQ */}
      <CourseFAQ courseType="roadmap" />

      <Footer />
    </div>
  )
}
