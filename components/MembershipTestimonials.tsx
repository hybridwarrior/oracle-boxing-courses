'use client'

import { useRef } from 'react'
import Image from 'next/image'

interface MembershipTestimonial {
  name: string
  role: string
  content: string
  image: string
}

interface MembershipTestimonialsProps {
  testimonials: MembershipTestimonial[]
}

export function MembershipTestimonials({ testimonials }: MembershipTestimonialsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
          Engineered for results
        </h2>

        {/* Mobile: Horizontal scrolling carousel */}
        <div
          ref={scrollContainerRef}
          className="lg:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
          style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white border-4 border-black rounded-xl p-6 flex-shrink-0 w-[85vw] snap-center shadow-md"
            >
              {/* Profile Picture */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <div className="font-bold text-black">{testimonial.name}</div>
                  <div className="text-sm text-black">{testimonial.role}</div>
                </div>
              </div>

              {/* Content */}
              <p className="text-black leading-relaxed font-bold">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>

        {/* Desktop: 4-column grid */}
        <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white border-4 border-black rounded-xl p-6 shadow-md"
            >
              {/* Profile Picture */}
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <div className="font-bold text-black text-sm">{testimonial.name}</div>
                  <div className="text-xs text-black">{testimonial.role}</div>
                </div>
              </div>

              {/* Content */}
              <p className="text-sm text-black leading-relaxed font-bold">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
