export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'pending' | 'failed';
  provider: 'stripe' | 'paypal';
  customerEmail: string;
  customerName: string;
  productName: string;
  createdAt: string;
}