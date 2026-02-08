import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProductCard } from '../components/ProductCard';

gsap.registerPlugin(ScrollTrigger);

const perfumeProducts = [
  { 
    id: 201, 
    name: 'Citrus Wood EDP', 
    price: 78, 
    image: '/product_perfume.png', 
    category: 'perfume',
    description: 'Fresh citrus top notes with warm woody base. Perfect for daily wear.'
  },
  { 
    id: 202, 
    name: 'Linen Musk Roller', 
    price: 42, 
    image: '/product_roller.png', 
    category: 'perfume',
    description: 'Soft musk with clean linen notes. Travel-friendly rollerball.'
  },
  { 
    id: 203, 
    name: 'Élixir Crystal', 
    price: 120, 
    image: '/perfume_bottle.png', 
    category: 'perfume',
    description: 'Luxurious evening fragrance with amber and vanilla notes.'
  },
  { 
    id: 204, 
    name: 'Ocean Breeze', 
    price: 65, 
    image: '/product_perfume.png', 
    category: 'perfume',
    description: 'Refreshing aquatic scent with sea salt and driftwood.'
  },
  { 
    id: 205, 
    name: 'Rose Garden', 
    price: 85, 
    image: '/product_roller.png', 
    category: 'perfume',
    description: 'Classic rose blend with hints of jasmine and peony.'
  },
  { 
    id: 206, 
    name: 'Midnight Oud', 
    price: 145, 
    image: '/perfume_bottle.png', 
    category: 'perfume',
    description: 'Rich, mysterious oud with spices and dark chocolate.'
  },
];

export function PerfumesPage() {
  const heroRef = useRef<HTMLElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

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
                  {perfumeProducts.length} Products
                </span>
                <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-600">
                  From $42
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
          
          <div ref={productsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {perfumeProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
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
