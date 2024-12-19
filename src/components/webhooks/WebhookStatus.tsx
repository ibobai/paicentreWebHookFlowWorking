import { useState } from 'react';
import { CreditCard } from 'lucide-react';
import type { ConnectionStatus } from '../../utils/webhookUtils';
import { DisconnectConfirmationDialog } from './DisconnectConfirmationDialog';

interface WebhookStatusProps {
  status: ConnectionStatus;
  provider: 'stripe' | 'paypal';
  onConnect: () => void;
  onDisconnect: () => void;
}

export function WebhookStatus({ status, provider, onConnect, onDisconnect }: WebhookStatusProps) {
  const [showDisconnectDialog, setShowDisconnectDialog] = useState(false);
  const providerName = provider.charAt(0).toUpperCase() + provider.slice(1);

  const handleDisconnect = () => {
    setShowDisconnectDialog(true);
  };

  const handleConfirmDisconnect = () => {
    onDisconnect();
    setShowDisconnectDialog(false);
  };

  return (
    <>
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${
              status.connected ? 'bg-green-100' : 'bg-gray-100'
            }`}>
              <CreditCard className={`h-5 w-5 ${
                status.connected ? 'text-green-600' : 'text-gray-500'
              }`} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">Status</h3>
              <p className={`text-sm ${
                status.connected ? 'text-green-600' : 'text-gray-500'
              }`}>
                {status.connected ? 'Connected' : `Not connected to ${providerName}`}
              </p>
            </div>
          </div>
          
          {!status.connected ? (
            <button
              onClick={onConnect}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Connect {providerName}
            </button>
          ) : (
            <button
              onClick={handleDisconnect}
              className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50"
            >
              Disconnect {providerName}
            </button>
          )}
        </div>

        {status.connected && (
          <div className="mt-4 p-4 bg-green-50 border border-green-100 rounded-lg">
            <div className="space-y-2">
              {status.name && (
                <p className="text-sm text-green-800">
                  <span className="font-medium">Account Name:</span> {status.name}
                </p>
              )}
              {status.email && (
                <p className="text-sm text-green-800">
                  <span className="font-medium">Email:</span> {status.email}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <DisconnectConfirmationDialog
        isOpen={showDisconnectDialog}
        onClose={() => setShowDisconnectDialog(false)}
        onConfirm={handleConfirmDisconnect}
        provider={provider}
      />
    </>
  );
}