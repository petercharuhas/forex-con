export interface Currency {
  code: string;
  symbol: string;
}

export interface ConversionResult {
  amount: number;
  from: Currency;
  to: Currency;
  result: number;
}

export interface ValidationError {
  fromCurrency?: string;
  toCurrency?: string;
  amount?: string;
}