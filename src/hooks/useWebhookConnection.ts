import { useState, useEffect } from 'react';
import {
  API_BASE_URL,
  WEBHOOK_URLS,
  getConnectionStatus,
  getStorageKey,
  type ConnectionStatus,
} from '../utils/webhookUtils';
import type { WebhookResponse } from '../types/webhook';
import toast from 'react-hot-toast';

export function useWebhookConnection(provider: 'stripe' | 'paypal') {
  const [status, setStatus] = useState<ConnectionStatus>(() => {
    const saved = localStorage.getItem(getStorageKey(provider));
    return saved ? JSON.parse(saved) : { connected: false };
  });

  useEffect(() => {
    const handleCallback = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const { isConnected, provider: connectedProvider } =
        getConnectionStatus(searchParams);

      if (isConnected && connectedProvider === provider) {
        const newStatus: ConnectionStatus = {
          connected: true,
          accountId: searchParams.get('client_id') || undefined,
          name: searchParams.get('name') || undefined,
          email: searchParams.get('email') || undefined,
          webhooks: [],
        };

        setStatus(newStatus);
        localStorage.setItem(
          getStorageKey(provider),
          JSON.stringify(newStatus)
        );
        toast.success(`${provider} connected successfully`);

        const newUrl = window.location.pathname;
        window.history.replaceState({}, '', newUrl);
      }
    };

    handleCallback();
  }, [provider]);

  const connect = () => {
    const url = new URL(
      provider === 'paypal'
        ? WEBHOOK_URLS.PAYPAL_CONNECT
        : WEBHOOK_URLS.STRIPE_CONNECT
    );
    url.searchParams.set('source', provider);
    window.location.href = url.toString();
  };

  const disconnect = () => {
    setStatus({ connected: false });
    localStorage.removeItem(getStorageKey(provider));
    toast.success(`${provider} disconnected successfully`);
  };

  const createWebhook = async (events: string[]) => {
    try {
      const url = `${API_BASE_URL}/api/${provider}/connection/webhook`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          events,
          provider,
        }),
      });

      console.log(url);
      console.log(
        JSON.stringify({
          events,
          provider,
        })
      );
      const data: WebhookResponse = await response.json();

      // Always show the response message
      if (data.message) {
        if (data.created) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
          return; // Exit early if webhook wasn't created
        }
      }

      // Only proceed if webhook was created successfully
      if (data.created && data.webhookInfo) {
        const updatedStatus = {
          ...status,
          webhooks: [
            ...(status.webhooks || []),
            {
              ...data.webhookInfo,
              status:
                provider === 'stripe' ? 'active' : data.webhookInfo.status,
            },
          ],
        };

        setStatus(updatedStatus);
        localStorage.setItem(
          getStorageKey(provider),
          JSON.stringify(updatedStatus)
        );
      }
    } catch (error) {
      console.error('Error creating webhook:', error);
      toast.error('Failed to create webhook. Please try again.');
    }
  };

  const deleteWebhook = async (webhookId: string) => {
    try {
      const updatedWebhooks =
        status.webhooks?.filter((w) => w.id !== webhookId) || [];
      const updatedStatus = { ...status, webhooks: updatedWebhooks };

      setStatus(updatedStatus);
      localStorage.setItem(
        getStorageKey(provider),
        JSON.stringify(updatedStatus)
      );
      toast.success('Webhook deleted successfully');
    } catch (error) {
      console.error('Error deleting webhook:', error);
      toast.error('Failed to delete webhook');
    }
  };

  return {
    status,
    connect,
    disconnect,
    createWebhook,
    deleteWebhook,
  };
}
