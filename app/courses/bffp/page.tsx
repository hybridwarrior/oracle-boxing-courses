'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { VideoPlayer } from '@/components/VideoPlayer'
import { CourseStats } from '@/components/CourseStats'
import { WhoThisIsFor } from '@/components/WhoThisIsFor'
import { CourseCurriculum } from '@/components/CourseCurriculum'
import { CourseModules } from '@/components/CourseModules'
import { TestimonialSection } from '@/components/TestimonialSection'
import { CoursePriceCard } from '@/components/CoursePriceCard'
import { FAQSection } from '@/components/FAQSection'
import { CourseNavigation } from '@/components/CourseNavigation'
import { getProductById } from '@/lib/products'
import { getRandomTestimonials } from '@/lib/testimonials'

export default function BFFPPage() {
  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault()
    const element = document.getElementById('pricing')
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
  const product = getProductById('bffp')!

  const personas = [
    {
      emoji: '🧠',
      title: 'You question everything and crave understanding.',
      subtitle: 'You break things down until they make sense and won\'t settle for half-truths.'
    },
    {
      emoji: '⚡',
      title: 'If you\'re going to do something, you might as well be the best.',
      subtitle: 'You push past good enough and chase mastery in every detail.'
    },
    {
      emoji: '🥊',
      title: 'You believe real boxing starts with what never breaks: solid fundamentals.',
      subtitle: 'You build skill layer by layer, knowing that mastery comes from doing the simple things better than anyone else.'
    }
  ]

  const learningCards = [
    {
      emoji: '🧘',
      text: 'Stay calm under pressure and control emotion.',
      imageUrl: 'https://media.oracleboxing.com/Website/ob_fight3.png'
    },
    {
      emoji: '⚡',
      text: 'Use biomechanics for effortless, natural power.',
      imageUrl: 'https://media.oracleboxing.com/Website/bffp_tn4.png'
    },
    {
      emoji: '🥊',
      text: 'See patterns, read opponents, and think one step ahead.',
      imageUrl: 'https://media.oracleboxing.com/Website/bffp_course3.png'
    },
    {
      emoji: '♟️',
      text: 'Build endurance and relaxation that last through every round.',
      imageUrl: 'https://media.oracleboxing.com/Website/bbffp_course4.png'
    }
  ]

  const modules = [
    {
      title: "SENTIENCE, The Mind of the Fighter",
      description: "Learn how to think like a real boxer. You'll build focus, manage emotions, and learn to perform at your best without overthinking. This is where you master flow state.\n\nLessons:\n• Shifting Your Paradigm For Success\n• Spoon Bending 101\n• Accessing The Flow State\n\nFocus: Identity · Awareness · Flow · Calm under pressure\nOutcome: A clear, stable mindset that keeps you composed and present in every moment.",
      lessons: 4
    },
    {
      title: "ANATOMY, How Power Moves Through You",
      description: "See what really makes your body fast and powerful. You'll learn how the brain, nerves, and fascia connect every punch and step so energy moves through you instead of against you.\n\nLessons:\n• The Nervous System\n• Fascia\n\nFocus: Nervous System · Fascia · Kinetic Chain · Energy Flow\nOutcome: Effortless speed and natural power through biomechanical alignment.",
      lessons: 3
    },
    {
      title: "FORMIS, The Art of Technique",
      description: "Build the shape and form of great boxing. You'll learn how to stand, move, and throw with balance, turning good technique into natural instinct.\n\nLessons:\n• What Is Formis\n• State And Repositioning\n• Striking\n• Defence\n• The Flow Of Boxing\n• Default Mode\n• Feints And Draws\n• Distance\n\nFocus: Shape · Stance · Defence · Striking\nOutcome: Smooth, balanced movement that stays sharp and efficient in every exchange.",
      lessons: 8
    },
    {
      title: "GAMBIT, The Strategy of Boxing",
      description: "Boxing is a game of moves and responses. Here you'll learn how to control range, find timing, and make your opponent react to you instead of the other way around.\n\nLessons:\n• What Is Gambit\n• Positioning\n• Pattern Recognition\n• Comfort Deception\n• Guard Manipulation\n\nFocus: Positioning · Timing · Deception · Tactical Awareness\nOutcome: Smarter decision-making and the ability to control every exchange.",
      lessons: 6
    },
    {
      title: "ENGINE, Your Inner System",
      description: "This is where strength meets control. Learn how to use breath, recovery, and relaxation to stay calm and sharp even when tired. You'll finish stronger than you started.\n\nLessons:\n• What Is Engine\n• Relaxation\n• Energy Systems\n• Breathing And Breathe Holds\n• Diet And Health\n\nFocus: Conditioning · Breathing · Relaxation · Recovery\nOutcome: Long-lasting performance, fast recovery, and composure under fatigue.",
      lessons: 5
    }
  ]

  const testimonials = getRandomTestimonials(6)

  const faqs = [
    {
      question: "Is this for beginners?",
      answer: "Yes. It's designed to build your understanding from zero,no background needed."
    },
    {
      question: "How is it different from the Boxing Roadmap?",
      answer: "The Roadmap shows what to train week to week. This course explains why it all works. Together, they give you both structure and understanding."
    },
    {
      question: "Will it help with sparring?",
      answer: "Absolutely. You'll learn how to stay calm, think clearly, and make smarter choices under pressure."
    },
    {
      question: "How long will it take?",
      answer: "Most students finish in three to six months, but you can take it at your own pace."
    },
    {
      question: "What do I need?",
      answer: "Nothing to start. Gloves and a bag help for practice, but all the learning comes from understanding first principles."
    },
    {
      question: "Is there a refund policy?",
      answer: "Yes. Try it for 30 days. If it's not for you, get a full refund."
    }
  ]

  const priceFeatures = [
    "26 comprehensive lessons covering all 5 modules",
    "Instant lifetime access to all course materials",
    "Theory, mechanics, tactics, and conditioning",
    "Mental framework for peak performance"
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <CourseNavigation />

      {/* Hero Section */}
      <section className="pt-12 sm:pt-16 pb-6 sm:pb-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Course Title with Pill Border - Smaller & Thinner */}
          <div className="inline-block mx-auto mb-6 sm:mb-8 w-full text-center">
            <div className="inline-block border-2 border-black rounded-full px-4 sm:px-6 py-1.5 sm:py-2">
              <h1 className="text-sm sm:text-base md:text-lg text-gray-900 uppercase tracking-wide font-medium" style={{ fontFamily: "var(--font-satoshi)" }}>
                Boxing from First Principles
              </h1>
            </div>
          </div>

          {/* Headline - Bigger */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-center mb-3 sm:mb-4 px-2">
            The Science of Boxing, Made Simple.
          </h2>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-600 text-center max-w-3xl mx-auto mb-8 sm:mb-12 px-2 leading-relaxed">
            The deepest truths of the sweet science,boiled down to their simplest form.
          </p>

          {/* Video Sales Letter */}
          <div className="mb-6 sm:mb-8">
            <VideoPlayer
              thumbnail={product.image}
              title="Boxing from First Principles Overview"
            />
          </div>

          {/* Primary CTA - No Hover Effects */}
          <div className="text-center mb-6 sm:mb-8">
            <a
              href="#pricing"
              onClick={scrollToPricing}
              className="inline-block py-3 sm:py-4 px-8 sm:px-12 bg-[#26304a] text-white font-black text-lg sm:text-xl rounded-lg shadow-lg uppercase tracking-wide transition-none min-h-[44px]"
            >
              START LEARNING
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="overview" className="pt-6 pb-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <CourseStats
            lessonCount={26}
            purchaseLabel="#1"
            hasLifetimeAccess={true}
          />
        </div>
      </section>

      {/* Who This Is For */}
      <WhoThisIsFor courseName="Boxing from First Principles" personas={personas} />

      {/* CTA 2 */}
      <section className="py-8 bg-white">
        <div className="text-center">
          <a
            href="#pricing"
            onClick={scrollToPricing}
            className="inline-block py-3 sm:py-4 px-8 sm:px-12 bg-[#26304a] text-white font-black text-lg sm:text-xl rounded-lg shadow-lg uppercase tracking-wide transition-none min-h-[44px]"
          >
            ACCESS THE SYSTEM
          </a>
        </div>
      </section>

      {/* Learning Outcomes */}
      <CourseCurriculum learningCards={learningCards} />

      {/* CTA 3 */}
      <section className="py-8 bg-gray-50">
        <div className="text-center">
          <a
            href="#pricing"
            onClick={scrollToPricing}
            className="inline-block py-3 sm:py-4 px-8 sm:px-12 bg-[#26304a] text-white font-black text-lg sm:text-xl rounded-lg shadow-lg uppercase tracking-wide transition-none min-h-[44px]"
          >
            JOIN NOW
          </a>
        </div>
      </section>

      {/* Course Modules */}
      <div id="lessons">
        <CourseModules
          modules={modules}
          headerImage={product.image}
        />
      </div>

      {/* Testimonials */}
      <div id="testimonials">
        <TestimonialSection testimonials={testimonials} />
      </div>

      {/* Price Card */}
      <div id="pricing">
        <CoursePriceCard product={product} features={priceFeatures} />
      </div>

      {/* FAQ */}
      <FAQSection faqs={faqs} />

      <Footer />
    </div>
  )
}
