import { AuthLayout } from '../components/auth/AuthLayout';
import { LoginForm } from '../components/auth/LoginForm';

export function LoginPage() {
  return (
    <AuthLayout title="Sign in to PaiCentre">
      <LoginForm />
    </AuthLayout>
  );
}