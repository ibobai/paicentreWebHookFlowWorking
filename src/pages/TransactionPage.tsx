import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { CustomerTransactionHistory } from '../components/transaction/CustomerTransactionHistory';
import { CustomerStats } from '../components/transaction/CustomerStats';
import { TransactionDetails } from '../components/transaction/TransactionDetails';
import { mockPayments } from '../data/mockPayments';

export function TransactionPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const transaction = mockPayments.find(p => p.id === id);
  const customerTransactions = mockPayments.filter(p => 
    p.customerEmail === transaction?.customerEmail
  );

  if (!transaction) {
    navigate('/404');
    return <></>;
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-blue-600"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Transactions
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TransactionDetails transaction={transaction} />
          <CustomerStats transactions={customerTransactions} />
        </div>

        <CustomerTransactionHistory 
          transactions={customerTransactions}
          currentTransactionId={transaction.id}
        />
      </div>
    </MainLayout>
  );
}