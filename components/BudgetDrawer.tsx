import React, { useState, useMemo } from 'react';
import { BudgetItem, Product, Category } from '../types';
import { CONTACT_INFO, PRODUCTS } from '../constants';

interface BudgetDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: BudgetItem[];
  onRemove: (id: string) => void;
  onFinalize: () => void;
}

const BudgetDrawer: React.FC<BudgetDrawerProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onRemove, 
  onFinalize
}) => {
  const [step, setStep] = useState<'cart' | 'anamnesis' | 'recommendation' | 'summary'>('cart');
  const [anamnesis, setAnamnesis] = useState({
    purpose: '', 
    lifestyle: '', 
    degreeRange: '' 
  });

  const [selectedLens, setSelectedLens] = useState<Product | null>(null);

  const total = useMemo(() => {
    const frameTotal = items.reduce((acc, curr) => {
      const price = typeof curr.price === 'number' ? curr.price : 0;
      return acc + (price * curr.quantity);
    }, 0);
    const lensTotal = selectedLens && typeof selectedLens.price === 'number' ? selectedLens.price : 0;
    return frameTotal + lensTotal;
  }, [items, selectedLens]);

  // Motor de Recomendação Inteligente (Mapeando as 12 Lentes l1-l12)
  const recommendations = useMemo(() => {
    if (step !== 'recommendation') return [];
    
    const allLenses = PRODUCTS.filter(p => p.category === Category.LENSES);
    
    // Filtro Progressivas (Multifocais Premium l9 a l12)
    if (anamnesis.purpose === 'Multifocal') {
      return allLenses.filter(l => l.tags.includes('Progressiva'));
    }

    // Filtro Visão Simples (Mapeamento l1 a l8)
    let filtered = allLenses.filter(l => l.tags.includes('Monofocal'));

    if (anamnesis.lifestyle === 'Digital') {
      filtered = filtered.filter(l => l.tags.includes('Filtro Azul') || l.tags.includes('Premium Digital'));
    } else if (anamnesis.lifestyle === 'Sol') {
      filtered = filtered.filter(l => l.tags.includes('Fotossensível'));
    } else if (anamnesis.lifestyle === 'Ativo') {
      filtered = filtered.filter(l => l.tags.includes('Policarbonato'));
    }

    // Priorização por Índice de Refração se o grau for alto
    if (anamnesis.degreeRange === 'Alto (4+)') {
      filtered = filtered.sort((a, b) => {
        const indexA = parseFloat(a.material?.split(' ')[1] || '1.49');
        const indexB = parseFloat(b.material?.split(' ')[1] || '1.49');
        return indexB - indexA;
      });
    }

    return filtered.slice(0, 3); // Retorna as 3 melhores opções técnicas
  }, [step, anamnesis]);

  const finalizeOrçamento = () => {
    const message = `*SOLICITAÇÃO DE ORÇAMENTO ÓTICA CDO*%0A%0A` +
      `*🏛️ ARMAÇÕES SELECIONADAS:*%0A${items.map(i => `- ${i.name} (Ref: ${i.id})`).join('%0A')}%0A%0A` +
      `*🔬 LENTE RECOMENDADA:*%0A${selectedLens ? `- ${selectedLens.name} (Brand: ${selectedLens.brand})` : 'A definir com consultor'}%0A%0A` +
      `*⚙️ PERFIL TÉCNICO DO CLIENTE:*%0A` +
      `- Finalidade: ${anamnesis.purpose}%0A` +
      `- Estilo de Vida: ${anamnesis.lifestyle}%0A` +
      `- Faixa de Grau: ${anamnesis.degreeRange}%0A%0A` +
      `*💰 ESTIMATIVA DE INVESTIMENTO:* R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}%0A%0A` +
      `_Aguardo análise do Concierge para validação técnica._`;
    
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${message}`, '_blank');
    onFinalize();
    resetDrawer();
  };

  const resetDrawer = () => {
    setStep('cart');
    setSelectedLens(null);
    onClose();
  };

  return (
    <>
      <div 
        className={`fixed inset-0 z-[600] bg-black/85 backdrop-blur-xl transition-opacity duration-700 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={resetDrawer} 
      />
      <div className={`fixed right-0 top-0 h-full w-full max-w-xl bg-[#000D1A] border-l border-white/10 z-[601] shadow-[0_0_100px_rgba(0,0,0,1)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        
        {/* Header Premium */}
        <div className="p-10 bg-brand-blue/20 flex items-center justify-between border-b border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 blur-3xl rounded-full"></div>
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-12 h-12 bg-brand-orange rounded-2xl flex items-center justify-center shadow-[0_10px_30px_rgba(255,107,0,0.4)]">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold text-white uppercase italic tracking-tighter">Concierge Óptico</h2>
              <p className="text-brand-orange text-[9px] font-black uppercase tracking-[0.4em]">Curadoria Cdo • Ceará</p>
            </div>
          </div>
          <button onClick={resetDrawer} className="text-white/20 hover:text-white transition-all p-2 hover:bg-white/5 rounded-full">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Dynamic Stepper Content */}
        <div className="flex-grow overflow-y-auto p-10 custom-scrollbar">
          
          {step === 'cart' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <h3 className="text-white/30 font-black uppercase text-[10px] tracking-widest">Itens na Curadoria</h3>
                <span className="text-brand-orange text-[10px] font-black">{items.length} Itens</span>
              </div>
              
              {items.length === 0 ? (
                <div className="py-32 text-center space-y-4">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white/10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                  </div>
                  <p className="text-white/20 font-bold uppercase tracking-widest text-[10px]">Nenhuma armação selecionada</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map(item => (
                    <div key={item.id} className="group flex gap-5 items-center bg-white/[0.03] p-5 rounded-[28px] border border-white/5 hover:border-white/10 transition-all">
                      <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center p-2 shrink-0">
                        <img src={item.imageUrl} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-grow">
                        <p className="text-[11px] text-white font-black uppercase tracking-tight">{item.name}</p>
                        <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest mb-2">Medidas: {item.measurements}</p>
                        <p className="text-sm text-brand-orange font-black">R$ {typeof item.price === 'number' ? item.price.toLocaleString('pt-BR') : item.price}</p>
                      </div>
                      <button onClick={() => onRemove(item.id)} className="p-3 text-white/10 hover:text-red-500 hover:bg-red-500/5 rounded-full transition-all">
                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 'anamnesis' && (
            <div className="space-y-12 animate-in slide-in-from-right duration-700">
              <div className="space-y-5">
                <label className="text-white font-display font-bold text-2xl uppercase italic tracking-tighter flex items-center gap-3">
                  <span className="text-brand-orange font-black italic text-sm">01.</span> Qual a finalidade?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['Longe', 'Perto', 'Multifocal', 'Ocupacional'].map(opt => (
                    <button key={opt} onClick={() => setAnamnesis({...anamnesis, purpose: opt})} className={`p-6 rounded-[22px] border text-[11px] font-black uppercase transition-all duration-300 ${anamnesis.purpose === opt ? 'bg-brand-orange border-brand-orange text-white shadow-[0_10px_20px_rgba(255,107,0,0.2)]' : 'bg-white/5 border-white/5 text-white/30 hover:border-white/10'}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {anamnesis.purpose && (
                <div className="space-y-5 animate-in fade-in slide-in-from-bottom-5">
                  <label className="text-white font-display font-bold text-2xl uppercase italic tracking-tighter flex items-center gap-3">
                    <span className="text-brand-orange font-black italic text-sm">02.</span> Estilo de Vida?
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { id: 'Digital', label: 'Proteção Digital (Telas/Blue)' },
                      { id: 'Sol', label: 'Exposição Solar (Fotossensível)' },
                      { id: 'Ativo', label: 'Resistência a Impactos (Esportes)' }
                    ].map(opt => (
                      <button key={opt.id} onClick={() => setAnamnesis({...anamnesis, lifestyle: opt.id})} className={`p-6 rounded-[22px] border text-left text-[11px] font-black uppercase transition-all duration-300 ${anamnesis.lifestyle === opt.id ? 'bg-brand-orange border-brand-orange text-white shadow-[0_10px_20px_rgba(255,107,0,0.2)]' : 'bg-white/5 border-white/5 text-white/30 hover:border-white/10'}`}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {anamnesis.lifestyle && (
                <div className="space-y-5 animate-in fade-in slide-in-from-bottom-5">
                  <label className="text-white font-display font-bold text-2xl uppercase italic tracking-tighter flex items-center gap-3">
                    <span className="text-brand-orange font-black italic text-sm">03.</span> Faixa de Grau?
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Baixo (0-2)', 'Médio (2-4)', 'Alto (4+)'].map(opt => (
                      <button key={opt} onClick={() => setAnamnesis({...anamnesis, degreeRange: opt})} className={`p-4 rounded-[20px] border text-[9px] font-black uppercase transition-all duration-300 ${anamnesis.degreeRange === opt ? 'bg-brand-orange border-brand-orange text-white shadow-[0_10px_20px_rgba(255,107,0,0.2)]' : 'bg-white/5 border-white/5 text-white/30 hover:border-white/10'}`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 'recommendation' && (
            <div className="space-y-8 animate-in zoom-in-95 duration-700">
              <div className="text-center space-y-2">
                <span className="text-brand-orange font-black uppercase text-[10px] tracking-[0.4em]">Engineered Selection</span>
                <h3 className="text-3xl font-display font-bold text-white uppercase italic tracking-tighter leading-tight">Melhores Opções Técnicas</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-5">
                {recommendations.map(lens => (
                  <div 
                    key={lens.id} 
                    onClick={() => setSelectedLens(lens)}
                    className={`group p-8 rounded-[35px] border cursor-pointer transition-all duration-500 relative overflow-hidden ${selectedLens?.id === lens.id ? 'bg-brand-orange/10 border-brand-orange shadow-[0_0_40px_rgba(255,107,0,0.1)]' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                  >
                    {selectedLens?.id === lens.id && (
                      <div className="absolute top-5 right-5 w-3 h-3 bg-brand-orange rounded-full animate-pulse shadow-[0_0_15px_rgba(255,107,0,1)]"></div>
                    )}
                    <div className="flex justify-between items-start mb-6">
                      <span className="bg-white/10 text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">{lens.brand}</span>
                      <p className="text-brand-orange font-display font-bold text-xl tracking-tighter italic">
                        {typeof lens.price === 'number' ? `R$ ${lens.price.toLocaleString('pt-BR')}` : lens.price}
                      </p>
                    </div>
                    <h4 className="text-white font-black text-base uppercase mb-3 tracking-tight">{lens.name}</h4>
                    <p className="text-white/40 text-[11px] font-medium italic leading-relaxed mb-6">{lens.description}</p>
                    <div className="flex flex-wrap gap-2">
                       <span className="bg-brand-orange/20 text-brand-orange text-[8px] px-3 py-1 rounded-md uppercase font-black">{lens.material}</span>
                       {lens.tags.map(tag => (
                         <span key={tag} className="bg-white/5 text-[8px] text-white/50 px-3 py-1 rounded-md uppercase font-black">{tag}</span>
                       ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 'summary' && (
            <div className="space-y-10 animate-in fade-in duration-1000">
              <div className="bg-[#FF6B00]/5 p-10 rounded-[45px] border border-brand-orange/20 text-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/10 to-transparent"></div>
                 <div className="relative z-10">
                   <h3 className="text-3xl font-display font-bold text-white uppercase italic tracking-tighter mb-6">Configuração Finalizada</h3>
                   <div className="space-y-5 text-left bg-black/40 p-8 rounded-[30px] border border-white/5">
                      <div className="space-y-1">
                        <p className="text-[9px] text-white/30 font-black uppercase tracking-widest">Armação(ões)</p>
                        <p className="text-xs text-white font-bold">{items.map(i => i.name).join(' + ')}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[9px] text-white/30 font-black uppercase tracking-widest">Tecnologia de Lente</p>
                        <p className="text-xs text-brand-orange font-bold italic">{selectedLens?.name || 'A definir com consultor'}</p>
                      </div>
                      <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-[9px] text-white/20 font-black uppercase tracking-widest">Uso</p>
                          <p className="text-[10px] text-white/60 font-bold uppercase">{anamnesis.purpose}</p>
                        </div>
                        <div className="space-y-1 text-right">
                          <p className="text-[9px] text-white/20 font-black uppercase tracking-widest">Prioridade</p>
                          <p className="text-[10px] text-white/60 font-bold uppercase">{anamnesis.lifestyle}</p>
                        </div>
                      </div>
                   </div>
                 </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions Premium */}
        <div className="p-10 bg-[#000D1A] border-t border-white/10 mt-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-white/20 font-black uppercase text-[10px] tracking-[0.4em] mb-2 block">Total Sugerido</span>
              <div className="flex items-baseline gap-2">
                 <span className="text-xs text-brand-orange font-black italic">R$</span>
                 <span className="text-4xl font-display font-bold text-white tracking-tighter italic">
                  {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            <p className="text-[9px] text-brand-orange font-black uppercase tracking-widest bg-brand-orange/10 px-4 py-2 rounded-full">10x s/ juros</p>
          </div>
          
          <div className="flex flex-col gap-4">
            {step === 'cart' && (
              <button 
                disabled={items.length === 0}
                onClick={() => setStep('anamnesis')}
                className="w-full bg-brand-orange text-white py-7 rounded-[24px] font-display font-bold uppercase text-[13px] tracking-[0.2em] shadow-[0_20px_40px_rgba(255,107,0,0.3)] hover:scale-[1.02] transition-all disabled:opacity-20 flex items-center justify-center gap-4 italic"
              >
                Configurar Lentes Técnicas
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7-7 7" /></svg>
              </button>
            )}

            {step === 'anamnesis' && (
              <div className="flex gap-4">
                <button onClick={() => setStep('cart')} className="px-8 bg-white/5 text-white/30 rounded-[24px] font-black uppercase text-[10px] tracking-widest border border-white/10 hover:bg-white/10 transition-all">Sair</button>
                <button 
                  disabled={!anamnesis.degreeRange}
                  onClick={() => setStep('recommendation')}
                  className="flex-grow bg-brand-orange text-white py-7 rounded-[24px] font-display font-bold uppercase text-[13px] tracking-[0.2em] shadow-[0_20px_40px_rgba(255,107,0,0.3)] hover:scale-[1.02] transition-all disabled:opacity-20 italic"
                >
                  Ver Recomendações
                </button>
              </div>
            )}

            {step === 'recommendation' && (
              <div className="flex gap-4">
                <button onClick={() => setStep('anamnesis')} className="px-8 bg-white/5 text-white/30 rounded-[24px] font-black uppercase text-[10px] tracking-widest border border-white/10 hover:bg-white/10 transition-all">Voltar</button>
                <button 
                  disabled={!selectedLens}
                  onClick={() => setStep('summary')}
                  className="flex-grow bg-brand-orange text-white py-7 rounded-[24px] font-display font-bold uppercase text-[13px] tracking-[0.2em] shadow-[0_20px_40px_rgba(255,107,0,0.3)] hover:scale-[1.02] transition-all disabled:opacity-20 italic"
                >
                  Avançar para Resumo
                </button>
              </div>
            )}

            {step === 'summary' && (
              <button 
                onClick={finalizeOrçamento}
                className="w-full bg-[#25D366] text-white py-7 rounded-[24px] font-display font-bold uppercase text-[13px] tracking-[0.2em] hover:scale-[1.02] transition-all flex items-center justify-center gap-4 shadow-[0_20px_40px_rgba(37,211,102,0.2)] italic"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Falar com Consultor via WhatsApp
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BudgetDrawer;