import { useState, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AdminAuthContext';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  Bell, 
  Search,
  Menu,
  X,
  LogOut,
  ChevronRight
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

const navItems = [
  { id: 'dashboard', path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'products', path: '/admin/products', label: 'Products', icon: Package },
  { id: 'orders', path: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { id: 'customers', path: '/admin/customers', label: 'Customers', icon: Users },
  { id: 'settings', path: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const currentPath = location.pathname;
  const currentPage = navItems.find(item => 
    item.path === currentPath || (item.path !== '/admin' && currentPath.startsWith(item.path))
  ) || navItems[0];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-[#020204] text-zinc-100" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;800&family=Rajdhani:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap');
        .font-display { font-family: 'Unbounded', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .glow-text { text-shadow: 0 0 10px rgba(0, 240, 255, 0.5), 0 0 20px rgba(0, 240, 255, 0.3); }
        .card-glow:hover { box-shadow: 0 0 20px rgba(0, 240, 255, 0.2); }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 5px rgba(0, 240, 255, 0.3); }
          50% { box-shadow: 0 0 15px rgba(0, 240, 255, 0.5); }
        }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
      `}</style>

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 bg-black/90 backdrop-blur-xl border-r border-zinc-800 z-40">
        {/* Logo */}
        <div className="p-6 border-b border-zinc-800">
          <Link to="/admin" className="block">
            <h1 className="font-display text-xl font-bold tracking-wider">
              <span className="text-[#00f0ff] glow-text">ADMIN</span>
              <span className="text-zinc-400">.PORTAL</span>
            </h1>
          </Link>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 py-6 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = item.path === currentPath || (item.path !== '/admin' && currentPath.startsWith(item.path));
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'text-[#00f0ff] bg-[#00f0ff]/10 border-l-2 border-[#00f0ff]'
                    : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/50'
                }`}
                data-testid={`nav-${item.id}`}
              >
                <item.icon size={20} />
                <span className="font-medium tracking-wide">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#7000ff] p-[2px]">
              <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center text-sm font-bold">
                {user?.email?.charAt(0).toUpperCase() || 'A'}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-zinc-200 truncate">{user?.user_metadata?.name || 'Admin'}</p>
              <p className="text-xs text-zinc-500 truncate">{user?.email}</p>
            </div>
            <button 
              onClick={handleSignOut}
              className="text-zinc-500 hover:text-[#ff0055] transition-colors"
              data-testid="logout-btn"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-black/95 backdrop-blur-xl border-b border-zinc-800 z-50 flex items-center justify-between px-4">
        <Link to="/admin">
          <h1 className="font-display text-lg font-bold">
            <span className="text-[#00f0ff]">ADMIN</span>
            <span className="text-zinc-400">.PORTAL</span>
          </h1>
        </Link>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-zinc-400 hover:text-[#00f0ff] transition-colors"
          data-testid="mobile-menu-toggle"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-16">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = item.path === currentPath || (item.path !== '/admin' && currentPath.startsWith(item.path));
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full flex items-center gap-3 px-4 py-4 rounded-lg transition-all ${
                    isActive ? 'text-[#00f0ff] bg-[#00f0ff]/10' : 'text-zinc-400'
                  }`}
                >
                  <item.icon size={22} />
                  <span className="font-medium text-lg">{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-zinc-800 mt-4">
            <button 
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-4 text-[#ff0055] rounded-lg"
            >
              <LogOut size={22} />
              <span className="font-medium text-lg">Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen pb-20 lg:pb-0">
        {/* Top Bar */}
        <div className="sticky top-16 lg:top-0 z-30 bg-[#020204]/90 backdrop-blur-md border-b border-zinc-800 px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Breadcrumb */}
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <Link to="/admin" className="text-zinc-500 hover:text-zinc-300">Admin</Link>
              <ChevronRight size={14} className="text-zinc-600" />
              <span className="text-[#00f0ff]">{currentPage.label}</span>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-zinc-300 placeholder:text-zinc-600 focus:border-[#00f0ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/30 transition-all"
                data-testid="global-search"
              />
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-3">
              <button className="relative p-2 text-zinc-400 hover:text-[#00f0ff] transition-colors" data-testid="notifications-btn">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#ff0055] rounded-full animate-pulse-glow"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-t border-zinc-800 px-2 py-2">
        <div className="flex justify-around">
          {navItems.slice(0, 4).map((item) => {
            const isActive = item.path === currentPath || (item.path !== '/admin' && currentPath.startsWith(item.path));
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                  isActive ? 'text-[#00f0ff]' : 'text-zinc-500'
                }`}
              >
                <item.icon size={20} />
                <span className="text-[10px] font-semibold tracking-wide">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
