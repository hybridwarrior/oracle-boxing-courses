'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { OrderConfirmation } from '@/components/OrderConfirmation';
import { CoachingUpsell } from '@/components/CoachingUpsell';
import { Footer } from '@/components/Footer';
import { toast } from 'sonner';
import { getCookie } from '@/lib/tracking-cookies';

interface SuccessUpsellPageProps {
  isMembership?: boolean;
}

export const SuccessUpsellPage: React.FC<SuccessUpsellPageProps> = ({ isMembership = false }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);
  const [isLoadingOrder, setIsLoadingOrder] = useState(true);

  // Get session ID from URL
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const fetchOrderData = async () => {
      if (!sessionId) {
        router.push('/');
        return;
      }

      try {
        const response = await fetch(`/api/session?session_id=${sessionId}`);
        const data = await response.json();

        if (response.ok) {
          setOrderData(data);

          // Check if this is a membership purchase by looking at the product metadata
          // Memberships have funnel: 'membership' in their metadata
          console.log('Order data:', data);
        } else {
          console.error('Failed to fetch session:', data.error);
          toast.error('Failed to load order details');
        }
      } catch (error) {
        console.error('Error fetching order:', error);
        toast.error('Failed to load order details');
      } finally {
        setIsLoadingOrder(false);
      }
    };

    fetchOrderData();
  }, [sessionId, router]);

  const handleAcceptUpsell = async () => {
    setIsLoading(true);
    try {
      if (!orderData) return;

      // Determine if this is a membership purchase
      const isMembershipPurchase = orderData.productMetadata?.funnel === 'membership';

      // Get the original purchase currency
      const purchaseCurrency = orderData.currency || 'USD';

      // Determine the price ID based on membership status and currency
      // For now, we'll use the multi-currency price which supports multiple currencies
      // The charge endpoint will ensure it charges in the same currency as original purchase
      let priceId: string;
      if (isMembershipPurchase) {
        // Membership buyers get this price
        priceId = 'price_1SLLY7QNEdHwdojXVriclpjV';
      } else {
        // Course/Challenge buyers get this price
        priceId = 'price_1SLLY7QNEdHwdojXVriclpjV';
      }

      console.log('🔍 Upsell request:', {
        isMembershipPurchase,
        purchaseCurrency,
        priceId,
        sessionId
      });

      // Get cookie data
      const cookieData = getCookie('ob_track')

      // Use the one-click charge endpoint with the correct product
      const response = await fetch('/api/upsell/charge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId,
          price_id: priceId,
          product_id: 'prod_THuQf0h3DatQUL',
          // Pass through tracking params from original session
          trackingParams: orderData.trackingParams,
          cookieData: cookieData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process upsell');
      }

      // Handle 3DS authentication if required
      if (data.requires_action && data.client_secret) {
        toast.error('Additional authentication required. Please try again.');
        setIsLoading(false);
        return;
      }

      // If successful, redirect to final success page with original session ID
      if (data.success) {
        toast.success('Coaching added successfully!');
        router.push(`/success/final?session_id=${sessionId}`);
      }
    } catch (error: any) {
      console.error('Upsell error:', error);
      toast.error(error.message || 'Something went wrong');
      setIsLoading(false);
    }
  };

  const handleDeclineUpsell = () => {
    // Check what they purchased to determine which page to show
    // Course-only purchases: Boxing Roadmap, BFFP (without 6WC membership), OBM (without 3-month membership)
    // Community purchases: 6WC, Membership, or courses WITH membership upgrades

    const productName = orderData?.productPurchased?.toLowerCase() || '';
    const cartItems = orderData?.metadata?.cart_items;

    // Check if they have any community/membership access
    const hasCommunityAccess =
      productName.includes('6-week challenge') ||
      productName.includes('6wc') ||
      productName.includes('membership') ||
      (cartItems && (
        cartItems.includes('6wc') ||
        cartItems.includes('membership') ||
        cartItems.includes('6-week-membership') ||
        cartItems.includes('3-month-membership')
      ));

    if (hasCommunityAccess) {
      // Has community access - show Skool invitation page
      router.push(`/success/thankyou?session_id=${sessionId}`);
    } else {
      // Course-only purchase - show booking page
      router.push(`/success/course-only?session_id=${sessionId}`);
    }
  };

  if (isLoadingOrder) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your order...</p>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Order not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="grid lg:grid-cols-2 flex-1">
        {/* Left Side - Order Confirmation */}
        <OrderConfirmation
          customerName={orderData.customerName}
          customerEmail={orderData.customerEmail}
          amountPaid={orderData.amountPaid}
          productPurchased={orderData.productPurchased}
          currency={orderData.currency}
        />

        {/* Next Step Notice - Mobile Only (between sections) */}
        <div className="lg:hidden bg-white p-4 sm:p-5 mx-4 sm:mx-6 my-6 rounded-lg border border-gray-200">
          <p className="text-sm sm:text-base text-black leading-relaxed">
            <strong>Next Step:</strong> Read the information below and then click one of the buttons to continue to the next page.
          </p>
        </div>

        {/* Right Side - Coaching Upsell */}
        <CoachingUpsell
          normalPrice={1200} // Normal 3-month price per month
          discountedPrice={397} // Special 1-month trial price
          onAccept={handleAcceptUpsell}
          onDecline={handleDeclineUpsell}
          isLoading={isLoading}
          isMembership={orderData.productMetadata?.funnel === 'membership'}
        />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};
