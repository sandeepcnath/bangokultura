import { Plus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
}

export function ProductCard({ id, name, price, image, category, description }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({ id, name, price, image, category });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="product-card group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="aspect-square bg-gray-50 p-6 flex items-center justify-center relative overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
        <button 
          onClick={handleAddToCart}
          className={`absolute bottom-4 right-4 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 ${
            added ? 'bg-green-500 text-white' : 'bg-coral text-white hover:bg-coral/90'
          }`}
        >
          {added ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </button>
      </div>
      <div className="p-5">
        <span className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-2 block">
          {category}
        </span>
        <h3 className="font-display font-semibold text-ink mb-1 group-hover:text-coral transition-colors">
          {name}
        </h3>
        {description && (
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">{description}</p>
        )}
        <p className="text-coral font-bold text-lg">AED {price}</p>
      </div>
    </div>
  );
}
