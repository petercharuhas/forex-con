import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CurrencyConverter } from './CurrencyConverter';

describe('CurrencyConverter', () => {
  it('renders the currency converter form', () => {
    render(<CurrencyConverter />);
    expect(screen.getByText('Currency Converter')).toBeDefined();
  });

  it('validates invalid currency codes', () => {
    render(<CurrencyConverter />);
    
    const fromInput = screen.getByPlaceholderText('USD');
    fireEvent.change(fromInput, { target: { value: 'XXX' } });
    
    const submitButton = screen.getByText('Convert');
    fireEvent.click(submitButton);
    
    expect(screen.getByText('Please enter a valid 3-letter currency code')).toBeDefined();
  });

  it('validates invalid amount', () => {
    render(<CurrencyConverter />);
    
    const amountInput = screen.getByPlaceholderText('Enter amount');
    fireEvent.change(amountInput, { target: { value: '-100' } });
    
    const submitButton = screen.getByText('Convert');
    fireEvent.click(submitButton);
    
    expect(screen.getByText('Please enter a valid positive number')).toBeDefined();
  });

  it('performs conversion with same currency', () => {
    render(<CurrencyConverter />);
    
    const amountInput = screen.getByPlaceholderText('Enter amount');
    const fromInput = screen.getByPlaceholderText('USD');
    const toInput = screen.getByPlaceholderText('EUR');
    
    fireEvent.change(amountInput, { target: { value: '100' } });
    fireEvent.change(fromInput, { target: { value: 'USD' } });
    fireEvent.change(toInput, { target: { value: 'USD' } });
    
    const submitButton = screen.getByText('Convert');
    fireEvent.click(submitButton);
    
    expect(screen.getByText('$100.00 = $100.00')).toBeDefined();
  });

  it('performs conversion from USD to EUR', () => {
    render(<CurrencyConverter />);
    
    const amountInput = screen.getByPlaceholderText('Enter amount');
    const fromInput = screen.getByPlaceholderText('USD');
    const toInput = screen.getByPlaceholderText('EUR');
    
    fireEvent.change(amountInput, { target: { value: '100' } });
    fireEvent.change(fromInput, { target: { value: 'USD' } });
    fireEvent.change(toInput, { target: { value: 'EUR' } });
    
    const submitButton = screen.getByText('Convert');
    fireEvent.click(submitButton);
    
    // Using mock rate where 1 USD = 0.92 EUR
    expect(screen.getByText('$100.00 = €92.00')).toBeDefined();
  });

  it('performs conversion from EUR to USD', () => {
    render(<CurrencyConverter />);
    
    const amountInput = screen.getByPlaceholderText('Enter amount');
    const fromInput = screen.getByPlaceholderText('USD');
    const toInput = screen.getByPlaceholderText('EUR');
    
    fireEvent.change(amountInput, { target: { value: '100' } });
    fireEvent.change(fromInput, { target: { value: 'EUR' } });
    fireEvent.change(toInput, { target: { value: 'USD' } });
    
    const submitButton = screen.getByText('Convert');
    fireEvent.click(submitButton);
    
    // Using mock rate where 1 EUR = 1.087 USD (1/0.92)
    expect(screen.getByText('€100.00 = $108.70')).toBeDefined();
  });
});