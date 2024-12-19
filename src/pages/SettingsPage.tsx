import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { Globe2, DollarSign, Bell, Shield, Database, Webhook } from 'lucide-react';
import { CollapsibleSection } from '../components/settings/CollapsibleSection';
import toast from 'react-hot-toast';

export function SettingsPage() {
  const { language, setLanguage } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const [emailNotifications, setEmailNotifications] = useState(() => {
    return localStorage.getItem('emailNotifications') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('emailNotifications', emailNotifications.toString());
  }, [emailNotifications]);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage as 'en' | 'fr' | 'ar');
    toast.success('Language updated successfully');
  };

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency as 'USD' | 'EUR');
    toast.success('Currency updated successfully');
  };

  const handleEmailNotificationsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailNotifications(e.target.checked);
    toast.success(`Email notifications ${e.target.checked ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Settings</h1>

      <div className="space-y-6">
        <CollapsibleSection
          title="Language"
          icon={<Globe2 className="h-6 w-6" />}
        >
          <div className="space-y-2">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                checked={language === 'en'}
                onChange={() => handleLanguageChange('en')}
                className="form-radio text-blue-600"
              />
              <span>English</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                checked={language === 'fr'}
                onChange={() => handleLanguageChange('fr')}
                className="form-radio text-blue-600"
              />
              <span>Français</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                checked={language === 'ar'}
                onChange={() => handleLanguageChange('ar')}
                className="form-radio text-blue-600"
              />
              <span>العربية</span>
            </label>
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          title="Currency"
          icon={<DollarSign className="h-6 w-6" />}
        >
          <div className="space-y-2">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                checked={currency === 'USD'}
                onChange={() => handleCurrencyChange('USD')}
                className="form-radio text-blue-600"
              />
              <span>USD ($)</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                checked={currency === 'EUR'}
                onChange={() => handleCurrencyChange('EUR')}
                className="form-radio text-blue-600"
              />
              <span>EUR (€)</span>
            </label>
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          title="Notifications"
          icon={<Bell className="h-6 w-6" />}
        >
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={handleEmailNotificationsChange}
                className="form-checkbox text-blue-600 rounded"
              />
              <span>Email notifications for new payments</span>
            </label>
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          title="Data Management"
          icon={<Database className="h-6 w-6" />}
        >
          <div className="space-y-4">
            <p className="text-gray-600">
              Manage your data, backups, and Excel file settings.
            </p>
            <Link
              to="/settings/data"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <Database className="h-5 w-5 mr-2" />
              Open Data Management
            </Link>
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          title="Payment Webhooks"
          icon={<Webhook className="h-6 w-6" />}
        >
          <div className="space-y-4">
            <p className="text-gray-600">
              Configure webhooks for Stripe and PayPal integrations.
            </p>
            <Link
              to="/settings/webhooks"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <Webhook className="h-5 w-5 mr-2" />
              Configure Webhooks
            </Link>
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          title="Security"
          icon={<Shield className="h-6 w-6" />}
        >
          <div className="space-y-4">
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md">
              Change Password
            </button>
            <button className="ml-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md">
              Enable Two-Factor Authentication
            </button>
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
}