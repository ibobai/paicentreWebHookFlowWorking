import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Webhook, X } from 'lucide-react';

interface CreateWebhookDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (events: string[]) => Promise<void>;
  provider: 'stripe' | 'paypal';
}

const STRIPE_EVENTS = [
  { value: 'payment_intent.succeeded', label: 'Payment Intent Succeeded' },
  { value: 'checkout.session.completed', label: 'Checkout Session Completed' },
  { value: 'invoice.payment_failed', label: 'Invoice Payment Failed' }
];

const PAYPAL_EVENTS = [
  { value: 'PAYMENT.SALE.COMPLETED', label: 'Payment Sale Completed' },
  { value: 'BILLING.SUBSCRIPTION.CREATED', label: 'Billing Subscription Created' },
  { value: 'CHECKOUT.ORDER.APPROVED', label: 'Checkout Order Approved' }
];

export function CreateWebhookDialog({
  isOpen,
  onClose,
  onConfirm,
  provider
}: CreateWebhookDialogProps) {
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const events = provider === 'stripe' ? STRIPE_EVENTS : PAYPAL_EVENTS;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEvents.length > 0) {
      await onConfirm(selectedEvents);
      onClose();
      setSelectedEvents([]);
    }
  };

  const handleEventToggle = (event: string) => {
    setSelectedEvents(prev => 
      prev.includes(event)
        ? prev.filter(e => e !== event)
        : [...prev, event]
    );
  };

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Webhook className="h-6 w-6 text-blue-600 mr-2" />
                    <Dialog.Title className="text-lg font-medium text-gray-900">
                      Create New Webhook
                    </Dialog.Title>
                  </div>
                  <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Events
                    </label>
                    <div className="space-y-2 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-2">
                      {events.map((event) => (
                        <label
                          key={event.value}
                          className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedEvents.includes(event.value)}
                            onChange={() => handleEventToggle(event.value)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-900">{event.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                      disabled={selectedEvents.length === 0}
                    >
                      Create Webhook
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}