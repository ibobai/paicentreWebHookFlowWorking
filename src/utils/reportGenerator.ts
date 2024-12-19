import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import { Payment } from '../types/payment';

interface GenerateReportParams {
  payments: Payment[];
  startDate: Date;
  endDate: Date;
  totalAmount: number;
}

export function generatePaymentReport({
  payments,
  startDate,
  endDate,
  totalAmount
}: GenerateReportParams): void {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(20);
  doc.text('PaiCentre - Payment Report', 14, 22);

  // Add period
  doc.setFontSize(12);
  doc.text(
    `Period: ${format(startDate, 'PP')} - ${format(endDate, 'PP')}`,
    14,
    32
  );

  // Add summary
  doc.text(`Total Transactions: ${payments.length}`, 14, 42);
  doc.text(`Total Amount: $${totalAmount.toLocaleString()}`, 14, 52);

  // Create table
  const tableData = payments.map(payment => [
    format(new Date(payment.createdAt), 'PP'),
    payment.id,
    payment.customerName,
    payment.productName,
    `$${payment.amount.toLocaleString()}`,
    payment.provider,
    payment.status
  ]);

  autoTable(doc, {
    head: [['Date', 'ID', 'Customer', 'Product', 'Amount', 'Provider', 'Status']],
    body: tableData,
    startY: 60,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [59, 130, 246] }
  });

  // Save the PDF
  doc.save(`payment-report-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
}