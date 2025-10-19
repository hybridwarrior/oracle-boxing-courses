import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { VideoPlayer } from '@/components/VideoPlayer'
import { CourseStats } from '@/components/CourseStats'
import { WhoThisIsFor } from '@/components/WhoThisIsFor'
import { CourseCurriculum } from '@/components/CourseCurriculum'
import { TestimonialSection } from '@/components/TestimonialSection'
import { CoursePriceCard } from '@/components/CoursePriceCard'
import { FAQSection } from '@/components/FAQSection'
import { CourseNavigation } from '@/components/CourseNavigation'
import { getProductById } from '@/lib/products'
import { getRandomTestimonials } from '@/lib/testimonials'
import { Check } from 'lucide-react'

export const metadata = {
  title: 'Ultimate Boxing Bundle | Oracle Boxing Shop',
  description: 'Get everything. Master boxing from first principles to real application. Complete bundle with BFFP, Roadmap, and Coaching Call Replays.',
}

export default function BundlePage() {
  const product = getProductById('bundle')!

  const personas = [
    {
      emoji: '🎓',
      title: 'Complete Mastery',
      subtitle: 'Want the full Oracle Boxing education system from day one'
    },
    {
      emoji: '💰',
      title: 'Best Value',
      subtitle: 'Get everything for $144 less than buying separately'
    },
    {
      emoji: '🏆',
      title: 'Serious Students',
      subtitle: 'Committed to mastering both theory and practice systematically'
    }
  ]

  const learningCards = [
    {
      emoji: '🧠',
      text: 'Understand the complete conceptual framework of boxing with BFFP'
    },
    {
      emoji: '📋',
      text: 'Master practical techniques through structured 5-phase Roadmap progression'
    },
    {
      emoji: '💬',
      text: 'Learn from 140+ live coaching insights and real student Q&A'
    },
    {
      emoji: '💎',
      text: 'Save $144 compared to buying courses individually'
    }
  ]

  const testimonials = getRandomTestimonials(6)

  const faqs = [
    {
      question: "What exactly is included in the bundle?",
      answer: "You get complete lifetime access to all three courses: Boxing from First Principles (150 lessons, $297 value), Boxing Roadmap (75 lessons, $147 value), and Coaching Call Replays (140+ sessions, $97 value). Total value $541 for just $397—you save $144."
    },
    {
      question: "Can I access all courses immediately?",
      answer: "Yes! As soon as you purchase, you get instant access to all three courses. You can start with any course and work through them at your own pace."
    },
    {
      question: "Which course should I start with?",
      answer: "Most students start with BFFP to build the conceptual foundation, then move to Roadmap for practical drills, while using the Vault to supplement both. But you can start anywhere—they all work together."
    },
    {
      question: "Is this better value than buying individually?",
      answer: "Absolutely. Buying all three separately costs $541. The bundle is $397—saving you $144. Plus, you get everything integrated from the start instead of piecing it together later."
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

  const priceFeatures = [
    "Boxing from First Principles (150 lessons)",
    "Boxing Roadmap (75 lessons)",
    "Coaching Call Replays (140+ sessions)",
    "Lifetime access to all courses",
    "All future updates included free",
    "Save $144 vs buying separately",
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
              <h1 className="text-sm sm:text-base md:text-lg text-gray-900 uppercase tracking-wide font-light" style={{ fontFamily: "var(--font-satoshi)" }}>
                Oracle Course Bundle
              </h1>
            </div>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-center mb-3 sm:mb-4 px-2">
            Get Everything. Master Boxing From First Principles to Real Application.
          </h2>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-600 text-center max-w-3xl mx-auto mb-8 sm:mb-12 px-2 leading-relaxed">
            The complete Oracle Boxing system—theory, technique, tactics, and live coaching insights. Save $144.
          </p>

          {/* Video Sales Letter */}
          <div className="mb-6 sm:mb-8">
            <VideoPlayer
              thumbnail={product.image}
              title="Oracle Course Bundle Overview"
            />
          </div>

          {/* Value Proposition */}
          <div className="bg-red-50 border-2 border-red-600 rounded-lg p-8 mb-8">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">$297</div>
                <div className="font-semibold text-gray-900 mb-1">Boxing from First Principles</div>
                <div className="text-sm text-gray-600">150 lessons</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">$147</div>
                <div className="font-semibold text-gray-900 mb-1">Boxing Roadmap</div>
                <div className="text-sm text-gray-600">75 lessons</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">$97</div>
                <div className="font-semibold text-gray-900 mb-1">Coaching Call Replays</div>
                <div className="text-sm text-gray-600">140+ sessions</div>
              </div>
            </div>
            <div className="border-t-2 border-red-600 pt-4 text-center">
              <div className="text-sm text-gray-600 mb-2">Total Individual Value:</div>
              <div className="text-2xl font-bold text-gray-400 line-through mb-2">$541</div>
              <div className="text-sm text-gray-900 font-semibold mb-2">Bundle Price:</div>
              <div className="text-5xl font-bold text-red-600 mb-2">$397</div>
              <div className="text-xl font-semibold text-green-600">You Save $144</div>
            </div>
          </div>

          {/* Primary CTA - No Hover Effects */}
          <div className="text-center mb-6 sm:mb-8">
            <a
              href="#pricing"
              className="inline-block py-3 sm:py-4 px-8 sm:px-12 bg-red-800 text-white font-black text-lg sm:text-xl rounded-lg shadow-lg uppercase tracking-wide transition-none min-h-[44px]"
            >
              I WANT ACCESS
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="pt-6 pb-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <CourseStats
            lessonCount={365}
            purchaseCount="200+"
            hasLifetimeAccess={true}
          />
        </div>
      </section>

      {/* Who This Is For */}
      <WhoThisIsFor courseName="Oracle Course Bundle" personas={personas} />

      {/* Learning Outcomes */}
      <CourseCurriculum learningCards={learningCards} />

      {/* What's Included - Detailed Breakdown */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">
            Everything You Need to Master Boxing
          </h2>
          <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            Three complementary courses that work together to build complete boxing mastery
          </p>

          <div className="space-y-8">
            {/* BFFP */}
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 hover:border-red-600 transition-colors">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Boxing from First Principles</h3>
                  <p className="text-lg text-red-600 font-semibold mb-3">$297 Value • 150 Lessons</p>
                  <p className="text-gray-700 mb-4">
                    Master the conceptual framework of boxing. Understand the mind, body mechanics, tactics, and conditioning that create elite performance.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-gray-700">Sentience (Mind)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-gray-700">Anatomy (Body)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-gray-700">Formis (Movement)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-gray-700">Gambit (Tactics)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-gray-700">Engine (Conditioning)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Roadmap */}
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 hover:border-red-600 transition-colors">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Boxing Roadmap</h3>
                  <p className="text-lg text-red-600 font-semibold mb-3">$147 Value • 75 Lessons</p>
                  <p className="text-gray-700 mb-4">
                    Your complete 5-phase training system. Follow structured progressions from fundamentals to mastery with clear drills and techniques.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-gray-700">Phase I: Fundamentals</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-gray-700">Phase II: Defence & Range</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-gray-700">Phase III: Footwork</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-gray-700">Phase IV: Advanced Defence</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-gray-700">Phase V: Integration</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vault */}
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 hover:border-red-600 transition-colors">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Coaching Call Replays</h3>
                  <p className="text-lg text-red-600 font-semibold mb-3">$97 Value • 140+ Sessions</p>
                  <p className="text-gray-700 mb-4">
                    Learn from live coaching Q&A. Watch Oliver & Toni answer real student questions covering every aspect of boxing. Updated monthly.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-gray-700">Technical breakdowns</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-gray-700">Troubleshooting tips</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-gray-700">Tactical insights</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-gray-700">Monthly updates</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection testimonials={testimonials} />

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
