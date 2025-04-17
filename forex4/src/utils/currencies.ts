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

export const validateCurrencyCode = (code: string): boolean => {
  return code.length === 3 && code in CURRENCIES;
};

export const validateAmount = (amount: string): boolean => {
  const num = Number(amount);
  return !isNaN(num) && num > 0;
};