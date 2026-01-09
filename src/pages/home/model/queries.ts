import { useQuery } from '@tanstack/react-query';
import { getCurrencyRates } from '../api';

export const useCurrencyRates = () => {
  return useQuery({
    queryKey: ['currencies', 'rates'],

    queryFn: getCurrencyRates,

    staleTime: 60 * 1000,
  });
};
