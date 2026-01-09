import { useMemo } from 'react';
import { useCurrencyRates } from '../model';

export function Header() {
  const { data, isLoading } = useCurrencyRates();

  const relevantRates = useMemo(() => {
    if (!data) return [];
    return data.filter((r) => r.cc === 'USD' || r.cc === 'EUR');
  }, [data]);

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight">Currency Converter</h1>

        <div className="flex gap-4 sm:gap-6 text-sm font-medium">
          {isLoading ? (
            <div className="animate-pulse flex gap-4">
              <div className="h-6 w-20 bg-blue-500 rounded-full"></div>
              <div className="h-6 w-20 bg-blue-500 rounded-full"></div>
            </div>
          ) : (
            relevantRates.map((rate) => (
              <div
                key={rate.cc}
                className="flex items-center gap-2 bg-blue-700/50 backdrop-blur-sm px-3 py-1 rounded-full border border-blue-400/30"
              >
                <span className="uppercase text-blue-100">{rate.cc}</span>
                <span className="font-bold">{rate.rate.toFixed(2)}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </header>
  );
}
