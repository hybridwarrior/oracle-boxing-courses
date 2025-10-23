'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CourseCard } from '@/components/CourseCard'
import { TestimonialSection } from '@/components/TestimonialSection'
import { NotifyMeModal } from '@/components/NotifyMeModal'
import { getCourses } from '@/lib/products'
import { getRandomTestimonials, globalTestimonials } from '@/lib/testimonials'
import Image from 'next/image'
import Link from 'next/link'
import { Users, Video } from 'lucide-react'

export default function HomePage() {
  const courses = getCourses()
  // Use stable testimonials for SSR, then randomize on client
  const [testimonials, setTestimonials] = useState(globalTestimonials.slice(0, 6))
  const [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false)

  // Randomize testimonials after hydration to avoid mismatch
  useEffect(() => {
    setTestimonials(getRandomTestimonials(6))
  }, [])

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
      <section className="relative w-full h-[500px] sm:h-[600px] lg:h-[800px] overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-[70%] sm:object-center"
        >
          <source src="https://media.oracleboxing.com/Website/hero-section.mp4" type="video/mp4" />
        </video>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 capitalize drop-shadow-lg leading-tight sm:leading-normal lg:leading-tight">
                Boxing Education For <span className="bg-yellow-200/80 text-black px-1 sm:px-2">Beginners</span> & <span className="bg-yellow-200/80 text-black px-1 sm:px-2">Late Starters</span>
              </h1>
              <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-white leading-relaxed drop-shadow-md font-medium">
                Learn the art and science of boxing through a complete system of courses, coaching, and community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Memberships Section */}
      <section className="pt-6 sm:pt-8 lg:pt-12 pb-6 sm:pb-8 lg:pb-12 bg-gray-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              Learn the right way...
            </h2>
          </div>

          {/* Single Membership Card */}
          <div className="max-w-7xl mx-auto">
            <div className="rounded-xl overflow-hidden bg-white border border-gray-200 shadow-lg">
              {/* Mobile: Stacked Layout */}
              <div className="flex flex-col lg:hidden">
                {/* Image - Above on mobile */}
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
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 capitalize">
                    Full Access Membership
                  </h3>

                  {/* Short Description */}
                  <p className="text-sm sm:text-base text-gray-900 font-medium mb-2 line-clamp-2">
                    Go Beyond Courses, Train Live With Us Every Day.
                  </p>

                  {/* Divider */}
                  <div className="border-t border-gray-200 my-2"></div>

                  {/* Perfect For */}
                  <div className="mb-3">
                    <p className="text-sm sm:text-base text-gray-900 font-medium line-clamp-2">
                      <span className="font-bold">Perfect For:</span> Boxers who want real-time feedback and faster growth
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

                  {/* Price */}
                  <div className="mb-3">
                    <p className="text-xs text-gray-600 mb-1">Starting from just</p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                      $74.75<span className="text-base font-medium text-gray-600">/mo</span>
                    </p>
                  </div>

                  {/* Learn More Button */}
                  <Link
                    href="/membership"
                    className="w-full py-3 px-4 text-sm font-black bg-black text-white rounded-lg shadow-lg uppercase tracking-wide hover:bg-gray-900 transition-colors text-center block flex-shrink-0"
                  >
                    Learn More
                  </Link>
                </div>
              </div>

              {/* Desktop: 2-Column Layout */}
              <div className="hidden lg:grid lg:grid-cols-2">
                {/* Left Column - Content */}
                <div className="p-8 flex flex-col justify-center">
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 capitalize">
                    Full Access Membership
                  </h3>

                  {/* Short Description */}
                  <p className="text-lg text-gray-900 font-medium mb-4">
                    Go Beyond Courses, Train Live With Us Every Day.
                  </p>

                  {/* Divider */}
                  <div className="border-t border-gray-200 my-4"></div>

                  {/* Perfect For */}
                  <div className="mb-4">
                    <p className="text-base text-gray-900 font-medium">
                      <span className="font-bold">Perfect For:</span> Boxers who want real-time feedback and faster growth
                    </p>
                  </div>

                  {/* Stats Row */}
                  <div className="flex items-center gap-2 mb-6 text-sm flex-wrap">
                    <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-gray-50 to-white border border-gray-300 rounded-full">
                      <Video className="w-4 h-4 text-red-800 flex-shrink-0" />
                      <span className="font-semibold text-gray-900">Daily</span>
                      <span className="text-gray-600">coaching calls</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-gray-50 to-white border border-gray-300 rounded-full">
                      <Users className="w-4 h-4 text-red-800 flex-shrink-0" />
                      <span className="font-semibold text-gray-900">200+</span>
                      <span className="text-gray-600">members</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-1">Starting from just</p>
                    <p className="text-4xl font-bold text-gray-900">
                      $74.75<span className="text-xl font-medium text-gray-600">/mo</span>
                    </p>
                  </div>

                  {/* Learn More Button */}
                  <Link
                    href="/membership"
                    className="inline-block py-4 px-8 text-base font-black bg-black text-white rounded-lg shadow-lg uppercase tracking-wide hover:bg-gray-900 transition-colors text-center"
                  >
                    Learn More
                  </Link>
                </div>

                {/* Right Column - Image */}
                <div className="relative overflow-hidden bg-gray-100">
                  <Image
                    src="https://media.oracleboxing.com/Website/skool_art.png"
                    alt="Full Access Membership"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="pt-6 sm:pt-8 lg:pt-12 pb-6 sm:pb-8 lg:pb-12 bg-gray-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              Explore our courses
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
      <section className="pt-6 sm:pt-8 lg:pt-12 pb-6 sm:pb-8 lg:pb-12 bg-gray-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              Represent the brand
            </h2>
          </div>

          {/* Single Apparel Card */}
          <div className="max-w-7xl mx-auto">
            <div className="rounded-xl overflow-hidden bg-white border-2 border-gray-900 shadow-lg">
              {/* Mobile: Stacked Layout */}
              <div className="flex flex-col lg:hidden">
                {/* Image - Above on mobile */}
                <div className="relative w-full aspect-[9/6] overflow-hidden bg-black flex-shrink-0 flex items-center justify-center">
                  <Image
                    src="https://media.oracleboxing.com/Website/apparel.png"
                    alt="Oracle Boxing Apparel"
                    fill
                    className="object-cover opacity-30"
                    sizes="100vw"
                  />
                  <h3 className="relative z-10 text-2xl sm:text-3xl font-black text-white uppercase tracking-wide drop-shadow-lg">
                    Coming Soon...
                  </h3>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 lg:p-6 flex flex-col flex-1">
                  {/* Title */}
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 uppercase">
                    Oracle Boxing Apparel
                  </h3>

                  {/* Short Description */}
                  <p className="text-sm sm:text-base lg:text-lg text-gray-900 font-medium mb-3 sm:mb-4">
                    Premium apparel designed for boxers. Stay tuned for the launch.
                  </p>

                  {/* Notify Me Button */}
                  <button
                    onClick={() => setIsNotifyModalOpen(true)}
                    className="w-full py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base font-black bg-black text-white rounded shadow-lg uppercase tracking-wide hover:bg-gray-900 transition-colors text-center block flex-shrink-0"
                  >
                    Notify Me
                  </button>
                </div>
              </div>

              {/* Desktop: 2-Column Layout */}
              <div className="hidden lg:grid lg:grid-cols-2">
                {/* Left Column - Content */}
                <div className="p-8 flex flex-col justify-center">
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 uppercase">
                    Oracle Boxing Apparel
                  </h3>

                  {/* Short Description */}
                  <p className="text-lg text-gray-900 font-medium mb-8">
                    Premium apparel designed for boxers. Stay tuned for the launch.
                  </p>

                  {/* Notify Me Button */}
                  <button
                    onClick={() => setIsNotifyModalOpen(true)}
                    className="inline-block py-4 px-8 text-base font-black bg-black text-white rounded shadow-lg uppercase tracking-wide hover:bg-gray-900 transition-colors text-center"
                  >
                    Notify Me
                  </button>
                </div>

                {/* Right Column - Image */}
                <div className="relative overflow-hidden bg-black flex items-center justify-center">
                  <Image
                    src="https://media.oracleboxing.com/Website/apparel.png"
                    alt="Oracle Boxing Apparel"
                    fill
                    className="object-cover opacity-30"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <h3 className="relative z-10 text-4xl font-black text-white uppercase tracking-wide drop-shadow-lg">
                    Coming Soon...
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialSection testimonials={testimonials} />

      <Footer />

      {/* Notify Me Modal */}
      <NotifyMeModal
        isOpen={isNotifyModalOpen}
        onClose={() => setIsNotifyModalOpen(false)}
      />
    </div>
  )
}
