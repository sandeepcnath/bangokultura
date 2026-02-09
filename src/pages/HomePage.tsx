import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Truck, RotateCcw, Instagram, Mail, Clock, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';

gsap.registerPlugin(ScrollTrigger);

// Products data
const featuredProducts = [
  { id: 1, name: 'Midnight Mani Kit', price: 34, image: '/product_mani_kit.png', category: 'nail' },
  { id: 2, name: 'Lattafa Yara', price: 78, image: '/lattafa-yara.jpeg', category: 'perfume' },
  { id: 3, name: 'Rally Racer Collectible', price: 58, image: '/product_racer.png', category: 'toy' },
  { id: 4, name: 'Metallic Blue Nails', price: 24, image: '/product_gel_set.jpeg', category: 'nail' },
];

export function HomePage() {
  const { addToCart } = useCart();

  // Refs for animations
  const heroRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const categoriesRef = useRef<HTMLElement>(null);
  const featuredRef = useRef<HTMLElement>(null);
  const whyRef = useRef<HTMLElement>(null);
  const newsletterRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation (on load)
      gsap.fromTo(heroContentRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.2 }
      );
      gsap.fromTo(heroImageRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out', delay: 0.4 }
      );

      // Categories section - fade up on scroll
      gsap.fromTo(categoriesRef.current?.querySelectorAll('.category-card') || [],
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: categoriesRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Featured products
      gsap.fromTo(featuredRef.current?.querySelectorAll('.product-card') || [],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: featuredRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Why section
      gsap.fromTo(whyRef.current?.querySelectorAll('.value-card') || [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: whyRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Newsletter
      gsap.fromTo(newsletterRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: newsletterRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen bg-cloud flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-6 py-12 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div ref={heroContentRef} className="order-2 lg:order-1">
              <span className="font-mono text-sm uppercase tracking-widest text-coral mb-4 block">
                EST. 2026
              </span>
              <h1 className="font-display font-black uppercase text-ink leading-none mb-6" 
                style={{ fontSize: 'clamp(48px, 10vw, 96px)', letterSpacing: '-0.02em' }}>
                CURATED<br/>FINDS<br/>FOR YOU
              </h1>
              <p className="text-gray-600 text-lg mb-8 max-w-md leading-relaxed">
                A rotating selection of nail art (stick-on nails), perfumes, and toys.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/new-arrivals" className="btn-primary">
                  Shop New Arrivals
                </Link>
                <Link to="/nail-art" className="px-8 py-4 rounded-full border-2 border-ink text-ink font-medium hover:bg-ink hover:text-white transition-all duration-300">
                  Explore
                </Link>
              </div>
              <p className="text-sm text-gray-500 mt-8">
                Limited drops. Fast, carbon-neutral shipping.
              </p>
            </div>
            
            {/* Right Image */}
            <div className="order-1 lg:order-2 relative">
              <div className="absolute inset-0 bg-coral rounded-full opacity-20 blur-3xl scale-75" />
              <img 
                ref={heroImageRef}
                src="/hero_bag.png" 
                alt="Luxury Shopping Bag"
                className="relative z-10 w-full max-w-lg mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section ref={categoriesRef} className="py-24 bg-cloud">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display font-black uppercase text-ink mb-4" 
              style={{ fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.02em' }}>
              SHOP BY CATEGORY
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Discover our curated collections, each handpicked for quality and design.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Nail Art */}
            <Link to="/nail-art" className="category-card group">
              <div className="bg-white rounded-3xl p-8 h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <div className="aspect-square bg-gray-50 rounded-2xl mb-6 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/nail_polish.jpeg" 
                    alt="Nail Art"
                    className="w-3/4 h-auto transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="font-display font-bold text-2xl text-ink mb-2 group-hover:text-coral transition-colors">
                  NAIL ART
                </h3>
                <p className="text-gray-600 mb-4">
                  Salon-grade formulas and curated palettes for every detail.
                </p>
                <span className="text-coral font-medium flex items-center gap-2">
                  Shop Now <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
            
            {/* Perfumes */}
            <Link to="/perfumes" className="category-card group">
              <div className="bg-white rounded-3xl p-8 h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <div className="aspect-square bg-gray-50 rounded-2xl mb-6 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/perfume_bottle.png" 
                    alt="Perfumes"
                    className="w-3/4 h-auto transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="font-display font-bold text-2xl text-ink mb-2 group-hover:text-coral transition-colors">
                  PERFUMES
                </h3>
                <p className="text-gray-600 mb-4">
                  Fragrances that feel like a signature, not a costume.
                </p>
                <span className="text-coral font-medium flex items-center gap-2">
                  Explore <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
            
            {/* Toys */}
            <Link to="/toys" className="category-card group">
              <div className="bg-white rounded-3xl p-8 h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <div className="aspect-square bg-gray-50 rounded-2xl mb-6 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/toy_car.png" 
                    alt="Toys"
                    className="w-3/4 h-auto transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="font-display font-bold text-2xl text-ink mb-2 group-hover:text-coral transition-colors">
                  TOYS
                </h3>
                <p className="text-gray-600 mb-4">
                  Design-led playthings and collectibles worth displaying.
                </p>
                <span className="text-coral font-medium flex items-center gap-2">
                  Discover <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Drop Section */}
      <section className="py-24 bg-coral">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <span className="font-mono text-sm uppercase tracking-widest opacity-80 mb-4 block">
                LIMITED EDITION
              </span>
              <h2 className="font-display font-black uppercase mb-6" 
                style={{ fontSize: 'clamp(40px, 6vw, 72px)', letterSpacing: '-0.02em' }}>
                SHOP THE DROP
              </h2>
              <p className="text-white/90 text-lg mb-6 max-w-md">
                Limited run. Clean lines, all-day comfort, and details that hold up close.
              </p>
              <p className="font-display font-bold text-4xl mb-8">AED 129</p>
              <button 
                onClick={() => addToCart({ id: 99, name: 'Limited Drop Sneaker', price: 129, image: '/sneaker.png', category: 'featured' })}
                className="bg-white text-coral px-8 py-4 rounded-full font-medium hover:bg-ink hover:text-white transition-all duration-300"
              >
                Add to Cart
              </button>
            </div>
            <div className="relative">
              <img 
                src="/sneaker.png" 
                alt="Featured Sneaker"
                className="w-full max-w-lg mx-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section ref={featuredRef} className="py-24 bg-cloud">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="font-display font-black uppercase text-ink mb-4" 
                style={{ fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: '-0.02em' }}>
                FEATURED
              </h2>
              <p className="text-gray-600 max-w-md">
                This week's curated picks—small batches, fast sell-outs.
              </p>
            </div>
            <Link to="/new-arrivals" className="text-coral font-medium flex items-center gap-2 mt-4 md:mt-0 hover:underline">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="aspect-square bg-gray-50 p-4 flex items-center justify-center relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-medium text-ink mb-1">{product.name}</h3>
                  <p className="text-coral font-semibold">AED {product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why BANGO Kultura */}
      <section ref={whyRef} className="py-24 bg-cloud">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display font-black uppercase text-ink text-center mb-16" 
            style={{ fontSize: 'clamp(32px, 4vw, 56px)', letterSpacing: '-0.02em' }}>
            WHY BANGO Kultura
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="value-card bg-white p-8 rounded-2xl border border-gray-100">
              <Sparkles className="w-10 h-10 text-coral mb-4" strokeWidth={1.5} />
              <h3 className="font-display font-bold text-lg text-ink mb-2">Curated, not crowded</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Every item is handpicked for quality and design. No filler, just the good stuff.
              </p>
            </div>
            
            <div className="value-card bg-white p-8 rounded-2xl border border-gray-100">
              <Truck className="w-10 h-10 text-coral mb-4" strokeWidth={1.5} />
              <h3 className="font-display font-bold text-lg text-ink mb-2">Carbon-neutral shipping</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We offset every delivery, every time. Good for you, better for the planet.
              </p>
            </div>
            
            <div className="value-card bg-white p-8 rounded-2xl border border-gray-100">
              <RotateCcw className="w-10 h-10 text-coral mb-4" strokeWidth={1.5} />
              <h3 className="font-display font-bold text-lg text-ink mb-2">30-day easy returns</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Not perfect? Send it back, no questions asked. We've got you covered.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section ref={newsletterRef} className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-display font-black text-ink mb-4" 
                style={{ fontSize: 'clamp(36px, 4vw, 56px)', letterSpacing: '-0.02em' }}>
                Join the <span className="text-coral">list.</span>
              </h2>
              <p className="text-gray-600 mb-8">
                Get drops early, restock alerts, and occasional surprises.
              </p>
              <form className="flex gap-3">
                <input
                  type="email"
                  placeholder="Email address"
                  className="flex-1 px-6 py-4 bg-gray-50 rounded-full border border-gray-200 focus:outline-none focus:border-coral transition-colors"
                />
                <button type="submit" className="btn-primary">
                  Subscribe
                </button>
              </form>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-coral mt-1" />
                <div>
                  <h4 className="font-medium text-ink mb-1">Support</h4>
                  <p className="text-gray-600">hello@BANGOKultura.studio</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-coral mt-1" />
                <div>
                  <h4 className="font-medium text-ink mb-1">Hours</h4>
                  <p className="text-gray-600">Mon–Fri, 9am–6pm EST</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Shield className="w-5 h-5 text-coral mt-1" />
                <div>
                  <h4 className="font-medium text-ink mb-1">Policies</h4>
                  <Link to="/checkout" className="text-gray-600 hover:text-coral transition-colors">
                    Shipping & Returns
                  </Link>
                </div>
              </div>
              
              <div className="flex items-center gap-4 pt-4">
                <a href="#" className="p-3 bg-gray-100 rounded-full hover:bg-coral hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">© 2026 BANGO Kultura. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-gray-500 hover:text-coral transition-colors">Privacy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-coral transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
