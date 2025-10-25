'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Currency, detectUserCurrency } from '@/lib/currency';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  isLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>('USD');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeCurrency = async () => {
      try {
        // Automatically detect currency from user's location
        const detectedCurrency = await detectUserCurrency();
        setCurrencyState(detectedCurrency);
      } catch (error) {
        console.error('Error detecting currency:', error);
        setCurrencyState('USD');
      } finally {
        setIsLoading(false);
      }
    };

    initializeCurrency();
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: setCurrencyState, isLoading }}>
      {children}
    </CurrencyContext.Provider>
  );
};

function isValidCurrency(value: string): boolean {
  return ['USD', 'GBP', 'EUR', 'AUD', 'CAD', 'AED'].includes(value);
}
