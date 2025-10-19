'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface Module {
  title: string
  description: string
  lessons?: number
}

interface CourseModulesProps {
  modules: Module[]
  headerImage?: string
}

export function CourseModules({ modules, headerImage }: CourseModulesProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleModule = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">
          Sounds great! But what <em className="text-red-600">exactly</em> is included?
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 text-center max-w-3xl mx-auto">
          Learn from real tried-and-tested experience
        </p>

        {/* Header Image */}
        {headerImage && (
          <div className="mb-6 sm:mb-8 rounded-lg overflow-hidden">
            <img
              src={headerImage}
              alt="Course overview"
              className="w-full h-48 sm:h-64 object-cover"
            />
          </div>
        )}

        {/* FAQ-style Module Dropdowns */}
        <div className="space-y-4">
          {modules.map((module, index) => (
            <div key={index} className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleModule(index)}
                className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors min-h-[60px]"
              >
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">{module.title}</h3>
                  {module.lessons && (
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">{module.lessons} lessons</p>
                  )}
                </div>
                <ChevronDown
                  className={`w-6 h-6 text-gray-600 flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-2 border-t-2 border-gray-100">
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">{module.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
