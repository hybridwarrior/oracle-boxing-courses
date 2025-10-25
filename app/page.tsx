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
          <source src="https://media.oracleboxing.com/Website/optimized/videos/hero-section-desktop.webm" type="video/webm" media="(min-width: 768px)" />
          <source src="https://media.oracleboxing.com/Website/optimized/videos/hero-section-desktop.mp4" type="video/mp4" media="(min-width: 768px)" />
          <source src="https://media.oracleboxing.com/Website/optimized/videos/hero-section-mobile.mp4" type="video/mp4" />
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
              <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-white leading-relaxed drop-shadow-md font-medium mb-4 sm:mb-6">
                Learn the art and science of boxing through a complete system of courses, coaching, and community.
              </p>

              {/* Membership CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <div>
                  <p className="text-sm sm:text-base text-white/90 drop-shadow-md">Starting from just</p>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                    $74.75<span className="text-lg sm:text-xl font-medium text-white/90">/mo</span>
                  </p>
                </div>
                <Link
                  href="/membership"
                  className="py-3 px-6 sm:px-8 text-sm sm:text-base font-black bg-white text-black rounded-lg shadow-lg uppercase tracking-wide hover:bg-gray-100 transition-colors"
                >
                  View Memberships
                </Link>
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

          {/* 3-Column Course Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => (
              <CourseCard key={course.id} product={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialSection testimonials={testimonials} />

      {/* Apparel Section */}
      <section className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden">
        {/* Background Image */}
        <Image
          src="https://media.oracleboxing.com/Website/apparel.png"
          alt="Oracle Boxing Apparel"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 uppercase tracking-wide drop-shadow-lg">
              Represent the brand
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-white mb-6 sm:mb-8 drop-shadow-md font-medium">
              Premium apparel designed for boxers. Stay tuned for the launch.
            </p>
            <button
              onClick={() => setIsNotifyModalOpen(true)}
              className="inline-block py-3 sm:py-4 px-6 sm:px-8 text-sm sm:text-base font-black bg-white text-black rounded-lg shadow-lg uppercase tracking-wide hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Notify Me
            </button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Notify Me Modal */}
      <NotifyMeModal
        isOpen={isNotifyModalOpen}
        onClose={() => setIsNotifyModalOpen(false)}
      />
    </div>
  )
}
