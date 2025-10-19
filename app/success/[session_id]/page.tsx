import { Suspense } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SuccessContent } from '@/components/SuccessContent'

export const metadata = {
  title: 'Order Confirmed | Oracle Boxing Shop',
  description: 'Your order has been confirmed',
}

export default async function SuccessPage({ params }: { params: Promise<{ session_id: string }> }) {
  const { session_id } = await params

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
        <SuccessContent sessionId={session_id} />
      </Suspense>

      <Footer />
    </div>
  )
}
