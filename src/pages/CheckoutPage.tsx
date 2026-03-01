import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, Shield, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    country: 'US',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    nameOnCard: '',
  });

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsComplete(true);
    clearCart();
  };

  const shippingCost = totalPrice >= 50 ? 0 : 8;
  const tax = Math.round(totalPrice * 0.08);
  const finalTotal = totalPrice + shippingCost + tax;

  // Order complete view
  if (isComplete) {
    return (
      <div className="pt-20 min-h-screen bg-cloud">
        <div className="max-w-2xl mx-auto px-6 py-24 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="font-display font-bold text-4xl text-ink mb-4">
            Order Confirmed!
          </h1>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. We've sent a confirmation email to {shippingInfo.email}.
          </p>
          <div className="bg-white rounded-2xl p-6 mb-8 text-left">
            <p className="text-sm text-gray-500 mb-2">Order Number</p>
            <p className="font-mono text-lg text-ink mb-4">#LB-{Date.now().toString().slice(-8)}</p>
            <p className="text-sm text-gray-500 mb-2">Estimated Delivery</p>
            <p className="text-lg text-ink">{new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - {new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
          </div>
          <Link to="/" className="btn-primary inline-block">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // Empty cart view
  if (items.length === 0 && !isComplete) {
    return (
      <div className="pt-20 min-h-screen bg-cloud">
        <div className="max-w-2xl mx-auto px-6 py-24 text-center">
          <h1 className="font-display font-bold text-3xl text-ink mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/new-arrivals" className="btn-primary inline-block">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-cloud">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-coral transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </Link>

        {/* Progress */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-coral' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${step >= 1 ? 'bg-coral text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="hidden sm:inline font-medium">Shipping</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-200">
              <div className={`h-full bg-coral transition-all duration-300 ${step >= 2 ? 'w-full' : 'w-0'}`} />
            </div>
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-coral' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${step >= 2 ? 'bg-coral text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="hidden sm:inline font-medium">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {step === 1 ? (
              <div className="bg-white rounded-2xl p-8">
                <h2 className="font-display font-bold text-2xl text-ink mb-6">
                  Shipping Information
                </h2>
                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        required
                        type="text"
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-coral transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        required
                        type="text"
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-coral transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      required
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-coral transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input
                      required
                      type="text"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-coral transition-colors"
                    />
                  </div>
                  
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input
                        required
                        type="text"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-coral transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                      <input
                        required
                        type="text"
                        value={shippingInfo.zip}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-coral transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                      <select
                        value={shippingInfo.country}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-coral transition-colors"
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>
                  </div>
                  
                  <button type="submit" className="w-full btn-primary py-4">
                    Continue to Payment
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8">
                <h2 className="font-display font-bold text-2xl text-ink mb-6">
                  Payment Information
                </h2>
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        required
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-coral transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name on Card</label>
                    <input
                      required
                      type="text"
                      value={paymentInfo.nameOnCard}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, nameOnCard: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-coral transition-colors"
                    />
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                      <input
                        required
                        type="text"
                        placeholder="MM/YY"
                        value={paymentInfo.expiry}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, expiry: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-coral transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                      <input
                        required
                        type="text"
                        placeholder="123"
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-coral transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <button 
                      type="button" 
                      onClick={() => setStep(1)}
                      className="flex-1 px-6 py-4 border border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button 
                      type="submit" 
                      disabled={isProcessing}
                      className="flex-1 btn-primary py-4 disabled:opacity-70"
                    >
                      {isProcessing ? 'Processing...' : `Pay AED ${finalTotal}`}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 sticky top-24">
              <h3 className="font-display font-bold text-lg text-ink mb-6">
                Order Summary
              </h3>
              
              {/* Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-contain bg-gray-50 rounded-lg" 
                    />
                    <div className="flex-1">
                      <p className="font-medium text-ink text-sm">{item.name}</p>
                      <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-ink">AED {item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
              
              {/* Totals */}
              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">AED {totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">{shippingCost === 0 ? 'Free' : `AED ${shippingCost}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">AED {tax}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t">
                  <span>Total</span>
                  <span className="text-coral">AED {finalTotal}</span>
                </div>
              </div>
              
              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t grid grid-cols-3 gap-2 text-center">
                <div>
                  <Truck className="w-5 h-5 mx-auto text-gray-400 mb-1" />
                  <p className="text-xs text-gray-500">Free shipping AED 50+</p>
                </div>
                <div>
                  <Shield className="w-5 h-5 mx-auto text-gray-400 mb-1" />
                  <p className="text-xs text-gray-500">Secure checkout</p>
                </div>
                <div>
                  <Check className="w-5 h-5 mx-auto text-gray-400 mb-1" />
                  <p className="text-xs text-gray-500">30-day returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
