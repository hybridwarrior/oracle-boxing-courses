'use client';

import React, { Suspense } from 'react';
import { Footer } from '@/components/Footer';
import Image from 'next/image';

function ThankYouContent() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-16 py-6 sm:py-8 lg:py-12">
        <div className="max-w-2xl mx-auto w-full">
          {/* Next Steps Card */}
          <div className="bg-white rounded-lg p-6 sm:p-8 lg:p-10 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black mb-4 sm:mb-6">
              What Happens Next
            </h2>

            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              <p className="text-sm sm:text-base lg:text-lg text-black leading-relaxed">
                We will email you a receipt plus instructions on what to expect over the coming days.
              </p>

              <p className="text-sm sm:text-base lg:text-lg text-black leading-relaxed">
                For now, please look for this email invitation to join <strong>Oracle Boxing</strong> — the email will look similar to this:
              </p>

              <div className="relative w-full aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="https://media.oracleboxing.com/Website/skool_invite.png"
                  alt="Skool invitation email example"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 768px"
                />
              </div>

              <p className="text-sm sm:text-base lg:text-lg text-black leading-relaxed">
                That's where the rest of the team and all of our students are. You can find more onboarding instructions in there.
              </p>
            </div>

            {/* Help Section */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6">
              <p className="text-sm sm:text-base lg:text-lg text-black leading-relaxed text-center">
                If you need any help, please email us at{' '}
                <a
                  href="mailto:team@oracleboxing.com"
                  className="font-bold text-black hover:text-gray-700 underline"
                >
                  team@oracleboxing.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
