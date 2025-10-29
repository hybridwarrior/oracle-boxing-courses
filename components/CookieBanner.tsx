'use client';

import { useState, useEffect } from 'react';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem('cookies_accepted');
    if (!hasAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookies_accepted', 'true');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-black text-white py-4 px-6 z-50 shadow-lg"
      style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm sm:text-base text-center sm:text-left">
          Oracle Boxing uses cookies to provide you with personalised content & ads.
          By clicking accept, you consent to all cookies on the site.
        </p>
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={handleAccept}
            className="px-6 py-2 text-white font-semibold rounded-lg transition-all hover:opacity-90"
            style={{
              backgroundColor: '#FFD700',
            }}
          >
            Accept
          </button>
          <a
            href="/privacy"
            className="text-sm underline hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}
