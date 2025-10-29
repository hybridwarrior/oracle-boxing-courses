'use client';

import { useState, useEffect } from 'react';
import { setCookie, getCookie } from '@/lib/tracking-cookies';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already responded to cookie consent
    const consentCookie = getCookie('ob_consent');
    if (!consentCookie) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    // Set consent cookie (used by tracking functions)
    setCookie('ob_consent', 'accepted', 365); // 1 year

    // Trigger a custom event so other components can initialize tracking
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cookieConsentGiven'));
    }

    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-black text-white py-5 sm:py-6 px-6 sm:px-8 z-50 shadow-lg"
      style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-base sm:text-lg text-left w-full sm:flex-1">
          We use cookies for analytics, personalised content, and ads. By accepting, you consent to all cookies on this site.{' '}
          <a
            href="/privacy"
            className="underline hover:opacity-80 transition-opacity"
          >
            Learn More
          </a>
        </p>
        <button
          onClick={handleAccept}
          className="w-full sm:w-auto px-8 py-3 bg-yellow-100 text-black font-semibold rounded-lg transition-all hover:bg-yellow-200 shrink-0"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
