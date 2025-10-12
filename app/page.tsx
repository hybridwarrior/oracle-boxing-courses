'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { EmailClaimForm } from '@/components/EmailClaimForm'
import { CourseCard } from '@/components/CourseCard'
import { CourseModal } from '@/components/CourseModal'
import { RoadmapModal } from '@/components/RoadmapModal'
import { BundleModal } from '@/components/BundleModal'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { courses, Course } from '@/lib/courses'

export default function HomePage() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [isRoadmapModalOpen, setIsRoadmapModalOpen] = useState(false)
  const [isBundleModalOpen, setIsBundleModalOpen] = useState(false)

  const handleCourseClick = (course: Course) => {
    if (course.isRoadmap) {
      setIsRoadmapModalOpen(true)
    } else if (course.isBundle) {
      setIsBundleModalOpen(true)
    } else {
      setSelectedCourse(course)
    }
  }

  const handlePurchase = (stripeUrl: string) => {
    // Open Stripe checkout in new tab
    window.open(stripeUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white">
      <Header />

      {/* Store Grid Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Available Courses
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {courses.filter(c => !c.isBundle).map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={() => handleCourseClick(course)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Complete Bundle Section */}
      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            onClick={() => setIsBundleModalOpen(true)}
            className="group cursor-pointer bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-xl p-8 border-2 border-[#F25C05] hover:border-[#FF6B1A] transition-all duration-300 shadow-lg hover:shadow-[#F25C05]/20"
          >
            <div className="flex items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  Complete Bundle
                </h3>
                <p className="text-gray-300 mb-4">
                  Get all 3 courses and master the entire Oracle Boxing system
                </p>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm text-gray-400 line-through">$541</p>
                    <p className="text-3xl font-bold text-[#F25C05]">$397</p>
                  </div>
                  <div className="text-lg text-green-400 font-semibold">
                    Save $144!
                  </div>
                </div>
              </div>
              <Button className="bg-[#F25C05] hover:bg-[#FF6B1A] text-white font-semibold px-8 py-6 text-lg rounded-full">
                View Bundle
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Email Claim Section */}
      <section className="py-16 sm:py-20">
        <EmailClaimForm />
      </section>

      <Footer />

      {/* Modals */}
      <CourseModal
        course={selectedCourse}
        isOpen={selectedCourse !== null}
        onClose={() => setSelectedCourse(null)}
        onPurchase={handlePurchase}
      />

      <RoadmapModal
        isOpen={isRoadmapModalOpen}
        onClose={() => setIsRoadmapModalOpen(false)}
        onPurchase={handlePurchase}
        stripeUrl={courses.find(c => c.isRoadmap)?.stripeUrl}
      />

      <BundleModal
        isOpen={isBundleModalOpen}
        onClose={() => setIsBundleModalOpen(false)}
        onPurchase={handlePurchase}
        stripeUrl={courses.find(c => c.isBundle)?.stripeUrl}
      />
    </div>
  )
}
