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

export default function VaultPage() {
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
  const product = getProductById('vault')!

  const personas = [
    {
      emoji: '👀',
      title: 'Visual Learners',
      subtitle: 'Learn best by watching concepts explained in real-time'
    },
    {
      emoji: '💬',
      title: 'Question Seekers',
      subtitle: 'Have specific technical questions and want expert answers'
    },
    {
      emoji: '📚',
      title: 'Course Supplementers',
      subtitle: 'Want to enhance BFFP and Roadmap with live coaching wisdom'
    }
  ]

  const learningCards = [
    {
      emoji: '🎥',
      text: 'Watch boxing concepts explained in response to real student questions'
    },
    {
      emoji: '🔧',
      text: 'Learn troubleshooting techniques for common technical issues and plateaus'
    },
    {
      emoji: '💡',
      text: 'Access tactical insights, drill modifications, and technique refinements'
    },
    {
      emoji: '📅',
      text: 'Get monthly updates with new replay sessions added continuously'
    }
  ]

  const modules = [
    {
      title: "Technical Fundamentals",
      description: "Deep dives into punch mechanics, stance work, and movement foundations.\n\nCovers: Jab mechanics, cross technique, hook development, uppercuts, stance optimization, weight distribution, relaxation techniques.\n\nTopics include fixing common technical flaws, power generation, speed development, and precision training.",
      lessons: 35
    },
    {
      title: "Defence & Counter Systems",
      description: "Complete defensive strategies and counter-punching setups.\n\nCovers: Slips, rolls, pulls, parries, shoulder rolls, defensive flow, counter timing, defensive setups.\n\nLearn how to make opponents miss and create immediate counter opportunities.",
      lessons: 28
    },
    {
      title: "Footwork & Movement",
      description: "Master ring movement, positioning, and footwork integration.\n\nCovers: Lateral movement, pivots, shifts, step-pivots, pendulum steps, angles, distance management, ring generalship.\n\nMove like a pro with efficient, purposeful footwork.",
      lessons: 22
    },
    {
      title: "Tactics & Strategy",
      description: "Ring IQ, tactical setups, and strategic game planning.\n\nCovers: Feints, guard manipulation, pattern recognition, reading opponents, setting traps, offensive/defensive transitions.\n\nDevelop the boxing brain to outthink and outmaneuver opponents.",
      lessons: 25
    },
    {
      title: "Flow & Integration",
      description: "Putting it all together,seamless boxing integration.\n\nCovers: Combining offense and defence, flow drills, kinetic linkage, rhythm and timing, shadow sparring, sparring preparation.\n\nTransition from learning techniques to performing them fluidly.",
      lessons: 18
    },
    {
      title: "Special Topics & Q&A",
      description: "Monthly Q&A sessions covering student-requested topics.\n\nCovers: Liver shot setups, body punching, clinch work, southpaw strategies, conditioning tips, mental game, training optimization.\n\nUpdated monthly with new content based on member questions.",
      lessons: 12
    }
  ]

  const testimonials = getRandomTestimonials(6)

  const faqs = [
    {
      question: "How is this different from BFFP and Roadmap?",
      answer: "BFFP and Roadmap are structured courses. The Vault is a collection of live coaching call replays where Oliver & Toni answer real student questions. It's less structured but incredibly valuable for specific problems, troubleshooting, and seeing concepts applied in different contexts."
    },
    {
      question: "How often is new content added?",
      answer: "New replay sessions are added monthly. We hold weekly coaching calls, and the best ones (covering popular topics or unique insights) are added to the vault. You get access to all past and future replays."
    },
    {
      question: "Can I request specific topics?",
      answer: "While you don't get to submit questions directly (that's exclusive to active membership), many common topics have already been covered. We also prioritize adding replays on frequently requested subjects."
    },
    {
      question: "How long are the replay sessions?",
      answer: "Sessions vary from 20 minutes to 90 minutes depending on the topic. Most are 30-45 minutes of focused coaching on specific techniques or concepts."
    },
    {
      question: "Is this a replacement for BFFP or Roadmap?",
      answer: "No, it's a supplement. BFFP and Roadmap give you systematic frameworks. The Vault gives you real coaching insights, troubleshooting, and alternative explanations. Together, they're incredibly powerful."
    },
    {
      question: "Can I access older coaching call archives?",
      answer: "Yes! The vault includes all 2024-2025 replays from January through October, plus selected archives from the Boxing Clinic category. That's 140+ sessions and growing."
    },
    {
      question: "What if I want to ask my own questions live?",
      answer: "For live Q&A access, check out the Oracle Membership which includes weekly coaching calls where you can ask questions directly, plus access to all courses including the vault."
    }
  ]

  const priceFeatures = [
    "140+ coaching call replay sessions",
    "New replays added monthly",
    "Lifetime access to all past and future content",
    "Topics covering all aspects of boxing",
    "30-day money-back guarantee"
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <CourseNavigation />

      {/* Hero Section */}
      <section className="pt-12 sm:pt-16 pb-6 sm:pb-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Course Title with Pill Border - Smaller */}
          <div className="inline-block mx-auto mb-6 sm:mb-8 w-full text-center">
            <div className="inline-block border-2 border-black rounded-full px-4 sm:px-6 py-1.5 sm:py-2">
              <h1 className="text-sm sm:text-base md:text-lg text-gray-900 uppercase tracking-wide font-medium" style={{ fontFamily: "var(--font-satoshi)" }}>
                Coaching Call Replays
              </h1>
            </div>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-center mb-3 sm:mb-4 px-2">
            Learn From 140+ Live Coaching Sessions
          </h2>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-600 text-center max-w-3xl mx-auto mb-8 sm:mb-12 px-2 leading-relaxed">
            Watch Oliver & Toni answer real student questions covering every aspect of the Oracle Boxing system,updated monthly
          </p>

          {/* Video Sales Letter */}
          <div className="mb-6 sm:mb-8">
            <VideoPlayer
              thumbnail={product.image}
              title="Boxing Clinic Preview"
            />
          </div>

          {/* Primary CTA - No Hover Effects */}
          <div className="text-center mb-6 sm:mb-8">
            <a
              href="#pricing"
              onClick={scrollToPricing}
              className="inline-block py-3 sm:py-4 px-8 sm:px-12 bg-[#26304a] text-white font-black text-lg sm:text-xl rounded-lg shadow-lg uppercase tracking-wide transition-none min-h-[44px]"
            >
              I WANT ACCESS
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="overview" className="pt-6 pb-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <CourseStats
            lessonCount={140}
            purchaseCount="300+"
            hasLifetimeAccess={true}
          />
        </div>
      </section>

      {/* Who This Is For */}
      <WhoThisIsFor courseName="Boxing Clinic" personas={personas} />

      {/* Learning Outcomes */}
      <CourseCurriculum learningCards={learningCards} />

      {/* Course Modules */}
      <section id="lessons">
        <CourseModules
          modules={modules}
          headerImage={product.image}
        />
      </section>

      {/* Testimonials */}
      <section id="testimonials">
        <TestimonialSection testimonials={testimonials} />
      </section>

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
