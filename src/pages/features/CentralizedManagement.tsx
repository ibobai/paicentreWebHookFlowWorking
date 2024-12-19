import { CreditCard, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CentralizedManagementPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link to="/home" className="inline-flex items-center text-blue-600 hover:text-blue-700">
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Home
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
          <div className="flex items-center">
            <div className="p-3 bg-white/10 rounded-lg">
              <CreditCard className="h-8 w-8 text-white" />
            </div>
            <h1 className="ml-4 text-3xl font-bold text-white">
              Centralized Payment Management
            </h1>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-600 leading-relaxed">
              Our centralized payment management system brings all your payment data from multiple providers into one unified dashboard. This comprehensive solution eliminates the need to switch between different platforms and provides a single source of truth for all your payment information.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                  Real-time payment tracking across platforms
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                  Unified dashboard for Stripe and PayPal
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                  Automated payment reconciliation
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                  Custom payment categorization
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                  Multi-currency support
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3" />
                  Reduced manual data entry and errors
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3" />
                  Improved cash flow visibility
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3" />
                  Better financial decision making
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3" />
                  Time savings on reconciliation
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3" />
                  Enhanced payment security
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How It Works</h2>
            <div className="prose max-w-none text-gray-600">
              <p>
                Our system connects directly to your payment providers through secure APIs. When a payment is processed through any connected platform, it's automatically synchronized to your PaiCentre dashboard in real-time.
              </p>
              <p className="mt-4">
                The centralized management system includes:
              </p>
              <ul>
                <li>Automatic data synchronization from multiple payment providers</li>
                <li>Smart categorization of transactions based on custom rules</li>
                <li>Detailed transaction history with comprehensive search and filter options</li>
                <li>Automated reconciliation with your accounting software</li>
                <li>Custom reports and analytics for better financial insights</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}