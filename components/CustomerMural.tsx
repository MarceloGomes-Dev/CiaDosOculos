import React from 'react';
import { REVIEWS } from '../constants';

const CustomerMural: React.FC = () => {
  return (
    <section className="py-24 bg-[#080f15]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <span className="text-brand-orange font-black uppercase tracking-[0.6em] text-[10px] mb-4 block">Comunidade Cdo</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase italic leading-[0.85] tracking-tighter">
            O que nossos <br />
            <span className="text-brand-orange">Clientes dizem.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review) => (
            <div key={review.id} className="bg-[#0c151d] p-8 rounded-2xl border border-white/5 flex flex-col gap-6 hover:border-brand-orange/20 transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-brand-orange/30 group-hover:border-brand-orange transition-colors">
                  <img src={review.imageUrl} alt={review.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-white font-black text-sm uppercase">{review.name}</h4>
                  <p className="text-white/30 text-[10px] uppercase font-bold tracking-widest">{review.location}</p>
                </div>
              </div>
              
              <div className="flex gap-0.5 text-[#F2B705]">
                {/* Todas as estrelas preenchidas conforme solicitado */}
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-sm">★</span>
                ))}
              </div>

              <p className="text-white/60 text-sm italic leading-relaxed">
                "{review.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerMural;
