import { useState, useEffect } from 'react';
import { supabase, Customer } from '../../lib/supabase';
import { 
  Search, 
  Filter, 
  Eye, 
  Loader2,
  Users,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  DollarSign,
  X,
  RefreshCw,
  UserPlus
} from 'lucide-react';

export function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      if (data && data.length > 0) {
        setCustomers(data);
      } else {
        setCustomers(demoCustomers);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      setCustomers(demoCustomers);
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const searchLower = searchQuery.toLowerCase();
    return (
      customer.name.toLowerCase().includes(searchLower) ||
      customer.email.toLowerCase().includes(searchLower) ||
      customer.phone?.includes(searchQuery)
    );
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const stats = {
    total: customers.length,
    totalSpent: customers.reduce((sum, c) => sum + c.total_spent, 0),
    totalOrders: customers.reduce((sum, c) => sum + c.total_orders, 0),
    avgOrderValue: customers.length > 0 
      ? customers.reduce((sum, c) => sum + c.total_spent, 0) / customers.reduce((sum, c) => sum + c.total_orders, 0) 
      : 0
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold tracking-wide text-white" style={{ fontFamily: "'Unbounded', sans-serif" }}>
            Customers
          </h2>
          <p className="text-zinc-500 mt-1">View and manage your customer base</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchCustomers}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white hover:border-zinc-700 transition-all"
            data-testid="refresh-customers"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-[#00f0ff]/10">
              <Users className="text-[#00f0ff]" size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-500">Total Customers</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-[#00ff9d]/10">
              <DollarSign className="text-[#00ff9d]" size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-500">Total Revenue</p>
              <p className="text-2xl font-bold text-white">${stats.totalSpent.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-[#7000ff]/10">
              <ShoppingBag className="text-[#7000ff]" size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-500">Total Orders</p>
              <p className="text-2xl font-bold text-white">{stats.totalOrders}</p>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-[#ffe600]/10">
              <DollarSign className="text-[#ffe600]" size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-500">Avg. Order Value</p>
              <p className="text-2xl font-bold text-white">${stats.avgOrderValue.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email or phone..."
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-zinc-300 placeholder:text-zinc-600 focus:border-[#00f0ff]/50 focus:outline-none transition-all"
            data-testid="customer-search"
          />
        </div>
      </div>

      {/* Customers Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#00f0ff]" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5 hover:border-[#00f0ff]/30 transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedCustomer(customer)}
              data-testid={`customer-card-${customer.id}`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#7000ff] p-[2px] flex-shrink-0">
                  <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center text-lg font-bold text-white">
                    {customer.name.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold truncate group-hover:text-[#00f0ff] transition-colors">
                    {customer.name}
                  </h3>
                  <p className="text-zinc-500 text-sm truncate">{customer.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-zinc-800">
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider">Orders</p>
                  <p className="text-lg font-bold text-white">{customer.total_orders}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider">Total Spent</p>
                  <p className="text-lg font-bold text-[#00ff9d]">${customer.total_spent.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-800">
                <span className="text-xs text-zinc-500">Customer since {formatDate(customer.created_at)}</span>
                <button 
                  className="text-zinc-500 hover:text-[#00f0ff] transition-colors"
                  onClick={(e) => { e.stopPropagation(); setSelectedCustomer(customer); }}
                >
                  <Eye size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredCustomers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Users className="w-16 h-16 text-zinc-700 mb-4" />
          <h3 className="text-xl font-semibold text-zinc-400">No customers found</h3>
          <p className="text-zinc-600 mt-2">Try adjusting your search</p>
        </div>
      )}

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <h3 className="font-display text-xl font-semibold text-white" style={{ fontFamily: "'Unbounded', sans-serif" }}>
                Customer Details
              </h3>
              <button onClick={() => setSelectedCustomer(null)} className="text-zinc-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Profile Header */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#7000ff] p-[2px]">
                  <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center text-2xl font-bold text-white">
                    {selectedCustomer.name.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white">{selectedCustomer.name}</h4>
                  <p className="text-zinc-500">Customer since {formatDate(selectedCustomer.created_at)}</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-zinc-300">
                  <Mail size={18} className="text-zinc-500" />
                  <span>{selectedCustomer.email}</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-300">
                  <Phone size={18} className="text-zinc-500" />
                  <span>{selectedCustomer.phone || 'Not provided'}</span>
                </div>
                <div className="flex items-start gap-3 text-zinc-300">
                  <MapPin size={18} className="text-zinc-500 mt-0.5" />
                  <span>{selectedCustomer.address || 'No address on file'}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-800/30 rounded-lg p-4 text-center">
                  <ShoppingBag className="w-8 h-8 text-[#00f0ff] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{selectedCustomer.total_orders}</p>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider">Total Orders</p>
                </div>
                <div className="bg-zinc-800/30 rounded-lg p-4 text-center">
                  <DollarSign className="w-8 h-8 text-[#00ff9d] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-[#00ff9d]">${selectedCustomer.total_spent.toFixed(2)}</p>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider">Total Spent</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button className="flex-1 flex items-center justify-center gap-2 border border-zinc-700 text-zinc-300 px-4 py-2.5 rounded-lg font-semibold hover:border-zinc-600 transition-all">
                  <Mail size={16} />
                  Send Email
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] px-4 py-2.5 rounded-lg font-semibold hover:bg-[#00f0ff] hover:text-black transition-all">
                  <ShoppingBag size={16} />
                  View Orders
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Demo customers
const demoCustomers: Customer[] = [
  { id: '1', name: 'Sarah Connor', email: 'sarah.connor@example.com', phone: '+1 (555) 123-4567', address: '123 Main Street, Los Angeles, CA 90001', total_orders: 12, total_spent: 847.50, created_at: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString() },
  { id: '2', name: 'John Matrix', email: 'john.matrix@example.com', phone: '+1 (555) 234-5678', address: '456 Oak Avenue, New York, NY 10001', total_orders: 8, total_spent: 523.00, created_at: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString() },
  { id: '3', name: 'Ellen Ripley', email: 'ellen.ripley@example.com', phone: '+1 (555) 345-6789', address: '789 Pine Road, Chicago, IL 60601', total_orders: 15, total_spent: 1234.75, created_at: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString() },
  { id: '4', name: 'Dutch Schaefer', email: 'dutch@example.com', phone: '+1 (555) 456-7890', address: '321 Elm Boulevard, Miami, FL 33101', total_orders: 5, total_spent: 289.99, created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString() },
  { id: '5', name: 'Kyle Reese', email: 'kyle.reese@example.com', phone: '+1 (555) 567-8901', address: '555 Cedar Lane, Seattle, WA 98101', total_orders: 23, total_spent: 2156.00, created_at: new Date(Date.now() - 400 * 24 * 60 * 60 * 1000).toISOString() },
  { id: '6', name: 'Tony Montana', email: 'tony@example.com', phone: '+1 (555) 678-9012', address: '777 Palm Street, Las Vegas, NV 89101', total_orders: 3, total_spent: 167.50, created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() },
  { id: '7', name: 'Lara Croft', email: 'lara.croft@example.com', phone: '+1 (555) 789-0123', address: '999 Adventure Road, Denver, CO 80201', total_orders: 18, total_spent: 1567.25, created_at: new Date(Date.now() - 250 * 24 * 60 * 60 * 1000).toISOString() },
  { id: '8', name: 'Max Payne', email: 'max.payne@example.com', phone: '+1 (555) 890-1234', address: '111 Dark Alley, Boston, MA 02101', total_orders: 7, total_spent: 445.00, created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString() },
];
