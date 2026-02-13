import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProductCard } from '../components/ProductCard';
import { useProducts } from '../context/ProductsContext';
import { Loader2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Fallback products when database is empty
const fallbackProducts = [
  { 
    id: '104', 
    name: 'Embossed Crystals Nail Art', 
    price: 25, 
    image_url: '/product_mani_kit.jpeg', 
    category: 'Nail Art',
    stock: 100,
    description: 'Embossed Crystals Nail Art. A sparkling statement piece for your next big event.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  { 
    id: '119', 
    name: 'Sky Patterned Nails with Golden Accents', 
    price: 25, 
    image_url: '/sky-patterned-nails-golden-accents.jpg', 
    category: 'Nail Art',
    stock: 100,
    description: 'Sky Patterned Nails with Golden Accents. A shimmering and elegant look with golden highlights.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  { 
    id: '103', 
    name: 'Nude nails with Glit and Floral pattern', 
    price: 20, 
    image_url: '/nail_polish.jpeg', 
    category: 'Nail Art',
    stock: 100,
    description: 'Nude nails with Glit and Floral pattern.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  { 
    id: '107', 
    name: 'Green and Cream Floral Nails', 
    price: 20, 
    image_url: '/green-and-cream-floral.jpeg', 
    category: 'Nail Art',
    stock: 100,
    description: 'Green and Cream Floral Nails. A fresh and vibrant look with intricate floral designs.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  { 
    id: '109', 
    name: 'Professional Matte Pink Nails', 
    price: 10, 
    image_url: '/professional-matte-pink.jpeg', 
    category: 'Nail Art',
    stock: 100,
    description: 'Professional Matte Pink Nails. A sophisticated and timeless look with a soft matte finish.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
];

export function NailArtPage() {
  const heroRef = useRef<HTMLElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const { products, loading, getProductsByCategory } = useProducts();

  // Get nail art products from Supabase or use fallback
  const nailProducts = getProductsByCategory('Nail Art');
  const displayProducts = nailProducts.length > 0 ? nailProducts : fallbackProducts;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      const heroContent = heroRef.current?.querySelector('.hero-content');
      if (heroContent) {
        gsap.fromTo(heroContent,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        );
      }

      // Products animation
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
                NAIL ART
              </h1>
              <p className="text-gray-600 text-lg mb-8 max-w-md leading-relaxed">
                Salon-grade formulas, curated palettes, and the tools to make every detail intentional.
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
                src="/nail_polish.jpeg" 
                alt="Nail Art"
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
              All Products
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

      {/* Featured Banner */}
      <section className="py-16 bg-coral">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-display font-bold text-3xl text-white mb-4">
            New to Nail Art?
          </h2>
          <p className="text-white/90 mb-8 max-w-md mx-auto">
            Check out our beginner-friendly starter kits and tutorials.
          </p>
          <button className="bg-white text-coral px-8 py-3 rounded-full font-medium hover:bg-ink hover:text-white transition-all duration-300">
            View Starter Kits
          </button>
        </div>
      </section>
    </div>
  );
}
