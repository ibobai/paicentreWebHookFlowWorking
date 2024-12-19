import { utils, read, writeFile } from 'xlsx';
import { Payment } from '../types/payment';

export async function readExcelFile(file: File): Promise<Payment[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        if (!data) {
          throw new Error('No data found in file');
        }
        const workbook = read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = utils.sheet_to_json(worksheet);
        
        const payments = jsonData.map((row: any) => ({
          id: row.id || generateExcelId(),
          amount: parseFloat(row.amount) || 0,
          currency: row.currency || 'USD',
          status: validateStatus(row.status),
          provider: validateProvider(row.provider),
          customerEmail: row.customerEmail || '',
          customerName: row.customerName || '',
          productName: row.productName || '',
          createdAt: row.createdAt || new Date().toISOString()
        }));
        
        resolve(payments);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsBinaryString(file);
  });
}

export async function exportToExcel(payments: Payment[]): Promise<void> {
  const excelData = payments.map(payment => ({
    Date: new Date(payment.createdAt).toLocaleString(),
    ID: payment.id,
    'Customer Name': payment.customerName,
    'Customer Email': payment.customerEmail,
    'Product Name': payment.productName,
    Amount: payment.amount,
    Currency: payment.currency,
    Provider: payment.provider,
    Status: payment.status
  }));

  const worksheet = utils.json_to_sheet(excelData);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Payments');

  worksheet['!cols'] = [
    { wch: 20 }, // Date
    { wch: 15 }, // ID
    { wch: 20 }, // Customer Name
    { wch: 25 }, // Customer Email
    { wch: 20 }, // Product Name
    { wch: 10 }, // Amount
    { wch: 8 },  // Currency
    { wch: 10 }, // Provider
    { wch: 10 }  // Status
  ];

  const fileName = `payment-transactions-${new Date().toISOString().split('T')[0]}.xlsx`;
  writeFile(workbook, fileName);
}

function generateExcelId(): string {
  return `EXL-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

function validateStatus(status: string): 'succeeded' | 'pending' | 'failed' {
  const validStatuses = ['succeeded', 'pending', 'failed'] as const;
  return validStatuses.includes(status as any) ? status as any : 'pending';
}

function validateProvider(provider: string): 'stripe' | 'paypal' {
  const validProviders = ['stripe', 'paypal'] as const;
  return validProviders.includes(provider as any) ? provider as any : 'stripe';
}