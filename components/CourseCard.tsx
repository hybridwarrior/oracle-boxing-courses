'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/lib/types'
import { useCart } from '@/contexts/CartContext'
import { useCurrency } from '@/contexts/CurrencyContext'
import { getProductPrice, formatPrice, isMembershipProduct } from '@/lib/currency'
import { BookOpen, Dumbbell, FileText, Layers, Clock, Calendar, TrendingUp, ClipboardList, RefreshCw, Video, Users, MessageSquare } from 'lucide-react'

interface CourseCardProps {
  product: Product
}

export function CourseCard({ product }: CourseCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { addItem, clearCart } = useCart()
  const { currency } = useCurrency()
  const router = useRouter()

  // Get price in selected currency
  const isMembership = isMembershipProduct(product.metadata)
  const convertedPrice = isMembership
    ? product.price
    : getProductPrice(product.metadata, currency) || product.price
  const displayCurrency = isMembership ? 'USD' : currency

  // Map product IDs to course detail pages
  const courseDetailPages: Record<string, string> = {
    'bffp': '/courses/bffp',
    'roadmap': '/courses/roadmap',
    'vault': '/courses/vault',
    'bundle': '/courses/bundle',
    'membership-6month': '/membership',
    'membership-monthly': '/membership',
    'membership-annual': '/membership'
  }

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isLoading) return

    setIsLoading(true)
    // Direct checkout with product parameter
    router.push(`/checkout?product=${product.id}`)
  }

  return (
    <div className="group h-full">
      {/* Card Container - flexible height */}
      <div className="relative rounded-xl overflow-hidden bg-white border border-gray-200 shadow-lg flex flex-col h-full">

        {/* Course Image - Fixed aspect ratio */}
        <div className="relative w-full aspect-[9/6] overflow-hidden bg-gray-100 flex-shrink-0">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          {/* Course Name */}
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 capitalize">
            {product.title}
          </h3>

          {/* Short Description */}
          <p className="text-sm sm:text-base text-gray-900 font-medium mb-2 line-clamp-2">
            {product.shortDescription || product.description.split('\n')[0]}
          </p>

          {/* Divider */}
          <div className="border-t border-gray-200 my-2"></div>

          {/* Perfect For */}
          {product.perfectFor && (
            <div className="mb-3">
              <p className="text-sm sm:text-base text-gray-900 font-medium line-clamp-2">
                <span className="font-bold">Perfect For:</span> {product.perfectFor}
              </p>
            </div>
          )}

          {/* Stats Row */}
          <div className="flex items-center gap-2 mb-3 text-xs flex-wrap">
            {product.hasLiveCoaching && (
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-gray-50 to-white border border-gray-300 rounded-full">
                <Video className="w-3.5 h-3.5 text-red-800 flex-shrink-0" />
                <span className="text-gray-600">Daily Coaching Calls</span>
              </div>
            )}

            {product.hasCommunity && (
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-gray-50 to-white border border-gray-300 rounded-full">
                <Users className="w-3.5 h-3.5 text-red-800 flex-shrink-0" />
                <span className="text-gray-600">Live Community</span>
              </div>
            )}

            {product.hasVideoFeedback && (
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-gray-50 to-white border border-gray-300 rounded-full">
                <MessageSquare className="w-3.5 h-3.5 text-red-800 flex-shrink-0" />
                <span className="text-gray-600">Video Feedback</span>
              </div>
            )}

            {product.weeks && !product.hasLiveCoaching && (
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-gray-50 to-white border border-gray-300 rounded-full">
                <Calendar className="w-3.5 h-3.5 text-red-800 flex-shrink-0" />
                <span className="font-semibold text-gray-900">{product.weeks}</span>
                <span className="text-gray-600">weeks</span>
              </div>
            )}

            {product.hasStructuredProgression && (
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-gray-50 to-white border border-gray-300 rounded-full">
                <TrendingUp className="w-3.5 h-3.5 text-red-800 flex-shrink-0" />
                <span className="text-gray-600">Structured Progression</span>
              </div>
            )}

            {product.workoutPlans && (
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-gray-50 to-white border border-gray-300 rounded-full">
                <ClipboardList className="w-3.5 h-3.5 text-red-800 flex-shrink-0" />
                <span className="font-semibold text-gray-900">{product.workoutPlans}+</span>
                <span className="text-gray-600">workout plans</span>
              </div>
            )}

            {product.moduleCount && (
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-gray-50 to-white border border-gray-300 rounded-full">
                <Layers className="w-3.5 h-3.5 text-red-800 flex-shrink-0" />
                <span className="font-semibold text-gray-900">{product.moduleCount}</span>
                <span className="text-gray-600">modules</span>
              </div>
            )}

            {product.lessonCount && (
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-gray-50 to-white border border-gray-300 rounded-full">
                <BookOpen className="w-3.5 h-3.5 text-red-800 flex-shrink-0" />
                <span className="font-semibold text-gray-900">{product.lessonCount}{product.lessonCountPrefix || ''}</span>
                <span className="text-gray-600">lessons</span>
              </div>
            )}

            {product.updatedMonthly && (
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-gray-50 to-white border border-gray-300 rounded-full">
                <RefreshCw className="w-3.5 h-3.5 text-red-800 flex-shrink-0" />
                <span className="text-gray-600">Updated Monthly</span>
              </div>
            )}

            {product.hours && (
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-gray-50 to-white border border-gray-300 rounded-full">
                <Clock className="w-3.5 h-3.5 text-red-800 flex-shrink-0" />
                <span className="font-semibold text-gray-900">{product.hours}</span>
                <span className="text-gray-600">hours</span>
              </div>
            )}

            {product.workoutCount && (
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-gray-50 to-white border border-gray-300 rounded-full">
                <Dumbbell className="w-3.5 h-3.5 text-red-800 flex-shrink-0" />
                <span className="font-semibold text-gray-900">{product.workoutCount}</span>
                <span className="text-gray-600">workouts</span>
              </div>
            )}

            {product.resourceCount && (
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-gray-50 to-white border border-gray-300 rounded-full">
                <FileText className="w-3.5 h-3.5 text-red-800 flex-shrink-0" />
                <span className="font-semibold text-gray-900">{product.resourceCount}</span>
                <span className="text-gray-600">resources</span>
              </div>
            )}
          </div>

          {/* Spacer to push price and button to bottom */}
          <div className="flex-1"></div>

          {/* Price */}
          <div className="mb-3">
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">
              {formatPrice(convertedPrice, displayCurrency)}
            </p>
            {isMembership && currency !== 'USD' && (
              <p className="text-xs text-gray-500 mt-1">USD only</p>
            )}
          </div>

          {/* Buttons */}
          <div className="space-y-3 flex-shrink-0">
            {/* Learn More Button */}
            {courseDetailPages[product.id] && (
              <Link
                href={courseDetailPages[product.id]}
                className="w-full py-3 sm:py-4 px-4 text-sm sm:text-base md:text-lg font-black bg-white text-black border-4 border-black rounded-xl shadow-lg uppercase tracking-wide hover:bg-black hover:text-white transition-all text-center block"
              >
                Learn More
              </Link>
            )}

            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              disabled={isLoading}
              className="w-full py-3 sm:py-4 px-4 text-sm sm:text-base md:text-lg font-black bg-yellow-200 text-black border-4 border-black rounded-xl shadow-lg uppercase tracking-wide hover:bg-black hover:text-yellow-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? 'Processing...' : 'Buy Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
