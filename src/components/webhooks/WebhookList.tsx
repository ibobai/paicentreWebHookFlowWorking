import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { CreateWebhookDialog } from './CreateWebhookDialog';
import { DeleteWebhookDialog } from './DeleteWebhookDialog';
import type { WebhookInfo } from '../../types/webhook';

interface WebhookListProps {
  webhooks: WebhookInfo[];
  provider: 'stripe' | 'paypal';
  onCreateWebhook: (events: string[]) => Promise<void>;
  onDeleteWebhook: (webhookId: string) => Promise<void>;
}

export function WebhookList({
  webhooks,
  provider,
  onCreateWebhook,
  onDeleteWebhook
}: WebhookListProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [deleteWebhookId, setDeleteWebhookId] = useState<string | null>(null);

  const getWebhookEvents = (webhook: WebhookInfo): string[] => {
    if ('enabled_events' in webhook) {
      return webhook.enabled_events;
    }
    if ('event_types' in webhook) {
      return webhook.event_types.map(et => et.name);
    }
    return [];
  };

  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-900">Webhooks</h4>
        <button
          onClick={() => setIsCreateDialogOpen(true)}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
        >
          <Plus className="h-4 w-4 mr-1.5" />
          Create Webhook
        </button>
      </div>

      <div className="border border-gray-200 rounded-lg">
        <div style={{ maxHeight: '400px' }} className="overflow-y-auto">
          {webhooks.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {webhooks.map((webhook) => (
                <div 
                  key={webhook.id}
                  className="p-4 bg-white hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-gray-900">
                          {webhook.id}
                        </p>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          'status' in webhook && webhook.status === 'enabled' || 
                          'status' in webhook && webhook.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {'status' in webhook ? webhook.status : 'active'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {webhook.url}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {getWebhookEvents(webhook).map((event, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                          >
                            {event}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => setDeleteWebhookId(webhook.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete webhook"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              No webhooks configured yet. Click the button above to create one.
            </div>
          )}
        </div>
      </div>

      <CreateWebhookDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onConfirm={onCreateWebhook}
        provider={provider}
      />

      <DeleteWebhookDialog
        isOpen={!!deleteWebhookId}
        onClose={() => setDeleteWebhookId(null)}
        onConfirm={() => deleteWebhookId && onDeleteWebhook(deleteWebhookId)}
        webhookId={deleteWebhookId || ''}
      />
    </div>
  );
}