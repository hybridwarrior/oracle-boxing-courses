// Cookie-based tracking utilities for event deduplication and attribution

export interface TrackingData {
  // Single event ID for entire session
  event_id?: string;
  session_id?: string;

  // Track if events have been fired (for deduplication)
  page_view_fired?: boolean;
  last_page_view_sent?: number; // Timestamp of last PageView sent to webhook (for daily unique tracking)
  initiate_checkout_fired?: boolean;
  purchase_fired?: boolean;
  purchase_time?: number;

  // Facebook Attribution
  fbclid?: string;

  // UTM Parameters
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;

  // Attribution - FIRST referrer (never overwritten)
  first_referrer?: string;
  first_referrer_time?: number;

  // Metadata
  landing_time?: number;
  button_location?: string;
}

/**
 * Set a cookie with the given name and value
 */
export function setCookie(name: string, value: any, days: number = 30): void {
  if (typeof window === 'undefined') return;
  
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  const cookieValue = typeof value === 'object' ? JSON.stringify(value) : value;
  
  document.cookie = `${name}=${encodeURIComponent(cookieValue)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

/**
 * Get a cookie value by name
 */
export function getCookie(name: string): any {
  if (typeof window === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift();
    if (!cookieValue) return null;
    
    try {
      return JSON.parse(decodeURIComponent(cookieValue));
    } catch {
      return decodeURIComponent(cookieValue);
    }
  }
  
  return null;
}

/**
 * Generate a unique event ID (random string of numbers)
 */
export function generateEventId(): string {
  // Generate a random string of 16 digits
  const part1 = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
  const part2 = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
  return part1 + part2;
}

/**
 * Generate a unique session ID
 */
export function generateSessionId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  return `sess_${timestamp}_${random}`;
}

/**
 * Get or initialize tracking data
 */
export function getOrInitTrackingData(): TrackingData {
  let trackingData = getCookie('ob_track') || {};
  
  // Initialize session and event ID if new
  if (!trackingData.session_id) {
    trackingData.session_id = generateSessionId();
    trackingData.landing_time = Date.now();
  }
  
  // Generate event ID if not exists (single ID for entire session)
  if (!trackingData.event_id) {
    trackingData.event_id = generateEventId();
    setCookie('ob_track', trackingData, 30);
  }
  
  return trackingData;
}

/**
 * Update tracking data in cookie
 */
export function updateTrackingData(updates: Partial<TrackingData>): void {
  const currentData = getOrInitTrackingData();
  const updatedData = { ...currentData, ...updates };
  setCookie('ob_track', updatedData, 30);
}

/**
 * Clear specific tracking fields (useful after purchase)
 */
export function clearTrackingFields(fields: string[]): void {
  const trackingData = getOrInitTrackingData();
  
  fields.forEach(field => {
    delete trackingData[field as keyof TrackingData];
  });
  
  setCookie('ob_track', trackingData, 30);
}

/**
 * Check if a purchase event is a duplicate (within 60 seconds)
 */
export function isDuplicatePurchase(): boolean {
  const trackingData = getOrInitTrackingData();

  if (trackingData.purchase_fired && trackingData.purchase_time) {
    const timeSincePurchase = Date.now() - trackingData.purchase_time;
    return timeSincePurchase < 60000; // 60 seconds
  }

  return false;
}

/**
 * Capture UTM parameters and first referrer from URL and store in cookies
 * This function should be called on initial page load
 */
export function captureUTMParameters(): void {
  if (typeof window === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const trackingData = getOrInitTrackingData();

  // Capture FIRST referrer (only if not already set)
  if (!trackingData.first_referrer && document.referrer) {
    const referrer = document.referrer;
    // Only capture external referrers (not same-domain navigation)
    const currentDomain = window.location.hostname;
    const referrerDomain = new URL(referrer).hostname;

    if (referrerDomain !== currentDomain) {
      trackingData.first_referrer = referrer;
      trackingData.first_referrer_time = Date.now();
      console.log('📊 First referrer captured:', referrer);
    }
  }

  // Extract UTM parameters from URL
  const utmSource = urlParams.get('utm_source');
  const utmMedium = urlParams.get('utm_medium');
  const utmCampaign = urlParams.get('utm_campaign');
  const utmContent = urlParams.get('utm_content');
  const utmTerm = urlParams.get('utm_term');
  const fbclid = urlParams.get('fbclid');

  // Update tracking data if UTM parameters are present
  const updates: Partial<TrackingData> = {};

  if (utmSource) updates.utm_source = utmSource;
  if (utmMedium) updates.utm_medium = utmMedium;
  if (utmCampaign) updates.utm_campaign = utmCampaign;
  if (utmContent) updates.utm_content = utmContent;
  if (utmTerm) updates.utm_term = utmTerm;
  if (fbclid) updates.fbclid = fbclid;

  // Add first referrer to updates if it was just captured
  if (trackingData.first_referrer) {
    updates.first_referrer = trackingData.first_referrer;
    updates.first_referrer_time = trackingData.first_referrer_time;
  }

  // Only update if we have new parameters or first referrer
  if (Object.keys(updates).length > 0) {
    updateTrackingData(updates);
    console.log('📊 Tracking data captured:', updates);
  }
}

/**
 * Get all UTM parameters from cookies
 */
export function getUTMParameters(): {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
} {
  const trackingData = getOrInitTrackingData();

  return {
    utm_source: trackingData.utm_source,
    utm_medium: trackingData.utm_medium,
    utm_campaign: trackingData.utm_campaign,
    utm_content: trackingData.utm_content,
    utm_term: trackingData.utm_term,
    fbclid: trackingData.fbclid,
  };
}

/**
 * Get tracking parameters for checkout/API calls
 * Uses FIRST referrer for attribution (not current referrer)
 */
export function getTrackingParams(): {
  referrer: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  fbclid?: string;
  session_id?: string;
  event_id?: string;
} {
  const trackingData = getOrInitTrackingData();

  // Use first_referrer for attribution (captured on initial landing)
  // Falls back to 'direct' if no first referrer was captured
  const referrer = trackingData.first_referrer || 'direct';

  return {
    referrer,
    utm_source: trackingData.utm_source,
    utm_medium: trackingData.utm_medium,
    utm_campaign: trackingData.utm_campaign,
    utm_term: trackingData.utm_term,
    utm_content: trackingData.utm_content,
    fbclid: trackingData.fbclid,
    session_id: trackingData.session_id,
    event_id: trackingData.event_id,
  };
}