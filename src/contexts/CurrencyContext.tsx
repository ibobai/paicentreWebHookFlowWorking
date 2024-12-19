import React, { createContext, useContext, useState, useEffect } from 'react';

type Currency = 'USD' | 'EUR';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertAmount: (amount: number, fromCurrency: string) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const EXCHANGE_RATES = {
  USD: 1,
  EUR: 0.92, // Example exchange rate (1 USD = 0.92 EUR)
};

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>(() => {
    const savedCurrency = localStorage.getItem('currency');
    return (savedCurrency as Currency) || 'USD';
  });

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  const convertAmount = (amount: number, fromCurrency: string): number => {
    if (fromCurrency === currency) return amount;
    if (currency === 'EUR') {
      return amount * EXCHANGE_RATES.EUR;
    }
    return amount / EXCHANGE_RATES.EUR;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertAmount }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}