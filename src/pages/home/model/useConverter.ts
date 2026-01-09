import { useState, useMemo } from 'react';
import { useCurrencyRates } from './queries.ts';

export function useConverter() {
  const { data: ratesData, isLoading, isError } = useCurrencyRates();

  const [amount1, setAmount1] = useState<string>('');
  const [currency1, setCurrency1] = useState<string>('USD');
  const [amount2, setAmount2] = useState<string>('');
  const [currency2, setCurrency2] = useState<string>('UAH');

  const { rates, currencies } = useMemo(() => {
    const ratesMap: Record<string, number> = { UAH: 1 };
    const list = ['UAH', 'USD', 'EUR'];

    ratesData?.forEach((item) => {
      ratesMap[item.cc] = item.rate;
      if (!list.includes(item.cc)) list.push(item.cc);
    });

    const others = list.slice(3).sort();
    return { rates: ratesMap, currencies: [...list.slice(0, 3), ...others] };
  }, [ratesData]);

  const convert = (value: string, from: string, to: string) => {
    const num = parseFloat(value);
    if (isNaN(num) || num <= 0) return '';
    const result = (num * (rates[from] || 1)) / (rates[to] || 1);
    return result.toFixed(2);
  };

  const handleAmount1Change = (val: string) => {
    setAmount1(val);
    setAmount2(convert(val, currency1, currency2));
  };

  const handleAmount2Change = (val: string) => {
    setAmount2(val);
    setAmount1(convert(val, currency2, currency1));
  };

  const handleCurrency1Change = (cur: string) => {
    setCurrency1(cur);
    setAmount2(convert(amount1, cur, currency2));
  };

  const handleCurrency2Change = (cur: string) => {
    setCurrency2(cur);
    setAmount2(convert(amount1, currency1, cur));
  };

  return {
    isLoading,
    isError,
    currencies,
    amount1,
    currency1,
    handleAmount1Change,
    handleCurrency1Change,
    amount2,
    currency2,
    handleAmount2Change,
    handleCurrency2Change,
  };
}
