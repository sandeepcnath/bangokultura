import { useState, useEffect } from 'react';
import { supabase, Product } from '../../lib/supabase';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Package,
  X,
  Upload,
  Loader2,
  AlertTriangle
} from 'lucide-react';

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    image_url: ''
  });
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const categories = ['Nail Art', 'Perfumes', 'Toys', 'Accessories'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      if (data && data.length > 0) {
        setProducts(data);
      } else {
        setProducts(demoProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts(demoProducts);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      category: formData.category,
      image_url: formData.image_url || '/nail_polish.jpeg',
      updated_at: new Date().toISOString()
    };

    try {
      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);
        
        if (error) throw error;
        
        setProducts(products.map(p => 
          p.id === editingProduct.id ? { ...p, ...productData } : p
        ));
      } else {
        const { data, error } = await supabase
          .from('products')
          .insert([{ ...productData, created_at: new Date().toISOString() }])
          .select()
          .single();
        
        if (error) throw error;
        
        if (data) {
          setProducts([data, ...products]);
        } else {
          // Demo mode - add locally
          const newProduct = {
            ...productData,
            id: `prod-${Date.now()}`,
            created_at: new Date().toISOString()
          };
          setProducts([newProduct as Product, ...products]);
        }
      }
      
      closeModal();
    } catch (error) {
      console.error('Error saving product:', error);
      // In demo mode, still update UI
      if (editingProduct) {
        setProducts(products.map(p => 
          p.id === editingProduct.id ? { ...p, ...productData } as Product : p
        ));
      } else {
        const newProduct = {
          ...productData,
          id: `prod-${Date.now()}`,
          created_at: new Date().toISOString()
        };
        setProducts([newProduct as Product, ...products]);
      }
      closeModal();
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await supabase.from('products').delete().eq('id', id);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
    setProducts(products.filter(p => p.id !== id));
    setDeleteConfirm(null);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category,
      image_url: product.image_url
    });
    setShowModal(true);
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      category: categories[0],
      image_url: ''
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({ name: '', description: '', price: '', stock: '', category: '', image_url: '' });
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getStockStatus = (stock: number) => {
    if (stock <= 0) return { text: 'Out of Stock', color: 'text-[#ff0055] bg-[#ff0055]/10' };
    if (stock < 20) return { text: 'Low Stock', color: 'text-[#ffe600] bg-[#ffe600]/10' };
    return { text: 'In Stock', color: 'text-[#00ff9d] bg-[#00ff9d]/10' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold tracking-wide text-white" style={{ fontFamily: "'Unbounded', sans-serif" }}>
            Products
          </h2>
          <p className="text-zinc-500 mt-1">Manage your product inventory</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] px-4 py-2.5 rounded-lg font-semibold text-sm tracking-wide hover:bg-[#00f0ff] hover:text-black transition-all duration-300"
          data-testid="add-product-btn"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-zinc-300 placeholder:text-zinc-600 focus:border-[#00f0ff]/50 focus:outline-none transition-all"
            data-testid="product-search"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-zinc-500" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-300 focus:border-[#00f0ff]/50 focus:outline-none transition-all"
            data-testid="category-filter"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#00f0ff]" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => {
            const stockStatus = getStockStatus(product.stock);
            return (
              <div
                key={product.id}
                className="bg-zinc-900/40 border border-zinc-800 rounded-xl overflow-hidden hover:border-[#00f0ff]/30 transition-all duration-300 group"
                data-testid={`product-card-${product.id}`}
              >
                <div className="relative aspect-square bg-zinc-800">
                  <img
                    src={product.image_url || '/nail_polish.jpeg'}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/nail_polish.jpeg'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                      <button
                        onClick={() => openEditModal(product)}
                        className="flex-1 flex items-center justify-center gap-1 bg-[#00f0ff]/90 text-black py-2 rounded-lg text-sm font-semibold hover:bg-[#00f0ff] transition-colors"
                        data-testid={`edit-product-${product.id}`}
                      >
                        <Edit2 size={14} /> Edit
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(product.id)}
                        className="px-3 bg-[#ff0055]/90 text-white py-2 rounded-lg hover:bg-[#ff0055] transition-colors"
                        data-testid={`delete-product-${product.id}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{product.category}</p>
                      <h3 className="text-white font-semibold truncate">{product.name}</h3>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${stockStatus.color}`}>
                      {stockStatus.text}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-xl font-bold text-[#00f0ff]">${product.price.toFixed(2)}</p>
                    <p className="text-sm text-zinc-500">{product.stock} units</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Package className="w-16 h-16 text-zinc-700 mb-4" />
          <h3 className="text-xl font-semibold text-zinc-400">No products found</h3>
          <p className="text-zinc-600 mt-2">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <h3 className="font-display text-xl font-semibold text-white" style={{ fontFamily: "'Unbounded', sans-serif" }}>
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={closeModal} className="text-zinc-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSaveProduct} className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-black/50 border border-zinc-800 text-zinc-200 rounded-lg px-4 py-3 focus:border-[#00f0ff]/50 focus:outline-none transition-all"
                  placeholder="Enter product name"
                  required
                  data-testid="product-name-input"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-black/50 border border-zinc-800 text-zinc-200 rounded-lg px-4 py-3 focus:border-[#00f0ff]/50 focus:outline-none transition-all resize-none"
                  rows={3}
                  placeholder="Enter product description"
                  required
                  data-testid="product-description-input"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-black/50 border border-zinc-800 text-zinc-200 rounded-lg px-4 py-3 focus:border-[#00f0ff]/50 focus:outline-none transition-all"
                    placeholder="0.00"
                    required
                    data-testid="product-price-input"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">
                    Stock
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full bg-black/50 border border-zinc-800 text-zinc-200 rounded-lg px-4 py-3 focus:border-[#00f0ff]/50 focus:outline-none transition-all"
                    placeholder="0"
                    required
                    data-testid="product-stock-input"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-black/50 border border-zinc-800 text-zinc-200 rounded-lg px-4 py-3 focus:border-[#00f0ff]/50 focus:outline-none transition-all"
                  required
                  data-testid="product-category-input"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full bg-black/50 border border-zinc-800 text-zinc-200 rounded-lg px-4 py-3 focus:border-[#00f0ff]/50 focus:outline-none transition-all"
                  placeholder="https://example.com/image.jpg"
                  data-testid="product-image-input"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 border border-zinc-700 text-zinc-300 px-6 py-3 rounded-lg font-semibold hover:border-zinc-600 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] px-6 py-3 rounded-lg font-semibold hover:bg-[#00f0ff] hover:text-black transition-all disabled:opacity-50"
                  data-testid="save-product-btn"
                >
                  {saving ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : (editingProduct ? 'Update' : 'Add Product')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-[#ff0055]/10">
                <AlertTriangle className="text-[#ff0055]" size={24} />
              </div>
              <h3 className="font-display text-lg font-semibold text-white" style={{ fontFamily: "'Unbounded', sans-serif" }}>
                Delete Product?
              </h3>
            </div>
            <p className="text-zinc-400 mb-6">This action cannot be undone. The product will be permanently removed.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 border border-zinc-700 text-zinc-300 px-4 py-2.5 rounded-lg font-semibold hover:border-zinc-600 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProduct(deleteConfirm)}
                className="flex-1 bg-[#ff0055] text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-[#ff0055]/80 transition-all"
                data-testid="confirm-delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Demo products
const demoProducts: Product[] = [
  { id: '1', name: 'Professional Matte Pink Set', description: 'Premium nail art set with 12 colors', price: 49.99, stock: 245, category: 'Nail Art', image_url: '/professional-matte-pink.jpeg', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: '2', name: 'Lattafa Yara Perfume', description: 'Luxury Arabian fragrance 100ml', price: 45.00, stock: 189, category: 'Perfumes', image_url: '/lattafa-yara.jpeg', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: '3', name: 'Sky Patterned Nails Kit', description: 'Artistic nail designs with golden accents', price: 30.00, stock: 156, category: 'Nail Art', image_url: '/sky-patterned-nails-golden-accents.jpg', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: '4', name: 'Racing Toy Car', description: 'Remote controlled racing car', price: 32.50, stock: 89, category: 'Toys', image_url: '/product_racer.png', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: '5', name: 'Ameerat Al Arab', description: 'Premium oriental perfume', price: 55.00, stock: 12, category: 'Perfumes', image_url: '/ameerat-al-arab.jpeg', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: '6', name: 'Gel Polish Set', description: 'UV gel polish collection', price: 67.00, stock: 0, category: 'Nail Art', image_url: '/product_gel_set.jpeg', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: '7', name: 'Green Floral Nails', description: 'Elegant floral nail art kit', price: 35.00, stock: 78, category: 'Nail Art', image_url: '/green-and-cream-floral.jpeg', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: '8', name: 'Puzzle Cube', description: 'Classic puzzle toy', price: 15.99, stock: 234, category: 'Toys', image_url: '/product_cube.jpeg', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];
