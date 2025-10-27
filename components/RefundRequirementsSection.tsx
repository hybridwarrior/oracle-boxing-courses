'use client'

import { ScrollToTopLink as Link } from '@/components/ScrollToTopLink'
import { EpicCTAButton } from '@/components/EpicCTAButton'
import { ChallengePrice } from '@/components/AdaptivePrice'

interface RefundRequirementsSectionProps {
  onCTAClick?: () => void;
}

export default function RefundRequirementsSection({ onCTAClick }: RefundRequirementsSectionProps) {
  const fontFamily = 'Satoshi, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

  const requirements = [
    {
      title: "Show Up to Coaching",
      description: "Join at least 2 live calls each week. We have them every day, so you'll always find one that works for you."
    },
    {
      title: "Post Your Training Videos",
      description: "Share one short video each week. We'll help you improve and you'll show us you're training."
    },
    {
      title: "Finish the Course",
      description: "Complete all 5 lessons in our boxing course. Each one teaches you something important."
    },
    {
      title: "Join Your 2 Check-In Calls",
      description: "We'll check your progress twice during the 6 weeks. We'll help fix your mistakes and answer your questions."
    }
  ]

  return (
    <section className="w-full py-16 sm:py-20 bg-white" style={{ fontFamily }}>
      <div className="container mx-auto max-w-5xl px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold" style={{ fontFamily, color: '#222', letterSpacing: '0.02em', lineHeight: '1.2' }}>
            How to Get Your <ChallengePrice /> Back
          </h2>
        </div>

        {/* Card Container */}
        <div className="bg-gradient-to-b from-gray-50 to-white rounded-3xl border-2 border-gray-200 shadow-xl p-8 sm:p-10">
          {/* Subheadline */}
          <p className="text-left mb-8" style={{ fontSize: '17px', lineHeight: '1.7', letterSpacing: '0.02em', color: '#222', fontFamily }}>
            Finish the 6 weeks and we'll give you back every penny. Just do these 4 simple things:
          </p>

          {/* Requirements List */}
          <div className="mb-8">
            <ol className="space-y-6" style={{ listStyle: 'none', paddingLeft: 0, counterReset: 'requirement' }}>
              {requirements.map((requirement, index) => (
                <li
                  key={index}
                  className="text-left"
                  style={{ counterIncrement: 'requirement' }}
                >
                  <h3 style={{ fontSize: '17px', lineHeight: '1.7', letterSpacing: '0.02em', color: '#222', fontFamily, fontWeight: '600', marginBottom: '8px' }}>
                    <span style={{ marginRight: '8px' }}>{index + 1}.</span>
                    {requirement.title}
                  </h3>
                  <p style={{ fontSize: '17px', lineHeight: '1.7', letterSpacing: '0.02em', color: '#222', fontFamily, marginLeft: '24px' }}>
                    {requirement.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Why We Do This */}
          <div className="text-left pt-6 border-t border-gray-200">
            <h3 style={{ fontSize: '17px', lineHeight: '1.7', letterSpacing: '0.02em', color: '#222', fontFamily, fontWeight: '600', marginBottom: '12px' }}>
              Why We Do This
            </h3>
            <p style={{ fontSize: '17px', lineHeight: '1.7', letterSpacing: '0.02em', color: '#222', fontFamily }}>
              If you get good at boxing, you'll want to keep training with us. You win by learning for free. We win by earning your trust.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <EpicCTAButton
            size="lg"
            className="min-h-[72px]"
            onClick={onCTAClick}
            trackingName="refund"
          >
            <span className="text-lg sm:text-xl font-black uppercase">Start Challenge</span>
          </EpicCTAButton>
        </div>

      </div>
    </section>
  )
}