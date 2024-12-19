import { DollarSign, Euro } from 'lucide-react';
import { useCurrency } from '../../contexts/CurrencyContext';

export function CurrencySwitch() {
  const { currency, setCurrency } = useCurrency();

  return (
    <button
      onClick={() => setCurrency(currency === 'USD' ? 'EUR' : 'USD')}
      className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
      title="Switch Currency"
    >
      {currency === 'USD' ? (
        <DollarSign className="h-5 w-5" />
      ) : (
        <Euro className="h-5 w-5" />
      )}
    </button>
  );
}