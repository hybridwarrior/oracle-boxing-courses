'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CourseCard } from '@/components/CourseCard'
import { TestimonialSection } from '@/components/TestimonialSection'
import { getCourses } from '@/lib/products'
import { getRandomTestimonials } from '@/lib/testimonials'
import Image from 'next/image'
import Link from 'next/link'
import { Users, Video } from 'lucide-react'

export default function HomePage() {
  const courses = getCourses()
  const testimonials = getRandomTestimonials(6)

  const scrollToCourses = (e: React.MouseEvent) => {
    e.preventDefault()
    const element = document.getElementById('courses')
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

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gray-50 py-0 sm:py-16">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          {/* Hero Card - Clickable */}
          <div onClick={scrollToCourses} className="block relative cursor-pointer">
            <div className="bg-gray-100 rounded-2xl overflow-visible sm:pt-12">
              {/* Mobile: Stacked with overlay */}
              <div className="lg:hidden relative">
                {/* Background Image - Fixed size, always right aligned, spilling over top */}
                <div className="relative ml-auto w-full max-w-[500px] h-[420px]">
                  <Image
                    src="https://media.oracleboxing.com/Website/ob_punching3.png"
                    alt="Oracle Boxing Training"
                    fill
                    className="object-contain object-right-bottom"
                    sizes="400px"
                    priority
                  />
                </div>

                {/* Text Overlay with transparent white box - aligned to bottom */}
                <div className="relative -mt-[180px] px-4 pb-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 max-w-md">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                      Boxing for Beginners & Late Starters
                    </h1>
                    <p className="text-base sm:text-lg text-gray-700 mb-4 leading-relaxed">
                      Learn the art and science of boxing through a complete system of courses, coaching, and community.
                    </p>
                    <div className="inline-block py-3 px-6 bg-red-800 text-white font-black text-base rounded-lg shadow-lg uppercase tracking-wide">
                      EXPLORE COURSES
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop: Two columns */}
              <div className="hidden lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center px-6 sm:px-8 pb-4 sm:pb-6">
                {/* Left Column - Text Content */}
                <div>
                  <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-gray-900 mb-4">
                    Boxing for Beginners & Late Starters
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-700 mb-6 leading-relaxed">
                    Learn the art and science of boxing through a complete system of courses, coaching, and community.
                  </p>
                  <div className="inline-block py-4 px-8 bg-red-800 text-white font-black text-lg rounded-lg shadow-lg uppercase tracking-wide">
                    EXPLORE COURSES
                  </div>
                </div>

                {/* Right Column - Image (spilling over top) */}
                <div className="relative h-[420px] sm:h-[480px] lg:h-[500px] -mt-12 lg:-mt-16">
                  <Image
                    src="https://media.oracleboxing.com/Website/ob_punching3.png"
                    alt="Oracle Boxing Training"
                    fill
                    className="object-contain object-bottom"
                    sizes="50vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Memberships Section */}
      <section className="pt-8 sm:pt-12 pb-8 sm:pb-12 bg-gray-50">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
              Membership
            </h2>
          </div>

          {/* Single Membership Card */}
          <div className="max-w-md mx-auto">
            <div className="rounded-xl overflow-hidden bg-white border border-gray-200 shadow-lg flex flex-col h-full">
              {/* Image - Full size */}
              <div className="relative w-full overflow-hidden bg-gray-100 flex-shrink-0">
                <Image
                  src="https://media.oracleboxing.com/Website/skool_art.png"
                  alt="Full Access Membership"
                  width={500}
                  height={333}
                  className="w-full h-auto"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-1">
                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  Full Access Membership
                </h3>

                {/* Short Description */}
                <p className="text-sm sm:text-base text-gray-600 mb-2 line-clamp-2">
                  Live coaching, community support, and complete access to all courses
                </p>

                {/* Divider */}
                <div className="border-t border-gray-200 my-2"></div>

                {/* Perfect For */}
                <div className="mb-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">
                    Perfect For:
                  </p>
                  <p className="text-sm sm:text-base text-gray-700 line-clamp-2">
                    Boxers who want ongoing coaching and community support
                  </p>
                </div>

                {/* Stats Row */}
                <div className="flex items-center gap-2 mb-3 text-xs flex-wrap">
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-gray-50 to-white border border-gray-300 rounded-full">
                    <Video className="w-3.5 h-3.5 text-red-800 flex-shrink-0" />
                    <span className="font-semibold text-gray-900">Daily</span>
                    <span className="text-gray-600">coaching calls</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-gray-50 to-white border border-gray-300 rounded-full">
                    <Users className="w-3.5 h-3.5 text-red-800 flex-shrink-0" />
                    <span className="font-semibold text-gray-900">200+</span>
                    <span className="text-gray-600">members</span>
                  </div>
                </div>

                {/* Spacer to push price and button to bottom */}
                <div className="flex-1"></div>

                {/* Price */}
                <div className="mb-3">
                  <p className="text-xs text-gray-600 mb-1">Starting from just</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                    $74.75<span className="text-base font-normal text-gray-600">/mo</span>
                  </p>
                </div>

                {/* Learn More Button */}
                <Link
                  href="/membership"
                  className="w-full py-3 px-4 text-sm font-black bg-red-800 text-white rounded-lg shadow-lg uppercase tracking-wide transition-none text-center block flex-shrink-0"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="pt-8 sm:pt-12 pb-8 sm:pb-12 bg-gray-50">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
              Courses
            </h2>
          </div>

          {/* 4-Column Course Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {courses.map((course) => (
              <CourseCard key={course.id} product={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Apparel Section */}
      <section className="pt-8 sm:pt-12 pb-8 sm:pb-12 bg-gray-50">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
              Apparel
            </h2>
          </div>

          {/* Single Apparel Card */}
          <div className="max-w-md mx-auto">
            <div className="rounded-xl overflow-hidden bg-white border border-gray-200 shadow-lg flex flex-col h-full">
              {/* Image Placeholder - Fixed aspect ratio */}
              <div className="relative w-full aspect-[9/6] overflow-hidden bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 flex-shrink-0 flex items-center justify-center">
                <div className="text-center px-6">
                  <div className="inline-block px-6 py-3 bg-red-800 text-white text-xl sm:text-2xl font-black rounded-lg uppercase tracking-wide mb-3">
                    Coming Soon
                  </div>
                  <p className="text-sm text-white/80">
                    Premium apparel for boxers
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-1">
                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  Oracle Boxing Apparel
                </h3>

                {/* Short Description */}
                <p className="text-sm sm:text-base text-gray-600 mb-2 line-clamp-2">
                  Premium apparel designed for boxers. Stay tuned for the launch.
                </p>

                {/* Divider */}
                <div className="border-t border-gray-200 my-2"></div>

                {/* Perfect For */}
                <div className="mb-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">
                    Coming Soon:
                  </p>
                  <p className="text-sm sm:text-base text-gray-700 line-clamp-2">
                    High-quality training gear and lifestyle apparel
                  </p>
                </div>

                {/* Spacer to push button to bottom */}
                <div className="flex-1"></div>

                {/* Notify Me Button (disabled state) */}
                <button
                  disabled
                  className="w-full py-3 px-4 text-sm font-black bg-gray-400 text-white rounded-lg shadow-lg uppercase tracking-wide cursor-not-allowed text-center block flex-shrink-0"
                >
                  Notify Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialSection testimonials={testimonials} />

      <Footer />
    </div>
  )
}
