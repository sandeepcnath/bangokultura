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
    id: '201', 
    name: 'Lattafa Yara', 
    price: 85, 
    image_url: '/lattafa-yara.jpeg', 
    category: 'Perfumes',
    stock: 100,
    description: 'Lattafa Yara - A captivating blend of tropical fruits and gourmand notes.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  { 
    id: '203', 
    name: 'Ameerat Al Arab', 
    price: 65, 
    image_url: '/ameerat-al-arab.jpeg', 
    category: 'Perfumes',
    stock: 100,
    description: 'Luxurious evening fragrance with amber and vanilla notes.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
];

export function PerfumesPage() {
  const heroRef = useRef<HTMLElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const { products, loading, getProductsByCategory } = useProducts();

  const perfumeProducts = getProductsByCategory('Perfumes');
  const displayProducts = perfumeProducts.length > 0 ? perfumeProducts : fallbackProducts;

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
                PERFUMES
              </h1>
              <p className="text-gray-600 text-lg mb-8 max-w-md leading-relaxed">
                From morning freshness to evening depth—fragrances that feel like a signature, not a costume.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-600">
                  {displayProducts.length} Products
                </span>
                <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-600">
                  From AED 42
                </span>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="absolute inset-0 bg-coral rounded-full opacity-10 blur-3xl scale-75" />
              <img 
                src="/perfume_bottle.png" 
                alt="Perfumes"
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
              All Fragrances
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
          
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-coral" />
            </div>
          ) : (
            <div ref={productsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  id={Number(product.id) || Math.random()}
                  name={product.name}
                  price={product.price}
                  image={product.image_url}
                  category={product.category}
                  description={product.description}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Scent Guide Banner */}
      <section className="py-16 bg-ink">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display font-bold text-3xl text-white mb-4">
                Find Your Signature Scent
              </h2>
              <p className="text-white/70 mb-6">
                Take our quick quiz to discover fragrances that match your personality and style.
              </p>
              <button className="bg-coral text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-ink transition-all duration-300">
                Take the Quiz
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🌸</span>
                </div>
                <p className="text-white text-sm">Floral</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🌲</span>
                </div>
                <p className="text-white text-sm">Woody</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🍊</span>
                </div>
                <p className="text-white text-sm">Citrus</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
