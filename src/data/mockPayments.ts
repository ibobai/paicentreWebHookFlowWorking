import { Payment } from '../types/payment';

export const mockPayments: Payment[] = [
  {
    id: 'py_1234567890',
    amount: 99.99,
    currency: 'USD',
    status: 'succeeded',
    provider: 'stripe',
    customerEmail: 'john@example.com',
    customerName: 'John Doe',
    productName: 'Premium Plan',
    createdAt: '2024-03-15T10:30:00Z'
  },
  {
    id: 'PAY-ABCDEF123456',
    amount: 149.99,
    currency: 'USD',
    status: 'succeeded',
    provider: 'paypal',
    customerEmail: 'jane@example.com',
    customerName: 'Jane Smith',
    productName: 'Enterprise Plan',
    createdAt: '2024-03-15T09:15:00Z'
  },
  {
    id: 'py_9876543210',
    amount: 199.99,
    currency: 'USD',
    status: 'succeeded',
    provider: 'stripe',
    customerEmail: 'mike@example.com',
    customerName: 'Mike Johnson',
    productName: 'Team Plan',
    createdAt: '2024-03-14T15:45:00Z'
  },
  {
    id: 'PAY-XYZ789ABC',
    amount: 49.99,
    currency: 'USD',
    status: 'failed',
    provider: 'paypal',
    customerEmail: 'sarah@example.com',
    customerName: 'Sarah Wilson',
    productName: 'Basic Plan',
    createdAt: '2024-03-14T14:20:00Z'
  },
  {
    id: 'py_QWERTY12345',
    amount: 299.99,
    currency: 'USD',
    status: 'succeeded',
    provider: 'stripe',
    customerEmail: 'david@example.com',
    customerName: 'David Brown',
    productName: 'Enterprise Plus',
    createdAt: '2024-03-13T11:30:00Z'
  },
  {
    id: 'PAY-UIOP7890',
    amount: 79.99,
    currency: 'USD',
    status: 'pending',
    provider: 'paypal',
    customerEmail: 'lisa@example.com',
    customerName: 'Lisa Anderson',
    productName: 'Standard Plan',
    createdAt: '2024-03-13T10:15:00Z'
  },
  {
    id: 'py_ASDFGH4567',
    amount: 159.99,
    currency: 'USD',
    status: 'succeeded',
    provider: 'stripe',
    customerEmail: 'robert@example.com',
    customerName: 'Robert Taylor',
    productName: 'Professional Plan',
    createdAt: '2024-03-12T16:45:00Z'
  },
  {
    id: 'PAY-ZXCVBN8901',
    amount: 129.99,
    currency: 'USD',
    status: 'succeeded',
    provider: 'paypal',
    customerEmail: 'emma@example.com',
    customerName: 'Emma Davis',
    productName: 'Business Plan',
    createdAt: '2024-03-12T14:30:00Z'
  },
  {
    id: 'py_MNBVCX2345',
    amount: 89.99,
    currency: 'USD',
    status: 'succeeded',
    provider: 'stripe',
    customerEmail: 'tom@example.com',
    customerName: 'Tom Wilson',
    productName: 'Standard Plus Plan',
    createdAt: '2024-03-11T13:20:00Z'
  },
  {
    id: 'PAY-LKJHGF6789',
    amount: 199.99,
    currency: 'USD',
    status: 'succeeded',
    provider: 'paypal',
    customerEmail: 'alice@example.com',
    customerName: 'Alice Cooper',
    productName: 'Team Plus Plan',
    createdAt: '2024-03-11T11:45:00Z'
  }
];