import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { MainLayout } from './components/layout/MainLayout';
import { Dashboard } from './components/Dashboard';
import { PaymentTable } from './components/PaymentTable';
import { PaymentSummary } from './components/PaymentSummary';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { SettingsPage } from './pages/SettingsPage';
import { DataManagementPage } from './pages/settings/DataManagementPage';
import { WebhooksPage } from './pages/settings/WebhooksPage';
import { ProfilePage } from './pages/ProfilePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CentralizedManagementPage } from './pages/features/CentralizedManagement';
import { AutomatedReportsPage } from './pages/features/AutomatedReports';
import { RealtimeUpdatesPage } from './pages/features/RealtimeUpdates';
import { PlatformIntegrationPage } from './pages/features/PlatformIntegration';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { TransactionPage } from './pages/TransactionPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { ProtectedAdminRoute } from './components/auth/ProtectedAdminRoute';
import { AuthProvider } from './contexts/AuthContext';
import { AdminProvider } from './contexts/AdminContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { CurrencyProvider } from './contexts/CurrencyContext';
import { mockPayments } from './data/mockPayments';

function PaymentsPage() {
  return (
    <div className="space-y-6">
      <PaymentSummary payments={mockPayments} />
      <div className="bg-white shadow rounded-lg p-6">
        <PaymentTable payments={mockPayments} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        <LanguageProvider>
          <CurrencyProvider>
            <BrowserRouter>
              <Toaster position="top-right" />
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedAdminRoute>
                      <AdminDashboard />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/"
                  element={
                    <MainLayout>
                      <Dashboard />
                    </MainLayout>
                  }
                />
                <Route
                  path="/home"
                  element={<Navigate to="/" replace />}
                />
                <Route
                  path="/about"
                  element={
                    <MainLayout>
                      <AboutPage />
                    </MainLayout>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <MainLayout>
                      <ContactPage />
                    </MainLayout>
                  }
                />
                <Route
                  path="/features/centralized-management"
                  element={
                    <MainLayout>
                      <CentralizedManagementPage />
                    </MainLayout>
                  }
                />
                <Route
                  path="/features/automated-reports"
                  element={
                    <MainLayout>
                      <AutomatedReportsPage />
                    </MainLayout>
                  }
                />
                <Route
                  path="/features/realtime-updates"
                  element={
                    <MainLayout>
                      <RealtimeUpdatesPage />
                    </MainLayout>
                  }
                />
                <Route
                  path="/features/platform-integration"
                  element={
                    <MainLayout>
                      <PlatformIntegrationPage />
                    </MainLayout>
                  }
                />
                <Route
                  path="/payments"
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <PaymentsPage />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/transaction/:id"
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <TransactionPage />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <SettingsPage />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings/data"
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <DataManagementPage />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings/webhooks"
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <WebhooksPage />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <ProfilePage />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </BrowserRouter>
          </CurrencyProvider>
        </LanguageProvider>
      </AdminProvider>
    </AuthProvider>
  );
}