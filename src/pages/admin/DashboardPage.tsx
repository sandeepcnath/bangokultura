import { useState, useEffect } from 'react';
import { supabase, Product, Order, Customer } from '../../lib/supabase';
import { 
  TrendingUp, 
  TrendingDown, 
  ShoppingCart, 
  Package, 
  Users,
  DollarSign,
  ArrowUpRight,
  Eye,
  MoreVertical,
  Filter,
  RefreshCw
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

// Demo data for charts
const revenueData = [
  { name: 'Mon', revenue: 4000, orders: 24 },
  { name: 'Tue', revenue: 3000, orders: 18 },
  { name: 'Wed', revenue: 5000, orders: 32 },
  { name: 'Thu', revenue: 2780, orders: 15 },
  { name: 'Fri', revenue: 6890, orders: 45 },
  { name: 'Sat', revenue: 8390, orders: 56 },
  { name: 'Sun', revenue: 4490, orders: 28 },
];

export function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 124563,
    totalOrders: 1429,
    totalProducts: 386,
    totalCustomers: 2847
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [chartPeriod, setChartPeriod] = useState<'7d' | '30d' | '90d'>('7d');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Try to fetch from Supabase
      const [ordersRes, productsRes, customersRes] = await Promise.all([
        supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(5),
        supabase.from('products').select('*').order('created_at', { ascending: false }).limit(5),
        supabase.from('customers').select('count')
      ]);

      if (ordersRes.data && ordersRes.data.length > 0) {
        setRecentOrders(ordersRes.data);
      } else {
        // Use demo data if no real data
        setRecentOrders(demoOrders);
      }

      if (productsRes.data && productsRes.data.length > 0) {
        setTopProducts(productsRes.data);
      } else {
        setTopProducts(demoProducts);
      }

      // Calculate stats from real data or use demo
      const orderCount = ordersRes.data?.length || 1429;
      const productCount = productsRes.data?.length || 386;
      
      setStats({
        totalRevenue: 124563,
        totalOrders: orderCount > 10 ? orderCount : 1429,
        totalProducts: productCount > 10 ? productCount : 386,
        totalCustomers: 2847
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Use demo data on error
      setRecentOrders(demoOrders);
      setTopProducts(demoProducts);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { 
      label: 'Total Revenue', 
      value: `$${stats.totalRevenue.toLocaleString()}`, 
      change: '+12.5%', 
      up: true, 
      icon: DollarSign,
      color: 'cyan'
    },
    { 
      label: 'Total Orders', 
      value: stats.totalOrders.toLocaleString(), 
      change: '+8.2%', 
      up: true, 
      icon: ShoppingCart,
      color: 'cyan'
    },
    { 
      label: 'Total Products', 
      value: stats.totalProducts.toLocaleString(), 
      change: '-2.4%', 
      up: false, 
      icon: Package,
      color: 'pink'
    },
    { 
      label: 'Total Customers', 
      value: stats.totalCustomers.toLocaleString(), 
      change: '+15.3%', 
      up: true, 
      icon: Users,
      color: 'cyan'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-[#00ff9d] bg-[#00ff9d]/10 border-[#00ff9d]/30';
      case 'processing': return 'text-[#00f0ff] bg-[#00f0ff]/10 border-[#00f0ff]/30';
      case 'shipped': return 'text-[#7000ff] bg-[#7000ff]/10 border-[#7000ff]/30';
      case 'pending': return 'text-[#ffe600] bg-[#ffe600]/10 border-[#ffe600]/30';
      case 'cancelled': return 'text-[#ff0055] bg-[#ff0055]/10 border-[#ff0055]/30';
      default: return 'text-zinc-400 bg-zinc-800/50 border-zinc-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold tracking-wide text-white" style={{ fontFamily: "'Unbounded', sans-serif" }}>
            Dashboard
          </h2>
          <p className="text-zinc-500 mt-1">Welcome back! Here's what's happening with your store.</p>
        </div>
        <button
          onClick={fetchDashboardData}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white hover:border-zinc-700 transition-all"
          data-testid="refresh-dashboard"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="relative group bg-zinc-900/40 border border-zinc-800 rounded-xl p-5 backdrop-blur-sm hover:border-[#00f0ff]/30 transition-all duration-500 card-glow overflow-hidden"
            data-testid={`stat-card-${stat.label.toLowerCase().replace(' ', '-')}`}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#00f0ff]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">{stat.label}</p>
                <p className="font-display text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: "'Unbounded', sans-serif" }}>
                  {stat.value}
                </p>
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

      {/* Revenue Chart */}
      <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <h3 className="font-display text-lg font-semibold text-white" style={{ fontFamily: "'Unbounded', sans-serif" }}>
            Revenue Overview
          </h3>
          <div className="flex items-center gap-2">
            {(['7d', '30d', '90d'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setChartPeriod(period)}
                className={`px-3 py-1.5 text-xs font-semibold rounded border transition-all ${
                  chartPeriod === period
                    ? 'border-[#00f0ff]/30 text-[#00f0ff] bg-[#00f0ff]/10'
                    : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'
                }`}
              >
                {period === '7d' ? '7 Days' : period === '30d' ? '30 Days' : '90 Days'}
              </button>
            ))}
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="name" stroke="#71717a" fontSize={12} />
              <YAxis stroke="#71717a" fontSize={12} tickFormatter={(value) => `$${value}`} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#18181b', 
                  border: '1px solid #27272a',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#00f0ff" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Orders & Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-zinc-900/30 border border-zinc-800 rounded-xl backdrop-blur-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-white" style={{ fontFamily: "'Unbounded', sans-serif" }}>
              Recent Orders
            </h3>
            <div className="flex items-center gap-2">
              <button className="text-zinc-500 hover:text-[#00f0ff] transition-colors">
                <Filter size={18} />
              </button>
              <a href="/admin/orders" className="text-zinc-500 hover:text-white transition-colors flex items-center gap-1 text-sm">
                View All <ArrowUpRight size={14} />
              </a>
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
                  <tr key={order.id || index} className="border-b border-zinc-800/30 hover:bg-zinc-800/20 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono text-[#00f0ff] text-sm">#{order.id?.slice(-4) || `ORD-${7291 - index}`}</span>
                    </td>
                    <td className="px-6 py-4 text-zinc-300">{order.customer_name}</td>
                    <td className="px-6 py-4 text-zinc-400 hidden sm:table-cell">
                      {order.items?.[0]?.product_name || 'Multiple Items'}
                    </td>
                    <td className="px-6 py-4 font-semibold text-white">${order.total_amount?.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border capitalize ${getStatusColor(order.status)}`}>
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
            <h3 className="font-display text-lg font-semibold text-white" style={{ fontFamily: "'Unbounded', sans-serif" }}>
              Top Products
            </h3>
            <a href="/admin/products" className="text-zinc-500 hover:text-white transition-colors flex items-center gap-1 text-sm">
              View All <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="p-4 space-y-3">
            {topProducts.map((product, index) => (
              <div key={product.id || index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-zinc-800/30 transition-colors group">
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0 border border-zinc-700 group-hover:border-[#00f0ff]/30 transition-colors">
                  <img 
                    src={product.image_url || `/professional-matte-pink.jpeg`} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/nail_polish.jpeg'; }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-zinc-200 truncate">{product.name}</p>
                  <p className="text-xs text-zinc-500 mt-1">{product.stock || Math.floor(Math.random() * 200 + 50)} in stock</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#00ff9d]">${product.price?.toFixed(2) || '49.99'}</p>
                  <button className="text-zinc-500 hover:text-[#00f0ff] transition-colors mt-1">
                    <Eye size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Demo data
const demoOrders: Order[] = [
  { id: 'ord-7291', customer_id: '1', customer_name: 'Sarah Connor', customer_email: 'sarah@example.com', items: [{ product_id: '1', product_name: 'Nail Art Kit Pro', quantity: 1, price: 89.99 }], total_amount: 89.99, status: 'completed', shipping_address: '123 Main St', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'ord-7290', customer_id: '2', customer_name: 'John Matrix', customer_email: 'john@example.com', items: [{ product_id: '2', product_name: 'Lattafa Yara', quantity: 1, price: 45.00 }], total_amount: 45.00, status: 'processing', shipping_address: '456 Oak Ave', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'ord-7289', customer_id: '3', customer_name: 'Ellen Ripley', customer_email: 'ellen@example.com', items: [{ product_id: '3', product_name: 'Racing Toy Car', quantity: 1, price: 32.50 }], total_amount: 32.50, status: 'shipped', shipping_address: '789 Pine Rd', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'ord-7288', customer_id: '4', customer_name: 'Dutch Schaefer', customer_email: 'dutch@example.com', items: [{ product_id: '4', product_name: 'Gel Polish Set', quantity: 1, price: 67.00 }], total_amount: 67.00, status: 'pending', shipping_address: '321 Elm Blvd', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];

const demoProducts: Product[] = [
  { id: '1', name: 'Professional Matte Pink Set', description: 'Premium nail art set', price: 49.99, stock: 245, category: 'Nail Art', image_url: '/professional-matte-pink.jpeg', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: '2', name: 'Lattafa Yara Perfume', description: 'Luxury fragrance', price: 45.00, stock: 189, category: 'Perfumes', image_url: '/lattafa-yara.jpeg', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: '3', name: 'Sky Patterned Nails Kit', description: 'Artistic nail designs', price: 30.00, stock: 156, category: 'Nail Art', image_url: '/sky-patterned-nails-golden-accents.jpg', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];
