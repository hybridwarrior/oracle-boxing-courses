'use client'

import { useState } from 'react'
import { products } from '@/lib/products'
import { useCart } from '@/contexts/CartContext'

export function CourseBundleUpsellBump() {
  const { items, addItem, removeItem } = useCart()
  const [isDismissed, setIsDismissed] = useState(false)

  // Check if any individual courses are in cart
  const coursesInCart = items.filter(item =>
    item.product.type === 'course' &&
    ['bffp', 'roadmap', 'vault'].includes(item.product.id)
  )

  // Check if bundle is already in cart
  const bundleInCart = items.some(item => item.product.id === 'bundle')

  // Don't show if no courses, bundle already in cart, or dismissed
  if (coursesInCart.length === 0 || bundleInCart || isDismissed) return null

  // Get bundle product
  const bundle = products.find(p => p.id === 'bundle')
  if (!bundle) return null

  // Calculate savings
  const coursesTotal = coursesInCart.reduce((sum, item) => sum + item.product.price, 0)
  const savings = coursesTotal - bundle.price

  const handleAccept = () => {
    // Remove individual courses
    coursesInCart.forEach(item => {
      removeItem(item.product.id)
    })
    // Add bundle
    addItem(bundle)
    setIsDismissed(true)
  }

  const handleDismiss = () => {
    setIsDismissed(true)
  }

  return (
    <div className="border-2 border-green-600 rounded-lg p-4 bg-green-50">
      <div className="flex items-start gap-3">
        <div className="text-2xl">📚</div>
        <div className="flex-1">
          <h4 className="font-bold text-gray-900 mb-1">
            Upgrade to Full Course Bundle?
          </h4>
          <p className="text-sm text-gray-600 mb-3">
            Get all 3 courses for ${bundle.price} (save ${savings} vs buying separately)
          </p>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleAccept}
              className="flex-1 py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-sm transition-colors"
            >
              Yes, Upgrade to Bundle
            </button>
            <button
              onClick={handleDismiss}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm transition-colors"
            >
              No thanks
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
