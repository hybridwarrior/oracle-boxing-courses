'use client'

import { useState } from 'react'
import { products } from '@/lib/products'
import { useCart } from '@/contexts/CartContext'

export function MembershipUpsellBump() {
  const { items, addItem, removeItem } = useCart()
  const [dismissedUpgrades, setDismissedUpgrades] = useState<string[]>([])

  // Check what memberships are in cart
  const monthlyInCart = items.find(item => item.product.id === 'membership-monthly')
  const sixMonthInCart = items.find(item => item.product.id === 'membership-6month')

  // Get membership products
  const monthly = products.find(p => p.id === 'membership-monthly')
  const sixMonth = products.find(p => p.id === 'membership-6month')

  if (!monthly || !sixMonth) return null

  // Only show Monthly → 6-Month upgrade (no Annual upsell)
  if (!monthlyInCart || dismissedUpgrades.includes('monthly-to-6month')) {
    return null
  }

  // Upgrade monthly to 6-month
  const additionalMonths = 5 // 6 months - 1 month already purchased
  const additionalCost = sixMonth.price - monthly.price
  const upgrade = {
    from: monthly,
    to: sixMonth,
    additionalMonths,
    additionalCost,
    message: `Add ${additionalMonths} more months for just $${additionalCost}`,
  }
  const upgradeKey = 'monthly-to-6month'

  const handleAccept = () => {
    // Remove old membership
    removeItem(upgrade.from.id)
    // Add new membership
    addItem(upgrade.to)
    // Mark as dismissed
    setDismissedUpgrades(prev => [...prev, upgradeKey])
  }

  const handleDismiss = () => {
    setDismissedUpgrades(prev => [...prev, upgradeKey])
  }

  return (
    <div className="border-2 border-blue-600 rounded-lg p-4 bg-blue-50">
      <div className="flex items-start gap-3">
        <div className="text-2xl">⭐</div>
        <div className="flex-1">
          <h4 className="font-bold text-gray-900 mb-1">
            Upgrade to {upgrade.to.title}?
          </h4>
          <p className="text-sm text-gray-600 mb-3">
            {upgrade.message} (normally ${upgrade.to.price})
          </p>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleAccept}
              className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition-colors"
            >
              Yes, Upgrade
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
