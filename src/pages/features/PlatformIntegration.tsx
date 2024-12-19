import { Link as LinkIcon, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PlatformIntegrationPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link to="/home" className="inline-flex items-center text-blue-600 hover:text-blue-700">
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Home
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-8">
          <div className="flex items-center">
            <div className="p-3 bg-white/10 rounded-lg">
              <LinkIcon className="h-8 w-8 text-white" />
            </div>
            <h1 className="ml-4 text-3xl font-bold text-white">
              Seamless Platform Integration
            </h1>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-600 leading-relaxed">
              Connect your payment providers effortlessly with our robust integration system. Our platform provides seamless connectivity with major payment processors and can be customized to work with your existing business tools.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Supported Integrations</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-3" />
                  Stripe API integration
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-3" />
                  PayPal API connectivity
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-3" />
                  Webhook support
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-3" />
                  Custom API endpoints
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-3" />
                  Third-party app connections
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-3" />
                  Easy setup process
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-3" />
                  Secure data transfer
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-3" />
                  Automated synchronization
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-3" />
                  Error handling
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-3" />
                  Integration monitoring
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How It Works</h2>
            <div className="prose max-w-none text-gray-600">
              <p>
                Our platform integration system provides:
              </p>
              <ul>
                <li>Simple API key management for different payment providers</li>
                <li>Automated data synchronization between platforms</li>
                <li>Real-time event processing through webhooks</li>
                <li>Secure credential storage and management</li>
                <li>Comprehensive integration monitoring and logging</li>
              </ul>
              <p className="mt-4">
                The integration process is designed to be straightforward while maintaining the highest security standards. Our system handles all the complexity of connecting different platforms, allowing you to focus on your business operations.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}