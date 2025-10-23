'use client'

import Image from 'next/image'
import { EpicCTAButton } from '@/components/EpicCTAButton'

interface TransformationStoryProps {
  onCTAClick?: () => void;
}

export default function TransformationStory({ onCTAClick }: TransformationStoryProps) {
  const fontFamily = 'Satoshi, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

  return (
    <section className="relative bg-white py-24 sm:py-28 lg:py-36 overflow-hidden" style={{ fontFamily }}>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold" style={{ fontFamily: 'ClashDisplay, system-ui, sans-serif', fontWeight: '700', color: '#222', letterSpacing: '0.02em', lineHeight: '1.2' }}>
            Old School Boxing, New School System
          </h2>
        </div>

        {/* Bruno's Testimonial */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-100">
            {/* Profile Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-[60px] h-[60px] relative overflow-hidden rounded-full">
                <Image
                  src="https://media.oracleboxing.com/Website/bruno.jpg"
                  alt="Bruno Martins"
                  width={60}
                  height={60}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900">Bruno Martins</h3>
                <p className="text-sm text-gray-600">10h (edited) • 🏆 Win of the Day</p>
              </div>
            </div>

            {/* Testimonial Content */}
            <div className="space-y-4 text-gray-800 leading-relaxed">
              <p className="font-semibold text-xl">Week 6! Here you are... and damn that went fast!</p>

              <p>
                Even today, while still recovering from a bit of a flu, I somehow found myself waking up at 6:40 AM for a +5km run. (Even writing that makes me laugh… who IS this person? 😄)
              </p>

              <p>
                I can genuinely SEE and FEEL the shift happening — and it's all been sparked by being part of Oracle Boxing. <span className="font-semibold">#SpoonBending</span>
              </p>

              <p className="font-semibold text-lg">
                The value that @Oliver Betts @Jordan Lyne, and @Antonio Troni bring is WAY BEYOND what I ever expected when I joined this challenge.
              </p>

              <p>
                One of the biggest moments was realizing just how deeply these guys care about improving boxing — those 1:1 calls for the top 10 leaderboard are insane!
              </p>

              <p>
                All I can say is, if you're starting your challenge — I hope you enjoy it even half as much as I am, you'll be hooked!
              </p>

              <p className="font-bold text-lg pt-2">
                #FUCKPLANB
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <EpicCTAButton
              size="lg"
              className="min-h-[72px]"
              onClick={onCTAClick}
              trackingName="transformation-story"
            >
              <span className="text-lg sm:text-xl font-bold">Start the 6-Week Challenge →</span>
            </EpicCTAButton>
          </div>
        </div>
      </div>
    </section>
  )
}