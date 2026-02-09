import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProductCard } from '../components/ProductCard';

gsap.registerPlugin(ScrollTrigger);

const nailProducts = [
  { 
    id: 104, 
    name: 'Embossed Crystals Nail Art', 
    price: 25, 
    image: '/product_mani_kit.jpeg', 
    category: 'nail',
    description: 'Embossed Crystals Nail Art. A sparkling statement piece for your next big event.'
  },
  { 
    id: 119, 
    name: 'Sky Patterned Nails with Golden Accents', 
    price: 25, 
    image: '/sky-patterned-nails-golden-accents.jpg', 
    category: 'nail',
    description: 'Sky Patterned Nails with Golden Accents. A shimmering and elegant look with golden highlights.'
  },
  { 
    id: 103, 
    name: 'Nude nails with Glit and Floral pattern', 
    price: 20, 
    image: '/nail_polish.jpeg', 
    category: 'nail',
    description: 'Nude nails with Glit and Floral pattern.'
  },
  { 
    id: 105, 
    name: 'Dual tone floral pattern nails', 
    price: 15, 
    image: '/product_roller.jpeg', 
    category: 'nail',
    description: 'Cream and dark rose nails with floral pattern. A romantic and elegant choice for any occasion.'
  },
  { 
    id: 106, 
    name: 'Lavender and Cream Nail Set', 
    price: 20, 
    image: '/product_cube.jpeg', 
    category: 'nail',
    description: 'Complete set with lavender and cream themed nails with beautiful patterns.'
  },
  { 
    id: 107, 
    name: 'Green and Cream Floral Nails', 
    price: 20, 
    image: '/green-and-cream-floral.jpeg', 
    category: 'nail',
    description: 'Green and Cream Floral Nails. A fresh and vibrant look with intricate floral designs.'
  },
  { 
    id: 102, 
    name: 'Metallic blue nails', 
    price: 20, 
    image: '/product_gel_set.jpeg', 
    category: 'nail',
    description: 'Metallic blue nails'
  },
  { 
    id: 109, 
    name: 'Professional Matte Pink Nails', 
    price: 10, 
    image: '/professional-matte-pink.jpeg', 
    category: 'nail',
    description: 'Professional Matte Pink Nails. A sophisticated and timeless look with a soft matte finish.'
  },
];

export function NailArtPage() {
  const heroRef = useRef<HTMLElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

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
                  {nailProducts.length} Products
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
          
          <div ref={productsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {nailProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
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
