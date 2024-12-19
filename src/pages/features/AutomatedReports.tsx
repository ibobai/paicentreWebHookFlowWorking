import { FileSpreadsheet, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AutomatedReportsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link to="/home" className="inline-flex items-center text-blue-600 hover:text-blue-700">
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Home
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-8">
          <div className="flex items-center">
            <div className="p-3 bg-white/10 rounded-lg">
              <FileSpreadsheet className="h-8 w-8 text-white" />
            </div>
            <h1 className="ml-4 text-3xl font-bold text-white">
              Automated Excel Reports
            </h1>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-600 leading-relaxed">
              Our automated reporting system transforms your payment data into actionable insights through customizable Excel reports. Save time and eliminate manual data entry with automated report generation that keeps your financial records up-to-date and accurate.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Report Types</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3" />
                  Daily transaction summaries
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3" />
                  Monthly revenue analysis
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3" />
                  Provider performance comparisons
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3" />
                  Custom period reports
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3" />
                  Trend analysis reports
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3" />
                  Customizable templates
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3" />
                  Scheduled report generation
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3" />
                  Multiple export formats
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3" />
                  Automated email delivery
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3" />
                  Data validation checks
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How It Works</h2>
            <div className="prose max-w-none text-gray-600">
              <p>
                Our automated reporting system allows you to:
              </p>
              <ul>
                <li>Create custom report templates with your preferred metrics and layouts</li>
                <li>Schedule automatic report generation at your chosen intervals</li>
                <li>Export reports in multiple formats (Excel, CSV, PDF)</li>
                <li>Set up automated email delivery to stakeholders</li>
                <li>Configure data validation rules to ensure accuracy</li>
              </ul>
              <p className="mt-4">
                The system automatically processes your payment data according to your specifications, ensuring you always have the most up-to-date financial information at your fingertips.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}