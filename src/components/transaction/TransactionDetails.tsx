import { useState } from 'react';
import { Payment } from '../../types/payment';
import { CreditCard, Calendar, DollarSign, User, Mail, Package, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface TransactionDetailsProps {
  transaction: Payment;
}

export function TransactionDetails({ transaction: initialTransaction }: TransactionDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [transaction, setTransaction] = useState(initialTransaction);

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Transaction updated successfully');
  };

  return (
    <div className="col-span-2 bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Transaction Details</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Edit Details
          </button>
        ) : (
          <div className="space-x-2">
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 text-gray-600 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={handleSave}
              className="p-2 text-green-600 hover:text-green-700"
            >
              <Save className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-start">
            <User className="h-5 w-5 text-gray-400 mt-1 mr-3" />
            <div>
              <label className="block text-sm font-medium text-gray-600">Customer Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={transaction.customerName}
                  onChange={(e) => setTransaction({ ...transaction, customerName: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              ) : (
                <p className="mt-1 text-gray-900">{transaction.customerName}</p>
              )}
            </div>
          </div>

          <div className="flex items-start">
            <Mail className="h-5 w-5 text-gray-400 mt-1 mr-3" />
            <div>
              <label className="block text-sm font-medium text-gray-600">Customer Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={transaction.customerEmail}
                  onChange={(e) => setTransaction({ ...transaction, customerEmail: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              ) : (
                <p className="mt-1 text-gray-900">{transaction.customerEmail}</p>
              )}
            </div>
          </div>

          <div className="flex items-start">
            <Package className="h-5 w-5 text-gray-400 mt-1 mr-3" />
            <div>
              <label className="block text-sm font-medium text-gray-600">Product Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={transaction.productName}
                  onChange={(e) => setTransaction({ ...transaction, productName: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              ) : (
                <p className="mt-1 text-gray-900">{transaction.productName}</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start">
            <DollarSign className="h-5 w-5 text-gray-400 mt-1 mr-3" />
            <div>
              <label className="block text-sm font-medium text-gray-600">Amount</label>
              {isEditing ? (
                <input
                  type="number"
                  value={transaction.amount}
                  onChange={(e) => setTransaction({ ...transaction, amount: parseFloat(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              ) : (
                <p className="mt-1 text-gray-900">${transaction.amount.toLocaleString()}</p>
              )}
            </div>
          </div>

          <div className="flex items-start">
            <CreditCard className="h-5 w-5 text-gray-400 mt-1 mr-3" />
            <div>
              <label className="block text-sm font-medium text-gray-600">Payment Provider</label>
              {isEditing ? (
                <select
                  value={transaction.provider}
                  onChange={(e) => setTransaction({ ...transaction, provider: e.target.value as 'stripe' | 'paypal' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="stripe">Stripe</option>
                  <option value="paypal">PayPal</option>
                </select>
              ) : (
                <p className="mt-1 text-gray-900 capitalize">{transaction.provider}</p>
              )}
            </div>
          </div>

          <div className="flex items-start">
            <Calendar className="h-5 w-5 text-gray-400 mt-1 mr-3" />
            <div>
              <label className="block text-sm font-medium text-gray-600">Transaction Date</label>
              <p className="mt-1 text-gray-900">
                {new Date(transaction.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}