'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useAnalytics } from '@/hooks/useAnalytics'
import { EpicCTAButton } from '@/components/EpicCTAButton'
import { useCurrency } from '@/contexts/CurrencyContext'
import { getProductPrice, formatPrice } from '@/lib/currency'

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  onCTAClick?: () => void;
  onOpenPricing?: () => void;
}

const baseFaqData: FAQItem[] = [
  {
    question: "What exactly is the 6-Week Challenge?",
    answer: "It's a 6-week online training program designed to rapidly improve your boxing fundamentals through structured lessons, live coaching, and weekly accountability — with a full refund guarantee when you complete it."
  },
  {
    question: "What do I get access to?",
    answer: `• Weekly live coaching calls with Oliver, Toni, and the Oracle team
• Access to the Boxing Masterclass course
• Full access to the Oracle Boxing community on Skool
• Challenge Tracker to log your progress and stay accountable
• Support from other boxers on the same journey`
  },
  {
    question: "What are the completion requirements?",
    answer: `To qualify for the refund, you must:

• Attend 2 live calls per week (or use recordings if your timezone prevents it)
• Submit 1 training video each week for feedback
• Complete all 5 modules of the Boxing Masterclass course
• Attend your mid-point and graduation check-in calls
• Submit proof in the Challenge Tracker`
  },
  {
    question: "What if I can't attend live calls because of my timezone?",
    answer: "No problem. You can watch the replays and post your video takeaways in the community for credit. Just reply \"TZ\" to your onboarding email and we'll guide you on how to get credit through recordings."
  },
  {
    question: "What happens if I miss a week?",
    answer: "You can still catch up. As long as all your requirements are submitted by the end of the challenge, you'll remain eligible for your refund."
  },
  {
    question: "What equipment do I need?",
    answer: "Only your phone (for filming) and basic boxing gear — gloves, wraps, bag or shadowboxing space. No gym required."
  },
  {
    question: "How do I submit videos?",
    answer: "Simply post your clips inside the Video Feedback section of the community each week. Our coaches and other members will review and give detailed feedback."
  },
  {
    question: "Who is this challenge for?",
    answer: `• Beginners or late starters who want to fix their form fast
• Boxers stuck at the same level, looking to finally progress
• Anyone who wants a proven system to learn real boxing fundamentals`
  },
  {
    question: "How long does the refund take once I finish?",
    answer: "Once you've submitted all your proof, we'll review it within 48–72 hours and issue your refund within 7–14 business days to your original payment method."
  },
  {
    question: "What if I don't finish the challenge?",
    answer: "You'll still keep access to the course, community, and live calls for the remainder of your 6 weeks — you just won't qualify for the refund."
  },
  {
    question: "Can I continue after the challenge?",
    answer: "Yes — most boxers upgrade to the Full Access Membership after finishing the challenge. That gives you ongoing calls, advanced training, and all other Oracle Boxing programs."
  },
  {
    question: "How do I contact support?",
    answer: "Email team@oracleboxing.com or DM the founders inside Skool. Replies are usually within 24 hours (Mon–Fri)."
  }
]

const FAQSection = ({ onCTAClick, onOpenPricing }: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { trackFAQExpand } = useAnalytics()
  const { currency } = useCurrency()

  // Get the price for 6wc in user's currency
  const price6wc = getProductPrice('6wc', currency) || 197
  const formattedPrice = formatPrice(price6wc, currency)

  // Create FAQ data with dynamic price
  const faqData: FAQItem[] = [
    baseFaqData[0],
    {
      question: "How does the refund guarantee work?",
      answer: `You pay ${formattedPrice} upfront to join. Complete all challenge requirements — attend coaching calls, post training clips, complete the course, and attend both check-in calls — and you'll get 100% of your money back within 7–14 days.`
    },
    ...baseFaqData.slice(1)
  ]

  const toggleQuestion = (index: number) => {
    // Track FAQ expansion only when opening
    if (openIndex !== index) {
      trackFAQExpand({
        question_text: faqData[index].question,
        question_index: index
      })
    }
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4" style={{ fontFamily: 'Satoshi, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about the Oracle Boxing Challenge
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full px-4 py-3 sm:px-6 sm:py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 pr-3 sm:pr-4">
                  {item.question}
                </span>
                <div
                  className="flex-shrink-0 transition-transform duration-150"
                  style={{ transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                </div>
              </button>

              {openIndex === index && (
                <div
                  id={`faq-answer-${index}`}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-3 pt-0 sm:px-6 sm:pb-5">
                    <div className="text-xs sm:text-sm md:text-base text-gray-600 whitespace-pre-line leading-relaxed">
                      {item.answer}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        {(onOpenPricing || onCTAClick) && (
          <div className="text-center mt-8 sm:mt-12">
            <EpicCTAButton
              size="lg"
              className="min-h-[56px]"
              onClick={() => {
                if (onOpenPricing) onOpenPricing()
                if (onCTAClick) onCTAClick()
              }}
              trackingName="faq"
            >
              <span className="text-lg sm:text-xl font-black uppercase">VIEW DETAILS</span>
            </EpicCTAButton>
          </div>
        )}
      </div>
    </section>
  )
}

export default FAQSection