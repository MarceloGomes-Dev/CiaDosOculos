
import React, { useState, useEffect, useCallback } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../constants';

const FeaturedCarousel: React.FC = () => {
  const featured = PRODUCTS.slice(0, 3); // Showing first 3 as featured
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % featured.length);
  }, [featured.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative w-full group">
      {/* Main Slide Area - No Card Wrapper */}
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]" 
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {featured.map((product) => (
            <div key={product.id} className="min-w-full flex flex-col items-center">
              {/* Product Image with "Floating" Effect */}
              <div className="relative w-full aspect-square max-w-[400px] flex items-center justify-center">
                {/* Subtle Glow Behind Product */}
                <div className="absolute inset-0 bg-orange-500/10 rounded-full blur-[80px] scale-75 animate-pulse"></div>
                
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="relative z-10 w-[85%] h-[85%] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Floating Badge */}
                <div className="absolute top-8 right-8 z-20 bg-orange-500 text-white text-[11px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter shadow-lg shadow-orange-500/40">
                  Destaque
                </div>
              </div>

              {/* Product Info Integrated into Layout */}
              <div className="mt-8 text-center lg:text-right w-full">
                <p className="text-orange-400 text-sm font-bold uppercase tracking-[0.2em] mb-2">
                  {product.brand}
                </p>
                <h4 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">
                  {product.name}
                </h4>
                <div className="flex items-center justify-center lg:justify-end gap-4">
                  {typeof product.price === 'number' && (
                    <span className="text-blue-200/60 text-sm font-medium">A partir de</span>
                  )}
                  <div className="text-3xl font-light text-white">
                    {/* // FIX: Type check for product.price to handle number vs string ('Sob Consulta') correctly. */}
                    {typeof product.price === 'number' ? (
                      <>
                        R$ <span className="font-bold text-orange-500">{product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                      </>
                    ) : (
                      <span className="font-bold text-orange-500">{product.price}</span>
                    )}
                  </div>
                </div>
                
                <div className="mt-8 flex justify-center lg:justify-end">
                  <button className="group/btn relative overflow-hidden bg-white text-blue-900 px-10 py-3 rounded-full font-bold transition-all hover:pr-14">
                    <span className="relative z-10">Conhecer Modelo</span>
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-0 group-hover/btn:opacity-100 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modern Navigation Controls */}
      <div className="absolute -bottom-12 lg:bottom-0 left-0 right-0 lg:left-auto flex items-center justify-center lg:justify-end gap-3 lg:pr-4">
        {featured.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className="group relative h-10 w-10 flex items-center justify-center"
            aria-label={`Go to slide ${idx + 1}`}
          >
            <div className={`transition-all duration-300 rounded-full ${
              activeIndex === idx 
              ? 'w-full h-1 bg-orange-500' 
              : 'w-4 h-1 bg-white/20 hover:bg-white/40'
            }`} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCarousel;
