'use client'

import { useState } from 'react'
import { products } from '@/lib/products'
import { useCart } from '@/contexts/CartContext'

export function HoodieBump() {
  const { items, addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  // Get hoodie product
  const hoodie = products.find(p => p.id === 'hoodie')
  if (!hoodie) return null

  // Check if hoodie is already in cart
  const hoodieInCart = items.some(item => item.product.id === 'hoodie')
  if (hoodieInCart) return null

  const canAdd = selectedSize !== ''

  const handleAdd = () => {
    if (!canAdd || !hoodie.variants) return

    setIsAdding(true)
    const variant = hoodie.variants.find(v => v.size === selectedSize)
    if (variant) {
      addItem(hoodie, variant)
    }
    setIsAdding(false)
  }

  return (
    <div className="border-2 border-red-600 rounded-lg p-4 bg-red-50">
      <div className="flex items-start gap-3">
        <div className="text-2xl">🔥</div>
        <div className="flex-1">
          <h4 className="font-bold text-gray-900 mb-1">
            Add Oracle Boxing Hoodie (£49)
          </h4>
          <p className="text-sm text-gray-600 mb-3">
            Premium quality hoodie — Limited stock
          </p>

          {/* Size Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-700 block">
              Select Size *
            </label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full px-3 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
            >
              <option value="">Choose size...</option>
              {hoodie.variants?.map((variant) => (
                <option key={variant.sku} value={variant.size}>
                  {variant.size}
                </option>
              ))}
            </select>
          </div>

          {/* Add Button */}
          <button
            onClick={handleAdd}
            disabled={!canAdd || isAdding}
            className={`w-full mt-3 py-2 px-4 rounded-lg font-semibold text-sm transition-colors ${
              canAdd && !isAdding
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isAdding ? 'Adding...' : 'Add to Order'}
          </button>
        </div>
      </div>
    </div>
  )
}
