import React from 'react';
import { CreditCard, FileSpreadsheet, Zap, Link as LinkIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

export function Dashboard() {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-6 md:p-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t('dashboard.welcome')}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-6">
              {t('dashboard.subtitle')}
            </p>
            <p className="text-blue-100 text-base md:text-lg leading-relaxed">
              {t('dashboard.description')}
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Happy accountant using PaiCentre"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard
          icon={<CreditCard className="h-8 w-8 text-blue-600" />}
          title={t('dashboard.features.centralization')}
          details={[
            'Unified payment tracking',
            'Multi-provider support',
            'Real-time synchronization',
            'Automated reconciliation',
            'Custom categorization'
          ]}
          color="blue"
          link="/features/centralized-management"
        />
        <FeatureCard
          icon={<FileSpreadsheet className="h-8 w-8 text-green-600" />}
          title={t('dashboard.features.automation')}
          details={[
            'Automated report generation',
            'Multiple export formats',
            'Scheduled reporting',
            'Custom templates',
            'Data validation'
          ]}
          color="green"
          link="/features/automated-reports"
        />
        <FeatureCard
          icon={<Zap className="h-8 w-8 text-yellow-600" />}
          title={t('dashboard.features.realtime')}
          details={[
            'Instant notifications',
            'Live status updates',
            'Real-time monitoring',
            'Transaction alerts',
            'Activity logging'
          ]}
          color="yellow"
          link="/features/realtime-updates"
        />
        <FeatureCard
          icon={<LinkIcon className="h-8 w-8 text-purple-600" />}
          title={t('dashboard.features.integration')}
          details={[
            'API integration',
            'Webhook support',
            'Third-party connections',
            'Custom workflows',
            'Secure sync'
          ]}
          color="purple"
          link="/features/platform-integration"
        />
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  details: string[];
  color: 'blue' | 'green' | 'yellow' | 'purple';
  link: string;
}

function FeatureCard({ icon, title, details, color, link }: FeatureCardProps) {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-100',
      hover: 'hover:border-blue-200'
    },
    green: {
      bg: 'bg-green-50',
      text: 'text-green-600',
      border: 'border-green-100',
      hover: 'hover:border-green-200'
    },
    yellow: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-600',
      border: 'border-yellow-100',
      hover: 'hover:border-yellow-200'
    },
    purple: {
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-100',
      hover: 'hover:border-purple-200'
    }
  };

  return (
    <div className="h-[300px] perspective-1000 group">
      <div className="relative w-full h-full transition-transform duration-500 transform-style-3d group-hover:rotate-y-180">
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden">
          <div className={`h-full bg-white rounded-xl shadow-lg p-6 md:p-8 border ${colorClasses[color].border} ${colorClasses[color].hover} transition-colors flex flex-col items-center justify-center text-center`}>
            <div className={`mb-4 p-3 ${colorClasses[color].bg} rounded-full`}>
              {icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {title}
            </h3>
            <Link
              to={link}
              className={`text-sm font-medium ${colorClasses[color].text} hover:underline`}
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <div className={`h-full bg-white rounded-xl shadow-lg p-6 border ${colorClasses[color].border} ${colorClasses[color].hover} transition-colors`}>
            <h3 className={`text-lg font-semibold ${colorClasses[color].text} mb-4 pb-2 border-b ${colorClasses[color].border}`}>
              {title}
            </h3>
            <ul className="space-y-2 mb-4">
              {details.map((detail, index) => (
                <li key={index} className="flex items-center">
                  <div className={`w-2 h-2 rounded-full ${colorClasses[color].bg} mr-3 flex-shrink-0`} />
                  <span className="text-gray-700 text-sm font-medium">
                    {detail}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              to={link}
              className={`text-sm font-medium ${colorClasses[color].text} hover:underline mt-auto block text-center`}
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}