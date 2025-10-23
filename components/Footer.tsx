'use client';

import { ScrollToTopLink as Link } from "@/components/ScrollToTopLink";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-gray-600">
          <span className="text-gray-600">&copy; 2025 Oracle Boxing Ltd. All Rights Reserved</span>
          <span className="hidden sm:inline text-gray-400">•</span>
          <Link
            to="/terms"
            className="hover:text-gray-900 transition-colors"
          >
            Terms
          </Link>
          <span className="hidden sm:inline text-gray-400">•</span>
          <Link
            to="/privacy"
            className="hover:text-gray-900 transition-colors"
          >
            Privacy
          </Link>
          <span className="hidden sm:inline text-gray-400">•</span>
          <Link
            to="/refund"
            className="hover:text-gray-900 transition-colors"
          >
            Refund
          </Link>
          <span className="hidden sm:inline text-gray-400">•</span>
          <Link
            to="/guarantee"
            className="hover:text-gray-900 transition-colors"
          >
            Guarantee
          </Link>
        </div>
      </div>
    </footer>
  );
}