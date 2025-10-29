'use client';

import { useEffect, useRef, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '@/lib/webhook-tracking';

/**
 * PageViewTracker internal component
 * Uses useSearchParams which requires Suspense boundary
 * Tracks immediately - cookie storage handled by tracking-cookies.ts
 */
function PageViewTrackerInternal() {
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

      // Track the page view (fires immediately)
      trackPageView(fullPath, referrer);
    }
  }, [pathname, searchParams]);

  // This component doesn't render anything
  return null;
}

/**
 * PageViewTracker component with Suspense boundary
 * Tracks all page views and sends data to webhook
 * Place this component in the root layout to track all routes
 */
export default function PageViewTracker() {
  return (
    <Suspense fallback={null}>
      <PageViewTrackerInternal />
    </Suspense>
  );
}
