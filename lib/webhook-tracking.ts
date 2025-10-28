// Webhook tracking utility for page views and purchases
// Sends page view data to Make.com webhook and Facebook Pixel (browser-side)
// Sends purchase data to Make.com webhook and Facebook Conversions API (server-side)

const WEBHOOK_URL = 'https://hook.eu2.make.com/rmssfwgpgrbkihnly4ocxd2cf6kmfbo3';
const FB_PIXEL_ID = '1474540100541059';
const FB_ACCESS_TOKEN = 'EAA2BabZBcKN4BP7mscf3Tb3S7Cl6ZBQZCVtM2NDlnDeoOTc6jqibS97JuzokPUJcIaDbVbEg2Iaq83sKAgO9QCVvyit6yzHW0U9fsfXMyjLL2wxkMCRDINZCFXIgzvyudQKTqoQ7ZBDB335s4hQr8m12RpV1nBSGqrzbNZCCv6pwWyxDZBlLbk3TPSSEojkrg762QZDZD';
const FB_CONVERSIONS_API_URL = `https://graph.facebook.com/v18.0/${FB_PIXEL_ID}/events`;

export interface PageViewData {
  eventType: string;
  eventId: string;
  sessionId: string;
  date: string;
  page: string;
  referrer: string;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  country: string | null;
}

export interface PurchaseData {
  eventType: string;
  eventId: string;
  date: string;
  sessionId: string;
  value: number;
  currency: string;
  products: string[];
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  country: string | null;
}

export interface InitiateCheckoutData {
  eventType: string;
  eventId: string;
  sessionId: string;
  date: string;
  firstName: string;
  lastName: string;
  email: string;
  valueUSD: number;
  products: string[];
  page: string;
  country: string | null;
  initialReferrer: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  // URL parameters
  funnel?: string | null;
  course?: string | null;
  currency?: string | null;
  source?: string | null;
}

/**
 * Generate a unique event ID for deduplication
 */
function generateEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get or create a session ID for the user
 * Stored in localStorage and persists across page views
 */
function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') {
    return '';
  }

  try {
    // Check if session_id already exists in localStorage
    let sessionId = localStorage.getItem('session_id');

    if (!sessionId) {
      // Generate a new session ID: timestamp + random string
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('session_id', sessionId);
    }

    return sessionId;
  } catch {
    // Fallback if localStorage is not available
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

/**
 * Get UTM parameters from cookies (set by UTMTracker component)
 */
function getUTMParameters(): {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
} {
  if (typeof document === 'undefined') {
    return {
      utmSource: null,
      utmMedium: null,
      utmCampaign: null,
      utmContent: null,
    };
  }

  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = decodeURIComponent(value);
    return acc;
  }, {} as Record<string, string>);

  return {
    utmSource: cookies['utm_source'] || null,
    utmMedium: cookies['utm_medium'] || null,
    utmCampaign: cookies['utm_campaign'] || null,
    utmContent: cookies['utm_content'] || null,
  };
}

/**
 * Get user's country using Cloudflare's CF-IPCountry header or geolocation API
 */
async function getUserCountry(): Promise<string | null> {
  try {
    // Try to get country from a geolocation API
    const response = await fetch('https://ipapi.co/json/', {
      method: 'GET',
      signal: AbortSignal.timeout(2000), // 2 second timeout
    });

    if (response.ok) {
      const data = await response.json();
      return data.country_code || null;
    }
  } catch (error) {
    console.warn('Failed to fetch country:', error);
  }

  return null;
}

/**
 * Get Facebook Click ID (fbclid) from cookies
 */
function getFbclid(): string | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = decodeURIComponent(value);
    return acc;
  }, {} as Record<string, string>);

  return cookies['fbclid'] || null;
}

/**
 * Get client IP address (browser user agent as fallback)
 */
function getClientUserAgent(): string {
  if (typeof navigator === 'undefined') {
    return '';
  }
  return navigator.userAgent;
}


/**
 * Send page view data to webhook and Facebook Pixel
 */
export async function trackPageView(page: string, referrer: string): Promise<void> {
  try {
    const utm = getUTMParameters();
    const country = await getUserCountry();
    const eventId = generateEventId();
    const sessionId = getOrCreateSessionId();
    const eventTime = Date.now();
    const fbclid = getFbclid();

    const data: PageViewData = {
      eventType: 'page_view',
      eventId,
      sessionId,
      date: new Date(eventTime).toISOString(),
      page,
      referrer,
      utmSource: utm.utmSource,
      utmMedium: utm.utmMedium,
      utmCampaign: utm.utmCampaign,
      utmContent: utm.utmContent,
      country,
    };

    // Send to webhook (non-blocking)
    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      keepalive: true, // Ensure request completes even if page unloads
    }).catch((error) => {
      console.error('Failed to send page view to webhook:', error);
    });

    // Send to Facebook Pixel (browser-side tracking)
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'PageView');
    }

    // Send to Facebook Conversions API with test event code
    try {
      const eventData = {
        event_name: 'PageView',
        event_time: Math.floor(eventTime / 1000),
        event_id: eventId,
        event_source_url: `https://shop.oracleboxing.com${page}`,
        action_source: 'website',
        user_data: {
          client_user_agent: getClientUserAgent(),
          ...(fbclid && { fbc: `fb.1.${eventTime}.${fbclid}` }),
          ...(country && { country: [country.toLowerCase()] }),
        },
      };

      const payload = {
        data: [eventData],
        access_token: FB_ACCESS_TOKEN,
        test_event_code: 'TEST85396',
      };

      fetch(FB_CONVERSIONS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        keepalive: true,
      }).then(response => {
        if (!response.ok) {
          response.json().then(errorData => {
            console.error('Facebook Conversions API PageView error:', errorData);
          });
        } else {
          response.json().then(result => {
            console.log('Facebook Conversions API PageView success:', result);
          });
        }
      }).catch((error) => {
        console.error('Failed to send PageView to Facebook Conversions API:', error);
      });
    } catch (error) {
      console.error('Error sending PageView to Facebook Conversions API:', error);
    }

    console.log('Page view tracked:', data);
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
}

