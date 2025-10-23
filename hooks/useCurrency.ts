'use client'

import { useState, useEffect } from 'react'

// Currency symbols and formatting configuration
const CURRENCY_CONFIG = {
  USD: { symbol: '$', code: 'USD', position: 'before' },
  GBP: { symbol: '£', code: 'GBP', position: 'before' },
  EUR: { symbol: '€', code: 'EUR', position: 'before' },
  AUD: { symbol: 'A$', code: 'AUD', position: 'before' },
  CAD: { symbol: 'C$', code: 'CAD', position: 'before' },
  NZD: { symbol: 'NZ$', code: 'NZD', position: 'before' },
  SGD: { symbol: 'S$', code: 'SGD', position: 'before' },
  HKD: { symbol: 'HK$', code: 'HKD', position: 'before' },
  JPY: { symbol: '¥', code: 'JPY', position: 'before' },
  CNY: { symbol: '¥', code: 'CNY', position: 'before' },
  INR: { symbol: '₹', code: 'INR', position: 'before' },
  MXN: { symbol: 'MX$', code: 'MXN', position: 'before' },
  BRL: { symbol: 'R$', code: 'BRL', position: 'before' },
  ZAR: { symbol: 'R', code: 'ZAR', position: 'before' },
  AED: { symbol: 'AED', code: 'AED', position: 'after' },
  CHF: { symbol: 'CHF', code: 'CHF', position: 'after' },
  SEK: { symbol: 'kr', code: 'SEK', position: 'after' },
  NOK: { symbol: 'kr', code: 'NOK', position: 'after' },
  DKK: { symbol: 'kr', code: 'DKK', position: 'after' },
  PLN: { symbol: 'zł', code: 'PLN', position: 'after' },
}

// Fallback rates in case API fails (last updated manually)
const FALLBACK_RATES: { [key: string]: number } = {
  USD: 1,
  GBP: 0.79,
  EUR: 0.92,
  AUD: 1.53,
  CAD: 1.36,
  NZD: 1.65,
  SGD: 1.35,
  HKD: 7.82,
  JPY: 149,
  CNY: 7.24,
  INR: 83,
  MXN: 17.1,
  BRL: 4.95,
  ZAR: 18.7,
  AED: 3.67,
  CHF: 0.88,
  SEK: 10.4,
  NOK: 10.6,
  DKK: 6.85,
  PLN: 4.0,
}

// Country to currency mapping
const COUNTRY_CURRENCY_MAP: { [key: string]: string } = {
  US: 'USD', GB: 'GBP', UK: 'GBP', FR: 'EUR', DE: 'EUR', IT: 'EUR', ES: 'EUR',
  NL: 'EUR', BE: 'EUR', AT: 'EUR', IE: 'EUR', PT: 'EUR', FI: 'EUR', GR: 'EUR',
  AU: 'AUD', CA: 'CAD', NZ: 'NZD', SG: 'SGD', HK: 'HKD', JP: 'JPY', CN: 'CNY',
  IN: 'INR', MX: 'MXN', BR: 'BRL', ZA: 'ZAR', AE: 'AED', CH: 'CHF', SE: 'SEK',
  NO: 'NOK', DK: 'DKK', PL: 'PLN'
}

