'use client'

import { Star } from 'lucide-react'
import { useRef } from 'react'

interface Testimonial {
  name: string
  role: string
  content: string
  rating: number
  image?: string
}

interface TestimonialSectionProps {
  testimonials: Testimonial[]
}

export function TestimonialSection({ testimonials }: TestimonialSectionProps) {
  // Split testimonials into two columns for masonry layout
  const leftColumn = testimonials.filter((_, index) => index % 2 === 0)
  const rightColumn = testimonials.filter((_, index) => index % 2 === 1)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  return (
    <section className="pt-8 sm:pt-12 pb-12 sm:pb-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8 sm:mb-12 text-center">
          What Students Are Saying
        </h2>

        {/* Mobile: Horizontal scrolling carousel */}
        <div className="sm:hidden -mx-4">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto overscroll-x-contain pb-4 px-4"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              touchAction: 'pan-x'
            }}
            onTouchStart={(e) => {
              // Prevent page scroll when touching carousel
              const touch = e.touches[0]
              const startX = touch.clientX
              const scrollLeft = e.currentTarget.scrollLeft

              e.currentTarget.dataset.startX = startX.toString()
              e.currentTarget.dataset.scrollLeft = scrollLeft.toString()
            }}
            onTouchMove={(e) => {
              const startX = parseFloat(e.currentTarget.dataset.startX || '0')
              const scrollLeft = parseFloat(e.currentTarget.dataset.scrollLeft || '0')
              const touch = e.touches[0]
              const x = touch.clientX
              const walk = (x - startX) * 2
              e.currentTarget.scrollLeft = scrollLeft - walk
            }}
          >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-red-900 px-4 py-3 rounded-lg shadow-md flex-shrink-0 w-[85vw]"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" strokeWidth={2} />
                ))}
              </div>

              {/* Content */}
              <p className="text-sm text-white font-bold mb-2 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="text-left">
                <div className="font-bold text-sm text-white">{testimonial.name}</div>
              </div>
            </div>
          ))}
          </div>
        </div>

        {/* Tablet/Desktop: 2-column masonry layout */}
        <div className="hidden sm:grid sm:grid-cols-2 gap-4 sm:gap-5 items-start">
          {/* Left Column */}
          <div className="flex flex-col gap-4 sm:gap-5">
            {leftColumn.map((testimonial, index) => (
              <div key={index * 2} className="bg-red-900 px-4 sm:px-5 py-3 sm:py-4 rounded-lg shadow-md">
                {/* Rating */}
                <div className="flex gap-1 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400" strokeWidth={2} />
                  ))}
                </div>

                {/* Content */}
                <p className="text-sm sm:text-base text-white font-bold mb-2 sm:mb-3 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="text-left">
                  <div className="font-bold text-sm sm:text-base text-white">{testimonial.name}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4 sm:gap-5">
            {rightColumn.map((testimonial, index) => (
              <div key={index * 2 + 1} className="bg-red-900 px-4 sm:px-5 py-3 sm:py-4 rounded-lg shadow-md">
                {/* Rating */}
                <div className="flex gap-1 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400" strokeWidth={2} />
                  ))}
                </div>

                {/* Content */}
                <p className="text-sm sm:text-base text-white font-bold mb-2 sm:mb-3 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="text-left">
                  <div className="font-bold text-sm sm:text-base text-white">{testimonial.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  )
}
