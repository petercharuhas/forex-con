import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { CURRENCIES, validateCurrencyCode, validateAmount } from '../utils/currencies';
import type { ValidationError, ConversionResult } from '../types';

export function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState<ValidationError>({});
  const [result, setResult] = useState<ConversionResult | null>(null);

  const validateForm = (): boolean => {
    const newErrors: ValidationError = {};

    if (!validateCurrencyCode(fromCurrency)) {
      newErrors.fromCurrency = 'Please enter a valid 3-letter currency code';
    }

    if (!validateCurrencyCode(toCurrency)) {
      newErrors.toCurrency = 'Please enter a valid 3-letter currency code';
    }

    if (!validateAmount(amount)) {
      newErrors.amount = 'Please enter a valid positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      // In a real app, we would use an actual API here
      // This is a mock conversion for demonstration
      const mockRate = 1.2;
      const convertedAmount = Number(amount) * mockRate;
      
      setResult({
        amount: Number(amount),
        from: CURRENCIES[fromCurrency as keyof typeof CURRENCIES],
        to: CURRENCIES[toCurrency as keyof typeof CURRENCIES],
        result: Number(convertedAmount.toFixed(2))
      });
    } catch (error) {
      setErrors({ fromCurrency: 'Conversion failed. Please try again.' });
    }
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-lg p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Currency Converter</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter amount"
          />
          {errors.amount && (
            <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">From</label>
            <input
              type="text"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value.toUpperCase())}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="USD"
              maxLength={3}
            />
            {errors.fromCurrency && (
              <p className="mt-1 text-sm text-red-600">{errors.fromCurrency}</p>
            )}
          </div>

          <ArrowRight className="mt-6" />

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">To</label>
            <input
              type="text"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value.toUpperCase())}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="EUR"
              maxLength={3}
            />
            {errors.toCurrency && (
              <p className="mt-1 text-sm text-red-600">{errors.toCurrency}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Convert
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-lg font-medium text-gray-900">
            {result.from.symbol}{result.amount.toFixed(2)} = {result.to.symbol}{result.result.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
}