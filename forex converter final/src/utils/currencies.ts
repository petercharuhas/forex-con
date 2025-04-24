export const CURRENCIES = {
  USD: { code: 'USD', symbol: '$' },
  EUR: { code: 'EUR', symbol: '€' },
  GBP: { code: 'GBP', symbol: '£' },
  JPY: { code: 'JPY', symbol: '¥' },
  AUD: { code: 'AUD', symbol: 'A$' },
  CAD: { code: 'CAD', symbol: 'C$' },
  CHF: { code: 'CHF', symbol: 'Fr' },
  CNY: { code: 'CNY', symbol: '¥' },
  NZD: { code: 'NZD', symbol: 'NZ$' },
  INR: { code: 'INR', symbol: '₹' },
} as const;

// Mock exchange rates relative to USD
export const MOCK_RATES = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 150.42,
  AUD: 1.53,
  CAD: 1.35,
  CHF: 0.89,
  CNY: 7.23,
  NZD: 1.65,
  INR: 82.94,
} as const;

export const validateCurrencyCode = (code: string): boolean => {
  return code.length === 3 && code in CURRENCIES;
};

export const validateAmount = (amount: string): boolean => {
  const num = Number(amount);
  return !isNaN(num) && num > 0;
};

export const convertCurrency = (amount: number, from: string, to: string): number => {
  if (from === to) return amount;
  
  // Convert to USD first (if not already USD)
  const amountInUSD = from === 'USD' ? amount : amount / MOCK_RATES[from as keyof typeof MOCK_RATES];
  
  // Convert from USD to target currency
  return to === 'USD' ? amountInUSD : amountInUSD * MOCK_RATES[to as keyof typeof MOCK_RATES];
};