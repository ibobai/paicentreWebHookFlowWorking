import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { FileText, Search } from 'lucide-react';
import { generatePaymentReport } from '../utils/reportGenerator';
import { Payment } from '../types/payment';
import "react-datepicker/dist/react-datepicker.css";

interface PaymentReportProps {
  payments: Payment[];
}

export function PaymentReport({ payments }: PaymentReportProps): JSX.Element {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showSummary, setShowSummary] = useState(false);

  const filteredPayments = payments.filter(payment => {
    const paymentDate = new Date(payment.createdAt);
    if (startDate && endDate) {
      return paymentDate >= startDate && paymentDate <= endDate;
    }
    return true;
  });

  const totalAmount = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const successfulPayments = filteredPayments.filter(p => p.status === 'succeeded');
  const successRate = (successfulPayments.length / filteredPayments.length) * 100;

  const handleCheckReport = () => {
    if (startDate && endDate) {
      setShowSummary(true);
    }
  };

  const handleGenerateReport = () => {
    if (startDate && endDate) {
      generatePaymentReport({
        payments: filteredPayments,
        startDate,
        endDate,
        totalAmount
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-6">Payment Reports</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Date
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => {
              setStartDate(date);
              setShowSummary(false);
            }}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            maxDate={endDate || new Date()}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            dateFormat="yyyy-MM-dd"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Date
          </label>
          <DatePicker
            selected={endDate}
            onChange={(date: Date | null) => {
              setEndDate(date);
              setShowSummary(false);
            }}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            maxDate={new Date()}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            dateFormat="yyyy-MM-dd"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4 mb-6">
        <button
          onClick={handleCheckReport}
          disabled={!startDate || !endDate}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Search size={20} />
          Check Report
        </button>
        {showSummary && (
          <button
            onClick={handleGenerateReport}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FileText size={20} />
            Generate PDF
          </button>
        )}
      </div>

      {showSummary && startDate && endDate && (
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            Report Summary
          </h3>
          <div className="space-y-3">
            <p className="text-blue-800">
              <span className="font-medium">Report Period:</span>{' '}
              {format(startDate, 'PP')} - {format(endDate, 'PP')}
            </p>
            <p className="text-blue-800">
              <span className="font-medium">Total Transactions:</span>{' '}
              {filteredPayments.length}
            </p>
            <p className="text-blue-800">
              <span className="font-medium">Successful Transactions:</span>{' '}
              {successfulPayments.length} ({successRate.toFixed(1)}%)
            </p>
            <p className="text-blue-800 text-lg font-semibold">
              <span className="font-medium">Total Amount:</span>{' '}
              ${totalAmount.toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}