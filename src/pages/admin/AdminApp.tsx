import { useLocation } from 'react-router-dom';
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
  const location = useLocation();

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

  // Get the sub-path after /admin
  const adminPath = location.pathname.replace('/admin', '') || '/';

  // Render content based on the current admin path
  const renderContent = () => {
    switch (adminPath) {
      case '/':
      case '':
        return <DashboardPage />;
      case '/products':
        return <ProductsPage />;
      case '/orders':
        return <OrdersPage />;
      case '/customers':
        return <CustomersPage />;
      case '/settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <AdminLayout>
      {renderContent()}
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
