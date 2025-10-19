'use client'

import { useEffect, useState, useRef } from 'react'

interface CourseStatsProps {
  lessonCount: number
  purchaseCount: string
  hasLifetimeAccess?: boolean
}

function CountingNumber({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            const duration = 1500 // 1.5 seconds
            const steps = 60
            const increment = target / steps
            let current = 0

            const timer = setInterval(() => {
              current += increment
              if (current >= target) {
                setCount(target)
                clearInterval(timer)
              } else {
                setCount(Math.floor(current))
              }
            }, duration / steps)

            return () => clearInterval(timer)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [target, hasAnimated])

  return (
    <div ref={elementRef} className="text-5xl md:text-6xl font-semibold text-black mb-2">
      {count}{suffix}
    </div>
  )
}

export function CourseStats({ lessonCount, purchaseCount, hasLifetimeAccess = true }: CourseStatsProps) {
  // Parse purchaseCount to extract number and suffix (e.g., "500+" -> 500 and "+")
  const numericPurchases = parseInt(purchaseCount.replace(/\D/g, ''))
  const purchaseSuffix = purchaseCount.replace(/\d/g, '')

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 py-12">
      {/* Lessons */}
      <div className="text-center px-8">
        <CountingNumber target={lessonCount} />
        <div className="text-base text-gray-700">Lessons</div>
      </div>

      {/* Separator - hidden on mobile */}
      <div className="hidden md:block w-px h-20 bg-gray-300"></div>

      {/* Purchases */}
      <div className="text-center px-8">
        <CountingNumber target={numericPurchases} suffix={purchaseSuffix} />
        <div className="text-base text-gray-700">Purchases</div>
      </div>

      {hasLifetimeAccess && (
        <>
          {/* Separator - hidden on mobile */}
          <div className="hidden md:block w-px h-20 bg-gray-300"></div>

          {/* Lifetime Access */}
          <div className="text-center px-8">
            <div className="text-5xl md:text-6xl font-semibold text-black mb-2">∞</div>
            <div className="text-base text-gray-700">Lifetime Access</div>
          </div>
        </>
      )}
    </div>
  )
}
