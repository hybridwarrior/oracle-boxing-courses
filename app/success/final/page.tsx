'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Mail, AlertCircle } from 'lucide-react';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import confetti from 'canvas-confetti';

function FinalSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [orderData, setOrderData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrderData = async () => {
      if (!sessionId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/session?session_id=${sessionId}`);
        const data = await response.json();

        if (response.ok) {
          setOrderData(data);
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderData();
  }, [sessionId]);

  // Confetti animation on page load
  useEffect(() => {
    if (!isLoading && orderData) {
      // Fire confetti from both sides
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // Fire from the left
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });

        // Fire from the right
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isLoading, orderData]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Check if coaching was purchased (not from internal coaching tool)
  const hasCoaching = orderData && orderData.metadata?.funnel_type !== 'internal_coaching_tool' && orderData.metadata?.type !== 'closed_coaching';

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className={`flex-1 ${hasCoaching ? 'lg:grid lg:grid-cols-2' : 'flex flex-col justify-center px-4 sm:px-6 lg:px-16 py-6 sm:py-8 lg:py-12'}`}>
        <div className={`${hasCoaching ? 'h-full flex flex-col justify-center px-4 sm:px-6 lg:px-16 py-6 sm:py-8 lg:py-12 bg-white' : 'max-w-xl mx-auto w-full'}`}>
          <div className={hasCoaching ? 'max-w-xl mx-auto w-full' : ''}>
            {/* Logo */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <img
                src="https://media.oracleboxing.com/Website/optimized/logos/long_black-large.webp"
                alt="Oracle Boxing"
                className="h-4 w-auto"
              />
            </div>

          {/* Success Message */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-2 sm:mb-3 lg:mb-4">
              Purchase Successful
            </h1>
            {orderData && (
              <p className="text-sm sm:text-base lg:text-lg text-black">
                Welcome aboard, {orderData.customerName}
              </p>
            )}
          </div>

          {/* Order Details Card */}
          {orderData && (
            <div className="bg-white p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 lg:mb-8">
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-black mb-4 sm:mb-5 lg:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
                Order Details
              </h2>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-xs sm:text-sm lg:text-base text-black font-medium">Customer Name</span>
                  <span className="text-xs sm:text-sm lg:text-base text-black font-semibold text-right">{orderData.customerName}</span>
                </div>

                <div className="flex justify-between items-start gap-2">
                  <span className="text-xs sm:text-sm lg:text-base text-black font-medium">Email Address</span>
                  <span className="text-xs sm:text-sm lg:text-base text-black font-semibold text-right break-all">{orderData.customerEmail}</span>
                </div>

                <div className="flex justify-between items-start gap-2">
                  <span className="text-xs sm:text-sm lg:text-base text-black font-medium">Products</span>
                  <div className="text-xs sm:text-sm lg:text-base text-black font-semibold text-right">
                    <div>{orderData.productPurchased}</div>
                    {orderData.metadata?.funnel_type !== 'internal_coaching_tool' && orderData.metadata?.type !== 'closed_coaching' && (
                      <div className="mt-1">+ 1-on-1 Coaching (1 Month)</div>
                    )}
                  </div>
                </div>

                <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-sm sm:text-base lg:text-lg font-bold text-black">Total Paid</span>
                    <span className="text-lg sm:text-xl lg:text-2xl font-bold text-black">
                      {(() => {
                        // Parse the original amount and add coaching price (only for non-coaching tool purchases)
                        const currencySymbols: Record<string, string> = {
                          'USD': '$',
                          'GBP': '£',
                          'EUR': '€',
                          'CAD': 'CA$',
                          'AUD': 'A$',
                          'AED': 'AED ',
                        };

                        const coachingPrices: Record<string, number> = {
                          'USD': 397,
                          'GBP': 317,
                          'EUR': 365,
                          'CAD': 538,
                          'AUD': 595,
                          'AED': 1465,
                        };

                        // Extract amount from the formatted string
                        const amountStr = orderData.amountPaid.replace(/[^0-9.]/g, '');
                        const originalAmount = parseFloat(amountStr);
                        const currency = orderData.currency || 'USD';

                        // Only add coaching price if NOT from internal coaching tool
                        const isCoachingTool = orderData.metadata?.funnel_type === 'internal_coaching_tool' || orderData.metadata?.type === 'closed_coaching';
                        const coachingAmount = isCoachingTool ? 0 : (coachingPrices[currency] || 397);
                        const totalAmount = originalAmount + coachingAmount;

                        const symbol = currencySymbols[currency] || '$';
                        return `${symbol}${totalAmount.toFixed(2)}`;
                      })()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
        </div>

        {/* Next Steps Section for Coaching Purchases */}
        {hasCoaching && (
          <div className="h-full flex flex-col justify-center px-4 sm:px-6 lg:px-16 py-6 sm:py-8 lg:py-12 bg-gray-50 border-l border-gray-200">
            <div className="max-w-xl mx-auto w-full">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4 sm:mb-6">
                Next Steps
              </h2>

              <div className="space-y-4 sm:space-y-6">
                <p className="text-sm sm:text-base lg:text-lg text-black leading-relaxed">
                  Thank you for purchasing 1-on-1 coaching! We will reach out directly to have you book your first session within the next 24 hours.
                </p>

                <p className="text-sm sm:text-base lg:text-lg text-black leading-relaxed">
                  In the meantime, please look in your email for an invitation to join <strong>Oracle Boxing</strong> — the email will look similar to this:
                </p>

                <div className="relative w-full aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="https://media.oracleboxing.com/Website/skool_invite.png"
                    alt="Skool invitation email example"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                <p className="text-sm sm:text-base lg:text-lg text-black leading-relaxed">
                  That's where the rest of the team and all of our students are, so ideally we will contact you there.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function FinalSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <FinalSuccessContent />
    </Suspense>
  );
}
