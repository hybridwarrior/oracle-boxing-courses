'use client';

import React from 'react';
import { CheckCircle, Mail, AlertCircle } from 'lucide-react';

interface OrderConfirmationProps {
  customerName: string;
  customerEmail: string;
  amountPaid: string;
  productPurchased: string;
  currency?: string;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  customerName,
  customerEmail,
  amountPaid,
  productPurchased,
  currency = 'USD',
}) => {
  return (
    <div className="h-full flex flex-col justify-center px-4 sm:px-6 lg:px-16 py-6 sm:py-8 lg:py-12 bg-white">
      <div className="max-w-xl mx-auto w-full">
        {/* Logo */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <img
            src="https://media.oracleboxing.com/Website/optimized/logos/long_black-large.webp"
            alt="Oracle Boxing"
            className="h-5 sm:h-6 lg:h-7 w-auto"
          />
        </div>

        {/* Success Message */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-2 sm:mb-3 lg:mb-4">
            Purchase Successful
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-black">
            Welcome aboard, {customerName}
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 lg:mb-8">
          <h2 className="text-base sm:text-lg lg:text-xl font-bold text-black mb-4 sm:mb-5 lg:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
            Order Details
          </h2>

          <div className="space-y-3 sm:space-y-4">
            <div className="flex justify-between items-start gap-2">
              <span className="text-xs sm:text-sm lg:text-base text-black font-medium">Customer Name</span>
              <span className="text-xs sm:text-sm lg:text-base text-black font-semibold text-right">{customerName}</span>
            </div>

            <div className="flex justify-between items-start gap-2">
              <span className="text-xs sm:text-sm lg:text-base text-black font-medium">Email Address</span>
              <span className="text-xs sm:text-sm lg:text-base text-black font-semibold text-right break-all">{customerEmail}</span>
            </div>

            <div className="flex justify-between items-start gap-2">
              <span className="text-xs sm:text-sm lg:text-base text-black font-medium">Product Purchased</span>
              <span className="text-xs sm:text-sm lg:text-base text-black font-semibold text-right">{productPurchased}</span>
            </div>

            <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-gray-200">
              <div className="flex justify-between items-center gap-2">
                <span className="text-sm sm:text-base lg:text-lg font-bold text-black">Amount Paid</span>
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-black">{amountPaid}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Email Instructions */}
        <div className="bg-white p-4 sm:p-5 lg:p-6 mb-4 sm:mb-5 lg:mb-6">
          <div className="flex items-start gap-2 sm:gap-3 lg:gap-4">
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-black flex-shrink-0 mt-0.5 sm:mt-1" />
            <div>
              <h3 className="text-sm sm:text-base lg:text-base font-bold text-black mb-1 sm:mb-2">Receipt & Access Instructions</h3>
              <p className="text-xs sm:text-sm lg:text-sm text-black leading-relaxed">
                A receipt has been emailed to <strong>{customerEmail}</strong> with instructions on how to access your product.
              </p>
            </div>
          </div>
        </div>

        {/* Important Email Notice */}
        <div className="bg-white p-4 sm:p-5 lg:p-6">
          <div className="flex items-start gap-2 sm:gap-3 lg:gap-4">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-black flex-shrink-0 mt-0.5 sm:mt-1" />
            <div>
              <h3 className="text-sm sm:text-base lg:text-base font-bold text-black mb-1 sm:mb-2">Important: Check Your Email</h3>
              <div className="text-xs sm:text-sm lg:text-sm text-black leading-relaxed space-y-1 sm:space-y-2">
                <p>
                  Please check both your <strong>inbox and spam folder</strong> for all emails from Oracle Boxing.
                </p>
                <p>
                  <strong>If our emails are in spam:</strong>
                </p>
                <ul className="list-disc pl-4 sm:pl-5 space-y-0.5 sm:space-y-1">
                  <li>Move them to your inbox</li>
                  <li>Reply to the email to ensure future communications land in your inbox</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
