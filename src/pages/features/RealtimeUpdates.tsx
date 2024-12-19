import { Zap, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function RealtimeUpdatesPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link to="/home" className="inline-flex items-center text-blue-600 hover:text-blue-700">
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Home
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-8">
          <div className="flex items-center">
            <div className="p-3 bg-white/10 rounded-lg">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h1 className="ml-4 text-3xl font-bold text-white">
              Real-time Transaction Updates
            </h1>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-600 leading-relaxed">
              Stay on top of your payment activity with instant updates and notifications. Our real-time monitoring system ensures you never miss a transaction and can respond quickly to any payment events.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3" />
                  Instant payment notifications
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3" />
                  Live dashboard updates
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3" />
                  Real-time status tracking
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3" />
                  Automated alerts
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3" />
                  Activity logging
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3" />
                  Immediate issue detection
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3" />
                  Faster response times
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3" />
                  Enhanced security monitoring
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3" />
                  Improved customer service
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3" />
                  Better cash flow management
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How It Works</h2>
            <div className="prose max-w-none text-gray-600">
              <p>
                Our real-time update system uses advanced webhooks and API integrations to:
              </p>
              <ul>
                <li>Monitor payment provider events in real-time</li>
                <li>Process and validate incoming transaction data instantly</li>
                <li>Update dashboard metrics and reports automatically</li>
                <li>Trigger notifications based on custom rules</li>
                <li>Maintain a detailed audit trail of all activities</li>
              </ul>
              <p className="mt-4">
                This ensures that you always have the most current view of your payment operations and can make informed decisions based on up-to-the-minute data.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}