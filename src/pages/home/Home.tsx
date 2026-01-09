import { CurrencyConverter, Header } from './ui';

export function Home() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <CurrencyConverter />
      </main>
    </div>
  );
}
