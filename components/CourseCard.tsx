'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Course } from '@/lib/courses'

interface CourseCardProps {
  course: Course
  onClick: () => void
}

export function CourseCard({ course, onClick }: CourseCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
    >
      <div className="relative rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-[#F25C05] transition-all duration-300">
        {/* Hover glow effect */}
        {isHovered && (
          <div className="absolute inset-0 bg-[#F25C05] opacity-10 z-0" />
        )}

        {/* Course Image */}
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">
              {course.title}
            </h3>
            <p className="text-2xl font-bold text-[#F25C05]">
              ${course.price}
            </p>
          </div>

          <button className="w-full py-3 px-6 bg-[#F25C05] hover:bg-[#FF6B1A] text-white font-semibold rounded-full transition-colors duration-200">
            View Course
          </button>
        </div>
      </div>
    </motion.div>
  )
}
