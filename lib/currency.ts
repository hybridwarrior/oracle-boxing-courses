export type Currency = 'USD' | 'GBP' | 'EUR' | 'AUD' | 'CAD' | 'AED';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  name: string;
}

export const CURRENCIES: Record<Currency, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro' },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  CAD: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  AED: { code: 'AED', symbol: 'AED', name: 'UAE Dirham' },
};

// Country code to currency mapping for location detection
export const COUNTRY_TO_CURRENCY: Record<string, Currency> = {
  US: 'USD',
  GB: 'GBP',
  UK: 'GBP',
  DE: 'EUR',
  FR: 'EUR',
  IT: 'EUR',
  ES: 'EUR',
  NL: 'EUR',
  BE: 'EUR',
  AT: 'EUR',
  IE: 'EUR',
  PT: 'EUR',
  FI: 'EUR',
  GR: 'EUR',
  AU: 'AUD',
  CA: 'CAD',
  AE: 'AED',
};

// Product pricing matrix (from product_upsell_matrix.md)
export const PRODUCT_PRICES: Record<string, Record<Currency, number>> = {
  '6wc': { USD: 197, GBP: 157, EUR: 182, AUD: 297, CAD: 267, AED: 725 },
  rcv: { USD: 97, GBP: 77, EUR: 90, AUD: 145, CAD: 132, AED: 355 },
  ltbffp: { USD: 147, GBP: 117, EUR: 136, AUD: 220, CAD: 199, AED: 540 },
  bffp: { USD: 297, GBP: 237, EUR: 273, AUD: 445, CAD: 403, AED: 1095 },
  brdmp: { USD: 147, GBP: 117, EUR: 136, AUD: 220, CAD: 199, AED: 540 },
  clnc: { USD: 97, GBP: 77, EUR: 90, AUD: 145, CAD: 132, AED: 355 },
  obm: { USD: 397, GBP: 317, EUR: 365, AUD: 595, CAD: 538, AED: 1465 },
  '6wm': { USD: 97, GBP: 77, EUR: 90, AUD: 145, CAD: 132, AED: 355 },
  coach1: { USD: 397, GBP: 317, EUR: 365, AUD: 595, CAD: 538, AED: 1465 },
  coach_archive: { USD: 67, GBP: 54, EUR: 62, AUD: 100, CAD: 90, AED: 250 },
};

// Membership products (USD only)
export const MEMBERSHIP_PRODUCTS = ['memm', 'mem6', 'mema', 'ltall_297', 'ltall_197'];

export const isMembershipProduct = (metadata?: string): boolean => {
  if (!metadata) return false;
  return MEMBERSHIP_PRODUCTS.includes(metadata);
};

export const formatPrice = (
  amount: number,
  currency: Currency,
  hideSymbol: boolean = false
): string => {
  const config = CURRENCIES[currency];
  const formattedAmount = amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  if (hideSymbol) {
    return formattedAmount;
  }

  // For AED, put symbol after number
  if (currency === 'AED') {
    return `${config.symbol} ${formattedAmount}`;
  }

  return `${config.symbol}${formattedAmount}`;
};

export const getProductPrice = (metadata?: string, currency: Currency = 'USD'): number | null => {
  // Return null if no metadata provided
  if (!metadata) {
    return null;
  }

  // Membership products are always USD only
  if (isMembershipProduct(metadata)) {
    return null;
  }

  const prices = PRODUCT_PRICES[metadata];
  if (!prices) {
    console.warn(`No pricing found for product metadata: ${metadata}`);
    return null;
  }

  return prices[currency] || prices.USD;
};

export const detectCurrencyFromCountry = (countryCode: string): Currency => {
  return COUNTRY_TO_CURRENCY[countryCode.toUpperCase()] || 'USD';
};

// Detect user location and return currency
export const detectUserCurrency = async (): Promise<Currency> => {
  try {
    // Use ipapi.co for free IP geolocation
    const response = await fetch('https://ipapi.co/json/');
    if (!response.ok) throw new Error('Geolocation failed');

    const data = await response.json();
    const countryCode = data.country_code;

    return detectCurrencyFromCountry(countryCode);
  } catch (error) {
    console.error('Failed to detect user location:', error);
    return 'USD'; // Default to USD on error
  }
};

// Get Stripe price ID for a product in a specific currency
export const getStripePriceId = (
  product: any,
  currency: Currency
): string => {
  // Membership products are always USD only
  if (isMembershipProduct(product.metadata)) {
    return product.stripe_price_id; // Return the default USD price ID
  }

  // If product has multi-currency price IDs, use them
  if (product.price_ids) {
    const currencyKey = currency.toLowerCase() as Lowercase<Currency>;
    const priceId = product.price_ids[currencyKey];

    if (priceId) {
      return priceId;
    }
  }

  // Fallback to default price ID (should be USD)
  return product.stripe_price_id;
};
