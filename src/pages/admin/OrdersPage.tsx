import { useState, useEffect } from 'react';
import { supabase, type Order } from '../../lib/supabase';
import { 
  Search, 
  Filter, 
  Eye, 
  Loader2,
  Package,
  ChevronDown,
  X,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw
} from 'lucide-react';

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  const statuses = ['pending', 'processing', 'shipped', 'completed', 'cancelled'];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      if (data && data.length > 0) {
        setOrders(data);
      } else {
        setOrders(demoOrders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders(demoOrders);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    setUpdatingStatus(orderId);
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', orderId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating status:', error);
    }
    
    // Update local state regardless
    setOrders(orders.map(o => 
      o.id === orderId ? { ...o, status: newStatus, updated_at: new Date().toISOString() } : o
    ));
    setUpdatingStatus(null);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer_email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return { icon: CheckCircle, color: 'text-[#00ff9d]', bg: 'bg-[#00ff9d]/10', border: 'border-[#00ff9d]/30' };
      case 'processing':
        return { icon: RefreshCw, color: 'text-[#00f0ff]', bg: 'bg-[#00f0ff]/10', border: 'border-[#00f0ff]/30' };
      case 'shipped':
        return { icon: Truck, color: 'text-[#7000ff]', bg: 'bg-[#7000ff]/10', border: 'border-[#7000ff]/30' };
      case 'pending':
        return { icon: Clock, color: 'text-[#ffe600]', bg: 'bg-[#ffe600]/10', border: 'border-[#ffe600]/30' };
      case 'cancelled':
        return { icon: XCircle, color: 'text-[#ff0055]', bg: 'bg-[#ff0055]/10', border: 'border-[#ff0055]/30' };
      default:
        return { icon: Clock, color: 'text-zinc-400', bg: 'bg-zinc-800/50', border: 'border-zinc-700' };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    completed: orders.filter(o => o.status === 'completed').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold tracking-wide text-white" style={{ fontFamily: "'Unbounded', sans-serif" }}>
            Orders
          </h2>
          <p className="text-zinc-500 mt-1">Track and manage customer orders</p>
        </div>
        <button
          onClick={fetchOrders}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white hover:border-zinc-700 transition-all"
          data-testid="refresh-orders"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: 'Total', value: orderStats.total, color: 'text-white' },
          { label: 'Pending', value: orderStats.pending, color: 'text-[#ffe600]' },
          { label: 'Processing', value: orderStats.processing, color: 'text-[#00f0ff]' },
          { label: 'Shipped', value: orderStats.shipped, color: 'text-[#7000ff]' },
          { label: 'Completed', value: orderStats.completed, color: 'text-[#00ff9d]' },
        ].map((stat) => (
          <div key={stat.label} className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-4">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-500">{stat.label}</p>
            <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by order ID, customer name or email..."
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-zinc-300 placeholder:text-zinc-600 focus:border-[#00f0ff]/50 focus:outline-none transition-all"
            data-testid="order-search"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-zinc-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-300 focus:border-[#00f0ff]/50 focus:outline-none transition-all"
            data-testid="status-filter"
          >
            <option value="all">All Status</option>
            {statuses.map(status => (
              <option key={status} value={status} className="capitalize">{status.charAt(0).toUpperCase() + status.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#00f0ff]" />
        </div>
      ) : (
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-bold uppercase tracking-[0.15em] text-zinc-500 border-b border-zinc-800">
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4 hidden md:table-cell">Items</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 hidden lg:table-cell">Date</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => {
                  const statusConfig = getStatusConfig(order.status);
                  return (
                    <tr key={order.id} className="border-b border-zinc-800/30 hover:bg-zinc-800/20 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono text-[#00f0ff] text-sm">#{order.id.slice(-6)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-zinc-200 font-medium">{order.customer_name}</p>
                          <p className="text-zinc-500 text-xs">{order.customer_email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="text-zinc-400">{order.items?.length || 1} item(s)</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white font-semibold">${order.total_amount.toFixed(2)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="relative">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                            disabled={updatingStatus === order.id}
                            className={`appearance-none px-3 py-1.5 pr-8 rounded-full text-xs font-semibold border ${statusConfig.bg} ${statusConfig.border} ${statusConfig.color} cursor-pointer focus:outline-none`}
                            data-testid={`order-status-${order.id}`}
                          >
                            {statuses.map(s => (
                              <option key={s} value={s} className="bg-zinc-900 text-zinc-200">
                                {s.charAt(0).toUpperCase() + s.slice(1)}
                              </option>
                            ))}
                          </select>
                          <ChevronDown size={12} className={`absolute right-2 top-1/2 -translate-y-1/2 ${statusConfig.color} pointer-events-none`} />
                          {updatingStatus === order.id && (
                            <Loader2 size={12} className="absolute right-2 top-1/2 -translate-y-1/2 animate-spin text-[#00f0ff]" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <span className="text-zinc-500 text-sm">{formatDate(order.created_at)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 text-zinc-500 hover:text-[#00f0ff] transition-colors rounded-lg hover:bg-zinc-800"
                          data-testid={`view-order-${order.id}`}
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredOrders.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Package className="w-16 h-16 text-zinc-700 mb-4" />
          <h3 className="text-xl font-semibold text-zinc-400">No orders found</h3>
          <p className="text-zinc-600 mt-2">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <div>
                <h3 className="font-display text-xl font-semibold text-white" style={{ fontFamily: "'Unbounded', sans-serif" }}>
                  Order Details
                </h3>
                <p className="text-[#00f0ff] font-mono mt-1">#{selectedOrder.id.slice(-6)}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-zinc-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div className="bg-zinc-800/30 rounded-lg p-4">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-3">Customer Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-zinc-500 text-sm">Name</p>
                    <p className="text-white font-medium">{selectedOrder.customer_name}</p>
                  </div>
                  <div>
                    <p className="text-zinc-500 text-sm">Email</p>
                    <p className="text-white font-medium">{selectedOrder.customer_email}</p>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-zinc-800/30 rounded-lg p-4">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-3">Shipping Address</h4>
                <p className="text-white">{selectedOrder.shipping_address}</p>
              </div>

              {/* Order Items */}
              <div className="bg-zinc-800/30 rounded-lg p-4">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-3">Order Items</h4>
                <div className="space-y-3">
                  {selectedOrder.items?.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-zinc-700 last:border-0">
                      <div>
                        <p className="text-white font-medium">{item.product_name}</p>
                        <p className="text-zinc-500 text-sm">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-[#00f0ff] font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-700">
                  <p className="text-zinc-400 font-semibold">Total</p>
                  <p className="text-2xl font-bold text-[#00ff9d]">${selectedOrder.total_amount.toFixed(2)}</p>
                </div>
              </div>

              {/* Status & Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-800/30 rounded-lg p-4">
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">Status</h4>
                  <span className={`inline-flex px-3 py-1.5 rounded-full text-sm font-semibold border capitalize ${getStatusConfig(selectedOrder.status).bg} ${getStatusConfig(selectedOrder.status).border} ${getStatusConfig(selectedOrder.status).color}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <div className="bg-zinc-800/30 rounded-lg p-4">
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">Order Date</h4>
                  <p className="text-white">{formatDate(selectedOrder.created_at)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Demo orders
const demoOrders: Order[] = [
  { 
    id: 'ord-001-7291', 
    customer_id: '1', 
    customer_name: 'Sarah Connor', 
    customer_email: 'sarah@example.com', 
    items: [
      { product_id: '1', product_name: 'Professional Matte Pink Set', quantity: 1, price: 49.99 },
      { product_id: '2', product_name: 'Nail Polish Remover', quantity: 2, price: 12.50 }
    ], 
    total_amount: 74.99, 
    status: 'completed', 
    shipping_address: '123 Main Street, Los Angeles, CA 90001', 
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), 
    updated_at: new Date().toISOString() 
  },
  { 
    id: 'ord-002-7290', 
    customer_id: '2', 
    customer_name: 'John Matrix', 
    customer_email: 'john.matrix@example.com', 
    items: [{ product_id: '2', product_name: 'Lattafa Yara Perfume', quantity: 1, price: 45.00 }], 
    total_amount: 45.00, 
    status: 'processing', 
    shipping_address: '456 Oak Avenue, New York, NY 10001', 
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), 
    updated_at: new Date().toISOString() 
  },
  { 
    id: 'ord-003-7289', 
    customer_id: '3', 
    customer_name: 'Ellen Ripley', 
    customer_email: 'ellen.ripley@example.com', 
    items: [{ product_id: '3', product_name: 'Racing Toy Car', quantity: 2, price: 32.50 }], 
    total_amount: 65.00, 
    status: 'shipped', 
    shipping_address: '789 Pine Road, Chicago, IL 60601', 
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), 
    updated_at: new Date().toISOString() 
  },
  { 
    id: 'ord-004-7288', 
    customer_id: '4', 
    customer_name: 'Dutch Schaefer', 
    customer_email: 'dutch@example.com', 
    items: [{ product_id: '4', product_name: 'Gel Polish Set', quantity: 1, price: 67.00 }], 
    total_amount: 67.00, 
    status: 'pending', 
    shipping_address: '321 Elm Boulevard, Miami, FL 33101', 
    created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), 
    updated_at: new Date().toISOString() 
  },
  { 
    id: 'ord-005-7287', 
    customer_id: '5', 
    customer_name: 'Kyle Reese', 
    customer_email: 'kyle.reese@example.com', 
    items: [
      { product_id: '5', product_name: 'Ameerat Al Arab', quantity: 1, price: 55.00 },
      { product_id: '7', product_name: 'Green Floral Nails', quantity: 1, price: 35.00 }
    ], 
    total_amount: 90.00, 
    status: 'pending', 
    shipping_address: '555 Cedar Lane, Seattle, WA 98101', 
    created_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(), 
    updated_at: new Date().toISOString() 
  },
  { 
    id: 'ord-006-7286', 
    customer_id: '6', 
    customer_name: 'Tony Montana', 
    customer_email: 'tony@example.com', 
    items: [{ product_id: '8', product_name: 'Puzzle Cube', quantity: 3, price: 15.99 }], 
    total_amount: 47.97, 
    status: 'cancelled', 
    shipping_address: '777 Palm Street, Las Vegas, NV 89101', 
    created_at: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(), 
    updated_at: new Date().toISOString() 
  },
];
