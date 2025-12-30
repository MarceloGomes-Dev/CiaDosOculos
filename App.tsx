import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import BudgetDrawer from './components/BudgetDrawer';
import Footer from './components/Footer';
import CustomerMural from './components/CustomerMural';
import { Category, PageView, Product, BudgetItem } from './types';
import { PRODUCTS as INITIAL_PRODUCTS } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  useEffect(() => {
    setSelectedFilters({});
  }, [currentPage]);

  const handleLikeProduct = (id: string) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, likes: (p.likes || 0) + 1 } : p
    ));
  };

  const handleRateProduct = (id: string, rating: number) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, rating: rating } : p
    ));
  };

  const handleFilterToggle = (sectionTitle: string, option: string) => {
    setSelectedFilters(prev => {
      const currentOptions = prev[sectionTitle] || [];
      const newOptions = currentOptions.includes(option)
        ? currentOptions.filter(o => o !== option)
        : [...currentOptions, option];
      
      return { ...prev, [sectionTitle]: newOptions };
    });
  };

  const currentFilterSections = useMemo(() => {
    if (currentPage === Category.FRAMES) {
      return [
        { title: 'Gênero', options: ['Feminino', 'Masculino', 'Unissex', 'Infantil'] },
        { title: 'Cor da Armação', options: ['Azul', 'Dourado', 'Prata', 'Preto', 'Rose', 'Tartaruga', 'Marfim', 'Ambar', 'Rosa', 'Marrom', 'Cristal', 'Transparente', 'Vermelha', 'Gliter', 'Lilás', 'Nude', 'Mesclado', 'Cinza', 'Branco', 'Amarelo'] },
        { title: 'Formato', options: ['Quadrado', 'Redondo', 'Aviador', 'Gatinho'] },
        { title: 'Material', options: ['Acetato', 'Metal', 'Titânio'] }
      ];
    }
    if (currentPage === Category.LENSES) {
      return [
        { title: 'Marca', options: ['Varilux', 'Zeiss', 'Hoya', 'Kodak'] },
        { title: 'Tipo', options: ['Progressiva', 'Visão Simples', 'Monofocal'] },
        { title: 'Tratamentos', options: ['Filtro Azul', 'Antirreflexo', 'Fotossensível'] }
      ];
    }
    return [];
  }, [currentPage]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = currentPage === 'home' || product.category === currentPage;
      if (!matchesCategory) return false;

      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchesSearch) return false;

      for (const [section, options] of Object.entries(selectedFilters) as [string, string[]][]) {
        if (options.length === 0) continue;
        let sectionMatch = false;
        
        if (section === 'Gênero') {
          sectionMatch = options.some(opt => {
            if (opt === 'Masculino') return product.gender === 'Masculino' || product.gender === 'Unissex';
            if (opt === 'Feminino') return product.gender === 'Feminino' || product.gender === 'Unissex';
            return product.gender === opt;
          });
        } else if (section === 'Cor da Armação') {
          sectionMatch = options.includes(product.frameColor || '');
        } else if (section === 'Material') {
          sectionMatch = options.includes(product.material || '');
        } else {
          sectionMatch = options.some(opt => 
            product.tags.some(tag => tag.toLowerCase().includes(opt.toLowerCase())) || 
            product.brand.toLowerCase().includes(opt.toLowerCase())
          );
        }
        if (!sectionMatch) return false;
      }
      return true;
    });
  }, [currentPage, searchTerm, selectedFilters, products]);

  const renderHome = () => (
    <>
      <Hero />
      <div id="vitrine" className="py-24 bg-deep-navy">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-24 text-center">
            <span className="text-brand-orange font-black uppercase tracking-[0.6em] text-[10px] mb-4 block">Private Curatorship</span>
            <h2 className="text-5xl md:text-8xl font-display font-bold text-white uppercase italic leading-[0.85] tracking-tighter">
              Navegue por <br />
              <span className="text-brand-orange">Especialidade.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: Category.FRAMES, title: "Armações", img: "https://github.com/MarceloGomes-Dev/CDO/blob/main/Armacoes.png?raw=true" },
              { id: Category.LENSES, title: "Lentes", img: "https://github.com/MarceloGomes-Dev/CDO/blob/main/lens2.png?raw=true" },
              { id: Category.ACCESSORIES, title: "Acessórios", img: "https://github.com/MarceloGomes-Dev/CDO/blob/main/aces.png?raw=true" }
            ].map((cat) => (
              <div key={cat.id} onClick={() => setCurrentPage(cat.id as PageView)} className="group cursor-pointer overflow-hidden rounded-2xl relative aspect-video shadow-2xl border border-white/5">
                 <img src={cat.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                 <div className="absolute inset-0 bg-black/40 group-hover:bg-brand-orange/20 transition-all flex items-center justify-center">
                    <h3 className="text-white text-4xl font-display font-bold uppercase italic">{cat.title}</h3>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CustomerMural />
    </>
  );

  const renderCategoryView = (category: Category) => {
    if (category === Category.ACCESSORIES) {
      return (
        <div className="py-40 md:py-60 bg-deep-navy min-h-screen flex flex-col items-center justify-center px-6 text-center">
           <div className="w-24 h-24 bg-brand-orange/10 rounded-full flex items-center justify-center mb-8 animate-pulse">
             <svg className="w-10 h-10 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
             </svg>
           </div>
           <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase italic tracking-tighter">
              Em <span className="text-brand-orange">Desenvolvimento</span>
           </h2>
           <p className="text-white/40 font-medium mt-6 max-w-lg leading-relaxed italic">
              Nossa curadoria de acessórios exclusivos e produtos de manutenção premium está sendo finalizada para garantir a melhor experiência óptica.
           </p>
           <button onClick={() => setCurrentPage('home')} className="mt-12 bg-white/5 border border-white/10 text-white px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-brand-orange transition-all active:scale-95">
              Voltar para Home
           </button>
        </div>
      );
    }

    return (
      <div className="py-24 md:py-32 bg-deep-navy min-h-screen">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-64 shrink-0 space-y-6">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5 space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <h3 className="text-white font-black text-[10px] uppercase tracking-widest">Filtros</h3>
                  {Object.keys(selectedFilters).length > 0 && (
                     <button onClick={() => setSelectedFilters({})} className="text-[8px] text-brand-orange font-black uppercase hover:underline">Limpar</button>
                  )}
                </div>
                {currentFilterSections.map((section) => (
                  <div key={section.title} className="space-y-3">
                    <h4 className="text-brand-orange text-[9px] font-black uppercase tracking-widest">{section.title}</h4>
                    <div className="space-y-1.5">
                      {section.options.map(opt => (
                        <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                          <input type="checkbox" checked={(selectedFilters[section.title] || []).includes(opt)} onChange={() => handleFilterToggle(section.title, opt)} className="w-3.5 h-3.5 rounded-sm border-white/10 bg-white/5 text-brand-orange focus:ring-0" />
                          <span className="text-[10px] text-white/40 group-hover:text-white transition-colors uppercase font-bold tracking-tight">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </aside>
            <section className="flex-grow">
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white uppercase italic mb-12 tracking-tighter leading-none">{category}</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onClick={() => setSelectedProduct(product)}
                    onLike={() => handleLikeProduct(product.id)}
                    onRate={(rating) => handleRateProduct(product.id, rating)}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-deep-navy flex flex-col relative pt-[100px]">
      <Navbar onPageChange={setCurrentPage} onSearch={setSearchTerm} currentPage={currentPage} budgetCount={budgetItems.length} onOpenBudget={() => setIsBudgetOpen(true)} onMenuToggle={setIsMobileMenuOpen} />
      <main className={`flex-grow ${isMobileMenuOpen ? 'blur-3xl' : ''}`}>
        {currentPage === 'home' && renderHome()}
        {(currentPage === Category.FRAMES || currentPage === Category.LENSES || currentPage === Category.ACCESSORIES) && renderCategoryView(currentPage as Category)}
      </main>
      <Footer />
      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToBudget={(p, q) => {
        setBudgetItems(prev => [...prev, { ...p, quantity: q }]);
        setSelectedProduct(null);
        setIsBudgetOpen(true);
      }} />}
      <BudgetDrawer isOpen={isBudgetOpen} onClose={() => setIsBudgetOpen(false)} items={budgetItems} onRemove={id => setBudgetItems(budgetItems.filter(i => i.id !== id))} onFinalize={() => { setBudgetItems([]); setCurrentPage('home'); }} />
    </div>
  );
};

export default App;