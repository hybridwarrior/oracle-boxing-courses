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
    <section className="pt-6 sm:pt-12 pb-8 sm:pb-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-12 text-center">
          What Students Are Saying
        </h2>

        {/* Mobile: Horizontal scrolling carousel */}
        <div className="sm:hidden -mx-4">
          <div
            ref={scrollContainerRef}
            className="flex gap-3 overflow-x-auto overscroll-x-contain pb-3 px-4 snap-x snap-mandatory scroll-smooth"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white border-4 border-black px-3 py-2.5 rounded-lg shadow-md flex-shrink-0 w-[85vw] snap-start"
            >
              {/* Rating */}
              <div className="flex gap-0.5 mb-1.5">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-black fill-black" strokeWidth={2} />
                ))}
              </div>

              {/* Content */}
              <p className="text-xs text-black font-bold mb-1.5 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="text-left">
                <div className="font-bold text-xs text-black">{testimonial.name}</div>
              </div>
            </div>
          ))}
          </div>
        </div>

        {/* Tablet/Desktop: 2-column masonry layout */}
        <div className="hidden sm:grid sm:grid-cols-2 gap-3 sm:gap-5 items-start">
          {/* Left Column */}
          <div className="flex flex-col gap-3 sm:gap-5">
            {leftColumn.map((testimonial, index) => (
              <div key={index * 2} className="bg-white border-4 border-black px-3 sm:px-5 py-2.5 sm:py-4 rounded-lg shadow-md">
                {/* Rating */}
                <div className="flex gap-0.5 sm:gap-1 mb-1.5 sm:mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-black fill-black" strokeWidth={2} />
                  ))}
                </div>

                {/* Content */}
                <p className="text-xs sm:text-base text-black font-bold mb-1.5 sm:mb-3 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="text-left">
                  <div className="font-bold text-xs sm:text-base text-black">{testimonial.name}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-3 sm:gap-5">
            {rightColumn.map((testimonial, index) => (
              <div key={index * 2 + 1} className="bg-white border-4 border-black px-3 sm:px-5 py-2.5 sm:py-4 rounded-lg shadow-md">
                {/* Rating */}
                <div className="flex gap-0.5 sm:gap-1 mb-1.5 sm:mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-black fill-black" strokeWidth={2} />
                  ))}
                </div>

                {/* Content */}
                <p className="text-xs sm:text-base text-black font-bold mb-1.5 sm:mb-3 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="text-left">
                  <div className="font-bold text-xs sm:text-base text-black">{testimonial.name}</div>
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
