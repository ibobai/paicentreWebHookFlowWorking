import { WebhookInfo } from '../types/webhook';

// Empty initial webhooks - will be populated after connection
export const mockStripeWebhooks: WebhookInfo[] = [];
export const mockPayPalWebhooks: WebhookInfo[] = [];