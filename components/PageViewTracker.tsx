'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '@/lib/webhook-tracking';

/**
 * PageViewTracker component
 * Tracks all page views and sends data to webhook
 * Place this component in the root layout to track all routes
 */
export default function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previousPath = useRef<string>('');

  useEffect(() => {
    // Build the full page URL
    const params = searchParams?.toString();
    const fullPath = params ? `${pathname}?${params}` : pathname;

    // Get referrer (will be empty string on initial load from same domain)
    const referrer = document.referrer || '';

    // Only track if the path has changed (avoid duplicate tracking)
    if (fullPath !== previousPath.current) {
      previousPath.current = fullPath;

      // Track the page view
      trackPageView(fullPath, referrer);
    }
  }, [pathname, searchParams]);

  // This component doesn't render anything
  return null;
}
