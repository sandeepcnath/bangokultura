import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProductCard } from '../components/ProductCard';
import { useProducts } from '../context/ProductsContext';
import { Loader2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Fallback products
const fallbackProducts = [
  { 
    id: '301', 
    name: 'Rally Racer Collectible', 
    price: 58, 
    image_url: '/product_racer.png', 
    category: 'Toys',
    stock: 100,
    description: 'Vintage-inspired race car with premium metal construction.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  { 
    id: '302', 
    name: 'Classic Cruiser', 
    price: 45, 
    image_url: '/toy_car.png', 
    category: 'Toys',
    stock: 100,
    description: 'Retro-styled toy car in coral and cream. Perfect for display.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
];

export function ToysPage() {
  const heroRef = useRef<HTMLElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const { products, loading, getProductsByCategory } = useProducts();

  const toyProducts = getProductsByCategory('Toys');
  const displayProducts = toyProducts.length > 0 ? toyProducts : fallbackProducts;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroContent = heroRef.current?.querySelector('.hero-content');
      if (heroContent) {
        gsap.fromTo(heroContent,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        );
      }

      if (productsRef.current?.children) {
        gsap.fromTo(Array.from(productsRef.current.children),
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: productsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="bg-cloud py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="hero-content">
              <span className="font-mono text-sm uppercase tracking-widest text-coral mb-4 block">
                CATEGORY
              </span>
              <h1 className="font-display font-black uppercase text-ink mb-6" 
                style={{ fontSize: 'clamp(48px, 8vw, 80px)', letterSpacing: '-0.02em' }}>
                TOYS
              </h1>
              <p className="text-gray-600 text-lg mb-8 max-w-md leading-relaxed">
                Design-led playthings, limited editions, and nostalgic pieces worth displaying.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-600">
                  {displayProducts.length} Products
                </span>
                <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-600">
                  From AED 18
                </span>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="absolute inset-0 bg-coral rounded-full opacity-10 blur-3xl scale-75" />
              <img 
                src="/toy_car.png" 
                alt="Toys"
                className="relative z-10 w-full max-w-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 md:py-24 bg-cloud">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-display font-bold text-2xl text-ink">
              All Collectibles
            </h2>
            <div className="flex gap-2">
              <select className="px-4 py-2 bg-white rounded-full border border-gray-200 text-sm focus:outline-none focus:border-coral">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>
          </div>
          
          <div ref={productsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {toyProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Collectors Banner */}
      <section className="py-16 bg-coral">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display font-bold text-3xl text-white mb-4">
                Start Your Collection
              </h2>
              <p className="text-white/90 mb-6">
                Join our collector's club for early access to limited editions and exclusive drops.
              </p>
              <div className="flex gap-4">
                <button className="bg-white text-coral px-8 py-3 rounded-full font-medium hover:bg-ink hover:text-white transition-all duration-300">
                  Join Club
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-coral transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
                <div>
                  <p className="text-white font-medium">Member Benefits</p>
                  <p className="text-white/70 text-sm">Early access + 10% off</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎁</span>
                </div>
                <div>
                  <p className="text-white font-medium">Exclusive Drops</p>
                  <p className="text-white/70 text-sm">Limited editions monthly</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl">🚚</span>
                </div>
                <div>
                  <p className="text-white font-medium">Free Shipping</p>
                  <p className="text-white/70 text-sm">On orders over $50</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
