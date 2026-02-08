import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProductCard } from '../components/ProductCard';

gsap.registerPlugin(ScrollTrigger);

const allProducts = [
  { id: 1, name: 'Midnight Mani Kit', price: 34, image: '/product_mani_kit.png', category: 'nail', description: 'Complete nail art kit with 6 premium polishes.' },
  { id: 2, name: 'Citrus Wood EDP', price: 78, image: '/product_perfume.png', category: 'perfume', description: 'Fresh citrus with warm woody base.' },
  { id: 3, name: 'Rally Racer Collectible', price: 58, image: '/product_racer.png', category: 'toy', description: 'Vintage-inspired race car collectible.' },
  { id: 4, name: 'Gel Top Coat Set', price: 24, image: '/product_gel_set.png', category: 'nail', description: 'Professional-grade gel top coat.' },
  { id: 5, name: 'Linen Musk Roller', price: 42, image: '/product_roller.png', category: 'perfume', description: 'Soft musk with clean linen notes.' },
  { id: 6, name: 'Display Cube (Small)', price: 18, image: '/product_cube.png', category: 'toy', description: 'Clear acrylic display cube.' },
  { id: 101, name: 'Coral Crush Polish', price: 18, image: '/nail_polish.png', category: 'nail', description: 'Vibrant coral nail polish.' },
  { id: 201, name: 'Élixir Crystal', price: 120, image: '/perfume_bottle.png', category: 'perfume', description: 'Luxurious evening fragrance.' },
  { id: 302, name: 'Classic Cruiser', price: 45, image: '/toy_car.png', category: 'toy', description: 'Retro-styled toy car.' },
];

export function NewArrivalsPage() {
  const heroRef = useRef<HTMLElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState('all');

  const filteredProducts = filter === 'all' 
    ? allProducts 
    : allProducts.filter(p => p.category === filter);

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
            stagger: 0.08,
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
  }, [filter]);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="bg-cloud py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="hero-content">
            <span className="font-mono text-sm uppercase tracking-widest text-coral mb-4 block">
              JUST DROPPED
            </span>
            <h1 className="font-display font-black uppercase text-ink mb-6" 
              style={{ fontSize: 'clamp(48px, 8vw, 80px)', letterSpacing: '-0.02em' }}>
              NEW ARRIVALS
            </h1>
            <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              This week's curated picks—small batches, fast sell-outs. Grab them before they're gone.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-600">
                {allProducts.length} Products
              </span>
              <span className="px-4 py-2 bg-coral rounded-full text-sm font-medium text-white">
                Free Shipping $50+
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 md:py-24 bg-cloud">
        <div className="max-w-7xl mx-auto px-6">
          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6">
            <div className="flex flex-wrap gap-3">
              {[
                { key: 'all', label: 'All' },
                { key: 'nail', label: 'Nail Art' },
                { key: 'perfume', label: 'Perfumes' },
                { key: 'toy', label: 'Toys' },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`filter-chip capitalize ${filter === f.key ? 'active' : ''}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <select className="px-4 py-2 bg-white rounded-full border border-gray-200 text-sm focus:outline-none focus:border-coral">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest First</option>
            </select>
          </div>
          
          {/* Products Grid */}
          <div ref={productsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Banner */}
      <section className="py-16 bg-ink">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display font-bold text-3xl text-white mb-4">
            Never Miss a Drop
          </h2>
          <p className="text-white/70 mb-8 max-w-md mx-auto">
            Subscribe to get notified about new arrivals and exclusive offers.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-white/50 focus:outline-none focus:border-coral"
            />
            <button type="submit" className="bg-coral text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-ink transition-all duration-300">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
