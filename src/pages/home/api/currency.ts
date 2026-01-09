import { apiInstance } from '../../../shared/api';
import type { CurrencyRate } from '../model';

export const getCurrencyRates = async (): Promise<CurrencyRate[]> => {
  const { data } = await apiInstance.get<CurrencyRate[]>('/exchange?json');
  return data;
};
