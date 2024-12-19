import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Payment } from '../../types/payment';

interface PaymentTableBodyProps {
  payments: Payment[];
  onDeleteClick: (id: string) => void;
}

export function PaymentTableBody({ payments, onDeleteClick }: PaymentTableBodyProps) {
  const navigate = useNavigate();

  return (
    <tbody className="divide-y divide-gray-200">
      {payments.map((payment) => (
        <tr 
          key={payment.id} 
          className="hover:bg-gray-50 cursor-pointer"
          onClick={() => navigate(`/transaction/${payment.id}`)}
        >
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {format(new Date(payment.createdAt), 'MMM d, yyyy HH:mm')}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {payment.id}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-gray-900">
              {payment.customerName}
            </div>
            <div className="text-sm text-gray-500">
              {payment.customerEmail}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {payment.productName}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            ${payment.amount.toLocaleString()}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              payment.provider === 'stripe' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
            }`}>
              {payment.provider}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              payment.status === 'succeeded'
                ? 'bg-green-100 text-green-800'
                : payment.status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {payment.status}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteClick(payment.id);
              }}
              className="text-red-600 hover:text-red-900"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}