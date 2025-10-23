import React, { Suspense } from 'react';
import { SuccessUpsellPage } from '@/components/SuccessUpsellPage';

export default function SixWeekChallengeSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <SuccessUpsellPage />
    </Suspense>
  );
}
