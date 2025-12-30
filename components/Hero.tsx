
import React, { useState, useEffect } from 'react';

const BANNERS = [
  {
    id: 1,
    title: "Coleção Ano Novo, Óculos Novo 2026",
    subtitle: "Inicie o novo ciclo com a visão renovada e o estilo que você merece.",
    image: "https://github.com/MarceloGomes-Dev/CDO/blob/main/Tela_inicial1.png?raw=true",
    button: "VER COLEÇÃO",
    tag: "CAMPANHA 2026",
    color: "from-black/80",
    link: "#vitrine"
  },
  {
    id: 2,
    title: "Ofertas Exclusivas de Verão",
    subtitle: "Até 50% OFF em armações selecionadas da linha Premium.",
    image: "https://github.com/MarceloGomes-Dev/CDO/blob/main/Tela_inicial2.png?raw=true",
    button: "APROVEITAR",
    tag: "PROMOÇÃO",
    color: "from-blue-900/70",
    link: "#vitrine"
  },
  {
    id: 3,
    title: "Leve 2, Pague 1",
    subtitle: "Estilo em dose dupla para você e quem você ama.",
    image: "https://github.com/MarceloGomes-Dev/CDO/blob/main/Tela_inicial3.png?raw=true",
    button: "VER MODELOS",
    tag: "OFERTA",
    color: "from-[#002C51]/80",
    link: "#vitrine"
  },
  {
    id: 4,
    title: "Proteção Digital Blue Light",
    subtitle: "Conforto visual para sua jornada digital diária.",
    image: "https://github.com/MarceloGomes-Dev/CDO/blob/main/Tela_inicial4.png?raw=true",
    button: "SAIBA MAIS",
    tag: "SAÚDE VISUAL",
    color: "from-gray-900/60",
    link: "#vitrine"
  }
];

const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % BANNERS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleScrollToVitrine = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-[500px] lg:h-[750px] w-full overflow-hidden bg-gray-900">
      {BANNERS.map((banner, index) => (
        <div 
          key={banner.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === current ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'}`}
        >
          <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
          <div className={`absolute inset-0 bg-gradient-to-r ${banner.color} to-transparent flex items-center`}>
            <div className="max-w-7xl mx-auto px-4 w-full">
              <div className={`max-w-3xl text-white transform transition-all duration-1000 delay-300 ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <span className="inline-block bg-[#FF6B00] text-white text-[10px] lg:text-xs font-black px-4 py-1.5 rounded-sm mb-6 uppercase tracking-[0.2em] shadow-lg">
                  {banner.tag}
                </span>
                <h2 className="text-4xl lg:text-8xl font-black mb-6 leading-[0.9] uppercase tracking-tighter italic drop-shadow-2xl">
                  {banner.title}
                </h2>
                <p className="text-lg lg:text-2xl font-medium mb-10 text-white/90 max-w-xl">
                  {banner.subtitle}
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={(e) => handleScrollToVitrine(e, banner.link)}
                    className="bg-[#FF6B00] text-white px-8 lg:px-12 py-4 lg:py-5 rounded-lg font-black text-xs lg:text-lg hover:bg-orange-600 transition-all shadow-2xl hover:scale-105 active:scale-95 uppercase tracking-widest"
                  >
                    {banner.button}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-20">
        {BANNERS.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrent(i)}
            className={`transition-all duration-500 h-1.5 rounded-full ${current === i ? 'w-20 bg-[#FF6B00]' : 'w-4 bg-white/40 hover:bg-white/60'}`}
            aria-label={`Pular para o banner ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
