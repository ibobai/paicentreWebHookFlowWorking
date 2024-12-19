import { Payment } from '../../types/payment';
import { CreditCard, TrendingUp, Calendar } from 'lucide-react';

interface CustomerStatsProps {
  transactions: Payment[];
}

export function CustomerStats({ transactions }: CustomerStatsProps) {
  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
  const successfulTransactions = transactions.filter(t => t.status === 'succeeded');
  const successRate = (successfulTransactions.length / transactions.length) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Customer Statistics</h2>
      
      <div className="space-y-6">
        <div className="flex items-center">
          <div className="p-3 bg-blue-100 rounded-full">
            <CreditCard className="h-5 w-5 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Transactions</p>
            <p className="text-xl font-semibold text-gray-900">{transactions.length}</p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="p-3 bg-green-100 rounded-full">
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Amount</p>
            <p className="text-xl font-semibold text-gray-900">
              ${totalAmount.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="p-3 bg-purple-100 rounded-full">
            <Calendar className="h-5 w-5 text-purple-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Success Rate</p>
            <p className="text-xl font-semibold text-gray-900">
              {successRate.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}