import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth, AuthProvider } from '../../context/AdminAuthContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { LoginPage } from './LoginPage';
import { DashboardPage } from './DashboardPage';
import { ProductsPage } from './ProductsPage';
import { OrdersPage } from './OrdersPage';
import { CustomersPage } from './CustomersPage';
import { SettingsPage } from './SettingsPage';
import { Loader2 } from 'lucide-react';

function AdminContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020204] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#00f0ff] mx-auto" />
          <p className="text-zinc-500 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  );
}

export function AdminApp() {
  return (
    <AuthProvider>
      <AdminContent />
    </AuthProvider>
  );
}
