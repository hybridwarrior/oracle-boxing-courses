'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, Mail, ArrowRight } from 'lucide-react'
import { Upsell } from './Upsell'
import { Product } from '@/lib/types'
import { products } from '@/lib/products'

interface SuccessContentProps {
  sessionId: string
}

export function SuccessContent({ sessionId }: SuccessContentProps) {
  const [session, setSession] = useState<any>(null)
  const [upsellProduct, setUpsellProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchSession() {
      try {
        // Determine upsell based on purchase
        // Course → Membership Monthly
        // Membership → Membership Annual upgrade
        // Merch → BFFP course

        // For demo, show membership upsell
        const membershipMonthly = products.find(p => p.id === 'membership-monthly')
        setUpsellProduct(membershipMonthly || null)

        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching session:', error)
        setIsLoading(false)
      }
    }

    fetchSession()
  }, [sessionId])

  if (isLoading) {
    return (
      <section className="py-20 text-center">
        <div className="animate-pulse">Loading...</div>
      </section>
    )
  }

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        <div className="text-center space-y-8 mb-12">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-xl">
                <CheckCircle className="w-14 h-14 text-white" />
              </div>
              <div className="absolute inset-0 w-24 h-24 bg-green-400 rounded-full animate-ping opacity-20" />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
              Order Confirmed!
            </h1>
            <p className="text-xl text-gray-600">
              Thank you for your purchase
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-gray-50 rounded-xl p-8 space-y-4 text-left border border-gray-200">
            <div className="flex items-start gap-3">
              <Mail className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>Check your email for order confirmation and access details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>Digital products: Access granted within 10 minutes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>Physical items: Ships within 1-2 business days</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Upsell */}
        {upsellProduct && (
          <Upsell
            product={upsellProduct}
            sessionId={sessionId}
          />
        )}

        {/* Support */}
        <div className="mt-12 text-center space-y-4">
          <p className="text-sm text-gray-600">
            Questions?{' '}
            <a
              href="mailto:team@oracleboxing.com"
              className="text-red-600 hover:text-red-700 font-semibold transition-colors"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
