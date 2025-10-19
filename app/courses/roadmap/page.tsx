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
  title: 'Boxing Roadmap | Oracle Boxing Shop',
  description: 'Complete 5-phase boxing training system from fundamentals to mastery. Structured progression with drills and techniques.',
}

export default function RoadmapPage() {
  const product = getProductById('roadmap')!

  const personas = [
    {
      emoji: '🎓',
      title: 'Structured Learners',
      subtitle: 'Want a clear, step-by-step path from beginner to advanced'
    },
    {
      emoji: '🏠',
      title: 'Home Trainers',
      subtitle: 'Need systematic drills and progressions for solo practice'
    },
    {
      emoji: '🥇',
      title: 'Sparring Prep',
      subtitle: 'Preparing for first sparring sessions or amateur bouts'
    }
  ]

  const learningCards = [
    {
      emoji: '📐',
      text: 'Build technically clean movement and form from the ground up'
    },
    {
      emoji: '🛡️',
      text: 'Master defensive fundamentals including slips, rolls, and footwork'
    },
    {
      emoji: '👟',
      text: 'Develop dynamic footwork with shifts, pivots, and balanced power'
    },
    {
      emoji: '🎭',
      text: 'Learn advanced tactics with pulls, weaves, and feints'
    }
  ]

  const modules = [
    {
      title: "PHASE I — Fundamentals & Form",
      description: "Build your base. Learn stance, weight distribution, relaxation, pivots, and the mechanics of every punch.\n\nFocus: Shape · Rotation · Relaxation · Linking punches\nOutcome: Technically clean movement and form.\n\nBy the end, you'll move smoothly, punch correctly, and link basic combos with flow.",
      lessons: 15
    },
    {
      title: "PHASE II — Defence, Range & Sparring Basics",
      description: "Add movement and defence. Learn body punching, range control, foot and hand defences, and how to integrate punches with footwork.\n\nFocus: Range · Defence · Pendulum Steps · Flow\nOutcome: Confidence in distance, rhythm, and reactive defence.\n\nStart shadow sparring and understand the flow of boxing.",
      lessons: 18
    },
    {
      title: "PHASE III — Dynamic Footwork & Balance",
      description: "Learn how to pivot, shift, and plant power with balance. Explore step-pivots, pendulum steps, and circular motion.\n\nFocus: Shifting · Drop Steps · Balance · Rotation\nOutcome: Mobility and power without losing form.\n\nBegin connecting power and flow through the feet.",
      lessons: 14
    },
    {
      title: "PHASE IV — Defensive Mastery & Feints",
      description: "Layer your defence. Combine trunk, hand, and foot defences seamlessly. Learn feints to disguise intent and create openings.\n\nFocus: Pulls · Weaves · Lay Back · Feints\nOutcome: Fluid defensive reactions and deceptive offence.\n\nMaster the art of making opponents miss while setting up counters.",
      lessons: 16
    },
    {
      title: "PHASE V — Precision & Application",
      description: "Perfect every punch and apply movement to them. Master straight, hook, and uppercut mechanics, then add steps, slips, and rolls.\n\nFocus: Punch Mastery · Stepping · Slipping · Rolling\nOutcome: Fully integrated technique ready for sparring and refinement.\n\nThe final polish — technical perfection under movement.",
      lessons: 12
    }
  ]

  const testimonials = getRandomTestimonials(6)

  const faqs = [
    {
      question: "How is the Roadmap different from BFFP?",
      answer: "The Roadmap is the practical 'how-to' with drills, progressions, and specific techniques organized into 5 phases. BFFP is the conceptual framework explaining the 'why' behind boxing—mind, body mechanics, and tactics. They complement each other perfectly."
    },
    {
      question: "Do I need to complete the phases in order?",
      answer: "Yes, the phases are designed to build on each other systematically. Skipping ahead can create gaps in your foundation. However, you can revisit earlier phases anytime to refine techniques."
    },
    {
      question: "How long should I spend on each phase?",
      answer: "Most students spend 2-4 weeks per phase, but it varies based on practice frequency and prior experience. Move to the next phase when you're comfortable with the current material—there's no rush."
    },
    {
      question: "Can I use this if I'm already training at a gym?",
      answer: "Absolutely! Many gym members use the Roadmap to supplement their training, fill technical gaps, and have structured homework between sessions. It's designed to complement live coaching."
    },
    {
      question: "What equipment do I need?",
      answer: "Basic equipment is recommended: gloves, hand wraps, and a heavy bag. Some drills can be done shadow boxing, but a bag helps with applying power and timing."
    },
    {
      question: "Is this suitable for preparing for sparring?",
      answer: "Yes! The Roadmap is specifically designed to prepare you for sparring. By Phase V, you'll have the technical foundation and defensive skills needed to spar safely and effectively."
    },
    {
      question: "Do I get updates if new content is added?",
      answer: "Yes, all updates and improvements to the Roadmap are free for existing students. You have lifetime access to all current and future content."
    }
  ]

  const priceFeatures = [
    "75 lessons across 5 structured phases",
    "Lifetime access to all course materials",
    "Clear progression from beginner to advanced",
    "Drills and techniques for each phase"
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <CourseNavigation />

      {/* Hero Section */}
      <section id="overview" className="pt-12 sm:pt-16 pb-6 sm:pb-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Course Title with Pill Border - Smaller */}
          <div className="inline-block mx-auto mb-6 sm:mb-8 w-full text-center">
            <div className="inline-block border-2 border-black rounded-full px-4 sm:px-6 py-1.5 sm:py-2">
              <h1 className="text-sm sm:text-base md:text-lg text-gray-900 uppercase tracking-wide font-light" style={{ fontFamily: "var(--font-satoshi)" }}>
                Boxing Roadmap
              </h1>
            </div>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-center mb-3 sm:mb-4 px-2">
            Your Complete 5-Phase Boxing Training System
          </h2>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-600 text-center max-w-3xl mx-auto mb-8 sm:mb-12 px-2 leading-relaxed">
            Follow a proven, step-by-step progression from fundamentals to mastery with clear outcomes at every stage
          </p>

          {/* Video Sales Letter */}
          <div className="mb-6 sm:mb-8">
            <VideoPlayer
              thumbnail={product.image}
              title="Boxing Roadmap Overview"
            />
          </div>

          {/* Primary CTA - No Hover Effects */}
          <div className="text-center mb-6 sm:mb-8">
            <a
              href="#pricing"
              className="inline-block py-3 sm:py-4 px-8 sm:px-12 bg-red-800 text-white font-black text-lg sm:text-xl rounded-lg shadow-lg uppercase tracking-wide transition-none min-h-[44px]"
            >
              I'M READY
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="pt-6 pb-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <CourseStats
            lessonCount={75}
            purchaseCount="400+"
            hasLifetimeAccess={true}
          />
        </div>
      </section>

      {/* Who This Is For */}
      <WhoThisIsFor courseName="Boxing Roadmap" personas={personas} />

      {/* Learning Outcomes */}
      <CourseCurriculum learningCards={learningCards} />

      {/* Course Modules */}
      <section id="lessons">
        <CourseModules
          modules={modules}
          headerImage="https://placehold.co/1200x400/e5e5e5/666666?text=Roadmap+Training+System"
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
