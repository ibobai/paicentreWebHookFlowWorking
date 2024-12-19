export interface StripeWebhookInfo {
  id: string;
  object: string;
  api_version: string | null;
  application: string | null;
  created: number;
  description: string | null;
  enabled_events: string[];
  livemode: boolean;
  metadata: Record<string, any>;
  secret: string;
  status: string;
  url: string;
}

export interface PayPalEventType {
  name: string;
  description: string;
}

export interface PayPalWebhookLink {
  href: string;
  rel: string;
  method: string;
}

export interface PayPalWebhookInfo {
  id: string;
  url: string;
  event_types: PayPalEventType[];
  links: PayPalWebhookLink[];
}

export type WebhookInfo = StripeWebhookInfo | PayPalWebhookInfo;

export interface WebhookResponse {
  webhookInfo: WebhookInfo;
  message: string;
  created: boolean;
}