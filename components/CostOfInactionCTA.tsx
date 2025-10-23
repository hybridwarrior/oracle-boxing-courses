'use client'

import { Square, Check } from 'lucide-react'
import { EpicCTAButton } from '@/components/EpicCTAButton'

interface CostOfInactionCTAProps {
  onCTAClick?: () => void;
}

export default function CostOfInactionCTA({ onCTAClick }: CostOfInactionCTAProps) {
  const fitnessBoxing = [
    "Drive an hour",
    "Drill bad habits",
    "Get hit a bit too hard",
    "Hear \"keep your hands up\"",
    "Leave with more questions than answers"
  ]

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-white">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900" style={{ fontFamily: 'Satoshi, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
            It doesn't have to be one or the other, but if we're comparing...
          </h2>
        </div>

        {/* Two Paths Comparison */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Commercial Boxing Gyms */}
          <div className="relative">
            <div className="p-6 sm:p-8 h-full">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Commercial Boxing Gyms</h3>
              </div>

              <div className="space-y-3 mb-6">
                {fitnessBoxing.map((item, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <Square className="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-400" />
                    <p className="text-sm sm:text-base leading-relaxed text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Real Coaching */}
          <div className="relative">
            <div className="p-6 sm:p-8 h-full flex flex-col">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Online Coaching</h3>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex gap-3 items-start">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-600" />
                  <p className="text-sm sm:text-base leading-relaxed text-gray-700">Learn correct technique</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="text-center mb-6">
          <div className="border-t border-gray-200"></div>
        </div>

        {/* Closing Statement */}
        <div className="text-center">
          <p className="text-xl sm:text-2xl leading-relaxed max-w-2xl mx-auto text-gray-600">
            Less effort. Better results.
          </p>
        </div>
      </div>
    </section>
  )
}