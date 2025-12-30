import React, { useState, useEffect } from 'react';
import { Product, Category } from '../types';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToBudget: (product: Product, quantity: number) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToBudget }) => {
  const [quantity, setQuantity] = useState(1);
  const [showSpecs, setShowSpecs] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSpecs(true), 400);
    return () => clearTimeout(timer);
  }, []);

  // Ficha técnica para Armações
  const frameSpecs = [
    { label: 'Estrutura / Material', value: product.material, icon: 'M' },
    { label: 'Calibre / Medidas', value: product.measurements || 'Sob Medida', icon: 'S' },
    { label: 'Coloração Frame', value: product.frameColor || product.color, icon: 'C' },
    { label: 'Segmento / Gênero', value: product.gender, icon: 'G' },
    { label: 'Curadoria / Brand', value: product.brand, icon: 'B' },
  ].filter(item => item.value);

  // Ficha técnica para Lentes (Grade Técnica)
  const lensSpecs = [
    { label: 'Índice de Refração', value: product.material, icon: 'I' },
    { label: 'Grade Esférica (Sph)', value: product.sphRange || 'Sob Consulta', icon: 'E' },
    { label: 'Grade Cilíndrica (Cyl)', value: product.cylRange || 'Sob Consulta', icon: 'C' },
    { label: 'Adição Técnica (Add)', value: product.addRange || 'N/A', icon: 'A' },
    { label: 'Tratamentos Inclusos', value: product.tags.filter(t => t !== 'Progressiva').join(', '), icon: 'T' },
    { label: 'Laboratório Certificado', value: product.brand, icon: 'L' },
  ].filter(item => item.value);

  const activeSpecs = product.category === Category.LENSES ? lensSpecs : frameSpecs;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-500">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative bg-[#000D1A] w-full max-w-5xl max-h-[95vh] rounded-[40px] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,0,0,1)] flex flex-col md:flex-row animate-in zoom-in duration-500 delay-150">
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 z-50 p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all text-white border border-white/10"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Product Visual Area */}
        <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-12 h-[350px] md:h-auto shrink-0 border-b md:border-b-0 md:border-r border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-50"></div>
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="relative z-10 max-w-full max-h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] group-hover:scale-110 transition-transform duration-1000" 
          />
          {product.onSale && (
            <div className="absolute bottom-8 left-8 bg-brand-orange text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest z-20">
              Oportunidade Única
            </div>
          )}
        </div>

        {/* Product Details Area */}
        <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col overflow-y-auto custom-scrollbar">
          <div className="mb-8">
            <span className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">
              {product.brand} • Engenharia Óptica
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white uppercase italic mb-6 tracking-tighter leading-tight">
              {product.name}
            </h2>
            
            <p className="text-white/40 text-base font-medium leading-relaxed mb-10 italic">
              {product.description}
            </p>
            
            <div className="mb-10">
               <div className="flex items-center gap-3 mb-8">
                 <h3 className="text-white font-black uppercase text-[10px] tracking-widest border-b border-white/5 pb-2 flex-grow">Ficha Técnica Completa</h3>
                 <div className="w-2 h-2 bg-brand-orange rounded-full animate-pulse"></div>
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-8">
                  {activeSpecs.map((item, idx) => (
                    <div 
                      key={idx} 
                      className={`space-y-1 transition-all duration-700 transform ${showSpecs ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                      style={{ transitionDelay: `${idx * 150}ms` }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-white/5 rounded-md flex items-center justify-center text-[8px] font-black text-brand-orange border border-white/5 uppercase">
                          {item.icon}
                        </div>
                        <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">{item.label}</p>
                      </div>
                      <p className="text-[11px] font-bold text-white uppercase pl-7 tracking-tight">{item.value}</p>
                    </div>
                  ))}
               </div>
            </div>

            <div className="flex items-center gap-6 mb-8 mt-4">
              <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Volume</span>
              <div className="flex items-center bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-5 py-3 text-white hover:text-brand-orange font-bold transition-colors">-</button>
                <span className="px-6 py-3 font-black text-white text-sm">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-5 py-3 text-white hover:text-brand-orange font-bold transition-colors">+</button>
              </div>
            </div>
          </div>

          {/* Footer of Modal */}
          <div className="pt-8 border-t border-white/5 mt-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-col">
              {product.originalPrice && (
                <span className="text-xs text-white/30 line-through">R$ {product.originalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              )}
              <span className="text-3xl font-display font-bold text-white tracking-tighter italic">
                {typeof product.price === 'number' 
                  ? `R$ ${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` 
                  : product.price}
              </span>
              <span className="text-[9px] text-brand-orange font-black uppercase tracking-widest mt-1">Investimento Vitalício</span>
            </div>
            <button 
              onClick={() => onAddToBudget(product, quantity)}
              className="w-full sm:w-auto bg-brand-orange text-white px-10 py-5 rounded-2xl font-display font-bold uppercase text-xs italic tracking-widest shadow-2xl shadow-brand-orange/40 hover:scale-105 active:scale-95 transition-all"
            >
              Adicionar ao Orçamento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;