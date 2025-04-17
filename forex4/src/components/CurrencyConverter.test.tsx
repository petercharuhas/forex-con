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

  it('performs conversion with valid inputs', () => {
    render(<CurrencyConverter />);
    
    const amountInput = screen.getByPlaceholderText('Enter amount');
    const fromInput = screen.getByPlaceholderText('USD');
    const toInput = screen.getByPlaceholderText('EUR');
    
    fireEvent.change(amountInput, { target: { value: '100' } });
    fireEvent.change(fromInput, { target: { value: 'USD' } });
    fireEvent.change(toInput, { target: { value: 'EUR' } });
    
    const submitButton = screen.getByText('Convert');
    fireEvent.click(submitButton);
    
    // Since we're using a mock conversion rate of 1.2
    expect(screen.getByText('$100.00 = €120.00')).toBeDefined();
  });
});