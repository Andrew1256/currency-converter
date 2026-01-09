import { useState, useRef, useEffect } from 'react';

interface CurrencyInputProps {
  amount: number | string;
  currency: string;
  currencies: string[];
  onAmountChange: (value: string) => void;
  onCurrencyChange: (currency: string) => void;
  label?: string;
}

export function CurrencyInput({
  amount,
  currency,
  currencies,
  onAmountChange,
  onCurrencyChange,
  label,
}: CurrencyInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="flex flex-col gap-2 w-full" ref={containerRef}>
      {label && (
        <span className="text-sm font-semibold text-gray-500 ml-1 uppercase tracking-wider">
          {label}
        </span>
      )}

      <div className="relative flex items-stretch h-14">
        <input
          type="number"
          inputMode="decimal"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          className="block w-full rounded-2xl border-2 border-gray-100 bg-gray-50/50 p-4 text-lg font-medium text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
          placeholder="0.00"
        />

        <div className="absolute right-2 top-2 bottom-2 flex">
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center justify-between gap-2 px-4 rounded-xl bg-white border border-gray-200 shadow-sm hover:border-blue-400 hover:bg-blue-50 transition-all min-w-[100px]"
          >
            <span className="font-bold text-gray-700">{currency}</span>
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isOpen && (
            <ul
              role="listbox"
              className="absolute right-0 top-full mt-2 w-48 max-h-64 overflow-y-auto bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 py-2 scrollbar-thin"
            >
              {currencies.map((curr) => (
                <li key={curr} role="option" aria-selected={currency === curr}>
                  <button
                    type="button"
                    onClick={() => {
                      onCurrencyChange(curr);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center px-4 py-3 text-sm transition-colors ${
                      currency === curr
                        ? 'bg-blue-600 text-white font-bold'
                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    {curr}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
