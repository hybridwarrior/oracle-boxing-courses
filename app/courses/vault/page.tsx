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
      title: 'You learn best by seeing things done in real time, not explained on paper.',
      subtitle: 'You want to watch real coaching, real mistakes, and real improvement.'
    },
    {
      emoji: '💼',
      title: 'You are busy and often work from home, so your training time has to count.',
      subtitle: 'You need efficient, effective ways to keep improving your boxing skills and staying connected to real coaching without leaving your space.'
    },
    {
      emoji: '💡',
      title: 'You cannot afford a personal coach right now, but you still want to grow.',
      subtitle: 'Learning from others mistakes and real-time feedback is the next best thing — a way to progress without the price tag.'
    }
  ]

  const learningCards = [
    {
      emoji: '🎥',
      text: 'How real coaching solves common problems and sharpens form.',
      imageUrl: 'https://media.oracleboxing.com/Website/bcr_course6.png'
    },
    {
      emoji: '🔧',
      text: 'How to refine movement through small corrections and awareness.',
      imageUrl: 'https://media.oracleboxing.com/Website/bcr_course2.png'
    },
    {
      emoji: '💡',
      text: 'How to apply high-level tactics like feints, shifts, and defensive flow.',
      imageUrl: 'https://media.oracleboxing.com/Website/bcr_course4.png'
    },
    {
      emoji: '📅',
      text: 'How to think like a coach by watching adjustments in real time.',
      imageUrl: 'https://media.oracleboxing.com/Website/bcr_course1.png'
    }
  ]

  const modules = [
    {
      title: "October 2025",
      description: "Liver Shot Setups [01/10 (Oliver)]\nFootwork + Punching [02/10 (Oliver)]\nKinetic Chain + Hand Defences [03/10 (Oliver)]\nKinetic Linkage [04/10 (Toni)]\nFlow of Boxing [05/10 (Toni)]\nCombo Buildup [06/10 (Toni)]\n1-2 [07/10 (Toni)]\nKinetic Linkage [08/10 (Oliver)]\nShifting Call [09/10 (Oliver)]\nDefence + Kinetic Counters [10/10 (Oliver)]\nKinetic Linkage 2 [11/10 (Toni)]\nJab Sequences [12/10 (Toni)]\nLiver Setup [13/10 (Toni)]\nCombo Buildup [14/10 (Toni)]\nPunch Technique [16/10 (Oliver)]",
      lessons: 15
    },
    {
      title: "September 2025",
      description: "Tall Tree vs Sportscar [01/09 (Toni)]\nDrills [03/09 (Oliver)]\nFundamentals [04/09 (Oliver)]\nRing-Craft, Straight Shots [05/09 (Oliver)]\nRotation + Flow [06/09 (Toni)]\nCombo Buildup [07/09 (Toni)]\nShifts [09/09 (Toni)]\nFlow of Boxing [12/09 (Oliver)]\nJab Variations [17/09 (Oliver)]\nPost-Punch Defence [16/09 (Toni)]\nCatch and Shoot [21/09 (Toni)]\nCounterpunching [23/09 (Toni)]\nShape Whilst Moving [24/09 (Oliver)]\nFootwork Drills [26/09 (Oliver)]\nSet Up the Rear Hand [28/09 (Toni)]\nJab [29/09 (Toni)]\nFootwork [30/09 (Toni)]",
      lessons: 17
    },
    {
      title: "August 2025",
      description: "Rotation + Flow [04/08 (Toni)]\nCombo Buildup [05/08 (Toni)]\nSetting Up Attacks [07/08 (Oliver)]\nCombinations with Footwork [08/08 (Toni)]\nLayering Defences [10/08 (Toni)]\nCombining Offense + Defence [11/08 (Toni)]\nJab Sequences [12/08 (Toni)]\nKO Setups [15/08 (Oliver)]\nCombining Footwork with Punches [16/08 (Toni)]\nLines of Defence [18/08 (Toni)]\nBasic Punching [21/08 (Oliver)]\nStraight Shot Magic [22/08 (Oliver)]\nPlant and Throw [27/08 (Oliver)]\nMoving vs Planting [28/08 (Oliver)]",
      lessons: 14
    },
    {
      title: "July 2025",
      description: "Jab Only [01/07 (Oliver)]\nFootwork and Punching [02/07 (Oliver)]\nKnee Tapping Carnage [03/07 (Oliver)]\nRotation + Flow [05/07 (Toni)]\nBasic Punching Technique [06/07 (Toni)]\nAngle Changes [11/07 (Oliver)]\nWeight Back [12/07 (Toni)]\nCounter Punching Drills [16/07 (Oliver)]\nFeint & Throw [17/07 (Oliver)]\nFlow Combo [20/07 (Toni)]\nFootwork Drills [21/07 (Toni)]\nRotation [22/07 (Toni)]\nFlow of Boxing [23/07 (Oliver)]\nAngle Footwork Drills [24/07 (Oliver)]\nMuhammad Ali Call [25/07 (Oliver)]\nCombo Buildup [27/07 (Toni)]\nCounterpunching Drills [28/07 (Toni)]\n10 Rounds of Drills [30/07 (Oliver)]\nDrills + Angle Sequence [31/07 (Oliver)]",
      lessons: 19
    },
    {
      title: "June 2025",
      description: "Combination Variety [01/06 (Toni)]\nJabs [02/06 (Toni)]\nDefault Mode [04/05 (Oliver)]\nFootwork Sequence [05/06 (Oliver)]\nJab Variety [09/06 (Toni)]\nFlow of Boxing [10/06 (Toni)]\nEnd Result of Punches [11/06 (Oliver)]\nTwisting Jab [17/06 (Oliver)]\nShoulder Roll + Slots [18/06 (Oliver)]\nHead Movement with Footwork [22/06 (Toni)]\nUltimate Default Mode [25/06 (Oliver)]\nFundamental Drills [26/06 (Oliver)]\nShape + Punch Technique [29/06 (Toni)]\nCombining Footwork and Punches [30/06 (Toni)]",
      lessons: 14
    },
    {
      title: "May 2025",
      description: "Fundamentals + Straight Punching [01/05 (Oliver)]\nFlow of Boxing [05/05 (Toni)]\nAngles [04/05 (Toni)]\nShape + Relaxation + Rotation [05/04 (Toni)]\nBody Punching + Flow [07/06 (Oliver)]\nStraight Punching + Hand Defences [08/06 (Oliver)]\nJab [12/05 (Toni)]\nFlicker Jab + Flow [14/05 (Oliver)]\nFeint Attacks + Check Hooks [15/05 (Oliver)]\nCounterpunching + Visualisation [18/05 (Toni)]\nCombo Buildup [19/05 (Toni)]\nSparring Tactics [23/05 (JT)]\nAngles to Counter [31/05 (Toni)]",
      lessons: 13
    }
  ]

  const testimonials = getRandomTestimonials(6)

  const faqs = [
    {
      question: "How is this different from BFFP and Roadmap?",
      answer: "BFFP and Roadmap are structured learning paths. Boxing Clinic Replays is the live replay vault — real-time application, troubleshooting, and evolution of the system."
    },
    {
      question: "How often is new content added?",
      answer: "New replays are added monthly. You'll keep getting fresh insights and sessions every few weeks."
    },
    {
      question: "Can I request topics?",
      answer: "Requests are taken from the most common student challenges. The most popular topics are prioritized in new sessions."
    },
    {
      question: "How long are the sessions?",
      answer: "Most last between 30–60 minutes. Enough time to dive deep without filler."
    },
    {
      question: "Is this a replacement for BFFP or Roadmap?",
      answer: "No. Boxing Clinic Replays complements them — it's where you see those lessons applied in live training."
    },
    {
      question: "Can I access older archives?",
      answer: "Yes. You get all 2024–2025 replays plus select older archives. 220+ sessions and growing."
    },
    {
      question: "How can I join live calls?",
      answer: "For direct access to Oliver & Toni and live Q&A, check out the Oracle Membership, which includes all courses plus weekly coaching."
    }
  ]

  const priceFeatures = [
    "Visual learners, technical obsessives, and anyone who studies best by watching real coaching.",
    "Deeper understanding of technique, timing, and flow through real-world examples.",
    "Learn at your own pace and revisit any replay, anytime.",
    "220+ live sessions, one evolving library. Years of coaching condensed into lessons you can study for life."
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
                Boxing Clinic Replays
              </h1>
            </div>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-center mb-3 sm:mb-4 px-2">
            Learn Directly from 220+ Real Coaching Sessions
          </h2>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-600 text-center max-w-3xl mx-auto mb-8 sm:mb-12 px-2 leading-relaxed">
            Follow along with Oliver's live coaching sessions where he breaks down skills, demonstrates drills, and gives live feedback to students — all from the comfort of your home or office, recorded and updated monthly.
          </p>

          {/* Video Sales Letter */}
          <div className="mb-6 sm:mb-8">
            <VideoPlayer
              thumbnail={product.image}
              title="Boxing Clinic Replays Preview"
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
            lessonCount={220}
            avgDuration="~60"
            updatedMonthly={true}
            hasLifetimeAccess={true}
          />
        </div>
      </section>

      {/* Who This Is For */}
      <WhoThisIsFor courseName="Boxing Clinic Replays" personas={personas} />

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