/**
 * Send purchase/conversion data to webhook and Facebook Conversions API
 */
export async function trackPurchase(
  sessionId: string,
  value: number,
  currency: string,
  products: string[]
): Promise<void> {
  try {
    const utm = getUTMParameters();
    const country = await getUserCountry();
    const eventId = generateEventId();
    const eventTime = Date.now();
    const fbclid = getFbclid();

    const data: PurchaseData = {
      eventType: 'purchase',
      eventId,
      date: new Date(eventTime).toISOString(),
      sessionId,
      value,
      currency,
      products,
      utmSource: utm.utmSource,
      utmMedium: utm.utmMedium,
      utmCampaign: utm.utmCampaign,
      utmContent: utm.utmContent,
      country,
    };

    // Send to webhook (non-blocking)
    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      keepalive: true,
    }).catch((error) => {
      console.error('Failed to send purchase to webhook:', error);
    });

    // Send to Facebook Conversions API
    try {
      const eventData = {
        event_name: 'Purchase',
        event_time: Math.floor(eventTime / 1000),
        event_id: eventId,
        event_source_url: `https://shop.oracleboxing.com/success`,
        action_source: 'website',
        user_data: {
          client_user_agent: getClientUserAgent(),
          ...(fbclid && { fbc: `fb.1.${eventTime}.${fbclid}` }),
          ...(country && { country: [country.toLowerCase()] }),
        },
        custom_data: {
          value,
          currency,
          content_ids: products,
          content_type: 'product',
          num_items: products.length,
        },
      };

      const payload = {
        data: [eventData],
        access_token: FB_ACCESS_TOKEN,
        test_event_code: 'TEST85396',
      };

      const response = await fetch(FB_CONVERSIONS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        keepalive: true,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Facebook Conversions API Purchase error:', errorData);
      } else {
        const result = await response.json();
        console.log('Facebook Conversions API Purchase success:', result);
      }
    } catch (error) {
      console.error('Failed to send purchase to Facebook Conversions API:', error);
    }

    console.log('Purchase tracked:', data);
  } catch (error) {
    console.error('Error tracking purchase:', error);
  }
}

/**
 * Send initiate checkout data to webhook
 * Tracks when a user fills in their name/email and proceeds to the next checkout step
 */
export async function trackInitiateCheckout(
  fullName: string,
  email: string,
  valueUSD: number,
  products: string[],
  page: string,
  initialReferrer: string | null,
  urlParams?: {
    funnel?: string | null;
    course?: string | null;
    currency?: string | null;
    source?: string | null;
  }
): Promise<void> {
  try {
    const utm = getUTMParameters();

    // Get country with better error handling
    let country: string | null = null;
    try {
      country = await getUserCountry();
      console.log('🌍 Country detected:', country);
    } catch (error) {
      console.warn('Failed to get country, continuing without it:', error);
    }

    const eventId = generateEventId();
    const sessionId = getOrCreateSessionId();

    // Split full name into first and last name
    // Takes everything before the first space as first name, rest as last name
    const nameParts = fullName.trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    console.log('💰 Initiate Checkout Tracking:', {
      firstName,
      lastName,
      email,
      valueUSD,
      products,
      country,
      urlParams
    });

    const data: InitiateCheckoutData = {
      eventType: 'initiate_checkout',
      eventId,
      sessionId,
      date: new Date().toISOString(),
      firstName,
      lastName,
      email,
      valueUSD,
      products,
      page,
      country,
      initialReferrer,
      utmSource: utm.utmSource,
      utmMedium: utm.utmMedium,
      utmCampaign: utm.utmCampaign,
      utmContent: utm.utmContent,
      // URL parameters
      funnel: urlParams?.funnel || null,
      course: urlParams?.course || null,
      currency: urlParams?.currency || null,
      source: urlParams?.source || null,
    };

    // Send to webhook (non-blocking)
    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      keepalive: true,
    }).catch((error) => {
      console.error('Failed to send initiate checkout to webhook:', error);
    });

    console.log('Initiate checkout tracked:', data);
  } catch (error) {
    console.error('Error tracking initiate checkout:', error);
  }
}
