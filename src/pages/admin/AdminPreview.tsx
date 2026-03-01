import { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  Bell, 
  Search,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Eye,
  MoreVertical,
  Plus,
  Filter,
  Menu,
  X,
  LogOut
} from 'lucide-react';

// Design Preview Component - Cyberpunk Neon Admin Portal
export function AdminPreview() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Demo data
  const stats = [
    { label: 'Total Revenue', value: '$124,563', change: '+12.5%', up: true, icon: TrendingUp },
    { label: 'Total Orders', value: '1,429', change: '+8.2%', up: true, icon: ShoppingCart },
    { label: 'Total Products', value: '386', change: '-2.4%', up: false, icon: Package },
    { label: 'Total Customers', value: '2,847', change: '+15.3%', up: true, icon: Users },
  ];

  const recentOrders = [
    { id: '#ORD-7291', customer: 'Sarah Connor', product: 'Nail Art Kit Pro', amount: '$89.99', status: 'Completed' },
    { id: '#ORD-7290', customer: 'John Matrix', product: 'Lattafa Yara', amount: '$45.00', status: 'Processing' },
    { id: '#ORD-7289', customer: 'Ellen Ripley', product: 'Racing Toy Car', amount: '$32.50', status: 'Shipped' },
    { id: '#ORD-7288', customer: 'Dutch Schaefer', product: 'Gel Polish Set', amount: '$67.00', status: 'Pending' },
  ];

  const topProducts = [
    { name: 'Professional Matte Pink Set', sales: 245, revenue: '$12,250', image: '/professional-matte-pink.jpeg' },
    { name: 'Lattafa Yara Perfume', sales: 189, revenue: '$8,505', image: '/lattafa-yara.jpeg' },
    { name: 'Sky Patterned Nails Kit', sales: 156, revenue: '$4,680', image: '/sky-patterned-nails-golden-accents.jpg' },
  ];

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-[#00ff9d] bg-[#00ff9d]/10 border-[#00ff9d]/30';
      case 'Processing': return 'text-[#00f0ff] bg-[#00f0ff]/10 border-[#00f0ff]/30';
      case 'Shipped': return 'text-[#7000ff] bg-[#7000ff]/10 border-[#7000ff]/30';
      case 'Pending': return 'text-[#ffe600] bg-[#ffe600]/10 border-[#ffe600]/30';
      default: return 'text-zinc-400 bg-zinc-800/50 border-zinc-700';
    }
  };

  return (
    <div className="min-h-screen bg-[#020204] text-zinc-100" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
      {/* Import fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;800&family=Rajdhani:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap');
        
        .font-display { font-family: 'Unbounded', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        
        .glow-text {
          text-shadow: 0 0 10px rgba(0, 240, 255, 0.5), 0 0 20px rgba(0, 240, 255, 0.3);
        }
        
        .neon-border {
          box-shadow: 0 0 15px rgba(0, 240, 255, 0.15), inset 0 1px 0 rgba(255,255,255,0.1);
        }
        
        .card-glow:hover {
          box-shadow: 0 0 20px rgba(0, 240, 255, 0.2);
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 5px rgba(0, 240, 255, 0.3); }
          50% { box-shadow: 0 0 15px rgba(0, 240, 255, 0.5); }
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 bg-black/90 backdrop-blur-xl border-r border-zinc-800 z-40">
        {/* Logo */}
        <div className="p-6 border-b border-zinc-800">
          <h1 className="font-display text-xl font-bold tracking-wider">
            <span className="text-[#00f0ff] glow-text">ADMIN</span>
            <span className="text-zinc-400">.PORTAL</span>
          </h1>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 py-6 px-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                activeNav === item.id
                  ? 'text-[#00f0ff] bg-[#00f0ff]/10 border-l-2 border-[#00f0ff]'
                  : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/50'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium tracking-wide">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#7000ff] p-[2px]">
              <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center text-sm font-bold">
                AD
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-zinc-200">Admin User</p>
              <p className="text-xs text-zinc-500">admin@store.com</p>
            </div>
            <button className="text-zinc-500 hover:text-[#ff0055] transition-colors">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-black/95 backdrop-blur-xl border-b border-zinc-800 z-50 flex items-center justify-between px-4">
        <h1 className="font-display text-lg font-bold">
          <span className="text-[#00f0ff]">ADMIN</span>
          <span className="text-zinc-400">.PORTAL</span>
        </h1>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-zinc-400 hover:text-[#00f0ff] transition-colors"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-16">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveNav(item.id); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-4 rounded-lg transition-all ${
                  activeNav === item.id
                    ? 'text-[#00f0ff] bg-[#00f0ff]/10'
                    : 'text-zinc-400'
                }`}
              >
                <item.icon size={22} />
                <span className="font-medium text-lg">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        {/* Top Bar */}
        <div className="sticky top-0 lg:top-0 z-30 bg-[#020204]/90 backdrop-blur-md border-b border-zinc-800 px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Search */}
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input
                type="text"
                placeholder="Search products, orders, customers..."
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-zinc-300 placeholder:text-zinc-600 focus:border-[#00f0ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/30 transition-all"
              />
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-3">
              <button className="relative p-2 text-zinc-400 hover:text-[#00f0ff] transition-colors">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#ff0055] rounded-full animate-pulse-glow"></span>
              </button>
              <button className="hidden sm:flex items-center gap-2 bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] px-4 py-2 rounded-lg font-semibold text-sm tracking-wide hover:bg-[#00f0ff] hover:text-black transition-all duration-300">
                <Plus size={18} />
                Add Product
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Page Title */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold tracking-wide text-white">
                Dashboard
              </h2>
              <p className="text-zinc-500 mt-1">Welcome back! Here's what's happening with your store.</p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm">
              <span className="text-zinc-500">Last updated:</span>
              <span className="text-[#00f0ff] font-mono">2 min ago</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="relative group bg-zinc-900/40 border border-zinc-800 rounded-xl p-5 backdrop-blur-sm hover:border-[#00f0ff]/30 transition-all duration-500 card-glow overflow-hidden"
              >
                {/* Gradient accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#00f0ff]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">{stat.label}</p>
                    <p className="font-display text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                    <div className={`flex items-center gap-1 mt-2 text-sm ${stat.up ? 'text-[#00ff9d]' : 'text-[#ff0055]'}`}>
                      {stat.up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      <span className="font-semibold">{stat.change}</span>
                      <span className="text-zinc-500 ml-1">vs last month</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.up ? 'bg-[#00f0ff]/10 text-[#00f0ff]' : 'bg-[#ff0055]/10 text-[#ff0055]'}`}>
                    <stat.icon size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Grid - Orders & Products */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Orders */}
            <div className="lg:col-span-2 bg-zinc-900/30 border border-zinc-800 rounded-xl backdrop-blur-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-white">Recent Orders</h3>
                <div className="flex items-center gap-2">
                  <button className="text-zinc-500 hover:text-[#00f0ff] transition-colors">
                    <Filter size={18} />
                  </button>
                  <button className="text-zinc-500 hover:text-white transition-colors flex items-center gap-1 text-sm">
                    View All <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs font-bold uppercase tracking-[0.15em] text-zinc-500 border-b border-zinc-800/50">
                      <th className="px-6 py-3">Order ID</th>
                      <th className="px-6 py-3">Customer</th>
                      <th className="px-6 py-3 hidden sm:table-cell">Product</th>
                      <th className="px-6 py-3">Amount</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, index) => (
                      <tr key={index} className="border-b border-zinc-800/30 hover:bg-zinc-800/20 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-mono text-[#00f0ff] text-sm">{order.id}</span>
                        </td>
                        <td className="px-6 py-4 text-zinc-300">{order.customer}</td>
                        <td className="px-6 py-4 text-zinc-400 hidden sm:table-cell">{order.product}</td>
                        <td className="px-6 py-4 font-semibold text-white">{order.amount}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-zinc-500 hover:text-white transition-colors">
                            <MoreVertical size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl backdrop-blur-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-white">Top Products</h3>
                <button className="text-zinc-500 hover:text-white transition-colors flex items-center gap-1 text-sm">
                  View All <ArrowUpRight size={14} />
                </button>
              </div>
              <div className="p-4 space-y-3">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-zinc-800/30 transition-colors group">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0 border border-zinc-700 group-hover:border-[#00f0ff]/30 transition-colors">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-zinc-200 truncate">{product.name}</p>
                      <p className="text-xs text-zinc-500 mt-1">{product.sales} sales</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#00ff9d]">{product.revenue}</p>
                      <button className="text-zinc-500 hover:text-[#00f0ff] transition-colors mt-1">
                        <Eye size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-lg font-semibold text-white">Revenue Overview</h3>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-xs font-semibold rounded border border-[#00f0ff]/30 text-[#00f0ff] bg-[#00f0ff]/10">7 Days</button>
                <button className="px-3 py-1.5 text-xs font-semibold rounded border border-zinc-700 text-zinc-400 hover:border-zinc-600">30 Days</button>
                <button className="px-3 py-1.5 text-xs font-semibold rounded border border-zinc-700 text-zinc-400 hover:border-zinc-600">90 Days</button>
              </div>
            </div>
            {/* Chart Area */}
            <div className="h-64 flex items-center justify-center border border-dashed border-zinc-700 rounded-lg">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#00f0ff]/20 to-[#7000ff]/20 flex items-center justify-center">
                  <TrendingUp className="text-[#00f0ff]" size={28} />
                </div>
                <p className="text-zinc-400 text-sm">Revenue chart will be rendered here</p>
                <p className="text-zinc-600 text-xs mt-1">Interactive charts with Recharts</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-t border-zinc-800 px-2 py-2">
        <div className="flex justify-around">
          {navItems.slice(0, 4).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                activeNav === item.id
                  ? 'text-[#00f0ff]'
                  : 'text-zinc-500'
              }`}
            >
              <item.icon size={20} />
              <span className="text-[10px] font-semibold tracking-wide">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
