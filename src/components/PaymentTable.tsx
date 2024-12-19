import { useState, useEffect } from 'react';
import { Payment } from '../types/payment';
import { PaymentReport } from './PaymentReport';
import { ExportDialog } from './export/ExportDialog';
import { AddPaymentDialog } from './payment/AddPaymentDialog';
import { PaymentTableHeader } from './payment/PaymentTableHeader';
import { PaymentTableBody } from './payment/PaymentTableBody';
import { PaymentTableControls } from './payment/PaymentTableControls';
import { PaymentTablePagination } from './payment/PaymentTablePagination';
import { DeleteConfirmationDialog } from './payment/DeleteConfirmationDialog';
import { exportToExcel } from '../utils/excelUtils';
import toast from 'react-hot-toast';

interface PaymentTableProps {
  payments: Payment[];
}

export function PaymentTable({ payments: initialPayments }: PaymentTableProps): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(null);
  const [payments, setPayments] = useState(initialPayments);
  const [autoExport, setAutoExport] = useState(() => {
    return localStorage.getItem('autoExport') === 'true';
  });
  const paymentsPerPage = 6;

  const filteredPayments = payments.filter(payment => {
    const searchStr = searchQuery.toLowerCase();
    return (
      payment.id.toLowerCase().includes(searchStr) ||
      payment.customerName.toLowerCase().includes(searchStr) ||
      payment.customerEmail.toLowerCase().includes(searchStr) ||
      payment.productName.toLowerCase().includes(searchStr) ||
      payment.amount.toString().includes(searchStr) ||
      payment.provider.toLowerCase().includes(searchStr) ||
      payment.status.toLowerCase().includes(searchStr)
    );
  });

  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = filteredPayments.slice(indexOfFirstPayment, indexOfLastPayment);
  const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);

  const handleDeleteClick = (paymentId: string) => {
    setSelectedPaymentId(paymentId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedPaymentId) {
      const updatedPayments = payments.filter(p => p.id !== selectedPaymentId);
      setPayments(updatedPayments);
      localStorage.setItem('payments', JSON.stringify(updatedPayments));
      toast.success('Payment deleted successfully');
      setIsDeleteDialogOpen(false);
      setSelectedPaymentId(null);
    }
  };

  const handleAddPayment = async (newPayment: Payment) => {
    const updatedPayments = [...payments, newPayment];
    setPayments(updatedPayments);
    localStorage.setItem('payments', JSON.stringify(updatedPayments));
    
    if (autoExport) {
      try {
        await exportToExcel([newPayment]); // Export only the new payment
        toast.success('Payment added and exported successfully');
      } catch (error) {
        toast.error('Payment added but export failed');
        console.error('Export error:', error);
      }
    } else {
      toast.success('Payment added successfully');
    }
  };

  const handleExport = async (startDate: Date | null, endDate: Date | null) => {
    try {
      let dataToExport = payments;
      
      if (startDate && endDate) {
        dataToExport = payments.filter(payment => {
          const paymentDate = new Date(payment.createdAt);
          return paymentDate >= startDate && paymentDate <= endDate;
        });
      }

      await exportToExcel(dataToExport);
      toast.success('Payments exported successfully');
      setIsExportDialogOpen(false);
    } catch (error) {
      toast.error('Failed to export payments');
      console.error('Export error:', error);
    }
  };

  const handleDownload = async (startDate: Date | null, endDate: Date | null) => {
    try {
      let dataToExport = payments;
      
      if (startDate && endDate) {
        dataToExport = payments.filter(payment => {
          const paymentDate = new Date(payment.createdAt);
          return paymentDate >= startDate && paymentDate <= endDate;
        });
      }

      await exportToExcel(dataToExport);
      toast.success('File downloaded successfully');
      setIsExportDialogOpen(false);
    } catch (error) {
      toast.error('Failed to download file');
      console.error('Download error:', error);
    }
  };

  const handleAutoExportChange = (value: boolean) => {
    setAutoExport(value);
    localStorage.setItem('autoExport', value.toString());
    toast.success(`Auto-export ${value ? 'enabled' : 'disabled'}`);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div className="w-full space-y-6">
      <PaymentTableControls
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddPayment={() => setIsAddPaymentOpen(true)}
        onExportClick={() => setIsExportDialogOpen(true)}
        autoExport={autoExport}
        onAutoExportChange={handleAutoExportChange}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <PaymentTableHeader />
          <PaymentTableBody
            payments={currentPayments}
            onDeleteClick={handleDeleteClick}
          />
        </table>
      </div>

      {totalPages > 1 && (
        <PaymentTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredPayments.length}
          itemsPerPage={paymentsPerPage}
          onPageChange={setCurrentPage}
        />
      )}

      <PaymentReport payments={payments} />

      <ExportDialog
        isOpen={isExportDialogOpen}
        onClose={() => setIsExportDialogOpen(false)}
        onExport={handleExport}
        onDownload={handleDownload}
      />

      <AddPaymentDialog
        isOpen={isAddPaymentOpen}
        onClose={() => setIsAddPaymentOpen(false)}
        onAdd={handleAddPayment}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        paymentId={selectedPaymentId || ''}
      />
    </div>
  );
}