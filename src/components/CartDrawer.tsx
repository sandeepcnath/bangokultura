import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
  } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    if (isCartOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isCartOpen, closeCart]);

  const handleRemove = (productId: string, productName: string) => {
    removeFromCart(productId);
    toast.success(`${productName} removed from cart`);
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#111111]/30 z-50 animate-in fade-in duration-200"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-[#F6F4F2] z-50 shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#111111]/10">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-[#111111]" />
            <h2 className="text-lg font-semibold">Your Cart</h2>
            <span className="text-sm text-[#6F6F6F]">({totalItems})</span>
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-[#111111]/5 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-[#111111]/20 mb-4" />
              <h3 className="text-lg font-medium text-[#111111] mb-2">
                Your cart is empty
              </h3>
              <p className="text-sm text-[#6F6F6F] mb-6">
                Discover our curated collection of nail art, perfumes, and toys.
              </p>
              <Button
                onClick={closeCart}
                className="bg-[#111111] text-white hover:bg-[#111111]/90 rounded-full px-6"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 bg-white rounded-2xl border border-[#111111]/5"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#F6F4F2] flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-medium text-[#111111] truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-sm text-[#6F6F6F]">
                          {item.product.shortDescription}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          handleRemove(item.product.id, item.product.name)
                        }
                        className="p-1 hover:bg-[#111111]/5 rounded-full transition-colors flex-shrink-0"
                        aria-label="Remove item"
                      >
                        <X className="w-4 h-4 text-[#6F6F6F]" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="w-7 h-7 flex items-center justify-center rounded-full border border-[#111111]/20 hover:bg-[#111111]/5 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="w-7 h-7 flex items-center justify-center rounded-full border border-[#111111]/20 hover:bg-[#111111]/5 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-semibold text-[#111111]">
                        ${item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[#111111]/10 bg-white">
            {/* Subtotal */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#6F6F6F]">Subtotal</span>
              <span className="text-xl font-semibold">${totalPrice}</span>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Link to="/checkout" onClick={closeCart}>
                <Button className="w-full bg-[#C9FF00] text-[#111111] hover:bg-[#b8eb00] rounded-full py-6 font-semibold">
                  Checkout
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/cart" onClick={closeCart}>
                <Button
                  variant="outline"
                  className="w-full rounded-full py-6 border-[#111111]/20 hover:bg-[#111111]/5"
                >
                  View Full Cart
                </Button>
              </Link>
              <button
                onClick={closeCart}
                className="w-full text-center text-sm text-[#6F6F6F] hover:text-[#111111] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
