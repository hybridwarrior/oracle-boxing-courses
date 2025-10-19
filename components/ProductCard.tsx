'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Product, MerchVariant } from '@/lib/types'
import { useCart } from '@/contexts/CartContext'
import { toast } from 'sonner'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState<MerchVariant | undefined>(
    product.variants?.[0]
  )
  const { addItem, clearCart } = useCart()
  const router = useRouter()

  // Map product IDs to course detail pages
  const courseDetailPages: Record<string, string> = {
    'bffp': '/courses/bffp',
    'roadmap': '/courses/roadmap',
    'vault': '/courses/vault',
    'bundle': '/courses/bundle'
  }

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isLoading) return // Prevent double-clicks

    if (product.variants && !selectedVariant) {
      toast.error('Please select a size')
      return
    }

    setIsLoading(true)

    // Clear any previous cart items and add this product
    clearCart()
    addItem(product, selectedVariant)

    // Redirect to checkout
    router.push('/checkout')
  }

  return (
    <div className="group">
      <div className="relative rounded-lg overflow-hidden bg-white border-2 border-gray-200 hover:border-red-600 transition-all duration-200 shadow-md hover:shadow-xl transform hover:scale-[1.01]">

        {/* Product Image - Hide for memberships */}
        {product.type !== 'membership' && (
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {product.title}
            </h3>
            <p className="text-2xl font-bold text-red-600">
              ${product.price}
              {product.recurring && <span className="text-sm">/{product.interval}</span>}
            </p>
          </div>

          {/* Variant Selector for Merch */}
          {product.variants && (
            <select
              value={selectedVariant?.sku || ''}
              onChange={(e) => {
                const variant = product.variants!.find(v => v.sku === e.target.value)
                setSelectedVariant(variant)
              }}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
            >
              {product.variants.map((variant) => (
                <option key={variant.sku} value={variant.sku}>
                  {variant.size} - {variant.color}
                </option>
              ))}
            </select>
          )}

          {/* Show Learn More button for courses with detail pages */}
          {product.type === 'course' && courseDetailPages[product.id] ? (
            <div className="space-y-2">
              <Link
                href={courseDetailPages[product.id]}
                className="block w-full py-3 px-6 font-semibold rounded-lg transition-colors duration-200 bg-gray-100 hover:bg-gray-200 text-gray-900 text-center border-2 border-gray-300 hover:border-gray-400"
              >
                Learn More
              </Link>
              <button
                onClick={handleBuyNow}
                disabled={isLoading}
                className={`w-full py-3 px-6 font-semibold rounded-lg transition-colors duration-200 ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {isLoading ? 'Redirecting...' : 'Buy Now'}
              </button>
            </div>
          ) : (
            <button
              onClick={handleBuyNow}
              disabled={isLoading}
              className={`w-full py-3 px-6 font-semibold rounded-lg transition-colors duration-200 ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              {isLoading ? 'Redirecting...' : 'Buy Now'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
