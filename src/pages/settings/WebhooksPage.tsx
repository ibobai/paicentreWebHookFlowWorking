import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { CollapsibleSection } from '../../components/settings/CollapsibleSection';
import { WebhookConnection } from '../../components/webhooks/WebhookConnection';

export function WebhooksPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        to="/settings"
        className="inline-flex items-center text-blue-600 hover:text-blue-700"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Settings
      </Link>

      <div className="flex items-center">
        <CreditCard className="h-8 w-8 text-gray-700 mr-3" />
        <h1 className="text-2xl font-bold text-gray-900">Payment Webhooks</h1>
      </div>

      <div className="space-y-6">
        <CollapsibleSection
          title="Stripe Integration"
          icon={<CreditCard className="h-6 w-6" />}
          defaultOpen
        >
          <WebhookConnection provider="stripe" />
        </CollapsibleSection>

        <CollapsibleSection
          title="PayPal Integration"
          icon={<CreditCard className="h-6 w-6" />}
        >
          <WebhookConnection provider="paypal" />
        </CollapsibleSection>
      </div>
    </div>
  );
}