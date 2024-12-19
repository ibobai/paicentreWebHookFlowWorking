import { useState } from 'react';
import { Save, X } from 'lucide-react';
import { Dialog, Transition } from '@headlessui/react';
import { useLanguage } from '../contexts/LanguageContext';

interface PaymentSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ExportSettings {
  defaultExportLocation: string;
  defaultExportName: string;
}

export function PaymentSettings({ isOpen, onClose }: PaymentSettingsProps) {
  const { t } = useLanguage();
  const [settings, setSettings] = useState<ExportSettings>(() => {
    const saved = localStorage.getItem('exportSettings');
    return saved ? JSON.parse(saved) : {
      defaultExportLocation: '',
      defaultExportName: ''
    };
  });

  const handleSave = () => {
    localStorage.setItem('exportSettings', JSON.stringify(settings));
    onClose();
  };

  return (
    <Transition show={isOpen} as="div">
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
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title className="text-lg font-medium">
                    {t('payments.settings')}
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('payments.defaultExportLocation')}
                    </label>
                    <input
                      type="text"
                      value={settings.defaultExportLocation}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        defaultExportLocation: e.target.value
                      }))}
                      placeholder={t('payments.enterExportLocation')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      {t('payments.exportLocationHint')}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('payments.defaultExportName')}
                    </label>
                    <input
                      type="text"
                      value={settings.defaultExportName}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        defaultExportName: e.target.value
                      }))}
                      placeholder={t('payments.enterExportName')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-6">
                    <button
                      onClick={onClose}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      {t('common.cancel')}
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                    >
                      <Save size={16} className="mr-2" />
                      {t('common.save')}
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}