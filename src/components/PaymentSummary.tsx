import { DollarSign, CreditCard, TrendingUp } from 'lucide-react';
import { Payment } from '../types/payment';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../contexts/CurrencyContext';

interface PaymentSummaryProps {
  payments: Payment[];
}

export function PaymentSummary({ payments }: PaymentSummaryProps) {
  const { t } = useLanguage();
  const { currency, convertAmount } = useCurrency();
  
  const totalAmount = payments.reduce((sum, payment) => 
    sum + convertAmount(payment.amount, payment.currency), 0
  );
  
  const successfulPayments = payments.filter(p => p.status === 'succeeded');
  const successRate = (successfulPayments.length / payments.length) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="p-3 bg-blue-100 rounded-full">
            <DollarSign className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">
              {t('payments.totalRevenue')}
            </p>
            <p className="text-2xl font-semibold text-gray-900">
              {currency === 'USD' ? '$' : '€'}{totalAmount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="p-3 bg-green-100 rounded-full">
            <CreditCard className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">
              {t('payments.totalTransactions')}
            </p>
            <p className="text-2xl font-semibold text-gray-900">
              {payments.length}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="p-3 bg-purple-100 rounded-full">
            <TrendingUp className="h-6 w-6 text-purple-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">
              {t('payments.successRate')}
            </p>
            <p className="text-2xl font-semibold text-gray-900">
              {successRate.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}