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

export const metadata = {
  title: 'Boxing from First Principles | Oracle Boxing Shop',
  description: 'Master boxing from the ground up with the complete BFFP system. Learn mind, body, mechanics, tactics, and conditioning.',
}

export default function BFFPPage() {
  const product = getProductById('bffp')!

  const personas = [
    {
      emoji: '🎯',
      title: 'Serious Beginners',
      subtitle: 'Build a rock-solid foundation from day one with proper fundamentals'
    },
    {
      emoji: '📈',
      title: 'Advancing Boxers',
      subtitle: 'Fill gaps in understanding and elevate your technical knowledge'
    },
    {
      emoji: '🧠',
      title: 'Tactical Learners',
      subtitle: 'Understand the "why" behind every movement and strategy'
    }
  ]

  const learningCards = [
    {
      emoji: '🧘',
      text: 'Develop mental clarity, emotional control, and access flow states on command'
    },
    {
      emoji: '⚡',
      text: 'Master nervous system, fascia, and body mechanics for efficient power'
    },
    {
      emoji: '🥊',
      text: 'Build fundamental shapes, stances, and movements of high-level boxing'
    },
    {
      emoji: '♟️',
      text: 'Think tactically and outmaneuver opponents through positioning and deception'
    }
  ]

  const modules = [
    {
      title: "SENTIENCE — The Mind of the Fighter",
      description: "Learn how to think, feel, and perform like a boxer. Shift your paradigm for success, build mental clarity, and access flow on command.\n\nFocus: Identity · Flow State · Presence · Mental Resilience\nOutcome: Calm, focused, and emotionally stable under pressure.",
      lessons: 28
    },
    {
      title: "ANATOMY — The Wiring of Performance",
      description: "Understand how your body truly works beneath the surface. Study the nervous system, fascia, and energy transfer through the body.\n\nFocus: Nervous System · Fascia · Energy Flow\nOutcome: Efficient movement and natural connection between mind and body.",
      lessons: 32
    },
    {
      title: "FORMIS — The Language of Movement",
      description: "Master the mechanics of boxing. Develop shape, stance, striking, defence, distance control, and the flow of movement.\n\nFocus: Shape · Stance · Flow · Default Mode\nOutcome: Technical precision and fluid, intelligent movement.",
      lessons: 45
    },
    {
      title: "GAMBIT — The Science of Tactics",
      description: "Learn to think like a strategist in the ring. Understand pattern recognition, positioning, deception, and guard manipulation.\n\nFocus: Positioning · Deception · Guard Control · Tactical Awareness\nOutcome: Ability to outthink and outmaneuver opponents.",
      lessons: 25
    },
    {
      title: "ENGINE — The Physiology of Fighting",
      description: "Build the engine that powers it all. Train breathing, conditioning, nervous system strength, and recovery.\n\nFocus: Conditioning · Breathing · Relaxation · Health Optimization\nOutcome: High performance under fatigue with resilience and longevity.",
      lessons: 20
    }
  ]

  const testimonials = getRandomTestimonials(6)

  const faqs = [
    {
      question: "Is this course suitable for complete beginners?",
      answer: "Absolutely! BFFP is designed to build your boxing knowledge from the ground up. We start with fundamental concepts and progress systematically. Many beginners prefer starting here because it prevents bad habits from forming."
    },
    {
      question: "How is BFFP different from the Boxing Roadmap?",
      answer: "BFFP focuses on the conceptual framework, theory, and 'why' behind boxing—covering mind, body mechanics, tactics, and conditioning. The Roadmap is the practical 'how-to' with specific drills and progressions. They complement each other perfectly (which is why we offer them in a bundle)."
    },
    {
      question: "How long does it take to complete?",
      answer: "The course contains 150 lessons. Most students take 3-6 months working through it at their own pace. However, you have lifetime access, so you can revisit concepts as you progress."
    },
    {
      question: "Do I need any equipment?",
      answer: "For the theory sections, no equipment is needed. For practice, basic equipment like gloves and a heavy bag is recommended but not required to understand the concepts."
    },
    {
      question: "Can I get a refund if it's not for me?",
      answer: "Yes! We offer a 30-day money-back guarantee. If you're not satisfied with the course for any reason, just email us for a full refund."
    },
    {
      question: "Is this course updated with new content?",
      answer: "The core BFFP system is complete, but we occasionally add supplementary content and updates based on student feedback. All updates are free for existing students."
    },
    {
      question: "Will this help me in sparring?",
      answer: "Yes! BFFP gives you the mental framework, tactical understanding, and technical foundation that translates directly to sparring. Many students report significant improvements in their ring IQ and decision-making."
    }
  ]

  const priceFeatures = [
    "150 comprehensive lessons covering all 5 modules",
    "Lifetime access to all course materials",
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
              <h1 className="text-sm sm:text-base md:text-lg text-gray-900 uppercase tracking-wide font-light" style={{ fontFamily: "var(--font-satoshi)" }}>
                Boxing from First Principles
              </h1>
            </div>
          </div>

          {/* Headline - Bigger */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-center mb-3 sm:mb-4 px-2">
            Master Boxing From The Ground Up
          </h2>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-600 text-center max-w-3xl mx-auto mb-8 sm:mb-12 px-2 leading-relaxed">
            The complete system for understanding the mind, body, mechanics, tactics, and conditioning of elite boxing performance
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
              className="inline-block py-3 sm:py-4 px-8 sm:px-12 bg-red-800 text-white font-black text-lg sm:text-xl rounded-lg shadow-lg uppercase tracking-wide transition-none min-h-[44px]"
            >
              ACCESS THE COURSE
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="overview" className="pt-6 pb-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <CourseStats
            lessonCount={150}
            purchaseCount="500+"
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
            className="inline-block py-3 sm:py-4 px-8 sm:px-12 bg-red-800 text-white font-black text-lg sm:text-xl rounded-lg shadow-lg uppercase tracking-wide transition-none min-h-[44px]"
          >
            I'M READY
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
            className="inline-block py-3 sm:py-4 px-8 sm:px-12 bg-red-800 text-white font-black text-lg sm:text-xl rounded-lg shadow-lg uppercase tracking-wide transition-none min-h-[44px]"
          >
            I WANT ACCESS
          </a>
        </div>
      </section>

      {/* Course Modules */}
      <div id="lessons">
        <CourseModules
          modules={modules}
          headerImage="https://placehold.co/1200x400/e5e5e5/666666?text=BFFP+Course+Overview"
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
