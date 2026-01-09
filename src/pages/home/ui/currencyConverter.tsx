import { useConverter } from '../model';
import { CurrencyInput } from '../../../shared/ui';

export function CurrencyConverter() {
  const {
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
  } = useConverter();

  if (isLoading)
    return (
      <div className="p-8 text-center text-blue-500 animate-pulse">
        Оновлення курсів...
      </div>
    );
  if (isError)
    return (
      <div className="p-8 text-center text-red-500">
        Помилка завантаження даних.
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-2xl border border-gray-50 mt-10">
      <h2 className="text-3xl font-black text-gray-900 mb-8 text-center tracking-tight">
        Конвертер валют
      </h2>

      <div className="space-y-4">
        <CurrencyInput
          label="Віддаєте"
          amount={amount1}
          currency={currency1}
          currencies={currencies}
          onAmountChange={handleAmount1Change}
          onCurrencyChange={handleCurrency1Change}
        />

        <div className="flex justify-center -my-6 relative z-10">
          <div className="bg-white p-3 rounded-full shadow-md border border-gray-100 text-blue-600">
            <img src="/conver.svg" alt="convert-Image" />
          </div>
        </div>

        <CurrencyInput
          label="Отримуєте"
          amount={amount2}
          currency={currency2}
          currencies={currencies}
          onAmountChange={handleAmount2Change}
          onCurrencyChange={handleCurrency2Change}
        />
      </div>

      <div className="mt-10 pt-6 border-t border-gray-50 text-center">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          Курси НБУ • Оновлено щойно
        </p>
      </div>
    </div>
  );
}
