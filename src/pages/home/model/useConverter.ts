import { useState, useMemo } from 'react';
import { useCurrencyRates } from './queries.ts';

export function useConverter() {
  const { data: ratesData, isLoading, isError } = useCurrencyRates();

  const [amount, setAmount] = useState<string>('');
  const [activeInput, setActiveInput] = useState<1 | 2>(1);

  const [currency1, setCurrency1] = useState<string>('USD');
  const [currency2, setCurrency2] = useState<string>('UAH');

  const { rates, currencies } = useMemo(() => {
    const ratesMap: Record<string, number> = { UAH: 1 };
    const list = ['UAH', 'USD', 'EUR'];

    ratesData?.forEach((item) => {
      ratesMap[item.cc] = item.rate;
      if (!list.includes(item.cc)) list.push(item.cc);
    });

    return { rates: ratesMap, currencies: list };
  }, [ratesData]);

  const getConvertedValue = (value: string, from: string, to: string) => {
    const num = parseFloat(value);
    if (isNaN(num) || num <= 0) return '';
    return ((num * (rates[from] || 1)) / (rates[to] || 1)).toFixed(2);
  };

  const amount1 =
    activeInput === 1
      ? amount
      : getConvertedValue(amount, currency2, currency1);
  const amount2 =
    activeInput === 2
      ? amount
      : getConvertedValue(amount, currency1, currency2);

  const handleAmountChange = (val: string, inputIndex: 1 | 2) => {
    setAmount(val);
    setActiveInput(inputIndex);
  };

  return {
    isLoading,
    isError,
    currencies,
    amount1,
    currency1,
    amount2,
    currency2,
    handleAmount1Change: (val: string) => handleAmountChange(val, 1),
    handleAmount2Change: (val: string) => handleAmountChange(val, 2),
    handleCurrency1Change: setCurrency1,
    handleCurrency2Change: setCurrency2,
  };
}
