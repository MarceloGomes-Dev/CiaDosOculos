
import React, { useState, useEffect } from 'react';
import { LogoIcon } from '../constants';
import { Category, PageView } from '../types';

interface NavbarProps {
  onPageChange: (page: PageView) => void;
  onSearch: (term: string) => void;
  currentPage: PageView;
  budgetCount: number;
  onOpenBudget: () => void;
  onMenuToggle?: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onPageChange, 
  onSearch, 
  currentPage, 
  budgetCount, 
  onOpenBudget,
  onMenuToggle 
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (onMenuToggle) onMenuToggle(isMenuOpen);
  }, [isMenuOpen, onMenuToggle]);

  const handlePageSelect = (page: PageView) => {
    onPageChange(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="w-full fixed top-0 left-0 z-[400]">
      {/* Faixa Superior Informativa */}
      <div className="bg-brand-orange text-white py-1 text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-center relative z-[410]">
        Experiência Visual de Alta Performance • Consultoria via IA Ativa
      </div>

      {/* Barra Principal */}
      <div className="glass w-full border-b border-white/5 relative z-[410]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          {/* Logo e Nome - FIXO E SEMPRE VISÍVEL */}
          <div 
            className="flex items-center gap-2 md:gap-4 shrink-0 cursor-pointer group" 
            onClick={() => handlePageSelect('home')}
          >
            <div className="group-hover:rotate-12 transition-transform duration-500 scale-75 md:scale-100">
              <LogoIcon />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg md:text-2xl font-display font-bold text-white leading-none tracking-tighter uppercase italic">
                Ótica <span className="text-brand-orange">Cdo</span>
              </h1>
              <p className="text-[6px] md:text-[8px] font-bold text-brand-orange tracking-[0.4em] uppercase">Private Label</p>
            </div>
          </div>

          {/* Busca Desktop */}
          <div className="hidden lg:block flex-grow max-w-xl mx-8 relative">
            <input 
              type="text" 
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                onSearch(e.target.value);
              }}
              placeholder="Buscar por grifes ou tecnologias..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-6 text-sm text-white focus:outline-none focus:border-brand-orange transition-all"
            />
          </div>

          {/* Menu Desktop */}
          <nav className="hidden lg:flex items-center gap-8 text-[10px] font-black text-white/70 uppercase tracking-[0.2em]">
            {[Category.FRAMES, Category.LENSES, Category.ACCESSORIES].map((cat) => (
              <span 
                key={cat}
                onClick={() => handlePageSelect(cat)} 
                className={`cursor-pointer hover:text-brand-orange transition-all relative py-2 ${currentPage === cat ? 'text-brand-orange' : ''}`}
              >
                {cat}
              </span>
            ))}
            <button 
              onClick={onOpenBudget}
              className="relative flex items-center gap-3 bg-white/5 text-white border border-white/10 px-6 py-3 rounded-2xl hover:bg-brand-orange transition-all group"
            >
              <span className="font-display uppercase">Orçamento</span>
              {budgetCount > 0 && (
                <span className="bg-brand-orange text-white text-[9px] w-5 h-5 flex items-center justify-center rounded-full font-black">
                  {budgetCount}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2">
            <button 
              onClick={onOpenBudget} 
              className="relative p-2 text-white/70 hover:text-brand-orange transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {budgetCount > 0 && (
                <span className="absolute top-0 right-0 bg-brand-orange text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-black">
                  {budgetCount}
                </span>
              )}
            </button>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white hover:text-brand-orange transition-colors z-[420]"
            >
              <div className="w-6 h-5 flex flex-col justify-between items-end">
                <span className={`h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'w-6 translate-y-[9px] -rotate-45' : 'w-6'}`}></span>
                <span className={`h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0 w-0' : 'w-4'}`}></span>
                <span className={`h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'w-6 -translate-y-[9px] rotate-45' : 'w-5'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile Overlay - ULTRA TRANSLÚCIDO (Glassmorphism Avançado) */}
      <div className={`lg:hidden fixed inset-0 top-0 h-screen z-[350] bg-white/[0.02] backdrop-blur-[80px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}>
        <div className="pt-40 px-8 flex flex-col h-full gap-10">
          <div className="flex flex-col gap-6">
            <p className="text-brand-orange font-black uppercase text-[10px] tracking-[0.4em] mb-4">Seções Exclusivas</p>
            {[Category.FRAMES, Category.LENSES, Category.ACCESSORIES].map((cat, idx) => (
              <button 
                key={cat}
                onClick={() => handlePageSelect(cat)}
                style={{ transitionDelay: `${idx * 100}ms` }}
                className={`text-4xl font-display font-bold text-white uppercase italic text-left flex items-center justify-between group border-b border-white/10 pb-6 transition-all duration-700 ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}
              >
                <span className="group-hover:translate-x-4 transition-transform duration-300 group-hover:text-brand-orange">{cat}</span>
                <svg className="w-8 h-8 text-brand-orange/30 group-hover:text-brand-orange transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            ))}
          </div>

          <div className={`mt-8 space-y-4 transition-all duration-700 delay-400 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
             <div className="relative">
               <input 
                 type="text" 
                 onChange={(e) => onSearch(e.target.value)}
                 placeholder="O que você procura?" 
                 className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-white text-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/50 transition-all placeholder:text-white/20"
               />
             </div>
             <button 
               onClick={onOpenBudget}
               className="w-full bg-brand-orange text-white py-5 rounded-2xl font-display font-bold uppercase tracking-widest text-sm italic shadow-[0_10px_30px_rgba(255,107,0,0.3)] active:scale-95 transition-transform"
             >
               Finalizar Orçamento
             </button>
          </div>

          <div className={`mt-auto pb-12 transition-all duration-700 delay-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex gap-6 mb-8">
              <div className="w-px h-12 bg-white/10"></div>
              <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.3em] leading-loose">
                Ótica Cdo • Private Selection<br/>
                Premium Optical Experience
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
