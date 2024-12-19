import { Lightbulb, Shield, CheckCircle2, Eye } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function AboutPage() {
  const { t } = useLanguage();

  const values = [
    { icon: <Lightbulb className="h-8 w-8 text-blue-600" />, key: 'innovation' },
    { icon: <Shield className="h-8 w-8 text-green-600" />, key: 'security' },
    { icon: <CheckCircle2 className="h-8 w-8 text-purple-600" />, key: 'reliability' },
    { icon: <Eye className="h-8 w-8 text-yellow-600" />, key: 'transparency' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t('about.title')}
        </h1>
        <p className="text-xl text-gray-600">
          {t('about.description')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t('about.mission')}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {t('about.missionText')}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t('about.vision')}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {t('about.visionText')}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          {t('about.values')}
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          {values.map(({ icon, key }) => (
            <div key={key} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
                {icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {t(`about.valuesList.${key}`)}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}