export function useCurrency() {
  const [currency, setCurrency] = useState('USD')
  const [rates, setRates] = useState<{ [key: string]: number }>(FALLBACK_RATES)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRatesAndDetectCurrency = async () => {
      try {
        // Fetch live exchange rates from exchangerate-api (free tier)
        // Alternative: You can use https://api.frankfurter.app/latest?from=USD for completely free rates
        const ratesPromise = fetch('https://api.exchangerate-api.com/v4/latest/USD')
          .then(res => res.json())
          .then(data => {
            if (data.rates) {
              // Update rates for currencies we support
              const updatedRates: { [key: string]: number } = { USD: 1 }
              Object.keys(CURRENCY_CONFIG).forEach(curr => {
                if (data.rates[curr]) {
                  updatedRates[curr] = data.rates[curr]
                } else {
                  updatedRates[curr] = FALLBACK_RATES[curr] || 1
                }
              })
              return updatedRates
            }
            return FALLBACK_RATES
          })
          .catch(err => {
            console.warn('Failed to fetch live rates, using fallback:', err)
            return FALLBACK_RATES
          })

        // Try to get currency from localStorage first
        const savedCurrency = localStorage.getItem('preferredCurrency')
        if (savedCurrency && CURRENCY_CONFIG[savedCurrency as keyof typeof CURRENCY_CONFIG]) {
          setCurrency(savedCurrency)
          const liveRates = await ratesPromise
          setRates(liveRates)
          setIsLoading(false)
          return
        }

        // Detect user's location using free IP geolocation API with better CORS support
        const geoPromise = fetch('https://api.ipgeolocation.io/ipgeo?apiKey=ea0f3fb974e94822b65c0e3c17aef230')
          .then(res => res.json())
          .then(data => {
            const countryCurrency = COUNTRY_CURRENCY_MAP[data.country_code2] || 'USD'
            return countryCurrency
          })
          .catch(() => 'USD')

        // Wait for both promises
        const [liveRates, detectedCurrency] = await Promise.all([ratesPromise, geoPromise])
        
        setRates(liveRates)
        setCurrency(detectedCurrency)
        localStorage.setItem('preferredCurrency', detectedCurrency)
      } catch (error) {
        console.error('Error in currency setup:', error)
        setRates(FALLBACK_RATES)
        setCurrency('USD')
      } finally {
        setIsLoading(false)
      }
    }

    fetchRatesAndDetectCurrency()
  }, [])

  const formatPrice = (usdAmount: number, options?: { 
    showCode?: boolean, 
    roundTo?: number,
    showCents?: boolean 
  }) => {
    const currencyInfo = CURRENCY_CONFIG[currency as keyof typeof CURRENCY_CONFIG] || CURRENCY_CONFIG.USD
    const rate = rates[currency] || 1
    const convertedAmount = usdAmount * rate
    
    // Round based on currency conventions
    let finalAmount = convertedAmount
    if (options?.roundTo !== undefined) {
      finalAmount = Math.round(convertedAmount / options.roundTo) * options.roundTo
    } else if (!options?.showCents) {
      // Default rounding rules by currency
      if (['JPY', 'CNY'].includes(currency)) {
        finalAmount = Math.round(convertedAmount) // No decimals for Yen
      } else if (convertedAmount > 100) {
        finalAmount = Math.round(convertedAmount) // Round to nearest whole number for large amounts
      } else {
        finalAmount = Math.round(convertedAmount * 100) / 100 // Keep cents for small amounts
      }
    }

    // Format the number
    let formattedNumber = finalAmount.toFixed(['JPY', 'CNY'].includes(currency) ? 0 : (options?.showCents ? 2 : 0))
    
    // Add thousand separators
    formattedNumber = formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    
    // Build the final string
    let result = ''
    if (currencyInfo.position === 'before') {
      result = `${currencyInfo.symbol}${formattedNumber}`
    } else {
      result = `${formattedNumber} ${currencyInfo.symbol}`
    }
    
    // Add currency code if requested
    if (options?.showCode && currency !== 'USD') {
      result += ` ${currencyInfo.code}`
    }
    
    return result
  }

  const switchCurrency = (newCurrency: string) => {
    if (CURRENCY_CONFIG[newCurrency as keyof typeof CURRENCY_CONFIG]) {
      setCurrency(newCurrency)
      localStorage.setItem('preferredCurrency', newCurrency)
    }
  }

  return {
    currency,
    formatPrice,
    switchCurrency,
    isLoading,
    availableCurrencies: Object.keys(CURRENCY_CONFIG),
    rates
  }
}