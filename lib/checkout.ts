// Checkout URL builder with UTM parameters and tracking

export interface CheckoutParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  client_reference_id?: string;
  prefilled_email?: string;
  locale?: string;
  button_location?: string; // Custom parameter for tracking
}

// Production Stripe checkout URL
const BASE_CHECKOUT_URL = 'https://checkout.oracleboxing.com/b/dRmeVe0tq78v4FZ9bDgQE1I';

/**
 * Builds a checkout URL with UTM parameters and other tracking data
 * @param params - Object containing UTM and tracking parameters
 * @returns Full checkout URL with parameters
 */
export function buildCheckoutUrl(params?: CheckoutParams): string {
  if (!params || Object.keys(params).length === 0) {
    return BASE_CHECKOUT_URL;
  }

  // Get current page's UTM parameters from URL if they exist
  let urlParams: CheckoutParams = {};
  if (typeof window !== 'undefined') {
    const searchParams = new URLSearchParams(window.location.search);
    
    // Capture UTM parameters from current URL
    if (searchParams.get('utm_source')) urlParams.utm_source = searchParams.get('utm_source')!;
    if (searchParams.get('utm_medium')) urlParams.utm_medium = searchParams.get('utm_medium')!;
    if (searchParams.get('utm_campaign')) urlParams.utm_campaign = searchParams.get('utm_campaign')!;
    if (searchParams.get('utm_term')) urlParams.utm_term = searchParams.get('utm_term')!;
    if (searchParams.get('utm_content')) urlParams.utm_content = searchParams.get('utm_content')!;
    
    // Capture other tracking parameters
    if (searchParams.get('ref')) urlParams.client_reference_id = searchParams.get('ref')!;
    if (searchParams.get('email')) urlParams.prefilled_email = searchParams.get('email')!;
  }

  // Merge passed params with URL params (passed params take priority)
  const finalParams = { ...urlParams, ...params };

  // Build query string
  const queryParams = new URLSearchParams();
  
  // Add Stripe-supported parameters
  if (finalParams.utm_source) queryParams.append('utm_source', finalParams.utm_source);
  if (finalParams.utm_medium) queryParams.append('utm_medium', finalParams.utm_medium);
  if (finalParams.utm_campaign) queryParams.append('utm_campaign', finalParams.utm_campaign);
  if (finalParams.utm_term) queryParams.append('utm_term', finalParams.utm_term);
  if (finalParams.utm_content) queryParams.append('utm_content', finalParams.utm_content);
  if (finalParams.client_reference_id) queryParams.append('client_reference_id', finalParams.client_reference_id);
  if (finalParams.prefilled_email) queryParams.append('prefilled_email', finalParams.prefilled_email);
  if (finalParams.locale) queryParams.append('locale', finalParams.locale);
  
  // Add custom tracking parameters (these might be stored in Stripe metadata)
  if (finalParams.button_location) queryParams.append('button_location', finalParams.button_location);

  const queryString = queryParams.toString();
  return queryString ? `${BASE_CHECKOUT_URL}?${queryString}` : BASE_CHECKOUT_URL;
}

/**
 * Gets the checkout URL for a specific button location
 * Automatically captures UTM parameters from the current page URL
 * @param buttonLocation - The location/context of the button (e.g., 'hero', 'offer', etc.)
 * @returns Full checkout URL with all tracking parameters
 */
export function getCheckoutUrl(buttonLocation?: string): string {
  return buildCheckoutUrl({
    button_location: buttonLocation,
    utm_content: buttonLocation // Also set utm_content to track button location in Stripe
  });
}